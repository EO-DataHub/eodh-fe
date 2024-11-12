import { TFunctionNode, useActionCreator } from '@ukri/map/data-access-map';

import { Node } from '../node.component';
import { NodeSelect, TOption } from '../node-select.component';

export type TBasicFunction = { standalone: boolean; identifier: string; name: string };

type TValueNodeProps = {
  node: TFunctionNode;
  options: TOption[];
  functions: TBasicFunction[] | undefined;
  onChange?: (value: string | null | undefined) => void;
};

export const ValueNode = ({ node, options, functions, onChange }: TValueNodeProps) => {
  const { canActivateNode, isLast, addNode, removeNode, canRemoveNode, canAddNextNode, editable } =
    useActionCreator();

  return (
    <Node
      active={true}
      type={node.type}
      clickable={canActivateNode(node) && editable(node)}
      selected={node.state === 'active' && editable(node)}
      hasNextNode={!isLast(node)}
      canAddNode={canAddNextNode(node, functions)}
      canRemoveNode={canRemoveNode(node)}
      onAddNode={addNode}
      onRemoveNode={() => removeNode(node)}
    >
      <NodeSelect value={node.value} options={options || []} disabled={!editable(node)} onChange={onChange} />
    </Node>
  );
};
