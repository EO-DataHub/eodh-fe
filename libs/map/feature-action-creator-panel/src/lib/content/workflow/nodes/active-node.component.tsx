import { TNode, useActionCreator } from '@ukri/map/data-access-map';

import { Node } from './node.component';

type TActiveNodeProps = {
  node: TNode;
  text: string;
};

export const ActiveNode = ({ text, node }: TActiveNodeProps) => {
  const { canActivate } = useActionCreator();

  return <Node type={node.type} text={text} clickable={canActivate(node)} selected={node.selected} />;
};
