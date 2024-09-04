import { TCatalogSearchParams, TFilterParam } from '../../../query.model';

type TAcquisitionIwMode = 'vv+vv_vh' | 'vv' | 'vv_vh' | undefined;

const getIwAcquisitionMode = (
  acquisitionMode: TCatalogSearchParams['copernicus']['sentinel1']['acquisitionMode']
): TAcquisitionIwMode => {
  if (acquisitionMode.vv && acquisitionMode.vv_vh) {
    return 'vv+vv_vh';
  } else if (acquisitionMode.vv) {
    return 'vv';
  } else if (acquisitionMode.vv_vh) {
    return 'vv_vh';
  }

  return undefined;
};

const createPolarizationFilter = (mode: TAcquisitionIwMode): TFilterParam[] => {
  if (!mode) {
    return [];
  }

  const baseFilter: TFilterParam = {
    op: '=',
    args: [{ property: 'properties.sar:instrument_mode' }, 'IW'],
  };

  const polarizationFilters: Record<NonNullable<TAcquisitionIwMode>, TFilterParam[]> = {
    'vv+vv_vh': [
      {
        op: 'and',
        args: [
          { op: 'in', args: [{ property: 'properties.sar:polarizations' }, ['VV']] },
          { op: 'in', args: [{ property: 'properties.sar:polarizations' }, ['VH']] },
        ],
      },
    ],
    vv: [
      { op: 'in', args: [{ property: 'properties.sar:polarizations' }, ['VV']] },
      {
        op: 'not',
        args: [{ op: 'in', args: [{ property: 'properties.sar:polarizations' }, ['VH']] }],
      },
    ],
    vv_vh: [
      {
        op: 'or',
        args: [
          { op: 'in', args: [{ property: 'properties.sar:polarizations' }, ['VV']] },
          { op: 'in', args: [{ property: 'properties.sar:polarizations' }, ['VH']] },
        ],
      },
    ],
  };

  return [{ op: 'and', args: [baseFilter, ...polarizationFilters[mode]] }];
};

export const getIwFilterParams = (
  params: Omit<TCatalogSearchParams['copernicus']['sentinel1'], 'enabled'>
): TFilterParam[] => {
  if (!params.acquisitionMode.iw) {
    return [];
  }

  const mode = getIwAcquisitionMode(params.acquisitionMode);
  return createPolarizationFilter(mode);
};
