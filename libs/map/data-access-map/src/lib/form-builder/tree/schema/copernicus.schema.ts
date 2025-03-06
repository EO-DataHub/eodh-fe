import { IDynamicTreeCategory } from '../tree-dynamic.model';
import { sentinel1Schema, sentinel2ActionCreatorSchema, sentinel2SearchSchema } from './sentinel.schema';

export const copernicusSearchSchema: IDynamicTreeCategory = {
  translationKey: 'MAP.SEARCH_VIEW.DATA_SETS.DATA_SETS_CONFIGURATION.COPERNICUS.NAME',
  type: 'category',
  controls: {
    expand: {
      name: 'public.copernicus.expanded',
      type: 'expand',
      value: true,
    },
    value: {
      name: 'public.copernicus.enabled',
      type: 'checkbox',
      value: false,
    },
  },
  children: [sentinel1Schema, sentinel2SearchSchema],
};

export const copernicusActionCreatorSchema: IDynamicTreeCategory = {
  translationKey: 'MAP.SEARCH_VIEW.DATA_SETS.DATA_SETS_CONFIGURATION.COPERNICUS.NAME',
  type: 'category',
  controls: {
    expand: {
      name: 'public.copernicus.expanded',
      type: 'expand',
      value: true,
    },
    value: {
      name: 'public.copernicus.enabled',
      type: 'checkbox',
      value: false,
    },
  },
  children: [sentinel1Schema, sentinel2ActionCreatorSchema],
};
