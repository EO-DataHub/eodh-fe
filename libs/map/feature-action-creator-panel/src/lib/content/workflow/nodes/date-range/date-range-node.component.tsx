import { TDateRangeNode, useActionCreator, useDate } from '@ukri/map/data-access-map';
import { OnboardingTooltip, useOnboarding } from '@ukri/shared/ui/ac-workflow-onboarding';
import { useCallback, useEffect, useMemo } from 'react';

import { EmptyNode } from '../empty-node.component';
import { ActiveNode } from './active-node.component';
import { ValueNode } from './value-node.component';

interface IDateRangeNodeProps {
  node: TDateRangeNode;
}

export const NodeDateRange = ({ node }: IDateRangeNodeProps) => {
  const {
    context: { goToNextOnboardingStep, onboardingSteps },
  } = useOnboarding();
  const { setActive, setValue, canActivate } = useActionCreator();
  const { date, updateDate } = useDate();
  const enabled = useMemo(() => canActivate(node), [node, canActivate]);

  const activateNode = useCallback(() => {
    setActive(node);
  }, [node, setActive]);

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

  if (!node.tooltip) {
    return (
      <div onClick={activateNode}>
        <EmptyNode node={node} enabled={enabled} />
        <ActiveNode node={node} enabled={enabled} />
        <ValueNode
          node={node}
          enabled={enabled}
          onClearDateFromClick={clearDateFrom}
          onClearDateToClick={clearDateTo}
        />
      </div>
    );
  }

  return (
    <OnboardingTooltip
      tipLocation='right'
      stepName={onboardingSteps.DATA_SET_NODE.step_name}
      content={onboardingSteps.DATA_SET_NODE.tooltip_text}
      onClick={goToNextOnboardingStep}
      className='top-0 left-[-110px]'
    >
      <div onClick={activateNode}>
        <EmptyNode node={node} enabled={enabled} />
        <ActiveNode node={node} enabled={enabled} />
        <ValueNode
          node={node}
          enabled={enabled}
          onClearDateFromClick={clearDateFrom}
          onClearDateToClick={clearDateTo}
        />
      </div>
    </OnboardingTooltip>
  );
};
