import { useComparisonMode, useFootprints, useTrueColorImage } from '@ukri/map/data-access-map';
import MapBrowserEvent from 'ol/MapBrowserEvent';
import STAC from 'ol-stac';
import { useCallback, useEffect } from 'react';

import { stacLayerZindex } from '../../consts';
import { useMapClick } from '../../hooks/use-map-click.hook';
import { STACWithColorMap } from '../../stac/stac-with-color-map';
import { useStacLayerCreation } from '../../stac/use-stac-layer-creation';
import { isCoordinateWithinGeometry } from '../../utils/geometry.utils';

export const useStacLayer = () => {
  const { stacUrl, feature, assetNameWhichShouldBeDisplayed } = useTrueColorImage();
  const { comparisonModeEnabled } = useComparisonMode();
  const { highlightItem } = useFootprints();
  const { createStacLayer, removeLayerFromMap, addLayerToMap } = useStacLayerCreation();

  const handleMapClick = useCallback(
    (event: MapBrowserEvent<UIEvent>, eventType: 'click' | 'pointermove' | undefined) => {
      if (!feature || eventType !== 'click') {
        return;
      }

      const geometry = feature.geometry as { type: string; coordinates: number[][][] } | undefined;

      if (!geometry || !event.coordinate) {
        return;
      }

      if (isCoordinateWithinGeometry(event.coordinate, geometry)) {
        highlightItem({
          featureId: feature.id,
          eventType: 'click',
          eventSource: 'map',
        });
      }
    },
    [feature, highlightItem]
  );

  useMapClick(handleMapClick, { enabled: !comparisonModeEnabled && !!feature });

  useEffect(() => {
    if (!stacUrl || comparisonModeEnabled) {
      return;
    }

    let newStacLayer: STAC | STACWithColorMap | null = null;

    const loadLayer = async () => {
      newStacLayer = await createStacLayer({
        url: stacUrl,
        zIndex: stacLayerZindex,
        collection: feature?.collection,
        assetNameWhichShouldBeDisplayed: assetNameWhichShouldBeDisplayed ? assetNameWhichShouldBeDisplayed : '',
      });

      if (newStacLayer) {
        addLayerToMap(newStacLayer);
      }
    };

    loadLayer();

    return () => {
      if (newStacLayer) {
        removeLayerFromMap(newStacLayer);
      }
    };
  }, [
    stacUrl,
    comparisonModeEnabled,
    feature,
    createStacLayer,
    removeLayerFromMap,
    addLayerToMap,
    assetNameWhichShouldBeDisplayed,
  ]);
};
