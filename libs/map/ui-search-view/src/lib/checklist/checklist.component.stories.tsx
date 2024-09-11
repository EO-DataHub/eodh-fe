import type { Meta } from '@storybook/react';
import { useEffect } from 'react';

import { Checklist } from './checklist.component';
import { useSetValidation } from './checklist.store';

const Template = ({
  aoiValid = false,
  dataSetsValid = false,
  dateRangeValid = false,
}: {
  aoiValid: boolean;
  dataSetsValid: boolean;
  dateRangeValid: boolean;
}) => {
  const { setAoiValid, setDataSetsValid, setDateRangeValid } = useSetValidation();

  useEffect(() => {
    setAoiValid(aoiValid);
    setDataSetsValid(dataSetsValid);
    setDateRangeValid(dateRangeValid);
  }, [aoiValid, dataSetsValid, dateRangeValid, setAoiValid, setDataSetsValid, setDateRangeValid]);

  return <Checklist />;
};

const meta: Meta<typeof Template> = {
  component: Template,
  title: 'libs/map/ui-search-view/Checklist',
  parameters: {
    controls: {
      exclude: ['aoiValid', 'dataSetsValid', 'dateRangeValid'],
    },
  },
};
export default meta;

export const AllInvalid = {
  args: {
    aoiValid: false,
    dataSetsValid: false,
    dateRangeValid: false,
  },
};

export const AoiValid = {
  args: {
    aoiValid: true,
    dataSetsValid: false,
    dateRangeValid: false,
  },
};

export const DataSetsValid = {
  args: {
    aoiValid: false,
    dataSetsValid: true,
    dateRangeValid: false,
  },
};

export const DateRangeValid = {
  args: {
    aoiValid: false,
    dataSetsValid: false,
    dateRangeValid: true,
  },
};

export const AllValid = {
  args: {
    aoiValid: true,
    dataSetsValid: true,
    dateRangeValid: true,
  },
};
