import { IDynamicTreeCategory } from '../tree-dynamic.model';
import { sentinel1Schema, sentinel2Schema, sentinel3Schema, sentinel5pSchema } from './sentinel.schema';

export const copernicusSearchSchema: IDynamicTreeCategory = {
  translationKey: 'MAP.SEARCH_VIEW.DATA_SETS.COPERNICUS.NAME',
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
  children: [sentinel1Schema, sentinel2Schema, sentinel3Schema, sentinel5pSchema],
};

export const copernicusActionCreatorSchema: IDynamicTreeCategory = {
  translationKey: 'MAP.SEARCH_VIEW.DATA_SETS.COPERNICUS.NAME',
  type: 'category',
  controls: {
    expand: {
      name: 'public.copernicus.expanded',
      type: 'expand',
      value: true,
    },
  },
  children: [sentinel1Schema, sentinel2Schema, sentinel3Schema, sentinel5pSchema],
};
