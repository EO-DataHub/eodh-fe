import { Select } from '@ukri/shared/design-system';
import { useCallback } from 'react';

export type TValue = {
  value: string;
  supportedDataSets: string[];
};

export type TOption = {
  value: TValue;
  label: string;
  disabled?: boolean;
};

interface INodeSelectProps {
  value: TValue | undefined;
  disabled?: boolean;
  options: TOption[];
  onChange?: (value: TValue | undefined | null) => void;
}

export const NodeSelect = ({ value, options, disabled, onChange }: INodeSelectProps) => {
  const handleChange = useCallback(
    (value?: TValue | undefined | null) => {
      if (onChange) {
        onChange(value);
      }
    },
    [onChange]
  );

  return (
    <Select size='sm' className='w-full' options={options} value={value} disabled={disabled} onChange={handleChange} />
  );
};
