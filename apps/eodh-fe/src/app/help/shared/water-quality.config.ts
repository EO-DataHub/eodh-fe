import { IImageElement } from '@ukri/shared/ui/help';

import cdomImage from './images/CDOM.png';
import cyaImage from './images/CYA.png';
import docImage from './images/DOC.png';
import eviImage from './images/EVI.png';
import ndviImage from './images/NDVI.png';
import ndwiImage from './images/NDWI.png';
import saviImage from './images/SAVI.png';
import { IHelpElementConfig } from './shared.types';

const T_WQ = 'APP.HELP.SHARED.ASSET.WATER_QUALITY';
const T_VI = 'APP.HELP.SHARED.ASSET.VEGETATION_INDEX';

const createImageElement = (src: string, altKey: string): IImageElement => ({
  type: 'image',
  src,
  alt: altKey,
});

export const waterQualityImages = {
  cdom: { src: cdomImage, alt: `${T_WQ}.CDOM.ALT`, title: `${T_WQ}.CDOM.TITLE` },
  cya_cells: { src: cyaImage, alt: `${T_WQ}.CYA.ALT`, title: `${T_WQ}.CYA.TITLE` },
  doc: { src: docImage, alt: `${T_WQ}.DOC.ALT`, title: `${T_WQ}.DOC.TITLE` },
  ndwi: { src: ndwiImage, alt: `${T_WQ}.NDWI.ALT`, title: `${T_WQ}.NDWI.TITLE` },
  data: { src: ndwiImage, alt: `${T_WQ}.DATA.ALT`, title: `${T_WQ}.DATA.TITLE` },
} as const;

export const vegetationIndexImages = {
  ndvi: { src: ndviImage, alt: `${T_VI}.NDVI.ALT`, title: `${T_VI}.NDVI.TITLE` },
  evi: { src: eviImage, alt: `${T_VI}.EVI.ALT`, title: `${T_VI}.EVI.TITLE` },
  savi: { src: saviImage, alt: `${T_VI}.SAVI.ALT`, title: `${T_VI}.SAVI.TITLE` },
  nbr: { src: ndwiImage, alt: `${T_VI}.NBR.ALT`, title: `${T_VI}.NBR.TITLE` },
  ntu: { src: ndwiImage, alt: `${T_WQ}.TURB.ALT`, title: `${T_WQ}.TURB.TITLE` },
} as const;

export const waterQualityConfigs: Record<string, IHelpElementConfig> = {
  cdom: {
    title: waterQualityImages.cdom.title,
    element: createImageElement(waterQualityImages.cdom.src, waterQualityImages.cdom.alt),
  },
  cya_cells: {
    title: waterQualityImages.cya_cells.title,
    element: createImageElement(waterQualityImages.cya_cells.src, waterQualityImages.cya_cells.alt),
  },
  doc: {
    title: waterQualityImages.doc.title,
    element: createImageElement(waterQualityImages.doc.src, waterQualityImages.doc.alt),
  },
  ndwi: {
    title: waterQualityImages.ndwi.title,
    element: createImageElement(waterQualityImages.ndwi.src, waterQualityImages.ndwi.alt),
  },
  data: {
    title: waterQualityImages.data.title,
    element: createImageElement(waterQualityImages.data.src, waterQualityImages.data.alt),
  },
};

export const vegetationIndexConfigs: Record<string, IHelpElementConfig> = {
  ndvi: {
    title: vegetationIndexImages.ndvi.title,
    element: createImageElement(vegetationIndexImages.ndvi.src, vegetationIndexImages.ndvi.alt),
  },
  evi: {
    title: vegetationIndexImages.evi.title,
    element: createImageElement(vegetationIndexImages.evi.src, vegetationIndexImages.evi.alt),
  },
  savi: {
    title: vegetationIndexImages.savi.title,
    element: createImageElement(vegetationIndexImages.savi.src, vegetationIndexImages.savi.alt),
  },
  nbr: {
    title: vegetationIndexImages.nbr.title,
    element: createImageElement(vegetationIndexImages.nbr.src, vegetationIndexImages.nbr.alt),
  },
  ntu: {
    title: vegetationIndexImages.ntu.title,
    element: createImageElement(vegetationIndexImages.ntu.src, vegetationIndexImages.ntu.alt),
  },
};
