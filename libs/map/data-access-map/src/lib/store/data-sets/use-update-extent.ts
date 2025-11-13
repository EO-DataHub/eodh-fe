import { createDateString } from '@ukri/shared/utils/date';
import { useCallback, useMemo } from 'react';

import { TDataSetValue } from '../action-creator/action-creator.schema';
import { useDate } from '../date/date.store';
import { aggregateExtents, TExtentData } from './aggregate-extents.util';
import { extractEnabledCollections } from './extract-enabled-collections.util';

interface IUpdateExtent {
  extents?: Record<string, TExtentData>;
  dataSets: TDataSetValue | undefined;
}

export const useUpdateExtent = () => {
  const { updateDate } = useDate();

  const updateExtent = useCallback(
    ({ dataSets, extents }: IUpdateExtent) => {
      const enabledCollectionIds = extractEnabledCollections(dataSets);
      const extent = extents ? aggregateExtents(extents, enabledCollectionIds) : undefined;
      const minDate = extent?.min ? createDateString(extent.min) : undefined;
      const maxDate = extent?.max ? createDateString(extent.max) : undefined;
      updateDate((currentDate) => ({
        ...currentDate,
        min: minDate || undefined,
        max: maxDate || undefined,
      }));
    },
    [updateDate]
  );

  return useMemo(
    () => ({
      updateExtent,
    }),
    [updateExtent]
  );
};
