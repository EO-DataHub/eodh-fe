import { TNode } from '@ukri/map/data-access-map';

import { Node } from '../node.component';

type TActiveNodeProps = {
  node: TNode;
  text: string;
  enabled: boolean;
};

export const ActiveNode = ({ enabled, text, node }: TActiveNodeProps) => {
  return <Node type={node.type} text={text} enabled={enabled} selected={node.selected} />;
};
