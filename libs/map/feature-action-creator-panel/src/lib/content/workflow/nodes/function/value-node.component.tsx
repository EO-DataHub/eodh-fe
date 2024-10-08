import { TDataSetsFunction, TFunctionNode } from '@ukri/map/data-access-map';

import { Node } from '../../node.component';
import { NodeSelect } from '../node-select.component';

type TValueNodeProps = {
  node: TFunctionNode;
  enabled: boolean;
  onChange?: (value: TDataSetsFunction | undefined) => void;
};

export const ValueNode = ({ enabled, node, onChange }: TValueNodeProps) => {
  if (!enabled || !node.value) {
    return;
  }

  return (
    <Node type={node.type} enabled={enabled} selected={node.selected}>
      <NodeSelect value={node.value} onChange={onChange} />
    </Node>
  );
};
