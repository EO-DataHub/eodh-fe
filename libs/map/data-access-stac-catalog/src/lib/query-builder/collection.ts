import { paths } from '../api';

export const collections = ['element64', 'ard'] as const;

export type TCatalogueCollection = typeof collections[number];

export const getCollectionUrl = (collection: TCatalogueCollection | undefined) => {
  switch (collection) {
    case 'element64': {
      return paths.STAC_ELEMENT_64_CATALOGUE;
    }

    case 'ard': {
      return paths.STAC_CEDA_CATALOGUE;
    }

    default: {
      return paths.STAC_ELEMENT_64_CATALOGUE;
    }
  }
};
