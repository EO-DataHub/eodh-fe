import { IDynamicTreeCategory } from '../tree-dynamic.model';
import { auxiliarySchema } from './auxiliary.schema';
import { copernicusActionCreatorSchema, copernicusSearchSchema } from './copernicus.schema';

export const publicSearchSchema: IDynamicTreeCategory = {
  translationKey: 'MAP.SEARCH_VIEW.DATA_SETS.PUBLIC',
  type: 'category',
  options: {
    expendable: true,
    disabled: false,
  },
  controls: {
    expand: {
      name: 'public.expanded',
      type: 'expand',
      value: true,
    },
  },
  children: [copernicusSearchSchema],
};

export const publicActionCreatorSchema: IDynamicTreeCategory = {
  translationKey: 'MAP.SEARCH_VIEW.DATA_SETS.PUBLIC',
  type: 'category',
  options: {
    expendable: true,
    disabled: false,
  },
  controls: {
    expand: {
      name: 'public.expanded',
      type: 'expand',
      value: true,
    },
  },
  children: [copernicusActionCreatorSchema, auxiliarySchema],
};
