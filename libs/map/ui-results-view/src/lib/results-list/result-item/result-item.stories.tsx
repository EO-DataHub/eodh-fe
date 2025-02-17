import type { Meta } from '@storybook/react';

import { multipleResultsInItemMock, singleResultInItemMock } from './response-mocks';
import { ResultItem } from './result-item.component';

const meta: Meta<typeof ResultItem> = {
  component: ResultItem,
  title: 'libs/map/ui-results-view/ResultItem',
};
export default meta;

const imageUrlStoredInPublicAssetsInStorybookHost = '/assets/images/imageSample2.png';

export const SingleAssetResultItem = {
  args: {
    imageUrl: imageUrlStoredInPublicAssetsInStorybookHost,
    collectionName: 'Sentinel-1',
    dateTime: '2024-09-03T16:23:22.625Z',
    cloudCoverage: 39.5,
    gridCode: '33TTG',
    addedForComparison: false,
    selected: false,
    item: singleResultInItemMock,
  },
};

export const MultipleAssetResultItem = {
  args: {
    imageUrl: imageUrlStoredInPublicAssetsInStorybookHost,
    collectionName: 'Sentinel-1',
    dateTime: '2024-09-03T16:23:22.625Z',
    cloudCoverage: 39.5,
    gridCode: '33TTG',
    addedForComparison: false,
    selected: false,
    item: multipleResultsInItemMock,
  },
};
