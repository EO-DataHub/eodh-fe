import { TNode, useActionCreator } from '@ukri/map/data-access-map';

import { Node } from './node.component';

type TEmptyNodeProps = {
  node: TNode;
};

export const EmptyNode = ({ node }: TEmptyNodeProps) => {
  const { canActivateNode, isLast } = useActionCreator();

  return <Node type={node.type} clickable={canActivateNode(node)} selected={false} hasNextNode={!isLast(node)} />;
};
