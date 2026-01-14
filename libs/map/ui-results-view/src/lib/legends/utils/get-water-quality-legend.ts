import { vegetationIndexLegendImages, waterQualityLegendImages } from '../configs/water-quality-images.config';
import { IImageLegendConfig, TWaterQualityAssetName } from '../types/legend.types';
import { detectVegetationIndexFromAsset } from './detect-vegetation-index';

export const getWaterQualityLegend = (assetName: string, feature?: unknown): IImageLegendConfig | null => {
  if (assetName in waterQualityLegendImages) {
    const info = waterQualityLegendImages[assetName as TWaterQualityAssetName];
    return {
      type: 'image',
      title: info.title,
      src: info.src,
      alt: info.alt,
    };
  }

  if (assetName in vegetationIndexLegendImages) {
    const info = vegetationIndexLegendImages[assetName];
    return {
      type: 'image',
      title: info.title,
      src: info.src,
      alt: info.alt,
    };
  }

  if (assetName === 'data' && feature) {
    const vegetationIndex = detectVegetationIndexFromAsset(feature, assetName);
    if (vegetationIndex && vegetationIndex in vegetationIndexLegendImages) {
      const info = vegetationIndexLegendImages[vegetationIndex];
      return {
        type: 'image',
        title: info.title,
        src: info.src,
        alt: info.alt,
      };
    }
  }

  return null;
};

export const isWaterQualityAsset = (assetName: string): boolean => {
  return assetName in waterQualityLegendImages || assetName in vegetationIndexLegendImages;
};
