import { TFields } from '../../query.model';

export const getSentinel2Fields = (enabled: boolean): TFields => {
  if (!enabled) {
    return {};
  }

  return {
    include: ['properties.eo:cloud_cover', 'properties.grid:code'],
  };
};
