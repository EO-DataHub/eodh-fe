import { TDynamicTreeModel, TreeBuilder } from '@ukri/map/data-access-map';
import { useComparisonToolState } from '@ukri/map/feature-comparison-tool';
import { Tree as TreeWrapper } from '@ukri/shared/design-system';
import { OnboardingTooltip, useOnboarding } from '@ukri/shared/ui/ac-workflow-onboarding';
import { useMemo, useRef } from 'react';

import { useSearchView } from '../search-view.context';
import { TreeElement } from './elements/tree-element.component';

type TTreeProps = {
  tree: TDynamicTreeModel;
};

export const DynamicTreeForm = ({ tree }: TTreeProps) => {
  const { isDisabled } = useSearchView();
  const disabled = isDisabled(false, 'data-sets');
  const {
    context: { onboardingSteps },
  } = useOnboarding();
  const { comparisonMode } = useComparisonToolState();
  const treeRef = useRef<HTMLDivElement>(null);

  const treeBuilder = useMemo(() => new TreeBuilder(tree), [tree]);

  return (
    <TreeWrapper>
      <OnboardingTooltip
        tipLocation='left'
        stepName={onboardingSteps.DATA_SET_PANEL.step_name}
        content={onboardingSteps.DATA_SET_PANEL.tooltip_content}
        elementRef={treeRef}
      >
        <div ref={treeRef}>
          {treeBuilder.items.map((item) => (
            <TreeElement key={item.id} item={item} disabled={comparisonMode || disabled} />
          ))}
        </div>
      </OnboardingTooltip>
    </TreeWrapper>
  );
};
