import type { Meta } from '@storybook/react';

import { ResultItem } from './result-item';

const meta: Meta<typeof ResultItem> = {
  component: ResultItem,
  title: 'libs/shared/design-system/ResultItem',
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
  },
};
