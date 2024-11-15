import { IDynamicTreeCategory } from '../tree-dynamic.model';

export const privateSchema: IDynamicTreeCategory = {
  translationKey: 'MAP.SEARCH_VIEW.DATA_SETS.PRIVATE',
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
  children: [
    {
      translationKey: 'MAP.SEARCH_VIEW.DATA_SETS.PLANET.NAME',
      type: 'category',
      controls: {
        expand: {
          name: 'private.planet.enabled',
          type: 'expand',
          value: true,
        },
        value: {
          name: 'private.planet.enabled',
          type: 'checkbox',
          value: false,
        },
      },
      options: {
        disabled: true,
      },
      children: [
        {
          translationKey: 'MAP.SEARCH_VIEW.DATA_SETS.PLANET.PLANET_SCOPE.NAME',
          type: 'item',
          controls: {
            value: {
              name: 'private.planet.planetScope',
              type: 'checkbox',
            },
          },
          options: {
            disabled: true,
          },
        },
        {
          translationKey: 'MAP.SEARCH_VIEW.DATA_SETS.PLANET.SKY_SAT.NAME',
          type: 'item',
          controls: {
            value: {
              name: 'private.planet.skySat',
              type: 'checkbox',
            },
          },
          options: {
            disabled: true,
          },
        },
        {
          translationKey: 'MAP.SEARCH_VIEW.DATA_SETS.PLANET.RAPID_EYE.NAME',
          type: 'item',
          controls: {
            value: {
              name: 'private.planet.rapidEye',
              type: 'checkbox',
            },
          },
          options: {
            disabled: true,
          },
        },
      ],
    },
    {
      translationKey: 'MAP.SEARCH_VIEW.DATA_SETS.AIR_BUS.NAME',
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
    },
  ],
};
