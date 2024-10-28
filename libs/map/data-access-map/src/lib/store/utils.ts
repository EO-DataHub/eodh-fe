import { defaultNodes, TNode } from './action-creator/action-creator.model';
import { useActionCreatorStore } from './action-creator/action-creator.store';
import { useAoiStore } from './aoi/aoi.store';
import { TDataSetValue } from './data-sets/data-sets.model';
import { useDataSetsStore } from './data-sets/data-sets.store';
import { useDateStore } from './date/date.store';

export const activatePanel = (node?: TNode) => {
  switch (node?.type) {
    case 'area': {
      useAoiStore.getState().changeState('edit');
      useDataSetsStore.getState().changeState('readonly');
      useDateStore.getState().changeState('readonly');
      return;
    }

    case 'dataSet': {
      useAoiStore.getState().changeState('readonly');
      useDataSetsStore.getState().changeState('edit');
      useDateStore.getState().changeState('readonly');
      return;
    }

    case 'dateRange': {
      useAoiStore.getState().changeState('readonly');
      useDataSetsStore.getState().changeState('readonly');
      useDateStore.getState().changeState('edit');
      return;
    }

    case 'function': {
      useAoiStore.getState().changeState('readonly');
      useDataSetsStore.getState().changeState('readonly');
      useDateStore.getState().changeState('readonly');
      return;
    }

    default: {
      useAoiStore.getState().changeState('readonly');
      useDataSetsStore.getState().changeState('readonly');
      useDateStore.getState().changeState('readonly');
    }
  }
};

export const reset = () => {
  useAoiStore.getState().setShape(undefined);
  useDataSetsStore.getState().updateDataSets(undefined);
  useDateStore.getState().reset();
};

export type TLoadPresetProps = {
  dataSet: TDataSetValue | string | undefined;
  functionName: string;
};

export const loadPreset = ({ dataSet, functionName }: TLoadPresetProps) => {
  const nodes: TNode[] = defaultNodes.map((node) => {
    switch (node.type) {
      case 'area':
      case 'dateRange': {
        return { ...node, state: 'initial' };
      }

      case 'dataSet': {
        return { ...node, state: 'not-active' };
      }

      case 'function': {
        return { ...node, state: 'not-active', value: functionName };
      }
    }
  });

  useAoiStore.getState().setShape(undefined);
  useDataSetsStore.getState().enableDataSet(dataSet);
  useDateStore.getState().reset();
  useActionCreatorStore.getState().setNodes(nodes);
};
