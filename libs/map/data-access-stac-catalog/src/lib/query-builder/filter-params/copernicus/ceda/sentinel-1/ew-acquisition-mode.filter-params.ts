import { TCopernicusSearchParams, TFilterParam } from '../../../../query.model';

type TAcquisitionEwMode = 'hh+hh_hv' | 'hh' | 'hh_hv' | undefined;

const getEwAcquisitionMode = (
  acquisitionMode: TCopernicusSearchParams['sentinel1']['acquisitionMode']
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
    args: [{ property: 'properties.instrument_mode' }, 'EW'],
  };

  const polarizationFilters: Record<NonNullable<TAcquisitionEwMode>, TFilterParam[]> = {
    'hh+hh_hv': [
      {
        op: 'and',
        args: [
          { op: 'in', args: [{ property: 'properties.Polarisation' }, ['HH']] },
          { op: 'in', args: [{ property: 'properties.Polarisation' }, ['HV']] },
        ],
      },
    ],
    hh: [
      { op: 'in', args: [{ property: 'properties.Polarisation' }, ['HH']] },
      {
        op: 'not',
        args: [{ op: 'in', args: [{ property: 'properties.Polarisation' }, ['HV']] }],
      },
    ],
    hh_hv: [
      {
        op: 'or',
        args: [
          { op: 'in', args: [{ property: 'properties.Polarisation' }, ['HH']] },
          { op: 'in', args: [{ property: 'properties.Polarisation' }, ['HV']] },
        ],
      },
    ],
  };

  return [{ op: 'and', args: [baseFilter, ...polarizationFilters[mode]] }];
};

export const getEwFilterParams = (params: Omit<TCopernicusSearchParams['sentinel1'], 'enabled'>): TFilterParam[] => {
  if (!params.acquisitionMode.ew) {
    return [];
  }

  const mode = getEwAcquisitionMode(params.acquisitionMode);
  return createPolarizationFilter(mode);
};
