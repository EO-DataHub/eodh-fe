import { TDataSetsFunction, TFunctionNode } from '@ukri/map/data-access-map';

import { Node } from '../../node.component';
import { NodeSelect } from '../node-select.component';

type TValueNodeProps = {
  node: TFunctionNode;
  enabled: boolean;
  onChange?: (value: TDataSetsFunction | undefined) => void;
};

export const ValueNode = ({ enabled, node, onChange }: TValueNodeProps) => {
  if (!enabled) {
    return;
  }

  return (
    <Node type={node.type} enabled={enabled} selected={node.selected}>
      <NodeSelect onChange={onChange} />
    </Node>
  );
};
