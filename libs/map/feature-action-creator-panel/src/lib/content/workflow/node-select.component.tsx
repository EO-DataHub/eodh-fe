import { Select } from '@ukri/shared/design-system';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

interface INodeSelectProps {
  onChange?: (value: string) => void;
}

const labelPath = 'MAP.ACTION_CREATOR_PANEL.NODE.FUNCTION.OPTIONS';

export const NodeSelect = ({ onChange }: INodeSelectProps) => {
  const { t } = useTranslation();

  const options = useMemo(() => {
    return [
      { value: 'NDVI', label: t(`${labelPath}.NDVI`) },
      { value: 'False colour (urban)', label: t(`${labelPath}.FALSE_COLOUR`) },
      { value: 'Moisture index', label: t(`${labelPath}.MOISTURE_INDEX`) },
      { value: 'SWIR', label: t(`${labelPath}.SWIR`) },
      { value: 'NDWI', label: t(`${labelPath}.NDWI`) },
      { value: 'NDSI', label: t(`${labelPath}.NDSI`) },
    ];
  }, [t]);

  const handleChange = (value?: string | null) => {
    if (onChange) {
      onChange(value || '');
    }
  };

  return <Select className='w-full h-[26px]' options={options} onChange={handleChange} />;
};
