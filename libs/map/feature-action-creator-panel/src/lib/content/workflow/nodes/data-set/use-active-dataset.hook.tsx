import { TDataSetValue, useDataSets } from '@ukri/map/data-access-map';
import { useCallback } from 'react';

// fix for UKRIW-819
const hotFixCollectionNotExistingOnBe = 'sentinel-2';

type TUseActiveDataSet = {
  dataSet: TDataSetValue | undefined;
  error: boolean;
  clearDataSets: () => void;
};

export const useActiveDataSet = (): TUseActiveDataSet => {
  const { dataSets, updateDataSets } = useDataSets();
  const enabled: TDataSetValue[] = [];

  const clearDataSets = useCallback(() => {
    updateDataSets(undefined, 'action-creator');
  }, [updateDataSets]);

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

  if (dataSets.public.auxiliary?.esacciGloballc?.enabled) {
    enabled.push('esacci-globallc');
  }

  const hasError =
    enabled.length > 1 || (enabled.length === 1 && enabled.some((item) => item === hotFixCollectionNotExistingOnBe));

  return {
    dataSet: hasError ? undefined : enabled[0],
    error: hasError,
    clearDataSets,
  };
};
