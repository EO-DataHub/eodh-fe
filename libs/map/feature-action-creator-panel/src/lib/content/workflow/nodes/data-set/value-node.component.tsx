import { TDataSetsNode, useActionCreator } from '@ukri/map/data-access-map';
import { useTranslation } from 'react-i18next';

import { Node } from '../node.component';
import { NodeInput } from '../node-input.component';

const useNodeTranslation = (node: TValueNodeProps['node']) => {
  const { t } = useTranslation();

  switch (node.value) {
    case 'sentinel-1': {
      return t('MAP.ACTION_CREATOR_PANEL.WORKFLOW.NODE.DATA_SET.SENTINEL_1');
    }

    case 'sentinel-2-l1c': {
      return t('MAP.ACTION_CREATOR_PANEL.WORKFLOW.NODE.DATA_SET.SENTINEL_2');
    }

    case 'sentinel-2-l2a':
    case 'sentinel-2-l2a-ard': {
      return t('MAP.ACTION_CREATOR_PANEL.WORKFLOW.NODE.DATA_SET.SENTINEL_2');
    }

    case 'sentinel-3': {
      return t('MAP.ACTION_CREATOR_PANEL.WORKFLOW.NODE.DATA_SET.SENTINEL_3');
    }

    case 'sentinel-5p': {
      return t('MAP.ACTION_CREATOR_PANEL.WORKFLOW.NODE.DATA_SET.SENTINEL_5P');
    }

    case 'esacci-globallc': {
      return t('MAP.ACTION_CREATOR_PANEL.WORKFLOW.NODE.DATA_SET.AUXILIARY.GLOBAL_LAND_COVER');
    }

    case 'clms-corinelc': {
      return t('MAP.ACTION_CREATOR_PANEL.WORKFLOW.NODE.DATA_SET.AUXILIARY.CORINE_LAND_COVER');
    }

    case 'clms-water-bodies': {
      return t('MAP.ACTION_CREATOR_PANEL.WORKFLOW.NODE.DATA_SET.AUXILIARY.WATER_BODIES');
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
  const { canActivateNode, isLast } = useActionCreator();
  const value = useNodeTranslation(node);

  return (
    <Node
      type={node.type}
      active={true}
      clickable={canActivateNode(node)}
      selected={node.state === 'active'}
      hasNextNode={!isLast(node)}
    >
      <NodeInput iconName='Satellite' value={value} error={error} onClearButtonClick={onClearButtonClick} />
    </Node>
  );
};
