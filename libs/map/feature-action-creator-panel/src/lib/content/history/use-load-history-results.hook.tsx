import { useAoi, useCollectionInfo, useMode, useResults, useWorkflow } from '@ukri/map/data-access-map';
import { useCatalogSearch } from '@ukri/map/data-access-stac-catalog';
import { TIdentityClaims, useAuth } from '@ukri/shared/utils/authorization';
import { createDateString, formatDate, type TDateString } from '@ukri/shared/utils/date';
import { useCallback } from 'react';

export const useLoadHistoryResults = () => {
  const { authClient } = useAuth<TIdentityClaims<{ preferred_username: string }>>();
  const { searchParams, updateSearchParams } = useResults();
  const { status } = useCatalogSearch({ params: searchParams });
  const { changeState } = useAoi();
  const { changeView } = useMode();
  const { markAsRead } = useWorkflow();

  const { mutateAsync } = useCollectionInfo();

  const showResults = useCallback(
    async (workflowId: string, workspaceId: string) => {
      const userWorkspace = authClient.getIdentityClaims()?.preferred_username;

      markAsRead(workflowId);

      if (!userWorkspace) {
        return;
      }

      try {
        const collectionInfo = await mutateAsync({ workflowId, userWorkspace });

        const dateFrom = formatDate(
          createDateString(collectionInfo?.collectionInterval.from)
        ) as NonNullable<TDateString>;
        const dateTo = formatDate(createDateString(collectionInfo?.collectionInterval.to)) as NonNullable<TDateString>;

        updateSearchParams({
          id: workflowId,
          workflowId,
          workspaceId,
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
          id: workflowId,
          workflowId,
          workspaceId,
          userWorkspace,
        });
      }
      changeView('results');
    },
    [authClient, changeView, markAsRead, mutateAsync, updateSearchParams]
  );

  const hideResults = useCallback(() => {
    updateSearchParams(undefined);
    changeState('readonly');
    changeView('search');
  }, [changeState, changeView, updateSearchParams]);

  return {
    status,
    showResults,
    hideResults,
    selectedResult: searchParams?.workflowId || null,
  };
};
