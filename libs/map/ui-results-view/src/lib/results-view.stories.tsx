import type { Meta } from '@storybook/react';

import { ResultsView } from './results-view.component';

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

const results = [
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
];

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
