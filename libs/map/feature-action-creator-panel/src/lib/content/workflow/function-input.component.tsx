import { Select } from '@ukri/shared/design-system';

const placeholder = 'GLOBAL.DESIGN_SYSTEM.SELECT.PLACEHOLDER';

const options = [
  { value: undefined, label: placeholder },
  { value: 'NDVI', label: 'NDVI' },
  { value: 'False colour (urban)', label: 'False colour (urban)' },
  { value: 'Moisture index', label: 'Moisture index' },
  { value: 'SWIR', label: 'SWIR' },
  { value: 'NDWI', label: 'NDWI' },
  { value: 'NDSI', label: 'NDSI' },
];

interface IFunctionSelectInputProps {
  visible?: boolean;
}

export const FunctionSelectInput = ({ visible = false }: IFunctionSelectInputProps) => {
  return (
    <Select
      className={`${visible ? 'opacity-0' : 'opacity-100'} w-full`}
      options={options}
      placeholder={placeholder}
      onChange={() => {}}
    />
  );
};
