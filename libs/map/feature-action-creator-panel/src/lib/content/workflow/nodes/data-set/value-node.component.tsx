import { TDataSetsNode, useActionCreator } from '@ukri/map/data-access-map';

import { Node } from '../../node.component';
import { NodeInput } from '../node-input.component';

type TValueNodeProps = {
  node: TDataSetsNode;
  error: boolean;
  onClearButtonClick: () => void;
};

export const ValueNode = ({ error, node, onClearButtonClick }: TValueNodeProps) => {
  const { canActivate } = useActionCreator();

  return (
    <Node type={node.type} clickable={canActivate(node)} selected={node.selected}>
      <NodeInput iconName='Satellite' value={node.value || ''} error={error} onClearButtonClick={onClearButtonClick} />
    </Node>
  );
};
