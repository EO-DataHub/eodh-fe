import { IDynamicTreeCategory } from '../tree-dynamic.model';
import { planetActionCreatorSchema, planetSearchSchema } from './planet.schema';

export const privateSearchSchema: IDynamicTreeCategory = {
  translationKey: 'MAP.SEARCH_VIEW.DATA_SETS.DATA_SETS_CONFIGURATION.COMMERCIAL',
  type: 'category',
  options: {
    expendable: true,
    disabled: false,
  },
  controls: {
    expand: {
      name: 'private.expanded',
      type: 'expand',
      value: true,
    },
  },
  children: [planetSearchSchema],
};

export const privateActionCreatorSchema: IDynamicTreeCategory = {
  translationKey: 'MAP.SEARCH_VIEW.DATA_SETS.DATA_SETS_CONFIGURATION.COMMERCIAL',
  type: 'category',
  options: {
    expendable: true,
    disabled: true,
  },
  controls: {
    expand: {
      name: 'private.expanded',
      type: 'expand',
      value: true,
    },
  },
  children: [planetActionCreatorSchema],
};
