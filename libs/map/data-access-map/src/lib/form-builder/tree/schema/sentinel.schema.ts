import { IDynamicTreeItem } from '../tree-dynamic.model';

const sentinel1Options: IDynamicTreeItem['children'] = [
  {
    translationKey: 'MAP.SEARCH_VIEW.DATA_SETS.DATA_SETS_CONFIGURATION.COPERNICUS.SENTINEL_1.SETTINGS.ACQUISITION_MODE',
    type: 'settingGroup',
    children: [
      {
        type: 'settingItem',
        translationKey: 'MAP.SEARCH_VIEW.DATA_SETS.DATA_SETS_CONFIGURATION.COPERNICUS.SENTINEL_1.SETTINGS.EW',
        controls: {
          value: {
            name: 'public.copernicus.sentinel1.acquisitionMode.ew',
            type: 'checkbox',
            value: true,
          },
        },
        children: [
          {
            type: 'settingGroup',
            translationKey:
              'MAP.SEARCH_VIEW.DATA_SETS.DATA_SETS_CONFIGURATION.COPERNICUS.SENTINEL_1.SETTINGS.POLARIZATION',
            children: [
              {
                type: 'settingItem',
                translationKey: 'MAP.SEARCH_VIEW.DATA_SETS.DATA_SETS_CONFIGURATION.COPERNICUS.SENTINEL_1.SETTINGS.HH',
                controls: {
                  value: {
                    name: 'public.copernicus.sentinel1.acquisitionMode.hh',
                    type: 'checkbox',
                    value: true,
                  },
                },
              },
              {
                type: 'settingItem',
                translationKey:
                  'MAP.SEARCH_VIEW.DATA_SETS.DATA_SETS_CONFIGURATION.COPERNICUS.SENTINEL_1.SETTINGS.HH_HV',
                controls: {
                  value: {
                    name: 'public.copernicus.sentinel1.acquisitionMode.hh_hv',
                    type: 'checkbox',
                    value: true,
                  },
                },
              },
            ],
          },
        ],
      },
      {
        type: 'settingItem',
        translationKey: 'MAP.SEARCH_VIEW.DATA_SETS.DATA_SETS_CONFIGURATION.COPERNICUS.SENTINEL_1.SETTINGS.IW',
        controls: {
          value: {
            name: 'public.copernicus.sentinel1.acquisitionMode.iw',
            type: 'checkbox',
            value: true,
          },
        },
        children: [
          {
            type: 'settingGroup',
            translationKey:
              'MAP.SEARCH_VIEW.DATA_SETS.DATA_SETS_CONFIGURATION.COPERNICUS.SENTINEL_1.SETTINGS.POLARIZATION',
            children: [
              {
                type: 'settingItem',
                translationKey: 'MAP.SEARCH_VIEW.DATA_SETS.DATA_SETS_CONFIGURATION.COPERNICUS.SENTINEL_1.SETTINGS.VV',
                controls: {
                  value: {
                    name: 'public.copernicus.sentinel1.acquisitionMode.vv',
                    type: 'checkbox',
                    value: true,
                  },
                },
              },
              {
                type: 'settingItem',
                translationKey:
                  'MAP.SEARCH_VIEW.DATA_SETS.DATA_SETS_CONFIGURATION.COPERNICUS.SENTINEL_1.SETTINGS.VV_VH',
                controls: {
                  value: {
                    name: 'public.copernicus.sentinel1.acquisitionMode.vv_vh',
                    type: 'checkbox',
                    value: true,
                  },
                },
              },
            ],
          },
        ],
      },
    ],
  },
  {
    translationKey: 'MAP.SEARCH_VIEW.DATA_SETS.DATA_SETS_CONFIGURATION.COPERNICUS.SENTINEL_1.SETTINGS.ORBIT_DIRECTION',
    type: 'settingGroup',
    children: [
      {
        type: 'settingItem',
        translationKey: 'MAP.SEARCH_VIEW.DATA_SETS.DATA_SETS_CONFIGURATION.COPERNICUS.SENTINEL_1.SETTINGS.ASCENDING',
        controls: {
          value: {
            name: 'public.copernicus.sentinel1.orbitDirection.ascending',
            type: 'checkbox',
            value: true,
          },
        },
      },
      {
        type: 'settingItem',
        translationKey: 'MAP.SEARCH_VIEW.DATA_SETS.DATA_SETS_CONFIGURATION.COPERNICUS.SENTINEL_1.SETTINGS.DESCENDING',
        controls: {
          value: {
            name: 'public.copernicus.sentinel1.orbitDirection.descending',
            type: 'checkbox',
            value: true,
          },
        },
      },
    ],
  },
];

export const sentinel1Schema: IDynamicTreeItem = {
  translationKey: 'MAP.SEARCH_VIEW.DATA_SETS.DATA_SETS_CONFIGURATION.COPERNICUS.SENTINEL_1.NAME',
  type: 'item',
  controls: {
    settings: {
      name: 'public.copernicus.sentinel1.expanded',
      type: 'button',
    },
    value: {
      name: 'public.copernicus.sentinel1.enabled',
      type: 'checkbox',
    },
  },
  children: sentinel1Options,
};

export const sentinel2SearchSchema: IDynamicTreeItem = {
  translationKey: 'MAP.SEARCH_VIEW.DATA_SETS.DATA_SETS_CONFIGURATION.COPERNICUS.SENTINEL_2.NAME',
  type: 'item',
  controls: {
    settings: {
      name: 'public.copernicus.sentinel2.expanded',
      type: 'button',
    },
    value: {
      name: 'public.copernicus.sentinel2.enabled',
      type: 'checkbox',
    },
  },
  children: [
    {
      translationKey: 'MAP.SEARCH_VIEW.DATA_SETS.DATA_SETS_CONFIGURATION.COPERNICUS.SENTINEL_2.SETTINGS.L2A_ARD',
      type: 'settingItem',
      controls: {
        value: {
          name: 'public.copernicus.sentinel2.l2aARD',
          type: 'checkbox',
          value: true,
        },
      },
    },
    {
      translationKey:
        'MAP.SEARCH_VIEW.DATA_SETS.DATA_SETS_CONFIGURATION.COPERNICUS.SENTINEL_2.SETTINGS.MAX_CLOUD_COVERAGE',
      type: 'slider',
      name: 'public.copernicus.sentinel2.cloudCoverage',
      value: 100,
    },
  ],
};

export const sentinel2ActionCreatorSchema: IDynamicTreeItem = {
  translationKey: 'MAP.SEARCH_VIEW.DATA_SETS.DATA_SETS_CONFIGURATION.COPERNICUS.SENTINEL_2.NAME',
  type: 'item',
  controls: {
    settings: {
      name: 'public.copernicus.sentinel2.expanded',
      type: 'button',
    },
    value: {
      name: 'public.copernicus.sentinel2.enabled',
      type: 'checkbox',
    },
  },
  children: [
    {
      translationKey: 'MAP.SEARCH_VIEW.DATA_SETS.DATA_SETS_CONFIGURATION.COPERNICUS.SENTINEL_2.SETTINGS.L2A_ARD',
      type: 'settingItem',
      controls: {
        value: {
          name: 'public.copernicus.sentinel2.l2aARD',
          type: 'checkbox',
          value: true,
        },
      },
    },
    {
      translationKey:
        'MAP.SEARCH_VIEW.DATA_SETS.DATA_SETS_CONFIGURATION.COPERNICUS.SENTINEL_2.SETTINGS.MAX_CLOUD_COVERAGE',
      type: 'slider',
      name: 'public.copernicus.sentinel2.cloudCoverage',
      value: 100,
    },
  ],
};
