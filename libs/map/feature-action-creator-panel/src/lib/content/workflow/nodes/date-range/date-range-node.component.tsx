import { TDateRangeNode, useActionCreator, useDate } from '@ukri/map/data-access-map';
import { useCallback, useEffect, useMemo } from 'react';

import { EmptyNode } from '../empty-node.component';
import { ActiveNode } from './active-node.component';
import { ValueNode } from './value-node.component';

interface IDateRangeNodeProps {
  node: TDateRangeNode;
}

export const NodeDateRange = ({ node }: IDateRangeNodeProps) => {
  const { setActive, setValue, canActivate } = useActionCreator();
  const { date, updateDate } = useDate();
  const enabled = useMemo(() => canActivate(node), [node, canActivate]);

  const activateNode = useCallback(() => {
    setActive(node);
  }, [node, setActive]);

  const clearDateFrom = useCallback(() => {
    updateDate({ from: undefined, to: date?.to });
  }, [date?.to, updateDate]);

  const clearDateTo = useCallback(() => {
    updateDate({ from: date?.from, to: undefined });
  }, [date?.from, updateDate]);

  useEffect(() => {
    if (node.selected) {
      const newDate = !date?.from && !date?.to ? undefined : { from: date?.from, to: date?.to };
      setValue(node, newDate);
    }
  }, [node.selected, setValue, node, date?.from, date?.to]);

  return (
    <div onClick={activateNode}>
      <EmptyNode node={node} enabled={enabled} />
      <ActiveNode node={node} enabled={enabled} />
      <ValueNode node={node} enabled={enabled} onClearDateFromClick={clearDateFrom} onClearDateToClick={clearDateTo} />
    </div>
  );
};
