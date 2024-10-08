import { TDataSetsNode } from '@ukri/map/data-access-map';

import { Node } from '../../node.component';
import { NodeInput } from '../node-input.component';

type TValueNodeProps = {
  node: TDataSetsNode;
  enabled: boolean;
  onClearButtonClick: () => void;
};

export const ValueNode = ({ enabled, node, onClearButtonClick }: TValueNodeProps) => {
  if (!enabled || !node.value) {
    return;
  }

  return (
    <Node type={node.type} enabled={enabled} selected={node.selected}>
      <NodeInput iconName='Satellite' value={node.value} onClearButtonClick={onClearButtonClick} />
    </Node>
  );
};
