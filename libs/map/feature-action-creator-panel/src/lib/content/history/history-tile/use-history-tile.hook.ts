import { useDeleteHistoryItem } from '@ukri/map/data-access-map';
import { createDateString, formatDate, formatHour } from '@ukri/shared/utils/date';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface IUseHistoryTileProps {
  jobId: string;
  submittedAtDate: string;
  selectedResult: string | null;
  onHide: () => void;
}

export const useHistoryTile = ({
  jobId,
  submittedAtDate,
  selectedResult,
  onHide,
}: IUseHistoryTileProps) => {
  const [deleteInProgress, setDeleteInProgress] = useState(false);
  const { t } = useTranslation();
  const submittedHour = useMemo(() => formatHour(createDateString(submittedAtDate)), [submittedAtDate]);
  const submittedDate = useMemo(() => formatDate(createDateString(submittedAtDate), 'DD-MM-YY'), [submittedAtDate]);
  const selected = useMemo(() => selectedResult === jobId, [selectedResult, jobId]);
  const { mutate: deleteHistoryItem, isPending, isError, isSuccess: itemDeleted } = useDeleteHistoryItem();

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
    itemDeleted
  };
};