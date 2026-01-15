import { IImageElement } from '@ukri/shared/ui/help';

import cdomImage from './images/CDOM.png';
import cyaImage from './images/CYA.png';
import docImage from './images/DOC.png';
import eviImage from './images/EVI.png';
import ndviImage from './images/NDVI.png';
import ndwiImage from './images/NDWI.png';
import saviImage from './images/SAVI.png';

const T_WQ = 'APP.HELP.SHARED.ASSET.WATER_QUALITY';
const T_VI = 'APP.HELP.SHARED.ASSET.VEGETATION_INDEX';

const createImageElement = (src: string, altKey: string): IImageElement => ({
  type: 'image',
  src,
  alt: altKey,
});

export const waterQualityConfigs = {
  cdom: {
    title: `${T_WQ}.CDOM.TITLE`,
    element: createImageElement(cdomImage, `${T_WQ}.CDOM.ALT`),
  },
  cya_cells: {
    title: `${T_WQ}.CYA.TITLE`,
    element: createImageElement(cyaImage, `${T_WQ}.CYA.ALT`),
  },
  doc: {
    title: `${T_WQ}.DOC.TITLE`,
    element: createImageElement(docImage, `${T_WQ}.DOC.ALT`),
  },
  ndwi: {
    title: `${T_WQ}.NDWI.TITLE`,
    element: createImageElement(ndwiImage, `${T_WQ}.NDWI.ALT`),
  },
};

export const vegetationIndexConfigs = {
  ndvi: {
    title: `${T_VI}.NDVI.TITLE`,
    element: createImageElement(ndviImage, `${T_VI}.NDVI.ALT`),
  },
  evi: {
    title: `${T_VI}.EVI.TITLE`,
    element: createImageElement(eviImage, `${T_VI}.EVI.ALT`),
  },
  savi: {
    title: `${T_VI}.SAVI.TITLE`,
    element: createImageElement(saviImage, `${T_VI}.SAVI.ALT`),
  },
};

export type TWaterQualityAssetName = keyof typeof waterQualityConfigs;
export type TVegetationIndexType = keyof typeof vegetationIndexConfigs;
