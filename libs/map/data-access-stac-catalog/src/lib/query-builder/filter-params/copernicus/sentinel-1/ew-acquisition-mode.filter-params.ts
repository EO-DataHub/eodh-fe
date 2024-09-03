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

export const getEwFilterParams = (
  params: Omit<TCatalogSearchParams['copernicus']['sentinel1'], 'enabled'>
): TFilterParam[] => {
  const args: TFilterParam[] = [];

  if (!params.acquisitionMode.ew) {
    return args;
  }

  switch (getEwAcquisitionMode(params.acquisitionMode)) {
    case 'hh+hh_hv': {
      args.push({
        op: 'and',
        args: [
          {
            op: '=',
            args: [{ property: 'properties.sar:instrument_mode' }, 'EW'],
          },
          {
            op: 'and',
            args: [
              {
                op: 'in',
                args: [{ property: 'properties.sar:polarizations' }, ['HH']],
              },
              {
                op: 'in',
                args: [{ property: 'properties.sar:polarizations' }, ['HV']],
              },
            ],
          },
        ],
      });
      break;
    }

    case 'hh': {
      args.push({
        op: 'and',
        args: [
          {
            op: '=',
            args: [{ property: 'properties.sar:instrument_mode' }, 'EW'],
          },
          {
            op: 'in',
            args: [{ property: 'properties.sar:polarizations' }, ['HH']],
          },
          {
            op: 'not',
            args: [
              {
                op: 'in',
                args: [{ property: 'properties.sar:polarizations' }, ['HV']],
              },
            ],
          },
        ],
      });
      break;
    }

    case 'hh_hv': {
      args.push({
        op: 'and',
        args: [
          {
            op: '=',
            args: [{ property: 'properties.sar:instrument_mode' }, 'EW'],
          },
          {
            op: 'or',
            args: [
              {
                op: 'in',
                args: [{ property: 'properties.sar:polarizations' }, ['HH']],
              },
              {
                op: 'in',
                args: [{ property: 'properties.sar:polarizations' }, ['HV']],
              },
            ],
          },
        ],
      });
      break;
    }

    default: {
      break;
    }
  }

  return args;
};
