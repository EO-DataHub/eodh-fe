import { getCoordinates, TAreaNode, useActionCreator, useAoi } from '@ukri/map/data-access-map';
import { OnboardingTooltip, useOnboarding } from '@ukri/shared/ui/ac-workflow-onboarding';
import { useCallback, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { ActiveNode } from '../active-node.component';
import { EmptyNode } from '../empty-node.component';
import { ValueNode } from './value-node.component';

type TNodeProps = {
  node: TAreaNode;
  onClearButtonClick: () => void;
};

const Node = ({ node, onClearButtonClick }: TNodeProps) => {
  const { t } = useTranslation();

  return useMemo(() => {
    switch (node.state) {
      case 'initial': {
        return <EmptyNode node={node} />;
      }

      case 'active':
      case 'not-active': {
        if (!node.value) {
          return <ActiveNode node={node} text={t('MAP.ACTION_CREATOR_PANEL.WORKFLOW.NODE.AREA.INSTRUCTIONS')} />;
        }

        return <ValueNode node={node} onClearButtonClick={onClearButtonClick} />;
      }
    }
  }, [node, onClearButtonClick, t]);
};

type TAreaNodeNodeProps = { node: TAreaNode };

export const AreaNode = ({ node }: TAreaNodeNodeProps) => {
  const {
    context: { goToNextOnboardingStep, onboardingSteps },
  } = useOnboarding();
  const { setActiveNode, setValue, canActivateNode } = useActionCreator();
  const { shape, setShape } = useAoi();
  const canBeActivated = useMemo(() => canActivateNode(node), [node, canActivateNode]);

  const activateNode = useCallback(() => {
    if (canBeActivated) {
      setActiveNode(node);
    }
  }, [canBeActivated, node, setActiveNode]);

  const clear = useCallback(() => {
    setShape(undefined);
  }, [setShape]);

  useEffect(() => {
    if (node.state !== 'initial') {
      setValue(node, getCoordinates(shape));
    }
  }, [node.state, shape, setValue, node]);

  if (!node.tooltip) {
    return (
      <div onClick={activateNode}>
        <Node node={node} onClearButtonClick={clear} />
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
        <Node node={node} onClearButtonClick={clear} />
      </div>
    </OnboardingTooltip>
  );
};
