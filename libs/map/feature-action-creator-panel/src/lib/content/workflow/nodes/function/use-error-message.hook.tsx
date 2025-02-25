import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

export type TErrorType = 'dataSetError' | undefined;

export const useErrorMessage = (errorType: TErrorType) => {
  const { t } = useTranslation();

  return useMemo(() => {
    if (errorType === 'dataSetError') {
      return t('MAP.ACTION_CREATOR_PANEL.WORKFLOW.NODE.FUNCTION.ERROR.WRONG_DATA_SET');
    }

    return undefined;
  }, [errorType, t]);
};
