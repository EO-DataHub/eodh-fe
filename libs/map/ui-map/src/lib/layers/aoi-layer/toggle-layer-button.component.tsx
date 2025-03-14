import { useLayers } from '@ukri/map/data-access-map';
import { Icon } from '@ukri/shared/design-system';

import { SquareButton } from '../../components/square-button/square-button.component';

export const ToggleLayerButton = () => {
  const { visible, enabled, toggle } = useLayers();

  return (
    <SquareButton selected={!visible} disabled={!enabled} onClick={toggle}>
      {visible && <Icon name='Visibility' width={24} height={24} />}
      {!visible && <Icon name='VisibilityOff' width={24} height={24} />}
    </SquareButton>
  );
};
