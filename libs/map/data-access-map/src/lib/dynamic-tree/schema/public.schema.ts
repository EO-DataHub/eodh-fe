import { IDynamicTreeCategory } from '../tree-dynamic.model';
import { auxiliarySchema } from './auxiliary.schema';
import { copernicusSchema } from './copernicus.schema';

export const publicSchema: IDynamicTreeCategory = {
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
  children: [copernicusSchema, auxiliarySchema],
};
