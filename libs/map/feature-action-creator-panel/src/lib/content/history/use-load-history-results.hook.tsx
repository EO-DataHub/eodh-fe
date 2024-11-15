import { useAoi, useCollectionInfo, useMode, useResults } from '@ukri/map/data-access-map';
import { useCatalogSearch } from '@ukri/map/data-access-stac-catalog';
import { TIdentityClaims, useAuth } from '@ukri/shared/utils/authorization';
import { createDateString, formatDate, type TDateString } from '@ukri/shared/utils/date';
import { useCallback } from 'react';

export const useLoadHistoryResults = () => {
  const { authClient } = useAuth<TIdentityClaims<{ preferred_username: string }>>();
  const { searchParams, updateSearchParams } = useResults();
  const { data: catalogData, status } = useCatalogSearch({ params: searchParams });
  const { changeState } = useAoi();
  const { changeView } = useMode();

  const { mutateAsync } = useCollectionInfo();

  const showResults = useCallback(
    async (jobId: string) => {
      const userWorkspace = authClient.getIdentityClaims()?.preferred_username;

      if (!userWorkspace) {
        return;
      }

      try {
        const collectionInfo = await mutateAsync({ jobId, userWorkspace });

        const dateFrom = formatDate(
          createDateString(collectionInfo?.collectionInterval.from)
        ) as NonNullable<TDateString>;
        const dateTo = formatDate(createDateString(collectionInfo?.collectionInterval.to)) as NonNullable<TDateString>;

        updateSearchParams({
          jobId,
          userWorkspace,
          timeSliderBoundaries: {
            from: dateFrom,
            to: dateTo,
          },
          date: {
            from: dateFrom,
            to: dateTo,
          },
        });
      } catch (error: unknown) {
        updateSearchParams({
          jobId,
          userWorkspace,
        });
      }
      changeView('results');
    },
    [authClient, mutateAsync, updateSearchParams, changeView]
  );

  const hideResults = useCallback(() => {
    updateSearchParams(undefined);
    changeState('readonly');
    changeView('search');
  }, [changeState, changeView, updateSearchParams]);

  return {
    status,
    data: catalogData,
    showResults,
    hideResults,
    selectedResult: searchParams?.jobId || null,
  };
};
