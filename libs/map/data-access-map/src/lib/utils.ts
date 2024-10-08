import { TNode } from './action-creator-store/action-creator.model';
import { useAoiStore } from './aoi-store/aoi.store';
import { useDataSetsStore } from './data-sets-store/data-sets.store';
import { useDateStore } from './date-store/date.store';

export const activatePanel = (node: TNode) => {
  switch (node.type) {
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
  }
};
