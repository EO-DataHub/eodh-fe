import type { Meta } from '@storybook/react';
import { TFeature } from '@ukri/map/data-access-stac-catalog';

import { ResultsList } from './results-list.component';

const imageUrlStoredInPublicAssetsInStorybookHost = '/assets/images/imageSample2.png';

// todo: consider moving this mock to separate file
const singleElementMock: Omit<TFeature, 'id'> = {
  type: 'Feature',
  properties: {
    datetime: '2024-09-03T16:23:22.625Z',
    'eo:cloud_cover': 39.5,
    'grid:code': '33TTG',
  },
  assets: {
    thumbnail: {
      type: '',
      roles: [],
      href: imageUrlStoredInPublicAssetsInStorybookHost,
    },
  },
  bbox: [0, 0, 0, 0],
  geometry: {
    type: 'Polygon',
    coordinates: [],
  },
  links: [],
  collection: 'Sentinel-1',
  stac_version: '1.0.0',
};



"assets": {
                "cdom": {
                    "title": "Colored Dissolved Organic Matter (CDOM)",
                    "href": "https://eopro-spyro-test.workspaces.test.eodhp.eco-ke-staging.com/files/workspaces-eodhp-test/processing-results/cat_5ffb0b06-d25c-11ef-8e29-5eefae7e0a18/col_5ffb0b06-d25c-11ef-8e29-5eefae7e0a18/neodc.sentinel_ard.data.sentinel_2.2023.11.20.S2A_20231120_latn510lonw0022_T30UWB_ORB037_20231120132420_utm30n_osgb_cdom.tif",
                    "type": "image/tiff; application=geotiff; profile=cloud-optimized",
                    "roles": [
                        "data"
                    ],
                    "proj:shape": [
                        332,
                        538
                    ],
                    "size": 241692,
                    "raster:bands": [
                        {
                            "nodata": null,
                            "unit": "ug / L"
                        }
                    ],
                    "statistics": {
                        "minimum": 0.0709,
                        "maximum": 2.982835483401301,
                        "mean": 1.7084835452645923,
                        "median": 1.6311222219332921,
                        "q01": 1.15413999972919,
                        "q99": 2.582978840996882,
                        "stddev": 0.355638019494419,
                        "valid_percent": 0.8740314417521386
                    },
                    "proj:transform": [
                        0.00012055852166620698,
                        0.0,
                        -2.6527776186772343,
                        0.0,
                        -0.00012055852166622246,
                        51.35460363372064,
                        0.0,
                        0.0,
                        1.0
                    ],
                    "colormap": {
                        "name": "jet",
                        "reversed": false,
                        "min": 0.03,
                        "max": 5.3,
                        "steps": 20,
                        "units": "ug / L",
                        "mpl_equivalent_cmap": "jet"
                    },
                    "proj:epsg": 4326
                },
                "thumbnail": {
                    "title": "Thumbnail",
                    "href": "https://eopro-spyro-test.workspaces.test.eodhp.eco-ke-staging.com/files/workspaces-eodhp-test/processing-results/cat_5ffb0b06-d25c-11ef-8e29-5eefae7e0a18/col_5ffb0b06-d25c-11ef-8e29-5eefae7e0a18/neodc.sentinel_ard.data.sentinel_2.2023.11.20.S2A_20231120_latn510lonw0022_T30UWB_ORB037_20231120132420_utm30n_osgb.png",
                    "type": "image/png",
                    "roles": [
                        "thumbnail"
                    ],
                    "size": 1942
                },
                "doc": {
                    "title": "Dissolved Organic Carbon (DOC)",
                    "href": "https://eopro-spyro-test.workspaces.test.eodhp.eco-ke-staging.com/files/workspaces-eodhp-test/processing-results/cat_5ffb0b06-d25c-11ef-8e29-5eefae7e0a18/col_5ffb0b06-d25c-11ef-8e29-5eefae7e0a18/neodc.sentinel_ard.data.sentinel_2.2023.11.20.S2A_20231120_latn510lonw0022_T30UWB_ORB037_20231120132420_utm30n_osgb_doc.tif",
                    "type": "image/tiff; application=geotiff; profile=cloud-optimized",
                    "roles": [
                        "data"
                    ],
                    "proj:shape": [
                        332,
                        538
                    ],
                    "size": 236185,
                    "raster:bands": [
                        {
                            "nodata": null,
                            "unit": "mg / m3"
                        }
                    ],
                    "statistics": {
                        "minimum": 3.6319109227481587,
                        "maximum": 432.00000431999996,
                        "mean": 23.88543027478506,
                        "median": 19.854399090040943,
                        "q01": 6.910493023080368,
                        "q99": 49.08455442001085,
                        "stddev": 26.281565846730597,
                        "valid_percent": 0.8740314417521386
                    },
                    "proj:transform": [
                        0.00012055852166620698,
                        0.0,
                        -2.6527776186772343,
                        0.0,
                        -0.00012055852166622246,
                        51.35460363372064,
                        0.0,
                        0.0,
                        1.0
                    ],
                    "colormap": {
                        "name": "jet",
                        "reversed": false,
                        "min": 0.0,
                        "max": 100.0,
                        "steps": 20,
                        "units": "mg / m3",
                        "mpl_equivalent_cmap": "jet"
                    },
                    "proj:epsg": 4326
                },
                "cya_cells": {
                    "title": "Cyanobacteria Density (CYA)",
                    "href": "https://eopro-spyro-test.workspaces.test.eodhp.eco-ke-staging.com/files/workspaces-eodhp-test/processing-results/cat_5ffb0b06-d25c-11ef-8e29-5eefae7e0a18/col_5ffb0b06-d25c-11ef-8e29-5eefae7e0a18/neodc.sentinel_ard.data.sentinel_2.2023.11.20.S2A_20231120_latn510lonw0022_T30UWB_ORB037_20231120132420_utm30n_osgb_cya_cells.tif",
                    "type": "image/tiff; application=geotiff; profile=cloud-optimized",
                    "roles": [
                        "data"
                    ],
                    "proj:shape": [
                        332,
                        538
                    ],
                    "size": 294620,
                    "raster:bands": [
                        {
                            "nodata": null,
                            "unit": "1e6 cells / mL"
                        }
                    ],
                    "statistics": {
                        "minimum": 0.0,
                        "maximum": 59943780350.84827,
                        "mean": 1346328883.450119,
                        "median": 338969377.48543,
                        "q01": 64196211.44985047,
                        "q99": 17742745734.289013,
                        "stddev": 3998332545.418953,
                        "valid_percent": 0.8740314417521386
                    },
                    "proj:transform": [
                        0.00012055852166620698,
                        0.0,
                        -2.6527776186772343,
                        0.0,
                        -0.00012055852166622246,
                        51.35460363372064,
                        0.0,
                        0.0,
                        1.0
                    ],
                    "colormap": {
                        "name": "jet",
                        "reversed": false,
                        "min": 0.1,
                        "max": 300.0,
                        "steps": 20,
                        "units": "1e6 cells / mL",
                        "mpl_equivalent_cmap": "jet"
                    },
                    "proj:epsg": 4326
                },
                "turb": {
                    "title": "Turbidity (TURB)",
                    "href": "https://eopro-spyro-test.workspaces.test.eodhp.eco-ke-staging.com/files/workspaces-eodhp-test/processing-results/cat_5ffb0b06-d25c-11ef-8e29-5eefae7e0a18/col_5ffb0b06-d25c-11ef-8e29-5eefae7e0a18/neodc.sentinel_ard.data.sentinel_2.2023.11.20.S2A_20231120_latn510lonw0022_T30UWB_ORB037_20231120132420_utm30n_osgb_turb.tif",
                    "type": "image/tiff; application=geotiff; profile=cloud-optimized",
                    "roles": [
                        "data"
                    ],
                    "proj:shape": [
                        332,
                        538
                    ],
                    "size": 249190,
                    "raster:bands": [
                        {
                            "nodata": null,
                            "unit": "NTU"
                        }
                    ],
                    "statistics": {
                        "minimum": 0.9061,
                        "maximum": 153399.36986025088,
                        "mean": 10155.929674558125,
                        "median": 3836.7707146469493,
                        "q01": 1408.2638496481602,
                        "q99": 107810.29201943219,
                        "stddev": 20024.6035898165,
                        "valid_percent": 0.8740314417521386
                    },
                    "proj:transform": [
                        0.00012055852166620698,
                        0.0,
                        -2.6527776186772343,
                        0.0,
                        -0.00012055852166622246,
                        51.35460363372064,
                        0.0,
                        0.0,
                        1.0
                    ],
                    "colormap": {
                        "name": "jet",
                        "reversed": false,
                        "min": 15,
                        "max": 1000,
                        "steps": 20,
                        "units": "NTU",
                        "mpl_equivalent_cmap": "jet"
                    },
                    "proj:epsg": 4326
                }
            },

const meta: Meta<typeof ResultsList> = {
  component: ResultsList,
  title: 'libs/map/ui-results-view/results-list/ResultsList',
};
export default meta;

export const ResultsListSample = {
  args: {
    features: [
      {
        id: '1',
        ...singleElementMock,
      },
      {
        id: '2',
        ...singleElementMock,
      },
      {
        id: '3',
        ...singleElementMock,
      },
      {
        id: '4',
        ...singleElementMock,
      },
    ],
  },
};
