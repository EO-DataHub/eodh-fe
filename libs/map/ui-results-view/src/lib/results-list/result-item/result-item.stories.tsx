import type { Meta } from '@storybook/react';

import { ResultItem } from './result-item.component';

const meta: Meta<typeof ResultItem> = {
  component: ResultItem,
  title: 'libs/map/ui-results-view/ResultItem',
};
export default meta;

const imageUrlStoredInPublicAssetsInStorybookHost = '/assets/images/imageSample2.png';

export const SampleResultItem = {
  args: {
    imageUrl: imageUrlStoredInPublicAssetsInStorybookHost,
    collectionName: 'Sentinel-1',
    dateTime: '2024-09-03T16:23:22.625Z',
    cloudCoverage: 39.5,
    gridCode: '33TTG',
    addedForComparison: false,
    selected: false,
    item: {
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
  },
};
