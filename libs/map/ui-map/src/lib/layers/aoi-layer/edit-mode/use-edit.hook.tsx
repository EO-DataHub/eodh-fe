import { useContext, useEffect, useMemo, useState } from 'react';

import { MapContext } from '../../../map.component';
import { AoiLayerContext } from '../aoi-layer.component';
import { TEditMode } from './edit-mode.context';
import { useRectangleResizeEdit } from './use-rectangle-resize-edit.hook';
import { useSimpleEdit } from './use-simple-edit.hook';

export const useEdit = () => {
  const map = useContext(MapContext);
  const { draw } = useContext(AoiLayerContext);
  const [editMode, setEditMode] = useState<TEditMode['editMode']>('simple');

  useSimpleEdit(!draw && editMode === 'simple');
  useRectangleResizeEdit(!draw && editMode === 'rectangle');

  useEffect(() => {
    if (!draw?.draw) {
      return;
    }

    draw.draw.on('drawstart', () => setEditMode(draw?.type === 'rectangle' ? 'rectangle' : 'simple'));
    map.addInteraction(draw.draw);

    return () => {
      map.removeInteraction(draw.draw);
    };
  }, [map, draw]);

  return useMemo(
    () => ({
      editMode,
      setEditMode,
    }),
    [editMode]
  );
};
