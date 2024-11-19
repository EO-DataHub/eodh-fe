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
      translationKey: 'MAP.SEARCH_VIEW.DATA_SETS.DATA_SETS_CONFIGURATION.COPERNICUS.SENTINEL_2.SETTINGS.L1C',
      type: 'settingItem',
      controls: {
        value: {
          name: 'public.copernicus.sentinel2.l1c',
          type: 'checkbox',
          value: true,
        },
      },
    },
    {
      translationKey: 'MAP.SEARCH_VIEW.DATA_SETS.DATA_SETS_CONFIGURATION.COPERNICUS.SENTINEL_2.SETTINGS.L2A',
      type: 'settingItem',
      controls: {
        value: {
          name: 'public.copernicus.sentinel2.l2a',
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
      value: true,
    },
    value: {
      name: 'public.copernicus.sentinel2.enabled',
      type: 'checkbox',
    },
  },
  children: [
    {
      translationKey: 'MAP.SEARCH_VIEW.DATA_SETS.DATA_SETS_CONFIGURATION.COPERNICUS.SENTINEL_2.SETTINGS.L1C',
      type: 'settingItem',
      controls: {
        value: {
          name: 'public.copernicus.sentinel2.l1c',
          type: 'checkbox',
          value: false,
        },
      },
    },
    {
      translationKey: 'MAP.SEARCH_VIEW.DATA_SETS.DATA_SETS_CONFIGURATION.COPERNICUS.SENTINEL_2.SETTINGS.L2A',
      type: 'settingItem',
      controls: {
        value: {
          name: 'public.copernicus.sentinel2.l2a',
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

export const sentinel3Schema: IDynamicTreeItem = {
  translationKey: 'MAP.SEARCH_VIEW.DATA_SETS.DATA_SETS_CONFIGURATION.COPERNICUS.SENTINEL_3.NAME',
  type: 'item',
  controls: {
    settings: {
      name: 'public.copernicus.sentinel3.expanded',
      type: 'button',
    },
    value: {
      name: 'public.copernicus.sentinel3.enabled',
      type: 'checkbox',
    },
  },
  options: {
    disabled: true,
  },
  children: [
    {
      translationKey: 'MAP.SEARCH_VIEW.DATA_SETS.DATA_SETS_CONFIGURATION.COPERNICUS.SENTINEL_3.SETTINGS.SLSTR',
      type: 'settingItem',
      controls: {
        value: {
          name: 'public.copernicus.sentinel3.slstr',
          type: 'checkbox',
          value: true,
        },
      },
    },
    {
      translationKey:
        'MAP.SEARCH_VIEW.DATA_SETS.DATA_SETS_CONFIGURATION.COPERNICUS.SENTINEL_2.SETTINGS.MAX_CLOUD_COVERAGE',
      type: 'slider',
      name: 'public.copernicus.sentinel3.cloudCoverage',
      value: 100,
    },
    {
      translationKey: 'MAP.SEARCH_VIEW.DATA_SETS.DATA_SETS_CONFIGURATION.COPERNICUS.SENTINEL_3.SETTINGS.OLCI',
      type: 'settingItem',
      controls: {
        value: {
          name: 'public.copernicus.sentinel3.olci',
          type: 'checkbox',
          value: true,
        },
      },
    },
  ],
};

export const sentinel5pSchema: IDynamicTreeItem = {
  translationKey: 'MAP.SEARCH_VIEW.DATA_SETS.DATA_SETS_CONFIGURATION.COPERNICUS.SENTINEL_5P.NAME',
  type: 'item',
  controls: {
    settings: {
      name: 'public.copernicus.sentinel5P.expanded',
      type: 'button',
    },
    value: {
      name: 'public.copernicus.sentinel5P.enabled',
      type: 'checkbox',
    },
  },
  options: {
    disabled: true,
  },
  children: [
    {
      translationKey: 'MAP.SEARCH_VIEW.DATA_SETS.DATA_SETS_CONFIGURATION.COPERNICUS.SENTINEL_5P.SETTINGS.AER_AI',
      type: 'settingItem',
      controls: {
        value: {
          name: 'public.copernicus.sentinel5P.aer_ai',
          type: 'checkbox',
          value: true,
        },
      },
    },
    {
      translationKey: 'MAP.SEARCH_VIEW.DATA_SETS.DATA_SETS_CONFIGURATION.COPERNICUS.SENTINEL_5P.SETTINGS.CH4',
      type: 'settingItem',
      controls: {
        value: {
          name: 'public.copernicus.sentinel5P.ch4',
          type: 'checkbox',
          value: true,
        },
      },
    },
    {
      translationKey: 'MAP.SEARCH_VIEW.DATA_SETS.DATA_SETS_CONFIGURATION.COPERNICUS.SENTINEL_5P.SETTINGS.CLOUD',
      type: 'settingItem',
      controls: {
        value: {
          name: 'public.copernicus.sentinel5P.cloud',
          type: 'checkbox',
          value: true,
        },
      },
    },
    {
      translationKey: 'MAP.SEARCH_VIEW.DATA_SETS.DATA_SETS_CONFIGURATION.COPERNICUS.SENTINEL_5P.SETTINGS.CO',
      type: 'settingItem',
      controls: {
        value: {
          name: 'public.copernicus.sentinel5P.co',
          type: 'checkbox',
          value: true,
        },
      },
    },
    {
      translationKey: 'MAP.SEARCH_VIEW.DATA_SETS.DATA_SETS_CONFIGURATION.COPERNICUS.SENTINEL_5P.SETTINGS.HCHO',
      type: 'settingItem',
      controls: {
        value: {
          name: 'public.copernicus.sentinel5P.hcho',
          type: 'checkbox',
          value: true,
        },
      },
    },
    {
      translationKey: 'MAP.SEARCH_VIEW.DATA_SETS.DATA_SETS_CONFIGURATION.COPERNICUS.SENTINEL_5P.SETTINGS.NO2',
      type: 'settingItem',
      controls: {
        value: {
          name: 'public.copernicus.sentinel5P.no2',
          type: 'checkbox',
          value: true,
        },
      },
    },
    {
      translationKey: 'MAP.SEARCH_VIEW.DATA_SETS.DATA_SETS_CONFIGURATION.COPERNICUS.SENTINEL_5P.SETTINGS.O3',
      type: 'settingItem',
      controls: {
        value: {
          name: 'public.copernicus.sentinel5P.o3',
          type: 'checkbox',
          value: true,
        },
      },
    },
    {
      translationKey: 'MAP.SEARCH_VIEW.DATA_SETS.DATA_SETS_CONFIGURATION.COPERNICUS.SENTINEL_5P.SETTINGS.SO2',
      type: 'settingItem',
      controls: {
        value: {
          name: 'public.copernicus.sentinel5P.so2',
          type: 'checkbox',
          value: true,
        },
      },
    },
  ],
};
