import { Feature } from 'ol';
import { click, pointerMove } from 'ol/events/condition';
import GeoJSON from 'ol/format/GeoJSON';
import Geometry from 'ol/geom/Geometry';
import Select from 'ol/interaction/Select';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { Fill, Stroke, Style } from 'ol/style';
import { useCallback, useContext, useEffect, useState } from 'react';

import { MapContext } from '../map.component';
import { type IFeatureCollection } from './geo-json.type';

const defaultStyle = new Style({
  fill: new Fill({
    color: 'rgba(0, 0, 255, 0.1)',
  }),
  stroke: new Stroke({
    color: '#3399CC',
    width: 1.25,
  }),
  zIndex: 1,
});

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
      zIndex: 2,
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
