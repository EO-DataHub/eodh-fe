import { TDataSetsNode, useActionCreator, useDataSets } from '@ukri/map/data-access-map';
import { OnboardingTooltip, useOnboarding } from '@ukri/shared/ui/ac-workflow-onboarding';
import { useCallback, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { ActiveNode } from '../active-node.component';
import { EmptyNode } from '../empty-node.component';
import { ValueNode } from './value-node.component';

type TDataSet = 'sentinel1' | 'sentinel2' | 'sentinel3' | 'sentinel5p';

const useActiveDataSet = () => {
  const { dataSets, updateDataSets } = useDataSets();

  const enabled: TDataSet[] = [];

  if (dataSets?.copernicus.sentinel1?.enabled) {
    enabled.push('sentinel1');
  }

  if (dataSets?.copernicus.sentinel2?.enabled) {
    enabled.push('sentinel2');
  }

  if (dataSets?.copernicus.sentinel3?.enabled) {
    enabled.push('sentinel3');
  }

  if (dataSets?.copernicus.sentinel5P?.enabled) {
    enabled.push('sentinel5p');
  }

  return {
    dataSet: enabled.length !== 1 ? undefined : enabled[0],
    updateDataSets,
  };
};

type TDataSetNodeProps = { node: TDataSetsNode };

export const DataSetNode = ({ node }: TDataSetNodeProps) => {
  const {
    context: { goToNextOnboardingStep, onboardingSteps },
  } = useOnboarding();
  const { t } = useTranslation();
  const { setActive, setValue, canActivate } = useActionCreator();
  const { dataSet, updateDataSets } = useActiveDataSet();
  const enabled = useMemo(() => canActivate(node), [node, canActivate]);

  const activateNode = useCallback(() => {
    setActive(node);
  }, [node, setActive]);

  const clear = useCallback(() => {
    updateDataSets(undefined);
  }, [updateDataSets]);

  useEffect(() => {
    if (node.selected) {
      setValue(node, dataSet);
    }
  }, [node.selected, dataSet, setValue, node]);

  if (!node.tooltip) {
    return (
      <div onClick={activateNode}>
        <EmptyNode node={node} enabled={enabled} />
        <ActiveNode node={node} enabled={enabled} text={t('MAP.ACTION_CREATOR_PANEL.NODE.DATA_SET.INSTRUCTIONS')} />
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
        <ActiveNode node={node} enabled={enabled} text={t('MAP.ACTION_CREATOR_PANEL.NODE.DATA_SET.INSTRUCTIONS')} />
        <ValueNode node={node} enabled={enabled} onClearButtonClick={clear} />
      </div>
    </OnboardingTooltip>
  );
};
