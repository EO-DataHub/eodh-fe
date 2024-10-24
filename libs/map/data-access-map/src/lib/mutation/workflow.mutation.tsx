import { useMutation } from '@tanstack/react-query';
import { TDateString } from '@ukri/shared/utils/date';
import { getHttpClient } from '@ukri/shared/utils/react-query';

import { paths } from '../api';
import { TCoordinate } from '../store/aoi/aoi.model';
import { createGeometry } from '../store/aoi/geometry';
import { getIntersects, TGeometry } from './get-intersects';
import { TWorkflowCreated, workflowCreatedSchema } from './workflow.model';

type TWorkflowCreateParams = {
  aoi: TCoordinate;
  dataSet: string;
  date: {
    from: NonNullable<TDateString>;
    to: NonNullable<TDateString>;
  };
  function: string;
};

type TCreateWorkflow = {
  preset_function: {
    function_identifier: string;
    inputs: {
      aoi: TGeometry | undefined;
      date_start: string;
      date_end: string;
      stac_collection: string;
    };
  };
};

const createParams = (params: TWorkflowCreateParams): TCreateWorkflow => {
  return {
    preset_function: {
      function_identifier: params.function,
      inputs: {
        aoi: getIntersects(createGeometry(params.aoi)),
        date_start: params.date.from.toString(),
        date_end: params.date.to.toString(),
        stac_collection: params.dataSet,
      },
    },
  };
};

const createWorkflow = async (params: TWorkflowCreateParams): Promise<TWorkflowCreated> => {
  const response = await getHttpClient().post(paths.WORKFLOW, createParams(params));

  return workflowCreatedSchema.parse(response);
};

export const useCreateWorkflow = () => {
  return useMutation({
    mutationFn: createWorkflow,
  });
};
