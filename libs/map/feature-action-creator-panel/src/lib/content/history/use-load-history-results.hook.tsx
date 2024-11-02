import { useAoi, useResults } from '@ukri/map/data-access-map';
import { useCatalogSearch } from '@ukri/map/data-access-stac-catalog';
import { TIdentityClaims, useAuth } from '@ukri/shared/utils/authorization';
import { useCallback, useEffect } from 'react';

export const useLoadHistoryResults = () => {
  const { authClient } = useAuth<TIdentityClaims<{ preferred_username: string }>>();
  const { searchParams, updateSearchParams } = useResults();
  const { data, status } = useCatalogSearch({ params: searchParams });
  const { changeState } = useAoi();

  const showResults = useCallback(
    (jobId: string) => {
      const userWorkspace = authClient.getIdentityClaims()?.preferred_username;

      if (userWorkspace) {
        updateSearchParams({ jobId, userWorkspace });
      }
    },
    [authClient, updateSearchParams]
  );

  const hideResults = useCallback(() => {
    changeState('readonly');
  }, [changeState]);

  useEffect(() => {
    if (status === 'error') {
      updateSearchParams(undefined);
    }
  }, [status, updateSearchParams]);

  return {
    status,
    data,
    showResults,
    hideResults,
    selectedResult: searchParams?.jobId || null,
  };
};
