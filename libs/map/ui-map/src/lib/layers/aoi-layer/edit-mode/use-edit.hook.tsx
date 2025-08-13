import { useAoi } from '@ukri/map/data-access-map';
import { useContext, useMemo } from 'react';

import { AoiLayerContext } from '../aoi-layer.component';
import { useRectangleResizeEdit } from './use-rectangle-resize-edit.hook';
import { useSimpleEdit } from './use-simple-edit.hook';

export const useEdit = () => {
  const { draw } = useContext(AoiLayerContext);
  const { state } = useAoi();
  const enabled = useMemo(() => !draw && state === 'edit', [draw, state]);

  useSimpleEdit(enabled);
  useRectangleResizeEdit(enabled);
};
