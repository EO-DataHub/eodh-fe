import { IWaterQualityLegendInfo, TWaterQualityAssetName } from '../types/legend.types';

const IMAGES_PATH = '/assets/images';

export const waterQualityLegendImages: Record<TWaterQualityAssetName, IWaterQualityLegendInfo> = {
  cdom: {
    src: `${IMAGES_PATH}/CDOM.png`,
    title: 'CDOM',
    alt: 'CDOM (Coloured Dissolved Organic Matter) color scale',
  },
  cya_cells: {
    src: `${IMAGES_PATH}/CYA.png`,
    title: 'CYA',
    alt: 'CYA (Cyanobacteria) color scale',
  },
  doc: {
    src: `${IMAGES_PATH}/DOC.png`,
    title: 'DOC',
    alt: 'DOC (Dissolved Organic Carbon) color scale',
  },
  turb: {
    src: `${IMAGES_PATH}/TURB.png`,
    title: 'Turbidity',
    alt: 'Turbidity color scale',
  },
  ndwi: {
    src: `${IMAGES_PATH}/NDWI.png`,
    title: 'NDWI',
    alt: 'NDWI (Normalised Difference Water Index) color scale',
  },
  data: {
    src: `${IMAGES_PATH}/NDWI.png`,
    title: 'Water Quality',
    alt: 'Water quality color scale',
  },
};

export const vegetationIndexLegendImages: Record<string, IWaterQualityLegendInfo> = {
  ndvi: {
    src: `${IMAGES_PATH}/NDVI.png`,
    title: 'NDVI',
    alt: 'NDVI (Normalised Difference Vegetation Index) color scale',
  },
  evi: {
    src: `${IMAGES_PATH}/EVI.png`,
    title: 'EVI',
    alt: 'EVI (Enhanced Vegetation Index) color scale',
  },
  savi: {
    src: `${IMAGES_PATH}/SAVI.png`,
    title: 'SAVI',
    alt: 'SAVI (Soil Adjusted Vegetation Index) color scale',
  },
};
