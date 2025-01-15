import { TFeature } from '@ukri/map/data-access-stac-catalog';

const response = {
  assets: {
    cdom: {
      title: 'Colored Dissolved Organic Matter (CDOM)',
      href: 'https://eopro-spyro-test.workspaces.test.eodhp.eco-ke-staging.com/files/workspaces-eodhp-test/processing-results/cat_5ffb0b06-d25c-11ef-8e29-5eefae7e0a18/col_5ffb0b06-d25c-11ef-8e29-5eefae7e0a18/neodc.sentinel_ard.data.sentinel_2.2023.11.20.S2A_20231120_latn510lonw0022_T30UWB_ORB037_20231120132420_utm30n_osgb_cdom.tif',
      type: 'image/tiff; application=geotiff; profile=cloud-optimized',
      roles: ['data'],
      'proj:shape': [332, 538],
      size: 241692,
      'raster:bands': [
        {
          nodata: null,
          unit: 'ug / L',
        },
      ],
      statistics: {
        minimum: 0.0709,
        maximum: 2.982835483401301,
        mean: 1.7084835452645923,
        median: 1.6311222219332921,
        q01: 1.15413999972919,
        q99: 2.582978840996882,
        stddev: 0.355638019494419,
        valid_percent: 0.8740314417521386,
      },
      'proj:transform': [
        0.00012055852166620698, 0.0, -2.6527776186772343, 0.0, -0.00012055852166622246, 51.35460363372064, 0.0, 0.0,
        1.0,
      ],
      colormap: {
        name: 'jet',
        reversed: false,
        min: 0.03,
        max: 5.3,
        steps: 20,
        units: 'ug / L',
        mpl_equivalent_cmap: 'jet',
      },
      'proj:epsg': 4326,
    },
    thumbnail: {
      title: 'Thumbnail',
      href: 'https://eopro-spyro-test.workspaces.test.eodhp.eco-ke-staging.com/files/workspaces-eodhp-test/processing-results/cat_5ffb0b06-d25c-11ef-8e29-5eefae7e0a18/col_5ffb0b06-d25c-11ef-8e29-5eefae7e0a18/neodc.sentinel_ard.data.sentinel_2.2023.11.20.S2A_20231120_latn510lonw0022_T30UWB_ORB037_20231120132420_utm30n_osgb.png',
      type: 'image/png',
      roles: ['thumbnail'],
      size: 1942,
    },
    doc: {
      title: 'Dissolved Organic Carbon (DOC)',
      href: 'https://eopro-spyro-test.workspaces.test.eodhp.eco-ke-staging.com/files/workspaces-eodhp-test/processing-results/cat_5ffb0b06-d25c-11ef-8e29-5eefae7e0a18/col_5ffb0b06-d25c-11ef-8e29-5eefae7e0a18/neodc.sentinel_ard.data.sentinel_2.2023.11.20.S2A_20231120_latn510lonw0022_T30UWB_ORB037_20231120132420_utm30n_osgb_doc.tif',
      type: 'image/tiff; application=geotiff; profile=cloud-optimized',
      roles: ['data'],
      'proj:shape': [332, 538],
      size: 236185,
      'raster:bands': [
        {
          nodata: null,
          unit: 'mg / m3',
        },
      ],
      statistics: {
        minimum: 3.6319109227481587,
        maximum: 432.00000431999996,
        mean: 23.88543027478506,
        median: 19.854399090040943,
        q01: 6.910493023080368,
        q99: 49.08455442001085,
        stddev: 26.281565846730597,
        valid_percent: 0.8740314417521386,
      },
      'proj:transform': [
        0.00012055852166620698, 0.0, -2.6527776186772343, 0.0, -0.00012055852166622246, 51.35460363372064, 0.0, 0.0,
        1.0,
      ],
      colormap: {
        name: 'jet',
        reversed: false,
        min: 0.0,
        max: 100.0,
        steps: 20,
        units: 'mg / m3',
        mpl_equivalent_cmap: 'jet',
      },
      'proj:epsg': 4326,
    },
    cya_cells: {
      title: 'Cyanobacteria Density (CYA)',
      href: 'https://eopro-spyro-test.workspaces.test.eodhp.eco-ke-staging.com/files/workspaces-eodhp-test/processing-results/cat_5ffb0b06-d25c-11ef-8e29-5eefae7e0a18/col_5ffb0b06-d25c-11ef-8e29-5eefae7e0a18/neodc.sentinel_ard.data.sentinel_2.2023.11.20.S2A_20231120_latn510lonw0022_T30UWB_ORB037_20231120132420_utm30n_osgb_cya_cells.tif',
      type: 'image/tiff; application=geotiff; profile=cloud-optimized',
      roles: ['data'],
      'proj:shape': [332, 538],
      size: 294620,
      'raster:bands': [
        {
          nodata: null,
          unit: '1e6 cells / mL',
        },
      ],
      statistics: {
        minimum: 0.0,
        maximum: 59943780350.84827,
        mean: 1346328883.450119,
        median: 338969377.48543,
        q01: 64196211.44985047,
        q99: 17742745734.289013,
        stddev: 3998332545.418953,
        valid_percent: 0.8740314417521386,
      },
      'proj:transform': [
        0.00012055852166620698, 0.0, -2.6527776186772343, 0.0, -0.00012055852166622246, 51.35460363372064, 0.0, 0.0,
        1.0,
      ],
      colormap: {
        name: 'jet',
        reversed: false,
        min: 0.1,
        max: 300.0,
        steps: 20,
        units: '1e6 cells / mL',
        mpl_equivalent_cmap: 'jet',
      },
      'proj:epsg': 4326,
    },
    turb: {
      title: 'Turbidity (TURB)',
      href: 'https://eopro-spyro-test.workspaces.test.eodhp.eco-ke-staging.com/files/workspaces-eodhp-test/processing-results/cat_5ffb0b06-d25c-11ef-8e29-5eefae7e0a18/col_5ffb0b06-d25c-11ef-8e29-5eefae7e0a18/neodc.sentinel_ard.data.sentinel_2.2023.11.20.S2A_20231120_latn510lonw0022_T30UWB_ORB037_20231120132420_utm30n_osgb_turb.tif',
      type: 'image/tiff; application=geotiff; profile=cloud-optimized',
      roles: ['data'],
      'proj:shape': [332, 538],
      size: 249190,
      'raster:bands': [
        {
          nodata: null,
          unit: 'NTU',
        },
      ],
      statistics: {
        minimum: 0.9061,
        maximum: 153399.36986025088,
        mean: 10155.929674558125,
        median: 3836.7707146469493,
        q01: 1408.2638496481602,
        q99: 107810.29201943219,
        stddev: 20024.6035898165,
        valid_percent: 0.8740314417521386,
      },
      'proj:transform': [
        0.00012055852166620698, 0.0, -2.6527776186772343, 0.0, -0.00012055852166622246, 51.35460363372064, 0.0, 0.0,
        1.0,
      ],
      colormap: {
        name: 'jet',
        reversed: false,
        min: 15,
        max: 1000,
        steps: 20,
        units: 'NTU',
        mpl_equivalent_cmap: 'jet',
      },
      'proj:epsg': 4326,
    },
  },
};

const imageUrlStoredInPublicAssetsInStorybookHost = '/assets/images/imageSample2.png';

export const singleElementMock: Omit<TFeature, 'id'> = {
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
    data: {
      title: 'clms-corinelc',
      href: 'https://eopro-spyro-test.workspaces.test.eodhp.eco-ke-staging.com/files/workspaces-eodhp-test/processing-results/cat_5215a4ee-d25f-11ef-9eae-5eefae7e0a18/col_5215a4ee-d25f-11ef-9eae-5eefae7e0a18/c5991927-745d-4515-b6a3-b9ca2c50bdbf.tif',
      type: 'image/tiff; application=geotiff; profile=cloud-optimized',
      roles: ['data'],
      size: 9952,
      'classification:classes': [
        {
          value: 1,
          description: 'Continuous urban fabric',
          'color-hint': 'e6004d',
        },
        {
          value: 2,
          description: 'Discontinuous urban fabric',
          'color-hint': 'ff0000',
        },
        {
          value: 3,
          description: 'Industrial or commercial units',
          'color-hint': 'cc4df2',
        },
        {
          value: 4,
          description: 'Road and rail networks and associated land',
          'color-hint': 'cc0000',
        },
        {
          value: 5,
          description: 'Port areas',
          'color-hint': 'e6cccc',
        },
        {
          value: 6,
          description: 'Airports',
          'color-hint': 'e6cce6',
        },
        {
          value: 7,
          description: 'Mineral extraction sites',
          'color-hint': '600ccc',
        },
        {
          value: 8,
          description: 'Dump sites',
          'color-hint': 'a64d00',
        },
        {
          value: 9,
          description: 'Construction sites',
          'color-hint': 'ff4dff',
        },
        {
          value: 10,
          description: 'Green urban areas',
          'color-hint': 'ffa6ff',
        },
        {
          value: 11,
          description: 'Sport and leisure facilities',
          'color-hint': 'ffe6ff',
        },
        {
          value: 12,
          description: 'Non-irrigated arable land',
          'color-hint': 'ffffa8',
        },
        {
          value: 13,
          description: 'Permanently irrigated land',
          'color-hint': 'ffff00',
        },
        {
          value: 14,
          description: 'Rice fields',
          'color-hint': 'e6e600',
        },
        {
          value: 15,
          description: 'Vineyards',
          'color-hint': 'e68000',
        },
        {
          value: 16,
          description: 'Fruit trees and berry plantations',
          'color-hint': 'f2a64d',
        },
        {
          value: 17,
          description: 'Olive groves',
          'color-hint': 'e6a600',
        },
        {
          value: 18,
          description: 'Pastures',
          'color-hint': 'e6e64d',
        },
        {
          value: 19,
          description: 'Annual crops associated with permanent crops',
          'color-hint': 'ffe6a6',
        },
        {
          value: 20,
          description: 'Complex cultivation patterns',
          'color-hint': 'ffe64d',
        },
        {
          value: 21,
          description: 'Land principally occupied by agriculture with significant areas of natural vegetation',
          'color-hint': 'e6cc4d',
        },
        {
          value: 22,
          description: 'Agro-forestry areas',
          'color-hint': 'f2cca6',
        },
        {
          value: 23,
          description: 'Broad-leaved forest',
          'color-hint': '80ff00',
        },
        {
          value: 24,
          description: 'Coniferous forest',
          'color-hint': '00a600',
        },
        {
          value: 25,
          description: 'Mixed forest',
          'color-hint': '4dff00',
        },
        {
          value: 26,
          description: 'Natural grasslands',
          'color-hint': 'ccf24d',
        },
        {
          value: 27,
          description: 'Moors and heathland',
          'color-hint': 'a6ff80',
        },
        {
          value: 28,
          description: 'Sclerophyllous vegetation',
          'color-hint': 'a6e64d',
        },
        {
          value: 29,
          description: 'Transitional woodland-shrub',
          'color-hint': 'a6f200',
        },
        {
          value: 30,
          description: 'Beaches - dunes - sands',
          'color-hint': 'e6e6e6',
        },
        {
          value: 31,
          description: 'Bare rocks',
          'color-hint': 'cccccc',
        },
        {
          value: 32,
          description: 'Sparsely vegetated areas',
          'color-hint': 'ccffcc',
        },
        {
          value: 33,
          description: 'Burnt areas',
          'color-hint': '000000',
        },
        {
          value: 34,
          description: 'Glaciers and perpetual snow',
          'color-hint': 'a6e6cc',
        },
        {
          value: 35,
          description: 'Inland marshes',
          'color-hint': 'a6a6ff',
        },
        {
          value: 36,
          description: 'Peat bogs',
          'color-hint': '4d4dff',
        },
        {
          value: 37,
          description: 'Salt marshes',
          'color-hint': 'ccccff',
        },
        {
          value: 38,
          description: 'Salines',
          'color-hint': 'e6e6ff',
        },
        {
          value: 39,
          description: 'Intertidal flats',
          'color-hint': 'a6a6e6',
        },
        {
          value: 40,
          description: 'Water courses',
          'color-hint': '00ccf2',
        },
        {
          value: 41,
          description: 'Water bodies',
          'color-hint': '80f2e6',
        },
        {
          value: 42,
          description: 'Coastal lagoons',
          'color-hint': '00ffa6',
        },
        {
          value: 43,
          description: 'Estuaries',
          'color-hint': 'a6ffe6',
        },
        {
          value: 44,
          description: 'Sea and ocean',
          'color-hint': 'e6f2ff',
        },
        {
          value: 48,
          description: 'NODATA',
          'color-hint': 'ffffff',
        },
      ],
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
