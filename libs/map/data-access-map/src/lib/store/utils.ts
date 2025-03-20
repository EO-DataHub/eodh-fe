import { TDateTimeString } from '@ukri/shared/utils/date';
import { nanoid } from 'nanoid';

import { createShape } from '../geometry/geometry';
import { TCoordinate } from '../geometry/shape.model';
import { clearWorkflowCache } from '../mutation/workflow.mutation';
import { defaultNodes, TFunctionNode, TNode } from './action-creator/action-creator.model';
import { useActionCreatorStore } from './action-creator/action-creator.store';
import { createNode, isFunctionNode } from './action-creator/node.utils';
import { useAoiStore } from './aoi/aoi.store';
import { TDataSetValue } from './data-sets/data-sets.model';
import { useDataSetsStore } from './data-sets/data-sets.store';
import { useDateStore } from './date/date.store';

export const activatePanel = (node?: TNode) => {
  const activeTab = useActionCreatorStore.getState().activeTab;
  if (activeTab !== 'workflow') {
    useAoiStore.getState().changeState('readonly');
    useDataSetsStore.getState().changeState('readonly');
    useDateStore.getState().changeState('readonly');
    return;
  }

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
  useDataSetsStore.getState().updateDataSets(undefined, 'search');
  useDataSetsStore.getState().updateDataSets(undefined, 'action-creator');
  useDataSetsStore.getState().enable();
  useDateStore.getState().reset('action-creator');
};

type TFunction = {
  identifier: string;
  order: number;
  inputs: {
    stacCollection?: {
      options: {
        label: string;
        value: string;
      }[];
    };
  };
};

export type TLoadPresetProps = {
  dataSet: TDataSetValue | string | undefined;
  functions: TFunction[];
  aoi?: TCoordinate;
  dateRange?: {
    from: TDateTimeString;
    to: TDateTimeString;
  };
};

export const loadPreset = ({ dataSet, functions, dateRange, aoi }: TLoadPresetProps) => {
  const nodes = defaultNodes
    .filter((node) => !isFunctionNode(node))
    .map((node) => {
      switch (node.type) {
        case 'area': {
          return { ...node, state: aoi ? 'not-active' : 'initial' };
        }

        case 'dateRange': {
          return { ...node, state: dateRange ? 'not-active' : 'initial' };
        }

        case 'dataSet': {
          return { ...node, state: 'not-active' };
        }

        default: {
          return undefined;
        }
      }
    })
    .filter((item) => !!item);
  const functionNodes: TFunctionNode[] = functions.map(({ identifier, order, inputs }) => ({
    ...createNode(nanoid(), 'function', nodes.length + order + 1),
    state: 'not-active',
    value: {
      identifier,
      supportedDataSets: inputs.stacCollection?.options.map((item) => item.value) || [],
    },
  }));
  const shape = createShape(aoi, aoi?.type);
  const availableDatasets = functionNodes.map((node) => node.value?.supportedDataSets || []).flat();
  const isAreaNodeActive = nodes.find((node) => node?.type === 'area' && node?.state === 'active');
  const isDataSetsNodeActive = nodes.find((node) => node?.type === 'dataSet' && node?.state === 'active');
  const isDateNodeActive = nodes.find((node) => node?.type === 'dateRange' && node?.state === 'active');
  const areaState = isAreaNodeActive ? 'edit' : 'readonly';
  const dataSetState = isDataSetsNodeActive ? 'edit' : 'readonly';
  const dateState = isDateNodeActive ? 'edit' : 'readonly';

  clearWorkflowCache();
  useDataSetsStore.getState().setDataSet(dataSet);
  useDataSetsStore.getState().enable(availableDatasets.length ? availableDatasets : undefined);
  useActionCreatorStore.getState().setNodes([...nodes, ...functionNodes] as TNode[]);

  if (shape) {
    shape.shape = shape?.shape?.clone().transform('EPSG:4326', 'EPSG:3857');
    useAoiStore.getState().setShape(shape, true);
  } else {
    useAoiStore.getState().setShape(undefined);
  }

  if (dateRange) {
    useDateStore.getState().updateDate(dateRange);
  } else {
    useDateStore.getState().reset('action-creator');
  }

  useAoiStore.getState().changeState(areaState);
  useDataSetsStore.getState().changeState(dataSetState);
  useDateStore.getState().changeState(dateState);
};

export const enableDataSet = (dataSet?: (TDataSetValue | string)[] | undefined) => {
  useDataSetsStore.getState().enable(dataSet);
};
