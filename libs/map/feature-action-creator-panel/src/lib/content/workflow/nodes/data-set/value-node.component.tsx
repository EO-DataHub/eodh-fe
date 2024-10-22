import { TDataSetsNode } from '@ukri/map/data-access-map';
import { useTranslation } from 'react-i18next';

import { Node } from '../../node.component';
import { NodeInput } from '../node-input.component';

type TValueNodeProps = {
  node: TDataSetsNode;
  enabled: boolean;
  error: boolean;
  onClearButtonClick: () => void;
};

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

export const ValueNode = ({ enabled, error, node, onClearButtonClick }: TValueNodeProps) => {
  const value = useNodeTranslation(node);

  return (
    <Node type={node.type} enabled={enabled} selected={node.selected}>
      <NodeInput iconName='Satellite' value={value} error={error} onClearButtonClick={onClearButtonClick} />
    </Node>
  );
};
