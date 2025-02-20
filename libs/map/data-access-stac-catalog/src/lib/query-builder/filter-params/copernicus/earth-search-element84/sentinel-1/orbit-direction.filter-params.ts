import { TCopernicusSearchParams, TFilterParam } from '../../../../query.model';

export const getOrbitDirectionFilterParams = (
  params: Omit<TCopernicusSearchParams['sentinel1'], 'enabled'>
): TFilterParam[] => {
  const args: TFilterParam[] = [];

  if (!params.orbitDirection) {
    return args;
  }

  if (params.orbitDirection.ascending) {
    args.push({
      op: '=',
      args: [{ property: 'properties.sat:orbit_state' }, 'ascending'],
    });
  }

  if (params.orbitDirection.descending) {
    args.push({
      op: '=',
      args: [{ property: 'properties.sat:orbit_state' }, 'descending'],
    });
  }

  if (args.length > 1) {
    return [
      {
        op: 'or',
        args,
      },
    ];
  }

  return args;
};
