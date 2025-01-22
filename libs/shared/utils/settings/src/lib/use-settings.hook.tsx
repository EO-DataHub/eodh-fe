export type TUnitType = 'km' | 'km2' | 'miles' | 'miles2';

export const useSettings = () => {
  const aoiLimit = 1000000000;
  const measurementUnit: TUnitType = 'km2';
  return { aoiLimit, measurementUnit };
};
