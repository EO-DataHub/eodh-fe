import { TDateRangeNode } from '@ukri/map/data-access-map';
import { formatDate } from '@ukri/shared/utils/date';

import { Node } from '../../node.component';
import { NodeInput } from '../node-input.component';

type TValueNodeProps = {
  node: TDateRangeNode;
  enabled: boolean;
  onClearDateFromClick: () => void;
  onClearDateToClick: () => void;
};

export const ValueNode = ({ enabled, node, onClearDateFromClick, onClearDateToClick }: TValueNodeProps) => {
  if (!node.value?.from && !node.value?.to) {
    return;
  }

  const from = node.value?.from ? formatDate(node.value.from)?.toString() : '';
  const to = node.value?.to ? formatDate(node.value.to)?.toString() : '';

  return (
    <Node type={node.type} enabled={enabled} selected={node.selected}>
      <NodeInput value={from} className='mb-1' onClearButtonClick={onClearDateFromClick} />
      <NodeInput value={to} onClearButtonClick={onClearDateToClick} />
    </Node>
  );
};
