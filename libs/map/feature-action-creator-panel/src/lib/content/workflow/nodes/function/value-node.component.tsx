import { TBaseFunction, TFunctionNode, useActionCreator } from '@ukri/map/data-access-map';
import { useMemo } from 'react';

import { Node } from '../node.component';
import { NodeSelect, TOption, TValue } from '../node-select.component';

type TValueNodeProps = {
  node: TFunctionNode;
  options: TOption[];
  functions: TBaseFunction[] | undefined;
  onChange?: (value: TValue | undefined | null) => void;
};

export const ValueNode = ({ node, options, functions, onChange }: TValueNodeProps) => {
  const { canActivateNode, isLast, addNode, removeNode, canRemoveNode, canAddNextNode, editable } = useActionCreator();
  const nodeValue = useMemo(() => {
    if (!node.value) {
      return undefined;
    }

    return { value: node.value.identifier, supportedDataSets: node.value.supportedDataSets };
  }, [node]);

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
      <NodeSelect value={nodeValue} options={options || []} disabled={!editable(node)} onChange={onChange} />
    </Node>
  );
};
