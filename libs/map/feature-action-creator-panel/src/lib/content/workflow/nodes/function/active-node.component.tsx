import { TFunctionNode, useActionCreator } from '@ukri/map/data-access-map';

import { Node } from '../node.component';
import { NodeSelect, TOption } from '../node-select.component';

type TValueNodeProps = {
  node: TFunctionNode;
  options: TOption[];
  onChange?: (value: string | undefined | null) => void;
};

export const ActiveNode = ({ node, options, onChange }: TValueNodeProps) => {
  const { canActivateNode, isLast, canRemoveNode, removeNode } = useActionCreator();

  return (
    <Node
      type={node.type}
      clickable={canActivateNode(node)}
      selected={node.state === 'active'}
      hasNextNode={!isLast(node)}
      canRemoveNode={canRemoveNode(node)}
      onRemoveNode={() => removeNode(node)}
    >
      <NodeSelect value={undefined} options={options} onChange={onChange} />
    </Node>
  );
};
