import type { Meta } from '@storybook/react';
import { TCollectionSchema } from '@ukri/map/data-access-stac-catalog';

import { ResultsView } from './results-view.component';

const imageUrlStoredInPublicAssetsInStorybookHost = '/assets/images/imageSample2.png';

const singleElementMock: Omit<TCollectionSchema['features'][number], 'id'> = {
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

const results: TCollectionSchema = {
  type: 'FeatureCollection',
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
  links: [],
  context: {
    limit: 4,
    returned: 4,
    matched: 4,
  },
};

const meta: Meta<typeof ResultsView> = {
  component: ResultsView,
  title: 'libs/map/ui-results-view/ResultsView',
};
export default meta;

export const ResultsViewSample = {
  args: {
    status: 'success',
    data: results,
    error: { message: 'Results not found' },
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onBack: () => {},
  },
};
