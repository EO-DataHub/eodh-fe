import { IDynamicTreeCategory } from '../tree-dynamic.model';

export const auxiliarySchema: IDynamicTreeCategory = {
  translationKey: 'MAP.SEARCH_VIEW.DATA_SETS.DATA_SETS_CONFIGURATION.AUXILIARY.NAME',
  type: 'category',
  controls: {
    expand: {
      name: 'public.auxiliary.expanded',
      type: 'expand',
      value: true,
    },
  },
  children: [
    {
      translationKey: 'MAP.SEARCH_VIEW.DATA_SETS.DATA_SETS_CONFIGURATION.AUXILIARY.GLOBAL_LAND_COVER',
      type: 'item',
      controls: {
        value: {
          name: 'public.auxiliary.esacciGloballc.enabled',
          type: 'checkbox',
        },
      },
    },
    {
      translationKey: 'MAP.SEARCH_VIEW.DATA_SETS.DATA_SETS_CONFIGURATION.AUXILIARY.CORINE_LAND_COVER',
      type: 'item',
      controls: {
        value: {
          name: 'public.auxiliary.clmsCorinelc.enabled',
          type: 'checkbox',
        },
      },
    },
    {
      translationKey: 'MAP.SEARCH_VIEW.DATA_SETS.DATA_SETS_CONFIGURATION.AUXILIARY.WATER_BODIES',
      type: 'item',
      controls: {
        value: {
          name: 'public.auxiliary.clmsWaterBodies.enabled',
          type: 'checkbox',
        },
      },
    },
  ],
};
