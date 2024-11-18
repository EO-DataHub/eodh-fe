import { TFunctionNode, useActionCreator } from '@ukri/map/data-access-map';

import { Node } from '../node.component';
import { NodeSelect, TOption, TValue } from '../node-select.component';

type TValueNodeProps = {
  node: TFunctionNode;
  options: TOption[];
  onChange?: (value: TValue | null | undefined) => void;
};

export const ActiveNode = ({ node, options, onChange }: TValueNodeProps) => {
  const { canActivateNode, isLast, canRemoveNode, removeNode } = useActionCreator();

  return (
    <Node
      active={true}
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
