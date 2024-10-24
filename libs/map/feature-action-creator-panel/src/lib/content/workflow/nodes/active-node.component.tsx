import { TNode, useActionCreator } from '@ukri/map/data-access-map';

import { Node } from './node.component';

type TActiveNodeProps = {
  node: TNode;
  text: string;
};

export const ActiveNode = ({ text, node }: TActiveNodeProps) => {
  const { canActivateNode } = useActionCreator();

  return <Node type={node.type} text={text} clickable={canActivateNode(node)} selected={node.selected} />;
};
