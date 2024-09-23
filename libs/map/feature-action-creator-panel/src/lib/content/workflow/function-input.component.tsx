import { Select } from '@ukri/shared/design-system';

const options = [
  { value: 'NDVI', label: 'NDVI' },
  { value: 'False colour (urban)', label: 'False colour (urban)' },
  { value: 'Moisture index', label: 'Moisture index' },
  { value: 'SWIR', label: 'SWIR' },
  { value: 'NDWI', label: 'NDWI' },
  { value: 'NDSI', label: 'NDSI' },
];

interface IFunctionSelectInputProps {
  visible?: boolean;
  onChange: (value: string) => void;
}

export const FunctionSelectInput = ({ visible = false, onChange }: IFunctionSelectInputProps) => {
  const handleChange = (value?: string | null) => {
    onChange(value || '');
  };

  return <Select className='w-full h-[36px]' options={options} onChange={handleChange} />;
};
