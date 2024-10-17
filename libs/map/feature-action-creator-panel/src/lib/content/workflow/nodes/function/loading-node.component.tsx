import { TFunctionNode } from '@ukri/map/data-access-map';
import { LoadingInput } from '@ukri/shared/design-system';

import { Node } from '../../node.component';

type TValueNodeProps = {
  node: TFunctionNode;
};

export const LoadingNode = ({ node }: TValueNodeProps) => {
  return (
    <Node type={node.type} clickable={false} selected={node.selected}>
      <LoadingInput />
    </Node>
  );
};
