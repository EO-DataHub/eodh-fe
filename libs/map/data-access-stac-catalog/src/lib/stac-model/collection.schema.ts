import { InfiniteData } from '@tanstack/react-query';
import z from 'zod';

import { linkSchema } from './link.schema';
import { featureSearchSchema } from './search.schema';
import { featureWorkflowSchema } from './workflow.schema';

export const workflowCollectionSchema = z.object({
  type: z.literal('FeatureCollection'),
  features: z.array(featureWorkflowSchema),
  links: z.array(linkSchema),
  collectionType: z.literal('workflow'),
});

export const searchCollectionSchema = z.object({
  type: z.literal('FeatureCollection'),
  features: z.array(featureSearchSchema),
  links: z.array(linkSchema),
  collectionType: z.literal('search'),
});

export const collectionSchema = z.union([workflowCollectionSchema, searchCollectionSchema]);

export type TCollection = z.infer<typeof collectionSchema>;
export type TSearchCollection = z.infer<typeof searchCollectionSchema>;
export type TWorkflowCollection = z.infer<typeof workflowCollectionSchema>;
export type TFeature = TSearchCollection['features'][number];
export type TAsset = TFeature['assets'][keyof TFeature['assets']];
export type TAssetName = keyof TFeature['assets'];

const isSearchCollection = (data?: InfiniteData<TCollection>): data is InfiniteData<TSearchCollection> =>
  !!data?.pages.every((page) => page.collectionType === 'search');
const isWorkflowCollection = (data?: InfiniteData<TCollection>): data is InfiniteData<TWorkflowCollection> =>
  !!data?.pages.every((page) => page.collectionType === 'workflow');

export const getAllPages = <T extends TSearchCollection | TWorkflowCollection>(
  data?: InfiniteData<T>
): T | undefined => {
  if (isSearchCollection(data)) {
    return {
      type: 'FeatureCollection',
      collectionType: 'search',
      features: data.pages.map((item) => item.features).flat(),
      links: data.pages.map((item) => item.links).flat(),
    } as T;
  } else if (isWorkflowCollection(data)) {
    return {
      type: 'FeatureCollection',
      collectionType: 'workflow',
      features: data.pages.map((item) => item.features).flat(),
      links: data.pages.map((item) => item.links).flat(),
    } as T;
  }

  return undefined;
};
