import { TDateRangeNode, useActionCreator, useDate } from '@ukri/map/data-access-map';
import { OnboardingTooltip, useOnboarding } from '@ukri/shared/ui/ac-workflow-onboarding';
import { useCallback, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { ActiveNode } from '../active-node.component';
import { EmptyNode } from '../empty-node.component';
import { ValueNode } from './value-node.component';

interface IDateRangeNodeProps {
  node: TDateRangeNode;
}

export const NodeDateRange = ({ node }: IDateRangeNodeProps) => {
  const {
    context: { goToNextOnboardingStep, onboardingSteps },
  } = useOnboarding();
  const { t } = useTranslation();
  const { setActive, setValue, canActivate } = useActionCreator();
  const { date, updateDate } = useDate();
  const enabled = useMemo(() => canActivate(node), [node, canActivate]);

  const activateNode = useCallback(() => {
    setActive(node);
  }, [node, setActive]);

  const clear = useCallback(() => {
    updateDate(undefined);
  }, [updateDate]);

  useEffect(() => {
    if (node.selected) {
      setValue(node, date);
    }
  }, [node.selected, setValue, node, date]);

  if (!node.tooltip) {
    return (
      <div onClick={activateNode}>
        <EmptyNode node={node} enabled={enabled} />
        <ActiveNode node={node} enabled={enabled} text={t('MAP.ACTION_CREATOR_PANEL.NODE.DATE_RANGE.INSTRUCTIONS')} />
        <ValueNode node={node} enabled={enabled} onClearButtonClick={clear} />
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
        <ActiveNode node={node} enabled={enabled} text={t('MAP.ACTION_CREATOR_PANEL.NODE.DATE_RANGE.INSTRUCTIONS')} />
        <ValueNode node={node} enabled={enabled} onClearButtonClick={clear} />
      </div>
    </OnboardingTooltip>
  );
};
