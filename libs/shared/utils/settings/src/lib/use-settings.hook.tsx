export type TAreaUnit = 'km2' | 'miles2';
export type TBaseUnit = 'km' | 'miles';

export const useSettings = () => {
  const aoiLimit = 10000000000;
  const measurementUnit: TBaseUnit = 'km';
  return { aoiLimit, measurementUnit };
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
