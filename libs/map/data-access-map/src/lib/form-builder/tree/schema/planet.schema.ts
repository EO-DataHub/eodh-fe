import { IDynamicTreeCategory, IDynamicTreeItem } from '../tree-dynamic.model';

const planetScopeSchema: IDynamicTreeItem = {
  translationKey: 'MAP.SEARCH_VIEW.DATA_SETS.DATA_SETS_CONFIGURATION.PLANET.PLANET_SCOPE.NAME',
  type: 'item',
  controls: {
    settings: {
      name: 'private.planet.planetScope.expanded',
      type: 'button',
    },
    value: {
      name: 'private.planet.planetScope.enabled',
      type: 'checkbox',
    },
  },
  children: [
    {
      translationKey:
        'MAP.SEARCH_VIEW.DATA_SETS.DATA_SETS_CONFIGURATION.COPERNICUS.SENTINEL_2.SETTINGS.MAX_CLOUD_COVERAGE',
      type: 'slider',
      name: 'private.planet.planetScope.cloudCoverage',
      value: 100,
    },
  ],
};

const skySatSchema: IDynamicTreeItem = {
  translationKey: 'MAP.SEARCH_VIEW.DATA_SETS.DATA_SETS_CONFIGURATION.PLANET.SKY_SAT.NAME',
  type: 'item',
  controls: {
    settings: {
      name: 'private.planet.skySat.expanded',
      type: 'button',
    },
    value: {
      name: 'private.planet.skySat.enabled',
      type: 'checkbox',
    },
  },
  children: [
    {
      translationKey:
        'MAP.SEARCH_VIEW.DATA_SETS.DATA_SETS_CONFIGURATION.COPERNICUS.SENTINEL_2.SETTINGS.MAX_CLOUD_COVERAGE',
      type: 'slider',
      name: 'private.planet.skySat.cloudCoverage',
      value: 100,
    },
  ],
};

const rapidEyeSchema: IDynamicTreeItem = {
  translationKey: 'MAP.SEARCH_VIEW.DATA_SETS.DATA_SETS_CONFIGURATION.PLANET.RAPID_EYE.NAME',
  type: 'item',
  controls: {
    settings: {
      name: 'private.planet.rapidEye.expanded',
      type: 'button',
    },
    value: {
      name: 'private.planet.rapidEye.enabled',
      type: 'checkbox',
    },
  },
  children: [
    {
      translationKey:
        'MAP.SEARCH_VIEW.DATA_SETS.DATA_SETS_CONFIGURATION.COPERNICUS.SENTINEL_2.SETTINGS.MAX_CLOUD_COVERAGE',
      type: 'slider',
      name: 'private.planet.rapidEye.cloudCoverage',
      value: 100,
    },
  ],
};

export const planetSearchSchema: IDynamicTreeCategory = {
  translationKey: 'MAP.SEARCH_VIEW.DATA_SETS.DATA_SETS_CONFIGURATION.PLANET.NAME',
  type: 'category',
  controls: {
    expand: {
      name: 'private.planet.expanded',
      type: 'expand',
      value: true,
    },
    value: {
      name: 'private.planet.enabled',
      type: 'checkbox',
      value: false,
    },
  },
  children: [planetScopeSchema, skySatSchema, rapidEyeSchema],
};

export const planetActionCreatorSchema: IDynamicTreeCategory = {
  translationKey: 'MAP.SEARCH_VIEW.DATA_SETS.DATA_SETS_CONFIGURATION.PLANET.NAME',
  type: 'category',
  controls: {
    expand: {
      name: 'private.planet.expanded',
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
  children: [planetScopeSchema, skySatSchema, rapidEyeSchema],
};
