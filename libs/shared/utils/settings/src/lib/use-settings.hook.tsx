export const useSettings = () => {
  const aoiLimit = 1000000000;
  const measurmentUnit: 'km' | 'miles' = 'km';
  return { aoiLimit, measurmentUnit };
};
