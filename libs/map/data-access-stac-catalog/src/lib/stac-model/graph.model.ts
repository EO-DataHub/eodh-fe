import z from 'zod';

import { TCollection } from './collection.schema';
import { TSearchCollection, TWorkflowCollection } from './collection.schema';
import { landCoverChangesSchema, waterQualitySchema } from './workflow.schema';

export type TStackBar = z.infer<typeof landCoverChangesSchema>;
export type TRangeAreaWithLine = z.infer<typeof waterQualitySchema>;

export const isWorkflowCollection = (
  collection?: Omit<TCollection, 'links' | 'type'>
): collection is TWorkflowCollection => collection?.collectionType === 'workflow';

export const isStackBarSchema = <
  T extends Omit<TSearchCollection, 'links' | 'type'> | Omit<TWorkflowCollection, 'links' | 'type'>
>(schema?: {
  features: T['features'];
  collectionType: T['collectionType'];
}): schema is { features: TStackBar[]; collectionType: T['collectionType'] } => {
  if (isWorkflowCollection(schema)) {
    return schema.features.every(
      (feature) => feature.assets.data && !!feature.assets.data['classification:classes']?.length
    );
  }

  return false;
};

export const isRangeAreaWithLineSchema = <
  T extends Omit<TSearchCollection, 'links' | 'type'> | Omit<TWorkflowCollection, 'links' | 'type'>
>(schema?: {
  features: T['features'];
  collectionType: T['collectionType'];
}): schema is { features: TRangeAreaWithLine[]; collectionType: T['collectionType'] } => {
  if (isWorkflowCollection(schema)) {
    return schema.features.every((feature) =>
      Object.entries(feature.assets)
        .filter(([key]) => key !== 'thumbnail')
        .every(([, asset]) => !!asset.statistics)
    );
  }

  return false;
};
