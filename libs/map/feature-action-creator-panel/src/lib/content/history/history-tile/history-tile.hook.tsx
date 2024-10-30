import { useGetWorkflowResult, useMode } from '@ukri/map/data-access-map';
import { useAuth } from '@ukri/shared/utils/authorization';
import { createDateString, formatDate, formatHour } from '@ukri/shared/utils/date';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

export const useHistoryTile = (
  workflowId: string,
  submittedAtDate: string,
  onViewResult: (submissionId: string) => void,
  onHideResult: () => void
) => {
  const [jobId, setJobId] = useState<string | null>(null);
  const { t } = useTranslation();
  const { userWorkspace } = useAuth();
  const { isPending, isFetching, data, error } = useGetWorkflowResult({ jobId, userWorkspace });
  const { setAcResultsData, setAcResultStatus, changeAcView } = useMode();

  const submittedHour = formatHour(createDateString(submittedAtDate));
  const submittedDate = formatDate(createDateString(submittedAtDate), 'DD-MM-YY');

  useEffect(() => {
    if (jobId !== null) {
      if (error) {
        setAcResultStatus('error');
      }
      if (isPending || isFetching) {
        setAcResultStatus('pending');
      }
      if (data) {
        setAcResultsData(data);
        setAcResultStatus('success');
      }
    }
  }, [data, error, isFetching, isPending, jobId, setAcResultStatus, setAcResultsData]);

  const handleSeeResults = useCallback(() => {
    changeAcView('acResultsView');
    onViewResult(workflowId);
    setJobId(workflowId);

    if (error) {
      setAcResultStatus('error');
    }
    if (isPending || isFetching) {
      setAcResultStatus('pending');
    }
    if (data) {
      setAcResultsData(data);
      setAcResultStatus('success');
    }
  }, [changeAcView, data, error, isFetching, isPending, onViewResult, setAcResultStatus, setAcResultsData, workflowId]);

  const handleHideResults = useCallback(() => {
    setAcResultsData(undefined);
    setAcResultStatus('pending');
    onHideResult();
    setJobId(null);
    changeAcView('acTreeView');
  }, [changeAcView, onHideResult, setAcResultStatus, setAcResultsData]);

  return {
    jobId,
    isPending,
    isFetching,
    data,
    error,
    submittedHour,
    submittedDate,
    handleSeeResults,
    handleHideResults,
    t,
  };
};
