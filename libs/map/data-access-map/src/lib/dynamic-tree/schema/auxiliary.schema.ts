import { IDynamicTreeCategory } from '../tree-dynamic.model';

export const auxiliarySchema: IDynamicTreeCategory = {
  translationKey: 'MAP.SEARCH_VIEW.DATA_SETS.AUXILIARY.NAME',
  type: 'category',
  controls: {
    expand: {
      name: 'public.auxiliary.expanded',
      type: 'expand',
      value: true,
    },
    value: {
      name: 'public.auxiliary.enabled',
      type: 'checkbox',
      value: false,
    },
  },
  children: [
    {
      translationKey: 'MAP.SEARCH_VIEW.DATA_SETS.AUXILIARY.GLOBAL_LAND_COVER',
      type: 'item',
      controls: {
        value: {
          name: 'public.auxiliary.esacciGloballc.enabled',
          type: 'checkbox',
        },
      },
    },
    {
      translationKey: 'MAP.SEARCH_VIEW.DATA_SETS.AUXILIARY.CORINE_LAND_COVER',
      type: 'item',
      controls: {
        value: {
          name: 'public.auxiliary.clmsCorinelc.enabled',
          type: 'checkbox',
        },
      },
    },
    {
      translationKey: 'MAP.SEARCH_VIEW.DATA_SETS.AUXILIARY.WATER_BODIES',
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
