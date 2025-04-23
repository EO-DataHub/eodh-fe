import { useAoi, useCollectionInfo, useMode, useResults, useWorkflow } from '@ukri/map/data-access-map';
import { useCatalogSearch } from '@ukri/map/data-access-stac-catalog';
import { useWorkspace } from '@ukri/shared/utils/authorization';
import { createDateString, formatDate, type TDateString } from '@ukri/shared/utils/date';
import { useCallback, useState } from 'react';

export const useLoadHistoryResults = () => {
  const { searchParams, updateSearchParams } = useResults();
  const { status } = useCatalogSearch({ params: searchParams });
  const { shape, changeState, updateShape, setShape } = useAoi();
  const { changeView } = useMode();
  const { markAsRead } = useWorkflow();
  const [currentAoi, setCurrentAoi] = useState<typeof shape>(shape);
  const { currentWorkspace } = useWorkspace();
  const { mutateAsync } = useCollectionInfo();

  const showResults = useCallback(
    async (jobId: string, workflowId: string) => {
      markAsRead(jobId);

      if (!currentWorkspace) {
        return;
      }

      try {
        const collectionInfo = await mutateAsync({ jobId, userWorkspace: currentWorkspace, workflowId });

        const dateFrom = formatDate(
          createDateString(collectionInfo?.collectionInterval.from)
        ) as NonNullable<TDateString>;
        const dateTo = formatDate(createDateString(collectionInfo?.collectionInterval.to)) as NonNullable<TDateString>;

        updateShape((shape) => {
          setCurrentAoi(shape);
          return undefined;
        });
        updateSearchParams({
          id: jobId,
          jobId,
          workflowId,
          userWorkspace: currentWorkspace,
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
          id: jobId,
          jobId,
          workflowId,
          userWorkspace: currentWorkspace,
        });
      }
      changeView('results');
    },
    [changeView, currentWorkspace, markAsRead, mutateAsync, updateSearchParams, updateShape]
  );

  const hideResults = useCallback(() => {
    updateSearchParams(undefined);
    changeState('readonly');
    changeView('search');

    if (currentAoi) {
      setShape(currentAoi);
    }
  }, [changeState, changeView, currentAoi, updateSearchParams, setShape]);

  return {
    status,
    showResults,
    hideResults,
    selectedResult: searchParams?.jobId || null,
  };
};
