import { TDataSetsFunction } from '@ukri/map/data-access-map';
import { Select } from '@ukri/shared/design-system';
import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

interface INodeSelectProps {
  value: TDataSetsFunction | undefined;
  onChange?: (value: TDataSetsFunction | undefined) => void;
}

const labelPath = 'MAP.ACTION_CREATOR_PANEL.NODE.FUNCTION.OPTIONS';

export const NodeSelect = ({ value, onChange }: INodeSelectProps) => {
  const { t } = useTranslation();

  const options = useMemo((): { value: TDataSetsFunction; label: string }[] => {
    return [
      { value: 'NDVI', label: t(`${labelPath}.NDVI`) },
      { value: 'FALSE_COLOR', label: t(`${labelPath}.FALSE_COLOUR`) },
      { value: 'MOISTURE_INDEX', label: t(`${labelPath}.MOISTURE_INDEX`) },
      { value: 'SWIR', label: t(`${labelPath}.SWIR`) },
      { value: 'NDWI', label: t(`${labelPath}.NDWI`) },
      { value: 'NDSI', label: t(`${labelPath}.NDSI`) },
    ];
  }, [t]);

  const handleChange = useCallback(
    (value?: string | null | undefined) => {
      if (onChange) {
        onChange(value as TDataSetsFunction);
      }
    },
    [onChange]
  );

  return <Select className='w-full h-[26px]' options={options} value={value} onChange={handleChange} />;
};
