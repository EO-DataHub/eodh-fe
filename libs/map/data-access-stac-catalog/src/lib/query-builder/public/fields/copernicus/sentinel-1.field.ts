import { TFields } from '../../../query.model';

export const getCedaFields = (): TFields => {
  return {
    include: ['properties.instrument_mode', 'properties.Polarisation', 'properties.Orbit Direction'],
  };
};

export const getEarthSearchElement84Fields = (): TFields => {
  return {
    include: ['properties.sar:instrument_mode', 'properties.sar:polarizations', 'properties.sat:orbit_state'],
  };
};

export const getSentinel1Fields = (enabled: boolean): TFields => {
  if (!enabled) {
    return {};
  }

  return [getCedaFields(), getEarthSearchElement84Fields()].reduce(
    (acc, val) => ({
      include: [...new Set(val.include || []), ...new Set(acc.include || [])],
      exclude: [...new Set(val.exclude || []), ...new Set(acc.exclude || [])],
    }),
    {}
  );
};
