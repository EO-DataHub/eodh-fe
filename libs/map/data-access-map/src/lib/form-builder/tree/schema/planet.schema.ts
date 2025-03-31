import { IDynamicTreeItem } from '../tree-dynamic.model';

export const planetSearchSchema: IDynamicTreeItem = {
  translationKey: 'MAP.SEARCH_VIEW.DATA_SETS.DATA_SETS_CONFIGURATION.PLANET.NAME',
  type: 'item',
  controls: {
    settings: {
      name: 'private.planet.expanded',
      type: 'button',
      value: false,
    },
    value: {
      name: 'private.planet.enabled',
      type: 'checkbox',
      value: false,
    },
  },
  children: [
    {
      translationKey: 'MAP.SEARCH_VIEW.DATA_SETS.DATA_SETS_CONFIGURATION.PLANET.SETTINGS.PLANET_SCOPE.NAME',
      type: 'settingItem',
      controls: {
        value: {
          name: 'private.planet.planetScope.enabled',
          type: 'checkbox',
          value: true,
        },
      },
    },
    {
      translationKey: 'MAP.SEARCH_VIEW.DATA_SETS.DATA_SETS_CONFIGURATION.PLANET.SETTINGS.SKY_SAT.NAME',
      type: 'settingItem',
      controls: {
        value: {
          name: 'private.planet.skySat.enabled',
          type: 'checkbox',
          value: true,
        },
      },
    },
    {
      translationKey: 'MAP.SEARCH_VIEW.DATA_SETS.DATA_SETS_CONFIGURATION.PLANET.SETTINGS.RAPID_EYE.NAME',
      type: 'settingItem',
      controls: {
        value: {
          name: 'private.planet.rapidEye.enabled',
          type: 'checkbox',
          value: true,
        },
      },
    },
    {
      translationKey: 'MAP.SEARCH_VIEW.DATA_SETS.DATA_SETS_CONFIGURATION.PLANET.SETTINGS.MAX_CLOUD_COVERAGE',
      type: 'slider',
      name: 'private.planet.cloudCoverage',
      value: 100,
    },
  ],
};

export const planetActionCreatorSchema: IDynamicTreeItem = {
  ...planetSearchSchema,
  options: {
    disabled: true,
  },
};
