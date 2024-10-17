import { useDataSets } from '@ukri/map/data-access-map';

type TDataSet = 'sentinel-1' | 'sentinel-2-l1c' | 'sentinel-2-l2a' | 'sentinel-3' | 'sentinel-5p';

export const useActiveDataSet = () => {
  const { dataSets, updateDataSets } = useDataSets();
  const enabled: TDataSet[] = [];

  if (dataSets?.copernicus.sentinel1?.enabled) {
    enabled.push('sentinel-1');
  }

  if (dataSets?.copernicus.sentinel2?.enabled) {
    if (dataSets?.copernicus.sentinel2?.l1c) {
      enabled.push('sentinel-2-l1c');
    } else if (dataSets?.copernicus.sentinel2?.l2a) {
      enabled.push('sentinel-2-l2a');
    }
  }

  if (dataSets?.copernicus.sentinel3?.enabled) {
    enabled.push('sentinel-3');
  }

  if (dataSets?.copernicus.sentinel5P?.enabled) {
    enabled.push('sentinel-5p');
  }

  return {
    dataSet: enabled.length !== 1 ? null : enabled[0],
    error: enabled.length > 1,
    updateDataSets,
  };
};
