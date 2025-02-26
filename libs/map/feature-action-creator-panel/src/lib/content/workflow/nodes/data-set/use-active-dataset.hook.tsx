import { TDataSetValue, useDataSets } from '@ukri/map/data-access-map';

// fix for UKRIW-819
const hotFixCollectionNotExistingOnBe = 'sentinel-2';

type TUseActiveDataSet = {
  dataSet: TDataSetValue | undefined;
  error: boolean;
  updateDataSets: ReturnType<typeof useDataSets>['updateDataSets'];
};

export const useActiveDataSet = (): TUseActiveDataSet => {
  const { dataSets, updateDataSets } = useDataSets();
  const enabled: TDataSetValue[] = [];

  if (dataSets.public.copernicus.sentinel1?.enabled) {
    enabled.push('sentinel-1');
  }

  if (dataSets.public.copernicus.sentinel2?.enabled) {
    const { l2aARD: l2ard } = dataSets.public.copernicus.sentinel2;

    if (l2ard) {
      enabled.push('sentinel-2-l2a-ard');
    } else {
      enabled.push(hotFixCollectionNotExistingOnBe);
    }
  }

  if (dataSets.public.copernicus.sentinel3?.enabled) {
    enabled.push('sentinel-3');
  }

  if (dataSets.public.copernicus.sentinel5P?.enabled) {
    enabled.push('sentinel-5p');
  }

  if (dataSets.public.auxiliary?.esacciGloballc?.enabled) {
    enabled.push('esacci-globallc');
  }

  if (dataSets.public.auxiliary?.clmsCorinelc?.enabled) {
    enabled.push('clms-corinelc');
  }

  if (dataSets.public.auxiliary?.clmsWaterBodies?.enabled) {
    enabled.push('clms-water-bodies');
  }

  const hasError =
    enabled.length > 1 || (enabled.length === 1 && enabled.some((item) => item === hotFixCollectionNotExistingOnBe));

  return {
    dataSet: hasError ? undefined : enabled[0],
    error: hasError,
    updateDataSets,
  };
};
