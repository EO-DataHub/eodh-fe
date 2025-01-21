import { useAoi } from '@ukri/map/data-access-map';
import { Icon } from '@ukri/shared/design-system';
import { useCallback, useMemo } from 'react';

import { SquareButton } from '../../components/square-button/square-button.component';

export const ClearButton = () => {
  const { shape, visible, setShape, state } = useAoi();
  const disabled = useMemo(() => state !== 'edit' || !shape || !visible, [state, shape, visible]);

  const drawRectangle = useCallback(() => {
    setShape(undefined);
  }, [setShape]);

  return (
    <SquareButton selected={false} disabled={disabled} onClick={drawRectangle}>
      <Icon name='Erase' width={24} height={24} />
    </SquareButton>
  );
};
