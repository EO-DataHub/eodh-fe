import { TDynamicTreeModel, TreeBuilder } from '@ukri/map/data-access-map';
import { Tree as TreeWrapper } from '@ukri/shared/design-system';
import { OnboardingTooltip, useOnboarding } from '@ukri/shared/ui/ac-workflow-onboarding';
import { useMemo } from 'react';

import { useSearchView } from '../search-view.context';
import { TreeElement } from './elements/tree-element.component';

type TTreeProps = {
  tree: TDynamicTreeModel;
};

export const DynamicTreeForm = ({ tree }: TTreeProps) => {
  const { isDisabled } = useSearchView();
  const disabled = isDisabled(false, 'data-sets');
  const {
    context: { goToNextOnboardingStep, onboardingSteps },
  } = useOnboarding();

  const treeBuilder = useMemo(() => new TreeBuilder(tree), [tree]);

  return (
    <TreeWrapper>
      <OnboardingTooltip
        tipLocation='left'
        stepName={onboardingSteps.DATA_SET_PANEL.step_name}
        content={onboardingSteps.DATA_SET_PANEL.tooltip_text}
        onClick={goToNextOnboardingStep}
        className='top-[20%] left-[470px] !fixed'
      >
        {treeBuilder.items.map((item) => (
          <TreeElement key={item.id} item={item} disabled={disabled} />
        ))}
      </OnboardingTooltip>
    </TreeWrapper>
  );
};
