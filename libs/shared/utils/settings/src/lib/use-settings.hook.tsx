import { useContext } from 'react';

import { SettingsContext } from './settings.provider';

export type TAreaUnit = 'km2' | 'miles2';
export type TBaseUnit = 'km' | 'miles';

export const useSettings = () => {
  const { settings } = useContext(SettingsContext);

  const aoiLimit = 10000000000;
  const measurementUnit: TBaseUnit = 'km';
  const numberFormatting = 'en-US';
  return { ...settings, aoiLimit, measurementUnit, numberFormatting };
};

export const convertBaseUnitToAreaUnit = (unit: 'km' | 'miles'): TAreaUnit => {
  switch (unit) {
    case 'km': {
      return 'km2';
    }

    case 'miles': {
      return 'miles2';
    }
  }
};
