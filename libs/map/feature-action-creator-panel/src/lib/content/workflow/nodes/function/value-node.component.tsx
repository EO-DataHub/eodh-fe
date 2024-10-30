import { TFunctionNode, useActionCreator } from '@ukri/map/data-access-map';

import { Node } from '../node.component';
import { NodeSelect, TOption } from '../node-select.component';

type TValueNodeProps = {
  node: TFunctionNode;
  options: TOption[];
  onChange?: (value: string | null | undefined) => void;
};

export const ValueNode = ({ node, options, onChange }: TValueNodeProps) => {
  const { canActivateNode } = useActionCreator();

  return (
    <Node type={node.type} clickable={canActivateNode(node)} selected={node.state === 'active'}>
      <NodeSelect value={node.value} options={options || []} onChange={onChange} />
    </Node>
  );
};
