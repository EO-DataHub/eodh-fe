import { TCopernicusSearchParams, TFilterParam } from '../../../../../query.model';
import { getAcquisitionModeFilterParams } from './acquisition-mode.filter-params';
import { getOrbitDirectionFilterParams } from './orbit-direction.filter-params';

export const createSentinel1FilterParams = (
  enabled: boolean,
  params: Omit<TCopernicusSearchParams['sentinel1'], 'enabled'>
): TFilterParam[] => {
  if (!enabled) {
    return [];
  }

  const args: TFilterParam[] = [
    {
      op: '=',
      args: [{ property: 'collection' }, 'sentinel-1-grd'],
    },
    ...getOrbitDirectionFilterParams(params),
    ...getAcquisitionModeFilterParams(params),
  ];

  if (args.length > 1) {
    return [
      {
        op: 'and',
        args,
      },
    ];
  }

  return args;
};
