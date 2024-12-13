import { TNode, useActionCreator } from '@ukri/map/data-access-map';

import { Node } from './node.component';

type TActiveNodeProps = {
  node: TNode;
  text: string;
  error?: string;
};

export const ActiveNode = ({ text, node, error }: TActiveNodeProps) => {
  const { canActivateNode, isLast } = useActionCreator();

  return (
    <Node
      type={node.type}
      text={text}
      active={true}
      clickable={canActivateNode(node)}
      selected={node.state === 'active'}
      hasNextNode={!isLast(node)}
      error={error}
    />
  );
};
