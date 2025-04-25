import { useDeleteHistoryItem } from '@ukri/map/data-access-map';
import { useWorkspace } from '@ukri/shared/utils/authorization';
import { createDateString, formatDate, formatHour } from '@ukri/shared/utils/date';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface IUseHistoryTileProps {
  jobId: string;
  submittedAtDate: string;
  selectedResult: string | null;
  onHide: () => void;
}

export const useHistoryTile = ({ jobId, submittedAtDate, selectedResult, onHide }: IUseHistoryTileProps) => {
  const [deleteInProgress, setDeleteInProgress] = useState(false);
  const { t } = useTranslation();
  const submittedHour = useMemo(() => formatHour(createDateString(submittedAtDate)), [submittedAtDate]);
  const submittedDate = useMemo(() => formatDate(createDateString(submittedAtDate), 'DD-MM-YY'), [submittedAtDate]);
  const selected = useMemo(() => selectedResult === jobId, [selectedResult, jobId]);
  const { currentWorkspace } = useWorkspace();
  const { mutate, isPending, isError, isSuccess: itemDeleted } = useDeleteHistoryItem();

  const deleteHistoryItem = useCallback(() => {
    if (!currentWorkspace) {
      return;
    }

    mutate({ workflowId: jobId, workspace: currentWorkspace });
  }, [currentWorkspace, jobId, mutate]);

  useEffect(() => {
    if (selectedResult === jobId && itemDeleted) {
      onHide();
    }
  }, [itemDeleted, selectedResult, jobId, onHide]);

  return {
    deleteInProgress,
    setDeleteInProgress,
    t,
    submittedHour,
    submittedDate,
    selected,
    deleteHistoryItem,
    isPending,
    isError,
    itemDeleted,
  };
};
