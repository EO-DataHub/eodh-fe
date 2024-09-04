import { TCollection } from '@ukri/map/data-access-stac-catalog';

export const sentinel1Item1CollectionMock: TCollection = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-13.4291884, 27.5960962],
            [-13.7127482, 26.1420046],
            [-12.9322607, 26.0167756],
            [-12.916308, 26.0809853],
            [-12.0576521, 25.9378096],
            [-12.0428958, 25.9956382],
            [-11.2253183, 25.8544565],
            [-10.9321868, 27.188105],
            [-13.4291884, 27.5960962],
          ],
        ],
      },
      properties: {
        datetime: '2024-03-19T06:47:09.055942+00:00',
      },
      id: 'S1A_IW_GRDH_1SDV_20240319T064656_20240319T064721_053047_066C79',
      bbox: [-13.7127482, 25.8544565, -10.9321868, 27.5960962],
      stac_version: '1.0.0',
      assets: {
        thumbnail: {
          title: 'Preview Image',
          description:
            'An averaged, decimated preview image in PNG format. Single polarization products are represented with a grey scale image. Dual polarization products are represented by a single composite colour image in RGB with the red channel (R) representing the  co-polarization VV or HH), the green channel (G) represents the cross-polarization (VH or HV) and the blue channel (B) represents the ratio of the cross an co-polarizations.',
          href: 's3:/sentinel-s1-l1c/GRD/2024/3/19/IW/DV/S1A_IW_GRDH_1SDV_20240319T064656_20240319T064721_053047_066C79_F0FA/preview/quick-look.png',
          type: 'image/png',
          roles: ['thumbnail'],
        },
      },
      links: [
        {
          href: 'https://test.eodatahub.org.uk/api/catalogue/stac/catalogs/supported-datasets/earth-search-aws/collections/sentinel-1-grd/items/S1A_IW_GRDH_1SDV_20240319T064656_20240319T064721_053047_066C79',
          rel: 'self',
          type: 'application/geo+json',
        },
        {
          href: 'https://test.eodatahub.org.uk/api/catalogue/stac/catalogs/supported-datasets/earth-search-aws/collections/sentinel-1-grd',
          rel: 'parent',
          type: 'application/json',
        },
        {
          href: 'https://test.eodatahub.org.uk/api/catalogue/stac/catalogs/supported-datasets/earth-search-aws/collections/sentinel-1-grd',
          rel: 'collection',
          type: 'application/json',
        },
        {
          href: 'https://test.eodatahub.org.uk/api/catalogue/stac/catalogs/supported-datasets/earth-search-aws',
          rel: 'root',
          type: 'application/json',
        },
        {
          href: 's3:/earthsearch-data/sentinel-1-grd/2024/3/19/IW/S1A_IW_GRDH_1SDV_20240319T064656_20240319T064721_053047_066C79/S1A_IW_GRDH_1SDV_20240319T064656_20240319T064721_053047_066C79.json',
          rel: 'canonical',
          type: 'application/json',
        },
        {
          href: 'https://test.eodatahub.org.uk/v1/collections/sentinel-1-grd/items/S1A_IW_GRDH_1SDV_20240319T064656_20240319T064721_053047_066C79/thumbnail',
          rel: 'thumbnail',
        },
      ],
      collection: 'sentinel-1-grd',
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-13.1367187, 29.1016365],
            [-13.4301678, 27.5960975],
            [-10.933835, 27.1889772],
            [-10.6024955, 28.6961286],
            [-13.1367187, 29.1016365],
          ],
        ],
      },
      properties: {
        datetime: '2024-03-19T06:46:44.465046+00:00',
      },
      id: 'S1A_IW_GRDH_1SDV_20240319T064631_20240319T064656_053047_066C79',
      bbox: [-13.4301678, 27.1889772, -10.6024955, 29.1016365],
      stac_version: '1.0.0',
      assets: {
        thumbnail: {
          title: 'Preview Image',
          description:
            'An averaged, decimated preview image in PNG format. Single polarization products are represented with a grey scale image. Dual polarization products are represented by a single composite colour image in RGB with the red channel (R) representing the  co-polarization VV or HH), the green channel (G) represents the cross-polarization (VH or HV) and the blue channel (B) represents the ratio of the cross an co-polarizations.',
          href: 's3:/sentinel-s1-l1c/GRD/2024/3/19/IW/DV/S1A_IW_GRDH_1SDV_20240319T064631_20240319T064656_053047_066C79_AB99/preview/quick-look.png',
          type: 'image/png',
          roles: ['thumbnail'],
        },
      },
      links: [
        {
          href: 'https://test.eodatahub.org.uk/api/catalogue/stac/catalogs/supported-datasets/earth-search-aws/collections/sentinel-1-grd/items/S1A_IW_GRDH_1SDV_20240319T064631_20240319T064656_053047_066C79',
          rel: 'self',
          type: 'application/geo+json',
        },
        {
          href: 'https://test.eodatahub.org.uk/api/catalogue/stac/catalogs/supported-datasets/earth-search-aws/collections/sentinel-1-grd',
          rel: 'parent',
          type: 'application/json',
        },
        {
          href: 'https://test.eodatahub.org.uk/api/catalogue/stac/catalogs/supported-datasets/earth-search-aws/collections/sentinel-1-grd',
          rel: 'collection',
          type: 'application/json',
        },
        {
          href: 'https://test.eodatahub.org.uk/api/catalogue/stac/catalogs/supported-datasets/earth-search-aws',
          rel: 'root',
          type: 'application/json',
        },
        {
          href: 's3:/earthsearch-data/sentinel-1-grd/2024/3/19/IW/S1A_IW_GRDH_1SDV_20240319T064631_20240319T064656_053047_066C79/S1A_IW_GRDH_1SDV_20240319T064631_20240319T064656_053047_066C79.json',
          rel: 'canonical',
          type: 'application/json',
        },
        {
          href: 'https://test.eodatahub.org.uk/v1/collections/sentinel-1-grd/items/S1A_IW_GRDH_1SDV_20240319T064631_20240319T064656_053047_066C79/thumbnail',
          rel: 'thumbnail',
        },
      ],
      collection: 'sentinel-1-grd',
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-12.8439623, 30.6069473],
            [-13.1371348, 29.1014779],
            [-10.6006619, 28.6960179],
            [-10.2670659, 30.2035289],
            [-12.8439623, 30.6069473],
          ],
        ],
      },
      properties: {
        datetime: '2024-03-19T06:46:19.465150+00:00',
      },
      id: 'S1A_IW_GRDH_1SDV_20240319T064606_20240319T064631_053047_066C79',
      bbox: [-13.1371348, 28.6960179, -10.2670659, 30.6069473],
      stac_version: '1.0.0',
      assets: {
        thumbnail: {
          title: 'Preview Image',
          description:
            'An averaged, decimated preview image in PNG format. Single polarization products are represented with a grey scale image. Dual polarization products are represented by a single composite colour image in RGB with the red channel (R) representing the  co-polarization VV or HH), the green channel (G) represents the cross-polarization (VH or HV) and the blue channel (B) represents the ratio of the cross an co-polarizations.',
          href: 's3:/sentinel-s1-l1c/GRD/2024/3/19/IW/DV/S1A_IW_GRDH_1SDV_20240319T064606_20240319T064631_053047_066C79_62B6/preview/quick-look.png',
          type: 'image/png',
          roles: ['thumbnail'],
        },
      },
      links: [
        {
          href: 'https://test.eodatahub.org.uk/api/catalogue/stac/catalogs/supported-datasets/earth-search-aws/collections/sentinel-1-grd/items/S1A_IW_GRDH_1SDV_20240319T064606_20240319T064631_053047_066C79',
          rel: 'self',
          type: 'application/geo+json',
        },
        {
          href: 'https://test.eodatahub.org.uk/api/catalogue/stac/catalogs/supported-datasets/earth-search-aws/collections/sentinel-1-grd',
          rel: 'parent',
          type: 'application/json',
        },
        {
          href: 'https://test.eodatahub.org.uk/api/catalogue/stac/catalogs/supported-datasets/earth-search-aws/collections/sentinel-1-grd',
          rel: 'collection',
          type: 'application/json',
        },
        {
          href: 'https://test.eodatahub.org.uk/api/catalogue/stac/catalogs/supported-datasets/earth-search-aws',
          rel: 'root',
          type: 'application/json',
        },
        {
          href: 's3:/earthsearch-data/sentinel-1-grd/2024/3/19/IW/S1A_IW_GRDH_1SDV_20240319T064606_20240319T064631_053047_066C79/S1A_IW_GRDH_1SDV_20240319T064606_20240319T064631_053047_066C79.json',
          rel: 'canonical',
          type: 'application/json',
        },
        {
          href: 'https://test.eodatahub.org.uk/v1/collections/sentinel-1-grd/items/S1A_IW_GRDH_1SDV_20240319T064606_20240319T064631_053047_066C79/thumbnail',
          rel: 'thumbnail',
        },
      ],
      collection: 'sentinel-1-grd',
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-12.548476, 32.111151],
            [-12.8431321, 30.6068322],
            [-11.56353, 30.4135676],
            [-10.2665465, 30.2033354],
            [-9.9300922, 31.7105511],
            [-11.2403187, 31.9183002],
            [-12.548476, 32.111151],
          ],
        ],
      },
      properties: {
        datetime: '2024-03-19T06:45:54.465255+00:00',
      },
      id: 'S1A_IW_GRDH_1SDV_20240319T064541_20240319T064606_053047_066C79',
      bbox: [-12.8431321, 30.2033354, -9.9300922, 32.111151],
      stac_version: '1.0.0',
      assets: {
        thumbnail: {
          title: 'Preview Image',
          description:
            'An averaged, decimated preview image in PNG format. Single polarization products are represented with a grey scale image. Dual polarization products are represented by a single composite colour image in RGB with the red channel (R) representing the  co-polarization VV or HH), the green channel (G) represents the cross-polarization (VH or HV) and the blue channel (B) represents the ratio of the cross an co-polarizations.',
          href: 's3:/sentinel-s1-l1c/GRD/2024/3/19/IW/DV/S1A_IW_GRDH_1SDV_20240319T064541_20240319T064606_053047_066C79_3C7B/preview/quick-look.png',
          type: 'image/png',
          roles: ['thumbnail'],
        },
      },
      links: [
        {
          href: 'https://test.eodatahub.org.uk/api/catalogue/stac/catalogs/supported-datasets/earth-search-aws/collections/sentinel-1-grd/items/S1A_IW_GRDH_1SDV_20240319T064541_20240319T064606_053047_066C79',
          rel: 'self',
          type: 'application/geo+json',
        },
        {
          href: 'https://test.eodatahub.org.uk/api/catalogue/stac/catalogs/supported-datasets/earth-search-aws/collections/sentinel-1-grd',
          rel: 'parent',
          type: 'application/json',
        },
        {
          href: 'https://test.eodatahub.org.uk/api/catalogue/stac/catalogs/supported-datasets/earth-search-aws/collections/sentinel-1-grd',
          rel: 'collection',
          type: 'application/json',
        },
        {
          href: 'https://test.eodatahub.org.uk/api/catalogue/stac/catalogs/supported-datasets/earth-search-aws',
          rel: 'root',
          type: 'application/json',
        },
        {
          href: 's3:/earthsearch-data/sentinel-1-grd/2024/3/19/IW/S1A_IW_GRDH_1SDV_20240319T064541_20240319T064606_053047_066C79/S1A_IW_GRDH_1SDV_20240319T064541_20240319T064606_053047_066C79.json',
          rel: 'canonical',
          type: 'application/json',
        },
        {
          href: 'https://test.eodatahub.org.uk/v1/collections/sentinel-1-grd/items/S1A_IW_GRDH_1SDV_20240319T064541_20240319T064606_053047_066C79/thumbnail',
          rel: 'thumbnail',
        },
      ],
      collection: 'sentinel-1-grd',
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-12.2517656, 33.6153662],
            [-12.5485771, 32.1111575],
            [-11.2727496, 31.9234988],
            [-9.9297511, 31.7106509],
            [-9.588019, 33.2169587],
            [-10.9373148, 33.426448],
            [-12.2517656, 33.6153662],
          ],
        ],
      },
      properties: {
        datetime: '2024-03-19T06:45:29.465359+00:00',
      },
      id: 'S1A_IW_GRDH_1SDV_20240319T064516_20240319T064541_053047_066C79',
      bbox: [-12.5485771, 31.7106509, -9.588019, 33.6153662],
      stac_version: '1.0.0',
      assets: {
        thumbnail: {
          title: 'Preview Image',
          description:
            'An averaged, decimated preview image in PNG format. Single polarization products are represented with a grey scale image. Dual polarization products are represented by a single composite colour image in RGB with the red channel (R) representing the  co-polarization VV or HH), the green channel (G) represents the cross-polarization (VH or HV) and the blue channel (B) represents the ratio of the cross an co-polarizations.',
          href: 's3:/sentinel-s1-l1c/GRD/2024/3/19/IW/DV/S1A_IW_GRDH_1SDV_20240319T064516_20240319T064541_053047_066C79_55B0/preview/quick-look.png',
          type: 'image/png',
          roles: ['thumbnail'],
        },
      },
      links: [
        {
          href: 'https://test.eodatahub.org.uk/api/catalogue/stac/catalogs/supported-datasets/earth-search-aws/collections/sentinel-1-grd/items/S1A_IW_GRDH_1SDV_20240319T064516_20240319T064541_053047_066C79',
          rel: 'self',
          type: 'application/geo+json',
        },
        {
          href: 'https://test.eodatahub.org.uk/api/catalogue/stac/catalogs/supported-datasets/earth-search-aws/collections/sentinel-1-grd',
          rel: 'parent',
          type: 'application/json',
        },
        {
          href: 'https://test.eodatahub.org.uk/api/catalogue/stac/catalogs/supported-datasets/earth-search-aws/collections/sentinel-1-grd',
          rel: 'collection',
          type: 'application/json',
        },
        {
          href: 'https://test.eodatahub.org.uk/api/catalogue/stac/catalogs/supported-datasets/earth-search-aws',
          rel: 'root',
          type: 'application/json',
        },
        {
          href: 's3:/earthsearch-data/sentinel-1-grd/2024/3/19/IW/S1A_IW_GRDH_1SDV_20240319T064516_20240319T064541_053047_066C79/S1A_IW_GRDH_1SDV_20240319T064516_20240319T064541_053047_066C79.json',
          rel: 'canonical',
          type: 'application/json',
        },
        {
          href: 'https://test.eodatahub.org.uk/v1/collections/sentinel-1-grd/items/S1A_IW_GRDH_1SDV_20240319T064516_20240319T064541_053047_066C79/thumbnail',
          rel: 'thumbnail',
        },
      ],
      collection: 'sentinel-1-grd',
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-11.952953, 35.11907],
            [-12.2513397, 33.615627],
            [-10.9486684, 33.4284958],
            [-9.5875985, 33.2174938],
            [-9.2410436, 34.7226419],
            [-10.6259844, 34.9332177],
            [-11.952953, 35.11907],
          ],
        ],
      },
      properties: {
        datetime: '2024-03-19T06:45:04.465464+00:00',
      },
      id: 'S1A_IW_GRDH_1SDV_20240319T064451_20240319T064516_053047_066C79',
      bbox: [-12.2513397, 33.2174938, -9.2410436, 35.11907],
      stac_version: '1.0.0',
      assets: {
        thumbnail: {
          title: 'Preview Image',
          description:
            'An averaged, decimated preview image in PNG format. Single polarization products are represented with a grey scale image. Dual polarization products are represented by a single composite colour image in RGB with the red channel (R) representing the  co-polarization VV or HH), the green channel (G) represents the cross-polarization (VH or HV) and the blue channel (B) represents the ratio of the cross an co-polarizations.',
          href: 's3:/sentinel-s1-l1c/GRD/2024/3/19/IW/DV/S1A_IW_GRDH_1SDV_20240319T064451_20240319T064516_053047_066C79_18AC/preview/quick-look.png',
          type: 'image/png',
          roles: ['thumbnail'],
        },
      },
      links: [
        {
          href: 'https://test.eodatahub.org.uk/api/catalogue/stac/catalogs/supported-datasets/earth-search-aws/collections/sentinel-1-grd/items/S1A_IW_GRDH_1SDV_20240319T064451_20240319T064516_053047_066C79',
          rel: 'self',
          type: 'application/geo+json',
        },
        {
          href: 'https://test.eodatahub.org.uk/api/catalogue/stac/catalogs/supported-datasets/earth-search-aws/collections/sentinel-1-grd',
          rel: 'parent',
          type: 'application/json',
        },
        {
          href: 'https://test.eodatahub.org.uk/api/catalogue/stac/catalogs/supported-datasets/earth-search-aws/collections/sentinel-1-grd',
          rel: 'collection',
          type: 'application/json',
        },
        {
          href: 'https://test.eodatahub.org.uk/api/catalogue/stac/catalogs/supported-datasets/earth-search-aws',
          rel: 'root',
          type: 'application/json',
        },
        {
          href: 's3:/earthsearch-data/sentinel-1-grd/2024/3/19/IW/S1A_IW_GRDH_1SDV_20240319T064451_20240319T064516_053047_066C79/S1A_IW_GRDH_1SDV_20240319T064451_20240319T064516_053047_066C79.json',
          rel: 'canonical',
          type: 'application/json',
        },
        {
          href: 'https://test.eodatahub.org.uk/v1/collections/sentinel-1-grd/items/S1A_IW_GRDH_1SDV_20240319T064451_20240319T064516_053047_066C79/thumbnail',
          rel: 'thumbnail',
        },
      ],
      collection: 'sentinel-1-grd',
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-11.6506949, 36.622228],
            [-11.9522192, 35.1189386],
            [-10.611389, 34.9313523],
            [-9.2406663, 34.7225381],
            [-8.8875882, 36.2275604],
            [-10.3055324, 36.4385408],
            [-11.6506949, 36.622228],
          ],
        ],
      },
      properties: {
        datetime: '2024-03-19T06:44:39.465568+00:00',
      },
      id: 'S1A_IW_GRDH_1SDV_20240319T064426_20240319T064451_053047_066C79',
      bbox: [-11.9522192, 34.7225381, -8.8875882, 36.622228],
      stac_version: '1.0.0',
      assets: {
        thumbnail: {
          title: 'Preview Image',
          description:
            'An averaged, decimated preview image in PNG format. Single polarization products are represented with a grey scale image. Dual polarization products are represented by a single composite colour image in RGB with the red channel (R) representing the  co-polarization VV or HH), the green channel (G) represents the cross-polarization (VH or HV) and the blue channel (B) represents the ratio of the cross an co-polarizations.',
          href: 's3:/sentinel-s1-l1c/GRD/2024/3/19/IW/DV/S1A_IW_GRDH_1SDV_20240319T064426_20240319T064451_053047_066C79_EFEC/preview/quick-look.png',
          type: 'image/png',
          roles: ['thumbnail'],
        },
      },
      links: [
        {
          href: 'https://test.eodatahub.org.uk/api/catalogue/stac/catalogs/supported-datasets/earth-search-aws/collections/sentinel-1-grd/items/S1A_IW_GRDH_1SDV_20240319T064426_20240319T064451_053047_066C79',
          rel: 'self',
          type: 'application/geo+json',
        },
        {
          href: 'https://test.eodatahub.org.uk/api/catalogue/stac/catalogs/supported-datasets/earth-search-aws/collections/sentinel-1-grd',
          rel: 'parent',
          type: 'application/json',
        },
        {
          href: 'https://test.eodatahub.org.uk/api/catalogue/stac/catalogs/supported-datasets/earth-search-aws/collections/sentinel-1-grd',
          rel: 'collection',
          type: 'application/json',
        },
        {
          href: 'https://test.eodatahub.org.uk/api/catalogue/stac/catalogs/supported-datasets/earth-search-aws',
          rel: 'root',
          type: 'application/json',
        },
        {
          href: 's3:/earthsearch-data/sentinel-1-grd/2024/3/19/IW/S1A_IW_GRDH_1SDV_20240319T064426_20240319T064451_053047_066C79/S1A_IW_GRDH_1SDV_20240319T064426_20240319T064451_053047_066C79.json',
          rel: 'canonical',
          type: 'application/json',
        },
        {
          href: 'https://test.eodatahub.org.uk/v1/collections/sentinel-1-grd/items/S1A_IW_GRDH_1SDV_20240319T064426_20240319T064451_053047_066C79/thumbnail',
          rel: 'thumbnail',
        },
      ],
      collection: 'sentinel-1-grd',
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-11.3465569, 38.124412],
            [-11.6510171, 36.6223792],
            [-10.3648822, 36.4474578],
            [-8.8870827, 36.2280349],
            [-8.5284278, 37.7318303],
            [-9.9489481, 37.938916],
            [-11.3465569, 38.124412],
          ],
        ],
      },
      properties: {
        datetime: '2024-03-19T06:44:14.465721+00:00',
      },
      id: 'S1A_IW_GRDH_1SDV_20240319T064401_20240319T064426_053047_066C79',
      bbox: [-11.6510171, 36.2280349, -8.5284278, 38.124412],
      stac_version: '1.0.0',
      assets: {
        thumbnail: {
          title: 'Preview Image',
          description:
            'An averaged, decimated preview image in PNG format. Single polarization products are represented with a grey scale image. Dual polarization products are represented by a single composite colour image in RGB with the red channel (R) representing the  co-polarization VV or HH), the green channel (G) represents the cross-polarization (VH or HV) and the blue channel (B) represents the ratio of the cross an co-polarizations.',
          href: 's3:/sentinel-s1-l1c/GRD/2024/3/19/IW/DV/S1A_IW_GRDH_1SDV_20240319T064401_20240319T064426_053047_066C79_E600/preview/quick-look.png',
          type: 'image/png',
          roles: ['thumbnail'],
        },
      },
      links: [
        {
          href: 'https://test.eodatahub.org.uk/api/catalogue/stac/catalogs/supported-datasets/earth-search-aws/collections/sentinel-1-grd/items/S1A_IW_GRDH_1SDV_20240319T064401_20240319T064426_053047_066C79',
          rel: 'self',
          type: 'application/geo+json',
        },
        {
          href: 'https://test.eodatahub.org.uk/api/catalogue/stac/catalogs/supported-datasets/earth-search-aws/collections/sentinel-1-grd',
          rel: 'parent',
          type: 'application/json',
        },
        {
          href: 'https://test.eodatahub.org.uk/api/catalogue/stac/catalogs/supported-datasets/earth-search-aws/collections/sentinel-1-grd',
          rel: 'collection',
          type: 'application/json',
        },
        {
          href: 'https://test.eodatahub.org.uk/api/catalogue/stac/catalogs/supported-datasets/earth-search-aws',
          rel: 'root',
          type: 'application/json',
        },
        {
          href: 's3:/earthsearch-data/sentinel-1-grd/2024/3/19/IW/S1A_IW_GRDH_1SDV_20240319T064401_20240319T064426_053047_066C79/S1A_IW_GRDH_1SDV_20240319T064401_20240319T064426_053047_066C79.json',
          rel: 'canonical',
          type: 'application/json',
        },
        {
          href: 'https://test.eodatahub.org.uk/v1/collections/sentinel-1-grd/items/S1A_IW_GRDH_1SDV_20240319T064401_20240319T064426_053047_066C79/thumbnail',
          rel: 'thumbnail',
        },
      ],
      collection: 'sentinel-1-grd',
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-11.039323, 39.6265445],
            [-11.347053, 38.1246788],
            [-9.9663056, 37.9416558],
            [-8.5281391, 37.7317176],
            [-8.1616445, 39.2353775],
            [-9.5827646, 39.4381384],
            [-11.039323, 39.6265445],
          ],
        ],
      },
      properties: {
        datetime: '2024-03-19T06:43:49.465777+00:00',
      },
      id: 'S1A_IW_GRDH_1SDV_20240319T064336_20240319T064401_053047_066C79',
      bbox: [-11.347053, 37.7317176, -8.1616445, 39.6265445],
      stac_version: '1.0.0',
      assets: {
        thumbnail: {
          title: 'Preview Image',
          description:
            'An averaged, decimated preview image in PNG format. Single polarization products are represented with a grey scale image. Dual polarization products are represented by a single composite colour image in RGB with the red channel (R) representing the  co-polarization VV or HH), the green channel (G) represents the cross-polarization (VH or HV) and the blue channel (B) represents the ratio of the cross an co-polarizations.',
          href: 's3:/sentinel-s1-l1c/GRD/2024/3/19/IW/DV/S1A_IW_GRDH_1SDV_20240319T064336_20240319T064401_053047_066C79_1032/preview/quick-look.png',
          type: 'image/png',
          roles: ['thumbnail'],
        },
      },
      links: [
        {
          href: 'https://test.eodatahub.org.uk/api/catalogue/stac/catalogs/supported-datasets/earth-search-aws/collections/sentinel-1-grd/items/S1A_IW_GRDH_1SDV_20240319T064336_20240319T064401_053047_066C79',
          rel: 'self',
          type: 'application/geo+json',
        },
        {
          href: 'https://test.eodatahub.org.uk/api/catalogue/stac/catalogs/supported-datasets/earth-search-aws/collections/sentinel-1-grd',
          rel: 'parent',
          type: 'application/json',
        },
        {
          href: 'https://test.eodatahub.org.uk/api/catalogue/stac/catalogs/supported-datasets/earth-search-aws/collections/sentinel-1-grd',
          rel: 'collection',
          type: 'application/json',
        },
        {
          href: 'https://test.eodatahub.org.uk/api/catalogue/stac/catalogs/supported-datasets/earth-search-aws',
          rel: 'root',
          type: 'application/json',
        },
        {
          href: 's3:/earthsearch-data/sentinel-1-grd/2024/3/19/IW/S1A_IW_GRDH_1SDV_20240319T064336_20240319T064401_053047_066C79/S1A_IW_GRDH_1SDV_20240319T064336_20240319T064401_053047_066C79.json',
          rel: 'canonical',
          type: 'application/json',
        },
        {
          href: 'https://test.eodatahub.org.uk/v1/collections/sentinel-1-grd/items/S1A_IW_GRDH_1SDV_20240319T064336_20240319T064401_053047_066C79/thumbnail',
          rel: 'thumbnail',
        },
      ],
      collection: 'sentinel-1-grd',
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-10.7256311, 41.127593],
            [-11.0403701, 39.626987],
            [-9.6219891, 39.443808],
            [-8.163866, 39.2359615],
            [-7.7920263, 40.7388515],
            [-9.2748169, 40.9453276],
            [-10.7256311, 41.127593],
          ],
        ],
      },
      properties: {
        datetime: '2024-03-19T06:43:24.465882+00:00',
      },
      id: 'S1A_IW_GRDH_1SDV_20240319T064311_20240319T064336_053047_066C79',
      bbox: [-11.0403701, 39.2359615, -7.7920263, 41.127593],
      stac_version: '1.0.0',
      assets: {
        thumbnail: {
          title: 'Preview Image',
          description:
            'An averaged, decimated preview image in PNG format. Single polarization products are represented with a grey scale image. Dual polarization products are represented by a single composite colour image in RGB with the red channel (R) representing the  co-polarization VV or HH), the green channel (G) represents the cross-polarization (VH or HV) and the blue channel (B) represents the ratio of the cross an co-polarizations.',
          href: 's3:/sentinel-s1-l1c/GRD/2024/3/19/IW/DV/S1A_IW_GRDH_1SDV_20240319T064311_20240319T064336_053047_066C79_BC1E/preview/quick-look.png',
          type: 'image/png',
          roles: ['thumbnail'],
        },
      },
      links: [
        {
          href: 'https://test.eodatahub.org.uk/api/catalogue/stac/catalogs/supported-datasets/earth-search-aws/collections/sentinel-1-grd/items/S1A_IW_GRDH_1SDV_20240319T064311_20240319T064336_053047_066C79',
          rel: 'self',
          type: 'application/geo+json',
        },
        {
          href: 'https://test.eodatahub.org.uk/api/catalogue/stac/catalogs/supported-datasets/earth-search-aws/collections/sentinel-1-grd',
          rel: 'parent',
          type: 'application/json',
        },
        {
          href: 'https://test.eodatahub.org.uk/api/catalogue/stac/catalogs/supported-datasets/earth-search-aws/collections/sentinel-1-grd',
          rel: 'collection',
          type: 'application/json',
        },
        {
          href: 'https://test.eodatahub.org.uk/api/catalogue/stac/catalogs/supported-datasets/earth-search-aws',
          rel: 'root',
          type: 'application/json',
        },
        {
          href: 's3:/earthsearch-data/sentinel-1-grd/2024/3/19/IW/S1A_IW_GRDH_1SDV_20240319T064311_20240319T064336_053047_066C79/S1A_IW_GRDH_1SDV_20240319T064311_20240319T064336_053047_066C79.json',
          rel: 'canonical',
          type: 'application/json',
        },
        {
          href: 'https://test.eodatahub.org.uk/v1/collections/sentinel-1-grd/items/S1A_IW_GRDH_1SDV_20240319T064311_20240319T064336_053047_066C79/thumbnail',
          rel: 'thumbnail',
        },
      ],
      collection: 'sentinel-1-grd',
    },
  ],
  links: [
    {
      rel: 'next',
      type: 'application/json',
      method: 'POST',
      href: 'https://test.eodatahub.org.uk/catalogs/supported-datasets/earth-search-aws/search',
      body: {
        collections: ['sentinel-1-grd'],
        token:
          'MTcxMDgzMDYwNDQ2NSxTMUFfSVdfR1JESF8xU0RWXzIwMjQwMzE5VDA2NDMxMV8yMDI0MDMxOVQwNjQzMzZfMDUzMDQ3XzA2NkM3OSxzZW50aW5lbC0xLWdyZA==',
      },
    },
    {
      rel: 'root',
      type: 'application/json',
      href: 'https://test.eodatahub.org.uk/api/catalogue/stac/',
    },
    {
      rel: 'self',
      type: 'application/json',
      href: 'https://test.eodatahub.org.uk/api/catalogue/stac/',
    },
  ],
  context: {
    returned: 10,
    limit: 10,
    matched: 110,
  },
};
