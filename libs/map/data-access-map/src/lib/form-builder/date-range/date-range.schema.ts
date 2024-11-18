import { createDateString, formatDate } from '@ukri/shared/utils/date';

import { IDateRangeModel } from './date-range.model';

const oneMonthAgo = () => {
  const today = new Date();
  const oneMonthAgo = new Date();
  oneMonthAgo.setMonth(today.getMonth() - 1);

  return oneMonthAgo;
};

export const treeModel: IDateRangeModel[] = [
  {
    translationKey: 'MAP.SEARCH_VIEW.DATE_RANGE_PICKER.TITLE',
    type: 'dateRange',
    controls: {
      expand: {
        name: 'expanded',
        type: 'expand',
        value: true,
      },
    },
    children: [
      {
        translationKey: 'MAP.SEARCH_VIEW.DATE_RANGE_PICKER.SEARCH_FROM',
        type: 'datepicker',
        options: {
          disabled: false,
        },
        name: 'from',
        value: formatDate(createDateString(oneMonthAgo())),
      },
      {
        translationKey: 'MAP.SEARCH_VIEW.DATE_RANGE_PICKER.SEARCH_TO',
        type: 'datepicker',
        options: {
          disabled: false,
        },
        name: 'to',
        value: formatDate(createDateString(new Date())),
      },
    ],
  },
];
