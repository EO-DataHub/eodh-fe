import { IDynamicSlider, IDynamicTreeCategory, IDynamicTreeItem } from '../tree-dynamic.model';

const planetScopeSchema: IDynamicTreeItem = {
  translationKey: 'MAP.SEARCH_VIEW.DATA_SETS.DATA_SETS_CONFIGURATION.PLANET.PLANET_SCOPE.NAME',
  type: 'item',
  controls: {
    value: {
      name: 'private.planet.planetScope.enabled',
      type: 'checkbox',
    },
  },
};

const skySatSchema: IDynamicTreeItem = {
  translationKey: 'MAP.SEARCH_VIEW.DATA_SETS.DATA_SETS_CONFIGURATION.PLANET.SKY_SAT.NAME',
  type: 'item',
  controls: {
    value: {
      name: 'private.planet.skySat.enabled',
      type: 'checkbox',
    },
  },
};

const cloudCoverage: IDynamicSlider = {
  translationKey: 'MAP.SEARCH_VIEW.DATA_SETS.DATA_SETS_CONFIGURATION.PLANET.MAX_CLOUD_COVERAGE',
  type: 'slider',
  name: 'private.planet.cloudCoverage',
  value: 100,
  options: {
    disabled: true,
  },
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
  children: [planetScopeSchema, skySatSchema, cloudCoverage],
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
  children: [planetScopeSchema, skySatSchema, cloudCoverage],
};
