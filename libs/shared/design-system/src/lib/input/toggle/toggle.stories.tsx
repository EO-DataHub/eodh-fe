import type { Meta } from '@storybook/react';
import { useEffect, useState } from 'react';

import { Toggle } from './toggle';

type TTemplateProps = {
  id: string;
  checked: boolean;
  label: string;
  disabled: boolean;
};

const Template = ({ id, checked, label, disabled }: TTemplateProps) => {
  const [value, setValue] = useState(checked);

  useEffect(() => {
    setValue(checked);
  }, [checked]);

  return (
    <Toggle
      id={id}
      label={label}
      disabled={disabled}
      checked={value}
      onChange={(selectedValue) => setValue(selectedValue)}
    />
  );
};

const meta: Meta<TTemplateProps> = {
  title: 'libs/shared/design-system/input/Toggle',
  component: Template,
};

export default meta;

export const Default = {
  args: {
    id: 'primary',
    checked: true,
    label: 'Sample label',
    disabled: false,
  },
};
