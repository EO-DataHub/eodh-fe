import { TDateRangeNode, useActionCreator, useDate } from '@ukri/map/data-access-map';
import { useCallback, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { ActiveNode } from '../active-node.component';
import { EmptyNode } from '../empty-node.component';
import { ValueNode } from './value-node.component';

type TNodeProps = {
  node: TDateRangeNode;
  enabled: boolean;
  onClearDateFromClick: () => void;
  onClearDateToClick: () => void;
};

const Node = ({ node, enabled, onClearDateFromClick, onClearDateToClick }: TNodeProps) => {
  const { t } = useTranslation();

  return useMemo(() => {
    if (!node.selected && !node.value) {
      return <EmptyNode node={node} enabled={enabled} />;
    } else if (node.selected && !node.value?.from && !node.value?.to) {
      return (
        <ActiveNode node={node} enabled={enabled} text={t('MAP.ACTION_CREATOR_PANEL.NODE.DATE_RANGE.INSTRUCTIONS')} />
      );
    } else if (node.value?.from || node.value?.to) {
      return (
        <ValueNode
          node={node}
          enabled={enabled}
          onClearDateFromClick={onClearDateFromClick}
          onClearDateToClick={onClearDateToClick}
        />
      );
    }

    return <EmptyNode node={node} enabled={enabled} />;
  }, [node, enabled, t, onClearDateFromClick, onClearDateToClick]);
};

interface IDateRangeNodeProps {
  node: TDateRangeNode;
}

export const NodeDateRange = ({ node }: IDateRangeNodeProps) => {
  const { setActive, setValue, canActivate } = useActionCreator();
  const { date, updateDate } = useDate();
  const enabled = useMemo(() => canActivate(node), [node, canActivate]);

  const activateNode = useCallback(() => {
    if (enabled) {
      setActive(node);
    }
  }, [enabled, node, setActive]);

  const clearDateFrom = useCallback(() => {
    updateDate({ from: null, to: date?.to });
  }, [date?.to, updateDate]);

  const clearDateTo = useCallback(() => {
    updateDate({ from: date?.from, to: null });
  }, [date?.from, updateDate]);

  useEffect(() => {
    if (node.selected) {
      const newDate = !date?.from && !date?.to ? undefined : { from: date?.from, to: date?.to };
      setValue(node, newDate);
    }
  }, [node.selected, setValue, node, date?.from, date?.to]);

  return (
    <div onClick={activateNode}>
      <Node node={node} enabled={enabled} onClearDateFromClick={clearDateFrom} onClearDateToClick={clearDateTo} />
    </div>
  );
};
