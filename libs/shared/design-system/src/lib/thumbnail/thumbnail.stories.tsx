import type { Meta } from '@storybook/react';

import { Thumbnail } from './thumbnail';

const meta: Meta<typeof Thumbnail> = {
  component: Thumbnail,
  title: 'libs/shared/design-system/Thumbnail',
};
export default meta;

const imageUrlStoredInPublicAssetsInStorybookHost = '/assets/images/imageSample2.png';

export const SampleThumbnail = {
  args: {
    imageUrl: imageUrlStoredInPublicAssetsInStorybookHost,
    collectionName: 'Sentinel-1',
    date: '2024-06-11',
    time: '10:19:29 UTC',
    cloudCoverage: '39.5%',
    gridCode: '33TTG',
    addedForComparison: false,
    selected: false,
  },
};
