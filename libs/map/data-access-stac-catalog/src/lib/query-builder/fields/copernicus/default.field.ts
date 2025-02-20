import { TFields } from '../../query.model';

export const getDefaultFields = (): TFields => {
  return {
    include: [
      'type',
      'geometry',
      'properties.datetime',
      'id',
      'bbox',
      'stac_version',
      'stac_extensions',
      'assets',
      'links',
      'collection',
    ],
  };
};
