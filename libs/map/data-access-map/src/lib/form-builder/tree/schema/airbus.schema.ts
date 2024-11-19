import { IDynamicTreeCategory } from '../tree-dynamic.model';

export const aibusSchema: IDynamicTreeCategory = {
  translationKey: 'MAP.SEARCH_VIEW.DATA_SETS.DATA_SETS_CONFIGURATION.AIR_BUS.NAME',
  type: 'category',
  controls: {
    expand: {
      name: 'private.planet.enabled',
      type: 'expand',
      value: true,
    },
  },
  options: {
    expendable: false,
    disabled: true,
  },
};
