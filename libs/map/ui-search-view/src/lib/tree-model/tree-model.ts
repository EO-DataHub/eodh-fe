import { TDynamicTreeModel } from './tree.model';

export const dynamicTree: TDynamicTreeModel = [
  {
    name: 'public',
    translationKey: 'MAP.SEARCH_VIEW.DATA_SETS.PUBLIC',
    type: 'category',
    control: {
      expendable: true,
      expanded: true,
      disabled: false,
    },
    children: [
      {
        name: 'copernicus',
        translationKey: 'Copernicus',
        type: 'category',
        control: {
          expanded: true,
          expendable: true,
          type: 'checkbox',
          valueMode: 'children',
          triggerMode: 'children',
          reValidateMode: 'children',
        },
        // controls: [
        //   {
        //     type: 'checkbox',
        //     onClick: [],
        //     triggerMode: 'childrenChange',
        //     reValidateMode: 'onChange',
        //   }
        // ],
        children: [
          {
            name: 'sentinel-1',
            translationKey: 'Sentinel-1',
            type: 'item',
            control: 'checkbox',
            children: [
              {
                translationKey: 'Acquisition mode:',
                name: 'acquisitionMode',
                type: 'settingGroup',
                children: [
                  {
                    name: 'ew',
                    type: 'settingItem',
                    translationKey: 'EW - Extra-Wide Swath 40m x 40m',
                    control: {
                      type: 'checkbox',
                      valueMode: 'children',
                      triggerMode: 'children',
                      reValidateMode: 'children',
                    },
                    children: [
                      {
                        type: 'settingGroup',
                        translationKey: 'Polarization',
                        children: [
                          {
                            name: 'hh',
                            type: 'settingItem',
                            translationKey: 'HH',
                            control: 'checkbox',
                          },
                          {
                            name: 'hh_hv',
                            type: 'settingItem',
                            translationKey: 'HH+HV',
                            control: 'checkbox',
                          },
                        ],
                      },
                    ],
                  },
                  {
                    name: 'iw',
                    type: 'settingItem',
                    translationKey: 'IW - Interferometric Wide Swath 10m x 10m',
                    control: {
                      type: 'checkbox',
                      valueMode: 'children',
                      triggerMode: 'children',
                      reValidateMode: 'children',
                    },
                    children: [
                      {
                        type: 'settingGroup',
                        translationKey: 'Polarization',
                        children: [
                          {
                            name: 'vv',
                            type: 'settingItem',
                            translationKey: 'VV',
                            control: 'checkbox',
                          },
                          {
                            name: 'vv_vh',
                            type: 'settingItem',
                            translationKey: 'VV+VH',
                            control: 'checkbox',
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
              {
                translationKey: 'Orbit direction:',
                name: 'orbitDirection',
                type: 'settingGroup',
                control: {
                  visible: false,
                  type: 'checkbox',
                  valueMode: 'children',
                  triggerMode: 'children',
                  reValidateMode: 'children',
                  // errorMessagePosition: 'below',
                },
                children: [
                  {
                    name: 'ascending',
                    type: 'settingItem',
                    translationKey: 'Ascending',
                    control: 'checkbox',
                  },
                  {
                    name: 'descending',
                    type: 'settingItem',
                    translationKey: 'Descending',
                    control: 'checkbox',
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];
