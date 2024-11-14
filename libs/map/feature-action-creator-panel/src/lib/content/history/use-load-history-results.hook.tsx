import { useAoi, useMode, useResults } from '@ukri/map/data-access-map';
import { useCollectionInfo } from '@ukri/map/data-access-map';
import { useCatalogSearch } from '@ukri/map/data-access-stac-catalog';
import { TIdentityClaims, useAuth } from '@ukri/shared/utils/authorization';
import { createDateString, formatDate, type TDateString } from '@ukri/shared/utils/date';
import { useCallback, useMemo } from 'react';

export const useLoadHistoryResults = () => {
  const { authClient } = useAuth<TIdentityClaims<{ preferred_username: string }>>();
  const { searchParams, updateSearchParams } = useResults();
  const { data: catalogData, status } = useCatalogSearch({ params: searchParams });
  const { changeState } = useAoi();
  const { changeView, mode } = useMode();
  const enabled = useMemo(() => {
    console.log('enabled', mode === 'action-creator' && !!searchParams?.jobId && !!searchParams?.userWorkspace, mode, searchParams);
    return mode === 'action-creator' && !!searchParams?.jobId && !!searchParams?.userWorkspace;
  }, [mode, searchParams]);

  const { data: collectionData } = useCollectionInfo({
    enabled,
    params: { jobId: searchParams?.jobId ?? '', userWorkspace: searchParams?.userWorkspace ?? '' },
  });

  const showResults = useCallback(
    (jobId: string) => {
      const userWorkspace = authClient.getIdentityClaims()?.preferred_username;
      if (userWorkspace) {
        const timeSliderBoundaries = {
          from: formatDate(createDateString(collectionData?.collectionInterval.from)) as NonNullable<TDateString>,
          to: formatDate(createDateString(collectionData?.collectionInterval.to)) as NonNullable<TDateString>,
        };

        console.log('userWorkspace', userWorkspace, timeSliderBoundaries);

        updateSearchParams({
          jobId,
          userWorkspace,
          timeSliderBoundaries,
          date: timeSliderBoundaries,
        });
        changeView('results');
      }
    },
    [authClient, changeView, updateSearchParams, collectionData]
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
    collectionData,
  };
};
