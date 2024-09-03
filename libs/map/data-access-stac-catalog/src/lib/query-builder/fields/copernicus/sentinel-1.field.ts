import { TFields } from '../../query.model';

export const getSentinel1Fields = (enabled: boolean): TFields => {
  if (!enabled) {
    return {};
  }

  return {
    include: ['properties.sar:instrument_mode', 'properties.sar:polarizations', 'properties.sat:orbit_state'],
  };
};
