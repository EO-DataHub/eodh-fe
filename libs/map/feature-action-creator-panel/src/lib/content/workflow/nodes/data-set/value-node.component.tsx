import { TDataSetsNode } from '@ukri/map/data-access-map';

import { Node } from '../../node.component';
import { NodeInput } from '../node-input.component';

type TValueNodeProps = {
  node: TDataSetsNode;
  enabled: boolean;
  error: boolean;
  onClearButtonClick: () => void;
};

export const ValueNode = ({ enabled, error, node, onClearButtonClick }: TValueNodeProps) => {
  return (
    <Node type={node.type} enabled={enabled} selected={node.selected}>
      <NodeInput iconName='Satellite' value={node.value} error={error} onClearButtonClick={onClearButtonClick} />
    </Node>
  );
};
