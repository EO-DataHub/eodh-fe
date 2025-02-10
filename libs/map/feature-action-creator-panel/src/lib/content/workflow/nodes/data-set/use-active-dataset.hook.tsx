import { TDataSetValue, useDataSets } from '@ukri/map/data-access-map';

type TUseActiveDataSet = {
  dataSet: TDataSetValue | undefined;
  error: boolean;
  updateDataSets: ReturnType<typeof useDataSets>['updateDataSets'];
};

export const useActiveDataSet = (): TUseActiveDataSet => {
  const { dataSets, updateDataSets } = useDataSets();
  const enabled: TDataSetValue[] = [];

  if (dataSets?.public.copernicus.sentinel1?.enabled) {
    enabled.push('sentinel-1');
  }

  if (dataSets?.public.copernicus.sentinel2?.enabled) {
    if (
      dataSets?.public.copernicus.sentinel2?.l1c &&
      !dataSets?.public.copernicus.sentinel2?.l2a &&
      !dataSets?.public.copernicus.sentinel2?.l2aARD
    ) {
      enabled.push('sentinel-2-l1c');
    } else if (
      !dataSets?.public.copernicus.sentinel2?.l1c &&
      dataSets?.public.copernicus.sentinel2?.l2a &&
      !dataSets?.public.copernicus.sentinel2?.l2aARD
    ) {
      enabled.push('sentinel-2-l2a');
    } else if (
      !dataSets?.public.copernicus.sentinel2?.l1c &&
      !dataSets?.public.copernicus.sentinel2?.l2a &&
      dataSets?.public.copernicus.sentinel2?.l2aARD
    ) {
      enabled.push('sentinel-2-l2a-ard');
    }
  }

  if (dataSets?.public.copernicus.sentinel3?.enabled) {
    enabled.push('sentinel-3');
  }

  if (dataSets?.public.copernicus.sentinel5P?.enabled) {
    enabled.push('sentinel-5p');
  }

  if (dataSets?.public.copernicus.sentinel5P?.enabled) {
    enabled.push('sentinel-5p');
  }

  if (dataSets?.public.auxiliary?.esacciGloballc?.enabled) {
    enabled.push('esacci-globallc');
  }

  if (dataSets?.public.auxiliary?.clmsCorinelc?.enabled) {
    enabled.push('clms-corinelc');
  }

  if (dataSets?.public.auxiliary?.clmsWaterBodies?.enabled) {
    enabled.push('clms-water-bodies');
  }

  return {
    dataSet: enabled.length !== 1 ? undefined : enabled[0],
    error: enabled.length > 1,
    updateDataSets,
  };
};
