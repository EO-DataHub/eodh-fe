import { TNode } from './action-creator/action-creator.model';
import { useAoiStore } from './aoi/aoi.store';
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
