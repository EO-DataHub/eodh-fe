import { nanoid } from 'nanoid';

import { defaultNodes, TNode } from './action-creator/action-creator.model';
import { useActionCreatorStore } from './action-creator/action-creator.store';
import { createNode, isFunctionNode } from './action-creator/node.utils';
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
  functions: {
    identifier: string;
    order: number;
  }[];
};

export const loadPreset = ({ dataSet, functions }: TLoadPresetProps) => {
  const nodes = defaultNodes
    .filter((node) => !isFunctionNode(node))
    .map((node) => {
      switch (node.type) {
        case 'area':
        case 'dateRange': {
          return { ...node, state: 'initial' };
        }

        case 'dataSet': {
          return { ...node, state: 'not-active' };
        }
      }
    });
  const functionNodes = functions.map(({ identifier, order }) => ({
    ...createNode(nanoid(), 'function', nodes.length + order),
    state: 'not-active',
    value: identifier,
  }));

  useAoiStore.getState().setShape(undefined);
  useDataSetsStore.getState().enableDataSet(dataSet);
  useDateStore.getState().reset();
  useActionCreatorStore.getState().setNodes([...nodes, ...functionNodes] as TNode[]);
};
