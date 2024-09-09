import { useFootprintCollection, useFootprintLayerVisible } from '@ukri/map/data-access-map';
import { Feature } from 'ol';
import { click, pointerMove } from 'ol/events/condition';
import GeoJSON from 'ol/format/GeoJSON';
import Geometry from 'ol/geom/Geometry';
import Select from 'ol/interaction/Select';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { Fill, Stroke, Style } from 'ol/style';
import { useContext, useEffect, useState } from 'react';

import { footprintsLayerZindex } from '../consts';
import { MapContext } from '../map.component';

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
    color: 'rgba(255, 255, 0, 0.0)',
  }),
  stroke: new Stroke({
    color: '#FFCC33',
    width: 2,
  }),
  zIndex: 2,
});

export const useFootprintLayer = () => {
  const map = useContext(MapContext);
  const visible = useFootprintLayerVisible();
  const collection = useFootprintCollection();
  const [layer, setLayer] = useState<VectorLayer<Feature<Geometry>> | null>(null);

  useEffect(() => {
    if (!map || !collection) {
      return;
    }

    const vectorSource = new VectorSource({
      features: new GeoJSON().readFeatures(collection, {
        featureProjection: map.getView().getProjection(),
      }),
    });

    const newVectorLayer = new VectorLayer({
      source: vectorSource,
      style: defaultStyle,
      zIndex: footprintsLayerZindex,
    });

    map.addLayer(newVectorLayer);

    const selectHover = new Select({
      condition: pointerMove,
      style: highlightStyle,
      layers: [newVectorLayer],
    });

    const selectClick = new Select({
      condition: click,
      style: highlightStyle,
      layers: [newVectorLayer],
    });

    map.addInteraction(selectHover);
    map.addInteraction(selectClick);

    setLayer(newVectorLayer);

    return () => {
      map.removeLayer(newVectorLayer);
      map.removeInteraction(selectHover);
      map.removeInteraction(selectClick);
    };
  }, [map, collection]);

  useEffect(() => {
    if (!layer) {
      return;
    }

    layer.setVisible(visible);
  }, [layer, visible]);
};
