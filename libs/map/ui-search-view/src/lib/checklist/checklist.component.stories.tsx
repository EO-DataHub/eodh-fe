import type { Meta } from '@storybook/react';
import { Button } from '@ukri/shared/design-system';
import { useEffect } from 'react';

import { Checklist } from './checklist.component';
import { useChecklistState, useSetValidation, useShowChecklist } from './checklist.store';

const ToggleChecklistButton = () => {
  const { open } = useChecklistState();
  const showChecklist = useShowChecklist();

  return (
    <div className='ml-4'>
      <Button onClick={showChecklist} text='Show Checklist' disabled={open} />
    </div>
  );
};

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

  return (
    <div className='flex justify-end'>
      <Checklist />
      <ToggleChecklistButton />
    </div>
  );
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
