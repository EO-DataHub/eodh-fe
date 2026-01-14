import { TVegetationIndexType } from '@ukri/map/data-access-map';

export const VEGETATION_INDEX_UNITS: Record<string, TVegetationIndexType> = {
  NDVI: 'ndvi',
  EVI: 'evi',
  SAVI: 'savi',
  NDWI: 'ndwi',
};

export const WATER_QUALITY_UNITS: readonly string[] = ['1e6 cells / mL', 'mg / m3', 'NTU', 'ug / L'];

export const isVegetationIndexUnit = (unit: string | undefined): boolean => {
  if (!unit) {
    return false;
  }
  return Object.keys(VEGETATION_INDEX_UNITS).includes(unit.toUpperCase());
};

export const getVegetationIndexTypeFromUnit = (unit: string | undefined): TVegetationIndexType | undefined => {
  if (!unit) {
    return undefined;
  }
  return VEGETATION_INDEX_UNITS[unit.toUpperCase()];
};

interface IAssetWithColormap {
  readonly colormap?: {
    readonly units?: string;
  };
  readonly 'raster:bands'?: ReadonlyArray<{
    readonly unit?: string;
  }>;
}

const getAssetFromFeature = (feature: unknown, assetName: string): IAssetWithColormap | undefined => {
  if (!feature || typeof feature !== 'object') {
    return undefined;
  }

  const featureObj = feature as Record<string, unknown>;
  const assets = featureObj.assets as Record<string, unknown> | undefined;

  if (!assets || typeof assets !== 'object') {
    return undefined;
  }

  return assets[assetName] as IAssetWithColormap | undefined;
};

export const detectVegetationIndexFromAsset = (
  feature: unknown,
  assetName: string
): TVegetationIndexType | undefined => {
  const asset = getAssetFromFeature(feature, assetName);

  if (!asset) {
    return undefined;
  }

  const colormapUnit = asset.colormap?.units;
  if (colormapUnit) {
    const vegIndex = getVegetationIndexTypeFromUnit(colormapUnit);
    if (vegIndex) {
      return vegIndex;
    }
  }

  const rasterBandUnit = asset['raster:bands']?.[0]?.unit;
  if (rasterBandUnit) {
    const vegIndex = getVegetationIndexTypeFromUnit(rasterBandUnit);
    if (vegIndex) {
      return vegIndex;
    }
  }

  return undefined;
};

export const isVegetationIndexAsset = (feature: unknown, assetName: string): boolean => {
  return detectVegetationIndexFromAsset(feature, assetName) !== undefined;
};
