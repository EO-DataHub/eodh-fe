import { TFunctionNode, useActionCreator } from '@ukri/map/data-access-map';

import { Node } from '../node.component';
import { NodeSelect, TOption } from '../node-select.component';

type TValueNodeProps = {
  node: TFunctionNode;
  options: TOption[];
  onChange?: (value: string | null | undefined) => void;
};

export const ValueNode = ({ node, options, onChange }: TValueNodeProps) => {
  const { canActivate } = useActionCreator();

  return (
    <Node type={node.type} clickable={canActivate(node)} selected={node.selected}>
      <NodeSelect value={node.value} options={options || []} onChange={onChange} />
    </Node>
  );
};
