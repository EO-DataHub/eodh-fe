import { TNode, useActionCreator } from '@ukri/map/data-access-map';

import { Node } from './node.component';

type TEmptyNodeProps = {
  node: TNode;
};

export const EmptyNode = ({ node }: TEmptyNodeProps) => {
  const { canActivate } = useActionCreator();

  return <Node type={node.type} clickable={canActivate(node)} selected={node.selected} />;
};
