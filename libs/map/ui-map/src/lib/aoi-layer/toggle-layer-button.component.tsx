import { useAoiMode, useLayers } from '@ukri/map/data-access-map';
import { Icon } from '@ukri/shared/design-system';
import { useMemo } from 'react';

import { DrawButton } from './button.component';

export const ToggleLayerButton = () => {
  const { visible, toggle } = useLayers();
  const mode = useAoiMode();
  const disabled = useMemo(() => mode !== 'view', [mode]);

  return (
    <DrawButton selected={!visible} disabled={disabled} onClick={toggle}>
      {visible && <Icon name='Visibility' width={24} height={24} />}
      {!visible && <Icon name='VisibilityOff' width={24} height={24} />}
    </DrawButton>
  );
};
