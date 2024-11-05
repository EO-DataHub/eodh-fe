import { TDateRangeNode, useActionCreator, useDate } from '@ukri/map/data-access-map';
import { useCallback, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { ActiveNode } from '../active-node.component';
import { EmptyNode } from '../empty-node.component';
import { ValueNode } from './value-node.component';

type TNodeProps = {
  node: TDateRangeNode;
  onClearDateFromClick: () => void;
  onClearDateToClick: () => void;
};

const Node = ({ node, onClearDateFromClick, onClearDateToClick }: TNodeProps) => {
  const { t } = useTranslation();

  return useMemo(() => {
    switch (node.state) {
      case 'initial': {
        return <EmptyNode node={node} />;
      }

      case 'active':
      case 'not-active': {
        if (!node.value?.from && !node.value?.to) {
          return <ActiveNode node={node} text={t('MAP.ACTION_CREATOR_PANEL.WORKFLOW.NODE.DATE_RANGE.INSTRUCTIONS')} />;
        }

        return (
          <ValueNode node={node} onClearDateFromClick={onClearDateFromClick} onClearDateToClick={onClearDateToClick} />
        );
      }
    }
  }, [node, t, onClearDateFromClick, onClearDateToClick]);
};

interface IDateRangeNodeProps {
  node: TDateRangeNode;
}

export const NodeDateRange = ({ node }: IDateRangeNodeProps) => {
  const { setActiveNode, setValue, canActivateNode } = useActionCreator();
  const { date, updateDate } = useDate();
  const canBeActivated = useMemo(() => canActivateNode(node), [node, canActivateNode]);

  const activateNode = useCallback(() => {
    if (canBeActivated) {
      setActiveNode(node);
    }
  }, [canBeActivated, node, setActiveNode]);

  const clearDateFrom = useCallback(() => {
    updateDate({ from: null, to: date?.to });
  }, [date?.to, updateDate]);

  const clearDateTo = useCallback(() => {
    updateDate({ from: date?.from, to: null });
  }, [date?.from, updateDate]);

  useEffect(() => {
    if (node.state !== 'initial') {
      const newDate = !date?.from && !date?.to ? undefined : { from: date?.from, to: date?.to };
      setValue(node, newDate);
    }
  }, [node.state, setValue, node, date?.from, date?.to]);

  return (
    <div onClick={activateNode}>
      <Node node={node} onClearDateFromClick={clearDateFrom} onClearDateToClick={clearDateTo} />
    </div>
  );
};
