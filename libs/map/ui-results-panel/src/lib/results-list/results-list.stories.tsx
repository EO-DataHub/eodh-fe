import type { Meta } from '@storybook/react';

import { ResultsList } from './results-list.component';

const imageUrlStoredInPublicAssetsInStorybookHost = '/assets/images/imageSample2.png';

const singleElementMock = {
  imageUrl: imageUrlStoredInPublicAssetsInStorybookHost,
  collectionName: 'Sentinel-1',
  date: '2024-06-11',
  time: '10:19:29 UTC',
  cloudCoverage: '39.5%',
  gridCode: '33TTG',
  addedForComparison: false,
  selected: true,
};

const meta: Meta<typeof ResultsList> = {
  component: ResultsList,
  title: 'libs/map/ui-results-panel/results-list/ResultsList',
};
export default meta;

export const ResultsListSample = {
  args: {
    results: [
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
