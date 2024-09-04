import { TCatalogSearchParams, TFilterParam } from '../../../query.model';

type TAcquisitionEwMode = 'hh+hh_hv' | 'hh' | 'hh_hv' | undefined;

const getEwAcquisitionMode = (
  acquisitionMode: TCatalogSearchParams['copernicus']['sentinel1']['acquisitionMode']
): TAcquisitionEwMode => {
  if (acquisitionMode.hh && acquisitionMode.hh_hv) {
    return 'hh+hh_hv';
  } else if (acquisitionMode.hh) {
    return 'hh';
  } else if (acquisitionMode.hh_hv) {
    return 'hh_hv';
  }

  return undefined;
};

const createPolarizationFilter = (mode: TAcquisitionEwMode): TFilterParam[] => {
  if (!mode) {
    return [];
  }

  const baseFilter: TFilterParam = {
    op: '=',
    args: [{ property: 'properties.sar:instrument_mode' }, 'EW'],
  };

  const polarizationFilters: Record<NonNullable<TAcquisitionEwMode>, TFilterParam[]> = {
    'hh+hh_hv': [
      {
        op: 'and',
        args: [
          { op: 'in', args: [{ property: 'properties.sar:polarizations' }, ['HH']] },
          { op: 'in', args: [{ property: 'properties.sar:polarizations' }, ['HV']] },
        ],
      },
    ],
    hh: [
      { op: 'in', args: [{ property: 'properties.sar:polarizations' }, ['HH']] },
      {
        op: 'not',
        args: [{ op: 'in', args: [{ property: 'properties.sar:polarizations' }, ['HV']] }],
      },
    ],
    hh_hv: [
      {
        op: 'or',
        args: [
          { op: 'in', args: [{ property: 'properties.sar:polarizations' }, ['HH']] },
          { op: 'in', args: [{ property: 'properties.sar:polarizations' }, ['HV']] },
        ],
      },
    ],
  };

  return [{ op: 'and', args: [baseFilter, ...polarizationFilters[mode]] }];
};

export const getEwFilterParams = (
  params: Omit<TCatalogSearchParams['copernicus']['sentinel1'], 'enabled'>
): TFilterParam[] => {
  if (!params.acquisitionMode.ew) {
    return [];
  }

  const mode = getEwAcquisitionMode(params.acquisitionMode);
  return createPolarizationFilter(mode);
};
