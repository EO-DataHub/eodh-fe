import { TFields } from '../query.model';

export const getWorkflowDefaultFields = (): TFields => {
  return {
    include: ['properties.lulc_classes_percentage', 'properties.lulc_classes_m2'],
  };
};
