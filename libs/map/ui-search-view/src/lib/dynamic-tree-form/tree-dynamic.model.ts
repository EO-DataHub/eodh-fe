import { TDynamicTreeModel } from './tree.model';

export const dynamicTreeForm: TDynamicTreeModel = [
  {
    translationKey: 'MAP.SEARCH_VIEW.DATA_SETS.PUBLIC',
    type: 'category',
    options: {
      expendable: true,
      disabled: false,
    },
    controls: [
      {
        name: 'public.expand',
        type: 'expand',
        value: true,
      },
    ],
    children: [
      {
        translationKey: 'MAP.SEARCH_VIEW.DATA_SETS.COPERNICUS.NAME',
        type: 'category',
        controls: [
          {
            name: 'public.copernicus.expand',
            type: 'expand',
            value: true,
          },
          {
            name: 'public.copernicus.enable',
            type: 'checkbox',
            value: false,
          },
        ],
        children: [
          {
            translationKey: 'MAP.SEARCH_VIEW.DATA_SETS.COPERNICUS.SENTINEL_1.NAME',
            type: 'item',
            controls: [
              {
                name: 'public.copernicus.sentinel1.enable',
                type: 'button',
                value: true,
              },
              {
                name: 'public.copernicus.sentinel1.expand',
                type: 'checkbox',
              },
            ],
            children: [
              {
                translationKey: 'MAP.SEARCH_VIEW.DATA_SETS.COPERNICUS.SENTINEL_1.SETTINGS.ACQUISITION_MODE',
                type: 'settingGroup',
                children: [
                  {
                    type: 'settingItem',
                    translationKey: 'MAP.SEARCH_VIEW.DATA_SETS.COPERNICUS.SENTINEL_1.SETTINGS.EW',
                    controls: [
                      {
                        name: 'public.copernicus.sentinel1.acquisitionMode.ew',
                        type: 'checkbox',
                        value: true,
                      },
                    ],
                    children: [
                      {
                        type: 'settingGroup',
                        translationKey: 'MAP.SEARCH_VIEW.DATA_SETS.COPERNICUS.SENTINEL_1.SETTINGS.POLARIZATION',
                        children: [
                          {
                            type: 'settingItem',
                            translationKey: 'MAP.SEARCH_VIEW.DATA_SETS.COPERNICUS.SENTINEL_1.SETTINGS.HH',
                            controls: [
                              {
                                name: 'public.copernicus.sentinel1.acquisitionMode.hh',
                                type: 'checkbox',
                                value: true,
                              },
                            ],
                          },
                          {
                            type: 'settingItem',
                            translationKey: 'MAP.SEARCH_VIEW.DATA_SETS.COPERNICUS.SENTINEL_1.SETTINGS.HH_HV',
                            controls: [
                              {
                                name: 'public.copernicus.sentinel1.acquisitionMode.hh_hv',
                                type: 'checkbox',
                                value: true,
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                  {
                    type: 'settingItem',
                    translationKey: 'MAP.SEARCH_VIEW.DATA_SETS.COPERNICUS.SENTINEL_1.SETTINGS.IW',
                    controls: [
                      {
                        name: 'public.copernicus.sentinel1.acquisitionMode.iw',
                        type: 'checkbox',
                        value: true,
                      },
                    ],
                    children: [
                      {
                        type: 'settingGroup',
                        translationKey: 'MAP.SEARCH_VIEW.DATA_SETS.COPERNICUS.SENTINEL_1.SETTINGS.POLARIZATION',
                        children: [
                          {
                            type: 'settingItem',
                            translationKey: 'VV',
                            controls: [
                              {
                                name: 'MAP.SEARCH_VIEW.DATA_SETS.COPERNICUS.SENTINEL_1.SETTINGS.VV',
                                type: 'checkbox',
                                value: true,
                              },
                            ],
                          },
                          {
                            type: 'settingItem',
                            translationKey: 'VV+VH',
                            controls: [
                              {
                                name: 'MAP.SEARCH_VIEW.DATA_SETS.COPERNICUS.SENTINEL_1.SETTINGS.VV_VH',
                                type: 'checkbox',
                                value: true,
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
              {
                translationKey: 'MAP.SEARCH_VIEW.DATA_SETS.COPERNICUS.SENTINEL_1.SETTINGS.ORBIT_DIRECTION',
                type: 'settingGroup',
                children: [
                  {
                    type: 'settingItem',
                    translationKey: 'MAP.SEARCH_VIEW.DATA_SETS.COPERNICUS.SENTINEL_1.SETTINGS.ASCENDING',
                    controls: [
                      {
                        name: 'public.copernicus.sentinel1.orbitDirection.ascending',
                        type: 'checkbox',
                        value: true,
                      },
                    ],
                  },
                  {
                    type: 'settingItem',
                    translationKey: 'MAP.SEARCH_VIEW.DATA_SETS.COPERNICUS.SENTINEL_1.SETTINGS.DESCENDING',
                    controls: [
                      {
                        name: 'public.copernicus.sentinel1.orbitDirection.descending',
                        type: 'checkbox',
                        value: true,
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            translationKey: 'MAP.SEARCH_VIEW.DATA_SETS.COPERNICUS.SENTINEL_2.NAME',
            type: 'item',
            controls: [
              {
                name: 'public.copernicus.sentinel2.enable',
                type: 'button',
                value: true,
              },
              {
                name: 'public.copernicus.sentinel2.expand',
                type: 'checkbox',
              },
            ],
            children: [
              {
                translationKey: 'MAP.SEARCH_VIEW.DATA_SETS.COPERNICUS.SENTINEL_2.SETTINGS.L1C',
                type: 'settingItem',
                controls: [
                  {
                    name: 'public.copernicus.sentinel2.l1c',
                    type: 'checkbox',
                    value: true,
                  },
                ],
              },
              {
                translationKey: 'MAP.SEARCH_VIEW.DATA_SETS.COPERNICUS.SENTINEL_2.SETTINGS.L2A',
                type: 'settingItem',
                controls: [
                  {
                    name: 'public.copernicus.sentinel2.l2a',
                    type: 'checkbox',
                    value: true,
                  },
                ],
              },
              {
                translationKey: 'MAP.SEARCH_VIEW.DATA_SETS.COPERNICUS.SENTINEL_2.SETTINGS.MAX_CLOUD_COVERAGE',
                type: 'slider',
                name: 'public.copernicus.sentinel2.cloudCoverage',
                value: 100,
              },
            ],
          },
        ],
      },
    ],
  },
];
