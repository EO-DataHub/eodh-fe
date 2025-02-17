import { paths } from '../api';

export const collections = ['EarthSearchElement84', 'CEDA'] as const;

export type TCatalogueCollection = typeof collections[number];

export const getCollectionUrl = (collection: TCatalogueCollection | undefined) => {
  switch (collection) {
    case 'EarthSearchElement84': {
      return paths.STAC_ELEMENT_64_CATALOGUE;
    }

    case 'CEDA': {
      return paths.STAC_CEDA_CATALOGUE;
    }

    default: {
      return paths.STAC_ELEMENT_64_CATALOGUE;
    }
  }
};
