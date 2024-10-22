import { useDataSets } from '@ukri/map/data-access-map';

type TDataSet = 'sentinel1' | 'sentinel2' | 'sentinel3' | 'sentinel5p';

export const useActiveDataSet = () => {
  const { dataSets, updateDataSets } = useDataSets();
  const enabled: TDataSet[] = [];

  if (dataSets?.copernicus.sentinel1?.enabled) {
    enabled.push('sentinel1');
  }

  if (dataSets?.copernicus.sentinel2?.enabled) {
    enabled.push('sentinel2');
  }

  if (dataSets?.copernicus.sentinel3?.enabled) {
    enabled.push('sentinel3');
  }

  if (dataSets?.copernicus.sentinel5P?.enabled) {
    enabled.push('sentinel5p');
  }

  return {
    dataSet: enabled.length !== 1 ? null : enabled[0],
    error: enabled.length > 1,
    updateDataSets,
  };
};
