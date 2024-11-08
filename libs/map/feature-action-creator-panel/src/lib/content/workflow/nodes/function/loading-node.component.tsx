import { TFunctionNode, useActionCreator } from '@ukri/map/data-access-map';
import { LoadingInput } from '@ukri/shared/design-system';

import { Node } from '../node.component';

type TValueNodeProps = {
  node: TFunctionNode;
};

export const LoadingNode = ({ node }: TValueNodeProps) => {
  const { isLast } = useActionCreator();

  return (
    <Node type={node.type} clickable={false} selected={node.state === 'active'} hasNextNode={!isLast(node)}>
      <LoadingInput />
    </Node>
  );
};
