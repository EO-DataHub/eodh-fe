import { useLayers } from '@ukri/map/data-access-map';
import { Icon } from '@ukri/shared/design-system';

import { DrawButton } from './button.component';

export const ToggleLayerButton = () => {
  const { visible, toggle } = useLayers();

  return (
    <DrawButton selected={visible} onClick={toggle}>
      {visible && <Icon name='Visibility' width={24} height={24} />}
      {!visible && <Icon name='VisibilityOff' width={24} height={24} />}
    </DrawButton>
  );
};
