import { useAoi, useMode, useResults } from '@ukri/map/data-access-map';
import { useCollectionInfo } from '@ukri/map/data-access-map';
import { useCatalogSearch } from '@ukri/map/data-access-stac-catalog';
import { TIdentityClaims, useAuth } from '@ukri/shared/utils/authorization';
import { useCallback } from 'react';

export const useLoadHistoryResults = () => {
  const { authClient } = useAuth<TIdentityClaims<{ preferred_username: string }>>();
  const { searchParams, updateSearchParams } = useResults();
  const { data: collectionInfo } = useCollectionInfo({ params: searchParams });
  const { data, status } = useCatalogSearch({ params: searchParams });
  const { changeState } = useAoi();
  const { changeView } = useMode();

  const showResults = useCallback(
    (jobId: string) => {
      const userWorkspace = authClient.getIdentityClaims()?.preferred_username;
      console.log('collectionInfo', collectionInfo);

      if (userWorkspace) {
        if (collectionInfo?.collectionInterval) {
          updateSearchParams({ jobId, userWorkspace, date: collectionInfo.collectionInterval });
        }
        changeView('results');
      }
    },
    [authClient, changeView, updateSearchParams, collectionInfo]
  );

  const hideResults = useCallback(() => {
    updateSearchParams(undefined);
    changeState('readonly');
    changeView('search');
  }, [changeState, changeView, updateSearchParams]);

  return {
    status,
    data,
    showResults,
    hideResults,
    selectedResult: searchParams?.jobId || null,
  };
};
