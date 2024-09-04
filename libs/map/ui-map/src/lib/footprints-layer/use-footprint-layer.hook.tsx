import { Feature } from 'ol';
import { click, pointerMove } from 'ol/events/condition';
import GeoJSON from 'ol/format/GeoJSON';
import Geometry from 'ol/geom/Geometry';
import Select from 'ol/interaction/Select';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { Fill, Stroke, Style } from 'ol/style';
import { useCallback, useContext, useEffect, useState } from 'react';

import { footprintsLayerZindex } from '../consts';
import { MapContext } from '../map.component';
import { type IFeatureCollection } from './geo-json.type';

const defaultStyle = new Style({
  fill: new Fill({
    // Fill do not support opacity, so we need to use rgba here
    // TODO to check if it is possible to get styles from tailwind
    color: 'rgba(68, 131, 255, 0.2)',
  }),
  stroke: new Stroke({
    color: getComputedStyle(document.documentElement).getPropertyValue('--colors-primary-main'),
    width: 1,
  }),
  zIndex: 1,
});

// TODO styles for highlight footprint to be updated in the future once design will be added
const highlightStyle = new Style({
  fill: new Fill({
    color: 'rgba(255, 255, 0, 0.3)',
  }),
  stroke: new Stroke({
    color: '#FFCC33',
    width: 2,
  }),
  zIndex: 2,
});

export const useFootprintsLayer = (geojsonObject: IFeatureCollection) => {
  const map = useContext(MapContext);
  const [vectorLayer, setVectorLayer] = useState<VectorLayer<Feature<Geometry>> | null>(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (!map) {
      return;
    }

    const vectorSource = new VectorSource({
      features: new GeoJSON().readFeatures(geojsonObject, {
        featureProjection: map.getView().getProjection(),
      }),
    });

    const newVectorLayer = new VectorLayer({
      source: vectorSource,
      style: defaultStyle,
      zIndex: footprintsLayerZindex,
      visible: isVisible,
    });

    setVectorLayer(newVectorLayer);
    map.addLayer(newVectorLayer);

    const selectHover = new Select({
      condition: pointerMove,
      style: highlightStyle,
    });

    const selectClick = new Select({
      condition: click,
      style: highlightStyle,
    });

    map.addInteraction(selectHover);
    map.addInteraction(selectClick);

    return () => {
      map.removeLayer(newVectorLayer);
      map.removeInteraction(selectHover);
      map.removeInteraction(selectClick);
    };
  }, [map, geojsonObject, isVisible]);

  const updateZindex = useCallback(
    (newZIndex: number) => {
      if (vectorLayer) {
        vectorLayer.setZIndex(newZIndex);
      }
    },
    [vectorLayer]
  );

  const toggleVisibility = useCallback(
    (visible?: boolean) => {
      if (vectorLayer) {
        const newVisibility = visible !== undefined ? visible : !vectorLayer.getVisible();
        vectorLayer.setVisible(newVisibility);
        setIsVisible(newVisibility);
      }
    },
    [vectorLayer]
  );

  return { updateZindex, toggleVisibility };
};
