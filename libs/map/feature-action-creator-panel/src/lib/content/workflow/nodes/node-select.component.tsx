import { Select } from '@ukri/shared/design-system';
import { useCallback } from 'react';

export type TOption = {
  value: string;
  label: string;
};

interface INodeSelectProps {
  value: string | undefined;
  disabled?: boolean;
  options: TOption[];
  onChange?: (value: string | null | undefined) => void;
}

export const NodeSelect = ({ value, options, disabled, onChange }: INodeSelectProps) => {
  const handleChange = useCallback(
    (value?: string | null | undefined) => {
      if (onChange) {
        onChange(value);
      }
    },
    [onChange]
  );

  return (
    <Select className='w-full h-[26px]' options={options} value={value} disabled={disabled} onChange={handleChange} />
  );
};
