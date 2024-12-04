import { TDateRangeNode, useActionCreator, useDate } from '@ukri/map/data-access-map';
import { useOnboarding } from '@ukri/shared/ui/ac-workflow-onboarding';
import { useCallback, useEffect, useMemo, useRef } from 'react';
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

      case 'not-active': {
        if (!node.value?.from && !node.value?.to) {
          return <EmptyNode node={node} />;
        }

        return (
          <ValueNode node={node} onClearDateFromClick={onClearDateFromClick} onClearDateToClick={onClearDateToClick} />
        );
      }

      case 'active': {
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
  const nodeRef = useRef<HTMLDivElement>(null);
  const canBeActivated = useMemo(() => canActivateNode(node), [node, canActivateNode]);
  const {
    context: { goToNextOnboardingStep, onboardingSteps },
  } = useOnboarding();

  const activateNode = useCallback(() => {
    if (canBeActivated) {
      nodeRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setActiveNode(node);
      goToNextOnboardingStep(onboardingSteps.DATA_SET_PANEL.step_name);
    }
  }, [canBeActivated, node, setActiveNode, goToNextOnboardingStep, onboardingSteps.DATA_SET_PANEL.step_name]);

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
    <div id={node.id} ref={nodeRef} onClick={activateNode}>
      <Node node={node} onClearDateFromClick={clearDateFrom} onClearDateToClick={clearDateTo} />
    </div>
  );
};
