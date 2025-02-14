import type { Meta } from '@storybook/react';

import { multipleResultsInItemMock, singleResultInItemMock } from './result-item/response-mocks';
import { ResultsList } from './results-list.component';

const meta: Meta<typeof ResultsList> = {
  component: ResultsList,
  title: 'libs/map/ui-results-view/results-list/ResultsList',
};
export default meta;

export const SingleAssetResultsList = {
  args: {
    features: [
      {
        id: '1',
        ...singleResultInItemMock,
      },
      {
        id: '2',
        ...singleResultInItemMock,
      },
      {
        id: '3',
        ...singleResultInItemMock,
      },
      {
        id: '4',
        ...singleResultInItemMock,
      },
    ],
  },
};

export const MultipleAssetsResultsList = {
  args: {
    type: 'multipleResults',
    features: [
      {
        id: '1',
        ...multipleResultsInItemMock,
      },
      {
        id: '2',
        ...multipleResultsInItemMock,
      },
      {
        id: '3',
        ...multipleResultsInItemMock,
      },
      {
        id: '4',
        ...multipleResultsInItemMock,
      },
    ],
  },
};
