import { TDataSetsNode, useActionCreator } from '@ukri/map/data-access-map';
import { useTranslation } from 'react-i18next';

import { Node } from '../../node.component';
import { NodeInput } from '../node-input.component';

const useNodeTranslation = (node: TValueNodeProps['node']) => {
  const { t } = useTranslation();

  switch (node.value) {
    case 'sentinel1': {
      return t('MAP.ACTION_CREATOR_PANEL.NODE.DATA_SET.SENTINEL_1');
    }

    case 'sentinel2': {
      return t('MAP.ACTION_CREATOR_PANEL.NODE.DATA_SET.SENTINEL_2');
    }

    case 'sentinel3': {
      return t('MAP.ACTION_CREATOR_PANEL.NODE.DATA_SET.SENTINEL_3');
    }

    case 'sentinel5p': {
      return t('MAP.ACTION_CREATOR_PANEL.NODE.DATA_SET.SENTINEL_5P');
    }
  }

  return '';
};

type TValueNodeProps = {
  node: TDataSetsNode;
  error: boolean;
  onClearButtonClick: () => void;
};

export const ValueNode = ({ error, node, onClearButtonClick }: TValueNodeProps) => {
  const { canActivate } = useActionCreator();
  const value = useNodeTranslation(node);

  return (
    <Node type={node.type} clickable={canActivate(node)} selected={node.selected}>
      <NodeInput iconName='Satellite' value={value} error={error} onClearButtonClick={onClearButtonClick} />
    </Node>
  );
};
