import type { Meta } from '@storybook/react';
import { useEffect, useState } from 'react';

import { Switch } from './switch';

type TTemplateProps = {
  id: string;
  checked: boolean;
  labelDisabled: string;
  labelEnabled: string;
  disabled: boolean;
};

const Template = ({ id, checked, labelDisabled, labelEnabled, disabled }: TTemplateProps) => {
  const [value, setValue] = useState(checked);

  useEffect(() => {
    setValue(checked);
  }, [checked]);

  return (
    <Switch
      id={id}
      labelDisabled={labelDisabled}
      labelEnabled={labelEnabled}
      disabled={disabled}
      checked={value}
      onChange={(selectedValue) => setValue(selectedValue)}
    />
  );
};

const meta: Meta<TTemplateProps> = {
  title: 'libs/shared/design-system/input/Switch',
  component: Template,
};

export default meta;

export const Default = {
  args: {
    id: 'primary',
    checked: true,
    labelDisabled: 'Value 1',
    labelEnabled: 'Value 2',
    disabled: false,
  },
};
