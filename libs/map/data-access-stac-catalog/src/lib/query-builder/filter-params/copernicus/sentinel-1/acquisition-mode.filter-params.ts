import { TCatalogSearchParams, TFilterParam } from '../../../query.model';
import { getEwFilterParams } from './ew-acquisition-mode.filter-params';
import { getIwFilterParams } from './iw-acquisition-mode.filter-params';

export const getAcquisitionModeFilterParams = (
  params: Omit<TCatalogSearchParams['copernicus']['sentinel1'], 'enabled'>
): TFilterParam[] => {
  const args: TFilterParam[] = [...getEwFilterParams(params), ...getIwFilterParams(params)];

  if (args.length > 1) {
    return [
      {
        op: 'or',
        args: args,
      },
    ];
  }

  return args;
};
