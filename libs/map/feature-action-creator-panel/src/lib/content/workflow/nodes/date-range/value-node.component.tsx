import { TDateRangeNode } from '@ukri/map/data-access-map';
import { formatDate } from '@ukri/shared/utils/date';

import { Node } from '../../node.component';
import { NodeInput } from '../node-input.component';

type TValueNodeProps = {
  node: TDateRangeNode;
  enabled: boolean;
  onClearButtonClick: () => void;
};

export const ValueNode = ({ enabled, node, onClearButtonClick }: TValueNodeProps) => {
  if (!enabled || !node.value) {
    return;
  }

  return (
    <Node type={node.type} enabled={enabled} selected={node.selected}>
      <NodeInput
        value={formatDate(node.value.from) as string}
        className='mb-1'
        onClearButtonClick={onClearButtonClick}
      />
      <NodeInput value={formatDate(node.value.from) as string} onClearButtonClick={onClearButtonClick} />
    </Node>
  );
};
