import { type TComparisonItem, useComparisonMode } from '@ukri/map/data-access-map';
import { displayNotification } from '@ukri/shared/utils/notification';
import isArray from 'lodash/isArray';
import { Coordinate } from 'ol/coordinate';
import { boundingExtent, intersects } from 'ol/extent';
import GroupLayer from 'ol/layer/Group';
import { transform } from 'ol/proj';
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { stacLayerZindex } from '../../consts';
import { MapContext } from '../../map.component';
import { STACWithColorMap } from '../../stac/stac-with-color-map';
import { useStacLayerCreation } from './../../stac/use-stac-layer-creation';

export type TComparisonLayer = {
  item1: GroupLayer | undefined;
  item2: GroupLayer | undefined;
  isItem1Visible: boolean;
  isItem2Visible: boolean;
};

const defaultValues: TComparisonLayer = {
  item1: undefined,
  item2: undefined,
  isItem1Visible: false,
  isItem2Visible: false,
};

export const ComparisonContext = createContext<TComparisonLayer>(defaultValues);

type TCoordinates =
  | TComparisonItem['geometry']['coordinates']
  | (number | number[] | number[][] | [number, number] | [number, number][])[];

const isFlatArray = (coordinates: TCoordinates): coordinates is Coordinate[] =>
  isArray(coordinates) && coordinates.flat().every((value) => !isArray(value));

const flattenCoordinates = (coordinates: TCoordinates): Coordinate[] => {
  if (isFlatArray(coordinates)) {
    return coordinates;
  }

  return flattenCoordinates(coordinates.flat());
};

const convertCoordinates = (geometry: TComparisonItem['geometry']): Coordinate[] => {
  return flattenCoordinates(geometry.coordinates).map((coordinate) => transform(coordinate, 'EPSG:4326', 'EPSG:3857'));
};

export const useComparisonModeImageLayers = () => {
  const map = useContext(MapContext);
  const { t } = useTranslation();
  const { comparisonItems, comparisonModeEnabled } = useComparisonMode();
  const [item1, setItem1] = useState<GroupLayer | undefined>(undefined);
  const [item2, setItem2] = useState<GroupLayer | undefined>(undefined);
  const [isItem1Visible, setIsItem1Visible] = useState<boolean>(false);
  const [isItem2Visible, setIsItem2Visible] = useState<boolean>(false);
  const [combinedExtent, setCombinedExtent] = useState<number[]>([]);

  const { createStacLayer, removeLayerFromMap, addLayerToMap } = useStacLayerCreation();

  const createLayer = useCallback(
    async (item: TComparisonItem, index: number): Promise<STACWithColorMap | undefined> => {
      if (!comparisonItems.items.length || !comparisonModeEnabled || item.stacUrl === undefined) {
        return undefined;
      }

      return createStacLayer({
        url: item.stacUrl,
        zIndex: stacLayerZindex + index,
        collection: item.collection,
        assetNameWhichShouldBeDisplayed: item.assetName,
        fitToZoom: false,
        displayPreview: true,
      });
    },
    [comparisonItems, comparisonModeEnabled, createStacLayer]
  );

  useEffect(() => {
    let groupLayer1: GroupLayer | undefined;
    let groupLayer2: GroupLayer | undefined;

    if (!map || comparisonItems.items.length <= 1 || !comparisonModeEnabled) {
      setItem1(undefined);
      setItem2(undefined);
      setIsItem1Visible(false);
      setIsItem2Visible(false);

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

    const firstExtentCoords = convertCoordinates(firstItem.geometry);
    const secondExtentCoords = convertCoordinates(secondItem.geometry);

    const firstExtent = boundingExtent(firstExtentCoords);
    const secondExtent = boundingExtent(secondExtentCoords);

    const isIntersection = intersects(firstExtent, secondExtent);
    setCombinedExtent(boundingExtent([...firstExtentCoords, ...secondExtentCoords]));

    const setLayers = async () => {
      layer1 = await createLayer(firstItem, 1);
      layer2 = await createLayer(secondItem, 2);

      if (layer1) {
        groupLayer1 = new GroupLayer({
          layers: [layer1],
        });

        layer1.addEventListener('layersready', () => {
          setIsItem1Visible(true);
        });

        addLayerToMap(groupLayer1);
      }
      if (layer2) {
        groupLayer2 = new GroupLayer({
          layers: [layer2],
        });

        layer2.addEventListener('layersready', () => {
          setIsItem2Visible(true);
        });

        addLayerToMap(groupLayer2);
      }
      setItem1(groupLayer1);
      setItem2(groupLayer2);

      !isIntersection && displayNotification(t('MAP.COMPARISON_TOOL.NO_INTERSECTION'), 'warning');
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
  }, [map, comparisonItems, comparisonModeEnabled, createLayer, removeLayerFromMap, addLayerToMap, t]);

  useEffect(() => {
    if (!comparisonModeEnabled || !isItem1Visible || !isItem2Visible) {
      return;
    }

    map.getView().fit(combinedExtent, {
      size: map.getSize(),
      padding: [15, 15, 15, 15],
      maxZoom: 16,
    });
  }, [combinedExtent, comparisonModeEnabled, isItem1Visible, isItem2Visible, map]);

  return useMemo(() => {
    return {
      item1,
      item2,
      isItem1Visible,
      isItem2Visible,
    };
  }, [item1, item2, isItem1Visible, isItem2Visible]);
};
