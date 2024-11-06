import { Tree as TreeWrapper } from '@ukri/shared/design-system';
import { OnboardingTooltip, useOnboarding } from '@ukri/shared/ui/ac-workflow-onboarding';

import { TreeElement } from './elements/tree-element.component';
import { TreeProvider, useTreeContext } from './tree.context';
import { TDynamicTreeModel } from './tree.model';
import { dynamicTree } from './tree-model';

const Tree = () => {
  const { tree } = useTreeContext();

  return tree.items.map((item) => <TreeElement key={item.name} item={item} />);
};

type TTreeProps = {
  tree: TDynamicTreeModel;
};

export const DynamicTree = ({ tree }: TTreeProps) => {
  const {
    context: { goToNextOnboardingStep, onboardingSteps },
  } = useOnboarding();

  return (
    <TreeProvider defaultValues={dynamicTree}>
      <TreeWrapper>
        <OnboardingTooltip
          tipLocation='left'
          stepName={onboardingSteps.DATA_SET_PANEL.step_name}
          content={onboardingSteps.DATA_SET_PANEL.tooltip_text}
          onClick={goToNextOnboardingStep}
          className='top-[20%] left-[470px] !fixed'
        >
          <Tree />
        </OnboardingTooltip>
      </TreeWrapper>
    </TreeProvider>
  );
};
