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

export const getIwFilterParams = (
  params: Omit<TCatalogSearchParams['copernicus']['sentinel1'], 'enabled'>
): TFilterParam[] => {
  const args: TFilterParam[] = [];

  if (!params.acquisitionMode.iw) {
    return args;
  }

  switch (getIwAcquisitionMode(params.acquisitionMode)) {
    case 'vv+vv_vh': {
      args.push({
        op: 'and',
        args: [
          {
            op: '=',
            args: [{ property: 'properties.sar:instrument_mode' }, 'IW'],
          },
          {
            op: 'and',
            args: [
              {
                op: 'in',
                args: [{ property: 'properties.sar:polarizations' }, ['VV']],
              },
              {
                op: 'in',
                args: [{ property: 'properties.sar:polarizations' }, ['VH']],
              },
            ],
          },
        ],
      });
      break;
    }

    case 'vv': {
      args.push({
        op: 'and',
        args: [
          {
            op: '=',
            args: [{ property: 'properties.sar:instrument_mode' }, 'IW'],
          },
          {
            op: 'in',
            args: [{ property: 'properties.sar:polarizations' }, ['VV']],
          },
          {
            op: 'not',
            args: [
              {
                op: 'in',
                args: [{ property: 'properties.sar:polarizations' }, ['VH']],
              },
            ],
          },
        ],
      });
      break;
    }

    case 'vv_vh': {
      args.push({
        op: 'and',
        args: [
          {
            op: '=',
            args: [{ property: 'properties.sar:instrument_mode' }, 'IW'],
          },
          {
            op: 'or',
            args: [
              {
                op: 'in',
                args: [{ property: 'properties.sar:polarizations' }, ['VV']],
              },
              {
                op: 'in',
                args: [{ property: 'properties.sar:polarizations' }, ['VH']],
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
