import { getCoordinates, TAreaNode, useActionCreator, useAoi } from '@ukri/map/data-access-map';
import { OnboardingTooltip, useOnboarding } from '@ukri/shared/ui/ac-workflow-onboarding';
import { useCallback, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { ActiveNode } from '../active-node.component';
import { EmptyNode } from '../empty-node.component';
import { ValueNode } from './value-node.component';

type TAreaNodeNodeProps = { node: TAreaNode };

export const AreaNode = ({ node }: TAreaNodeNodeProps) => {
  const {
    context: { goToNextOnboardingStep, onboardingSteps },
  } = useOnboarding();
  const { t } = useTranslation();
  const { setActive, setValue, canActivate } = useActionCreator();
  const { shape, setShape } = useAoi();
  const enabled = useMemo(() => canActivate(node), [node, canActivate]);

  const activateNode = useCallback(() => {
    if (enabled) {
      setActive(node);
    }
  }, [enabled, node, setActive]);

  const clear = useCallback(() => {
    setShape(undefined);
  }, [setShape]);

  useEffect(() => {
    if (node.selected) {
      setValue(node, getCoordinates(shape));
    }
  }, [node.selected, shape, setValue, node]);

  if (!node.tooltip) {
    return (
      <div onClick={activateNode}>
        <EmptyNode node={node} enabled={enabled} />
        <ActiveNode node={node} enabled={enabled} text={t('MAP.ACTION_CREATOR_PANEL.NODE.AREA.INSTRUCTIONS')} />
        <ValueNode node={node} enabled={enabled} onClearButtonClick={clear} />
      </div>
    );
  }

  return (
    <OnboardingTooltip
      tipLocation='right'
      stepName={onboardingSteps.AREA_NODE.step_name}
      content={onboardingSteps.AREA_NODE.tooltip_text}
      onClick={goToNextOnboardingStep}
      className='top-0 left-[-110px]'
    >
      <div onClick={activateNode}>
        <EmptyNode node={node} enabled={enabled} />
        <ActiveNode node={node} enabled={enabled} text={t('MAP.ACTION_CREATOR_PANEL.NODE.AREA.INSTRUCTIONS')} />
        <ValueNode node={node} enabled={enabled} onClearButtonClick={clear} />
      </div>
    </OnboardingTooltip>
  );
};
