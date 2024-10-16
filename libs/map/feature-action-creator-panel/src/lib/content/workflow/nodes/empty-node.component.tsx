import { TNode } from '@ukri/map/data-access-map';

import { Node } from '../node.component';

type TEmptyNodeProps = {
  node: TNode;
  enabled: boolean;
};

export const EmptyNode = ({ node, enabled }: TEmptyNodeProps) => {
  return <Node type={node.type} enabled={enabled} selected={node.selected} />;
};
