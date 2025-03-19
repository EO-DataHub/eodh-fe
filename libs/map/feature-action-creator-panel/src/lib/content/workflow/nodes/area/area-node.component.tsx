import { getCoordinates, TAreaNode, useActionCreator, useAoi } from '@ukri/map/data-access-map';
import { OnboardingTooltip, useOnboarding } from '@ukri/shared/ui/ac-workflow-onboarding';
import { useSettings } from '@ukri/shared/utils/settings';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import { ActiveNode } from '../active-node.component';
import { EmptyNode } from '../empty-node.component';
import { formatUnit, ValueNode } from './value-node.component';

type TNodeProps = {
  node: TAreaNode;
  onClearButtonClick: () => void;
};

const Node = ({ node, onClearButtonClick }: TNodeProps) => {
  const { t } = useTranslation();
  const { aoiLimit, measurementUnit, numberFormatting } = useSettings();

  return useMemo(() => {
    switch (node.state) {
      case 'initial': {
        return <EmptyNode node={node} />;
      }

      case 'not-active': {
        if (!node.value) {
          return <EmptyNode node={node} />;
        }

        return <ValueNode node={node} onClearButtonClick={onClearButtonClick} />;
      }

      case 'active': {
        if (!node.value) {
          return (
            <ActiveNode
              node={node}
              text={t('MAP.ACTION_CREATOR_PANEL.WORKFLOW.NODE.AREA.INSTRUCTIONS', {
                maxSize: formatUnit(aoiLimit, measurementUnit, t, numberFormatting),
              })}
            />
          );
        }

        return <ValueNode node={node} onClearButtonClick={onClearButtonClick} />;
      }
    }
  }, [node, onClearButtonClick, t, aoiLimit, measurementUnit, numberFormatting]);
};

type TAreaNodeNodeProps = { node: TAreaNode };

export const AreaNode = ({ node }: TAreaNodeNodeProps) => {
  const {
    context: { goToNextOnboardingStep, onboardingSteps, currentStep, showOnboardingTooltip, hideOnboardingTooltip },
  } = useOnboarding();
  const { setActiveNode, setValue, canActivateNode, isWorkflowStarted } = useActionCreator();
  const { shape, setShape } = useAoi();
  const nodeRef = useRef<HTMLDivElement>(null);
  const canBeActivated = useMemo(() => canActivateNode(node), [node, canActivateNode]);

  useEffect(() => {
    if (currentStep === onboardingSteps.AREA_NODE.step_name) {
      if (isWorkflowStarted) {
        hideOnboardingTooltip();
      } else {
        showOnboardingTooltip();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (node.value) {
      goToNextOnboardingStep(onboardingSteps.DRAWING_TOOLS.step_name);
    }
  }, [node.value, onboardingSteps.DRAWING_TOOLS.step_name, goToNextOnboardingStep]);

  const handleGoToNextOnboardingStep = useCallback(() => {
    goToNextOnboardingStep(onboardingSteps.AREA_NODE.step_name);
  }, [goToNextOnboardingStep, onboardingSteps.AREA_NODE.step_name]);

  const activateNode = useCallback(() => {
    if (canBeActivated) {
      nodeRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setActiveNode(node);
    }
  }, [canBeActivated, node, setActiveNode]);

  const clear = useCallback(() => {
    setShape(undefined);
  }, [setShape]);

  useEffect(() => {
    if (node.state !== 'initial') {
      const coordinates = getCoordinates(shape);
      if (!coordinates || coordinates?.type !== 'line') {
        setValue(node, coordinates);
      }
    }
  }, [node.state, shape, setValue, node]);

  if (!node.tooltip) {
    return (
      <div ref={nodeRef} onClick={activateNode}>
        <Node node={node} onClearButtonClick={clear} />
      </div>
    );
  }

  return (
    <OnboardingTooltip
      tipLocation='right'
      stepName={onboardingSteps.AREA_NODE.step_name}
      content={onboardingSteps.AREA_NODE.tooltip_content}
      additionalContent={onboardingSteps.AREA_NODE.additional_content}
      onClick={handleGoToNextOnboardingStep}
      elementRef={nodeRef}
    >
      <div id={node.id} ref={nodeRef} onClick={activateNode}>
        <Node node={node} onClearButtonClick={clear} />
      </div>
    </OnboardingTooltip>
  );
};
