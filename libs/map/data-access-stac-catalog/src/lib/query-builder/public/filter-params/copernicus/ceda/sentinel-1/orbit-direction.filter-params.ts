import { TCopernicusSearchParams, TFilterParam } from '../../../../../query.model';

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
      args: [{ property: 'properties.Orbit Direction' }, 'ASCENDING'],
    });
  }

  if (params.orbitDirection.descending) {
    args.push({
      op: '=',
      args: [{ property: 'properties.Orbit Direction' }, 'DESCENDING'],
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
