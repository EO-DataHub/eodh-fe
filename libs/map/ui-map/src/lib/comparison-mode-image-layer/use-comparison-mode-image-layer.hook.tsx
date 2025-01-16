import { type TComparisonItem, useComparisonMode } from '@ukri/map/data-access-map';
import { t } from 'i18next';
import { enqueueSnackbar } from 'notistack';
import { Coordinate } from 'ol/coordinate';
import { boundingExtent, intersects } from 'ol/extent';
import GroupLayer from 'ol/layer/Group';
import { transform } from 'ol/proj';
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

import { stacLayerZindex } from '../consts';
import { MapContext } from '../map.component';
import { STACWithColorMap } from '../stac/stac-with-color-map';
import { useStacLayerCreation } from './../use-stac-layer-creation/use-stac-layer-creation';

export type TComparisonLayer = {
  item1: GroupLayer | undefined;
  item2: GroupLayer | undefined;
};

const defaultValues: TComparisonLayer = {
  item1: undefined,
  item2: undefined,
};

export const ComparisonContext = createContext<TComparisonLayer>(defaultValues);

export const useComparisonModeImageLayers = () => {
  const map = useContext(MapContext);
  const { comparisonItems, comparisonModeEnabled } = useComparisonMode();
  const [item1, setItem1] = useState<GroupLayer | undefined>(undefined);
  const [item2, setItem2] = useState<GroupLayer | undefined>(undefined);

  const { createStacLayer, removeLayerFromMap, addLayerToMap } = useStacLayerCreation();

  const createLayer = useCallback(
    async (item: TComparisonItem, index: number): Promise<STACWithColorMap | undefined> => {
      if (!comparisonItems.items.length || !comparisonModeEnabled || item.stacUrl === undefined) {
        return undefined;
      }

      const authorized = item.mode !== 'search';
      return createStacLayer({ url: item.stacUrl, zIndex: stacLayerZindex + index, authorized });
    },
    [comparisonItems, comparisonModeEnabled, createStacLayer]
  );

  useEffect(() => {
    let groupLayer1: GroupLayer | undefined;
    let groupLayer2: GroupLayer | undefined;

    if (!map || comparisonItems.items.length <= 1 || !comparisonModeEnabled) {
      setItem1(undefined);
      setItem2(undefined);
      if (groupLayer1) {
        removeLayerFromMap(groupLayer1);
      }
      if (groupLayer2) {
        removeLayerFromMap(groupLayer2);
      }
      return;
    }

    const items = [...comparisonItems.items];
    const firstItem = items.shift();
    const secondItem = items.shift();
    let layer1: STACWithColorMap | undefined;
    let layer2: STACWithColorMap | undefined;

    if (!firstItem || !secondItem) {
      return;
    }

    const firstExtentCoords = firstItem.geometry.coordinates[0].map((coord) =>
      transform(coord as Coordinate, 'EPSG:4326', 'EPSG:3857')
    );
    const secondExtentCoords = secondItem.geometry.coordinates[0].map((coord) =>
      transform(coord as Coordinate, 'EPSG:4326', 'EPSG:3857')
    );

    const firstExtent = boundingExtent(firstExtentCoords);
    const secondExtent = boundingExtent(secondExtentCoords);

    const isIntersection = intersects(firstExtent, secondExtent);
    const combinedExtent = boundingExtent([...firstExtentCoords, ...secondExtentCoords]);

    const setLayers = async () => {
      layer1 = await createLayer(firstItem, 1);
      layer2 = await createLayer(secondItem, 2);

      if (layer1) {
        groupLayer1 = new GroupLayer({
          layers: [layer1],
        });
        addLayerToMap(groupLayer1);
      }
      if (layer2) {
        groupLayer2 = new GroupLayer({
          layers: [layer2],
        });
        addLayerToMap(groupLayer2);
      }
      setItem1(groupLayer1);
      setItem2(groupLayer2);

      !isIntersection &&
        enqueueSnackbar(t('MAP.COMPARISON_TOOL.NO_INTERSECTION'), { variant: 'warning', persist: false });

      setTimeout(() => {
        map.getView().fit(combinedExtent, {
          size: map.getSize(),
          padding: [15, 15, 15, 15],
          maxZoom: 16,
        });
      }, 1500);
    };

    setLayers().then();

    return () => {
      if (groupLayer1) {
        removeLayerFromMap(groupLayer1);
      }
      if (groupLayer2) {
        removeLayerFromMap(groupLayer2);
      }
    };
  }, [map, comparisonItems, comparisonModeEnabled, createLayer, removeLayerFromMap, addLayerToMap]);

  return useMemo(() => {
    return {
      item1,
      item2,
    };
  }, [item1, item2]);
};
