import { useFootprintCollection, useFootprintLayerVisible, useFootprints } from '@ukri/map/data-access-map';
import { TFeature } from '@ukri/map/data-access-stac-catalog';
import { createDate } from '@ukri/shared/utils/date';
import { Feature, MapBrowserEvent } from 'ol';
import { click } from 'ol/events/condition';
import GeoJSON from 'ol/format/GeoJSON';
import Geometry from 'ol/geom/Geometry';
import Select from 'ol/interaction/Select';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { Fill, Stroke, Style } from 'ol/style';
import { useContext, useEffect, useState } from 'react';

import { footprintsLayerZindex } from '../../consts';
import { MapContext } from '../../map.component';

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

const getEventType = (event: MapBrowserEvent<UIEvent>) => {
  switch (event.type) {
    case 'pointermove': {
      return 'pointermove';
    }

    case 'click': {
      return 'click';
    }
  }

  return undefined;
};

type TSortBy = {
  field: 'properties.datetime';
  direction: 'desc' | 'asc';
};

const sortFeatures = (features: TFeature[], sortBy: TSortBy): TFeature[] => {
  if (sortBy.field === 'properties.datetime') {
    return features.sort((feature1, feature2) => {
      const date1 = createDate(feature1.properties.datetime)?.getTime() || 0;
      const date2 = createDate(feature2.properties.datetime)?.getTime() || 0;

      if (sortBy.direction === 'asc') {
        return date1 - date2;
      }

      return date2 - date1;
    });
  }

  return features;
};

export const useFootprintLayer = (id?: string) => {
  const map = useContext(MapContext);
  const visible = useFootprintLayerVisible(id);
  const collection = useFootprintCollection(id);
  const { highlightedItems, highlightItem: highlightFootprint } = useFootprints();
  const [layer, setLayer] = useState<VectorLayer<Feature<Geometry>> | null>(null);

  useEffect(() => {
    if (!map || !collection) {
      return;
    }

    const sortBy: TSortBy = {
      field: 'properties.datetime',
      direction: 'desc',
    };
    const features = collection.features.map((feature) => ({
      ...feature,
      properties: { ...feature.properties, id: feature.id },
    }));
    const collectionWithId = {
      ...collection,
      features: sortFeatures(features, sortBy).reverse(),
    };

    const vectorSource = new VectorSource({
      features: new GeoJSON().readFeatures(collectionWithId, {
        featureProjection: map.getView().getProjection(),
      }),
    });

    const newVectorLayer = new VectorLayer({
      source: vectorSource,
      style: defaultStyle,
      zIndex: footprintsLayerZindex,
      visible: false,
    });

    map.addLayer(newVectorLayer);

    const selectClick = new Select({
      condition: click,
      style: highlightStyle,
      layers: [newVectorLayer],
    });

    map.addInteraction(selectClick);

    const highlightItem = (event: MapBrowserEvent<UIEvent>) => {
      let featureId: string | undefined;
      map.forEachFeatureAtPixel(event.pixel, (feature, layer) => {
        if (layer === newVectorLayer && !featureId) {
          featureId = feature.getProperties().id;
        }
      });
      const eventType = getEventType(event);
      highlightFootprint(featureId ? { featureId, eventType, eventSource: 'map' } : undefined);
    };

    map.on('click', highlightItem);
    map.on('pointermove', highlightItem);

    setLayer(newVectorLayer);

    return () => {
      map.removeLayer(newVectorLayer);
      map.removeInteraction(selectClick);
      map.un('click', highlightItem);
      map.un('pointermove', highlightItem);
    };
  }, [map, collection, highlightFootprint]);

  useEffect(() => {
    if (!layer) {
      return;
    }

    layer.setVisible(visible);
  }, [layer, visible]);

  useEffect(() => {
    if (!layer) {
      return;
    }

    const features = layer.getSource()?.getFeatures();
    features?.forEach((feature) => {
      if (highlightedItems.find((item) => item.featureId === feature.getProperties().id)) {
        feature.setStyle(highlightStyle);
      } else {
        feature.setStyle(defaultStyle);
      }
    });
  }, [highlightedItems, layer]);
};
