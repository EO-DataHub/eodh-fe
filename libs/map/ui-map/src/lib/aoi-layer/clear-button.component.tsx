import { useAoiLayerVisible, useAoiMode, useCurrentAoi, useCurrentAoiMutation } from '@ukri/map/data-access-map';
import { Icon } from '@ukri/shared/design-system';
import { useCallback, useMemo } from 'react';

import { DrawButton } from './button.component';

export const ClearButton = () => {
  const currentAoi = useCurrentAoi();
  const visible = useAoiLayerVisible();
  const setShape = useCurrentAoiMutation();
  const mode = useAoiMode();
  const disabled = useMemo(() => mode !== 'search' || !currentAoi || !visible, [mode, currentAoi, visible]);

  const drawRectangle = useCallback(() => {
    setShape(undefined);
  }, [setShape]);

  return (
    <DrawButton selected={false} disabled={disabled} onClick={drawRectangle}>
      <Icon name='Erase' width={24} height={24} />
    </DrawButton>
  );
};
