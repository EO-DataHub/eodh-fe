import { AxiosError } from 'axios';
import { useSnackbar } from 'notistack';
import { useTranslation } from 'react-i18next';

type TCollectionName =
  | 'sentinel-1'
  | 'sentinel-2-l1c'
  | 'sentinel-2-l2a'
  | 'sentinel-3'
  | 'sentinel-5p'
  | 'esacci-globallc'
  | 'clms-corinelc'
  | 'clms-water-bodies';

type TFunctionIdentifier = 'raster-calculate' | 'lulc-change' | 'water-quality' | 'clip';

interface ICollectionNotSupportedError {
  type: 'collection_not_supported_error';
  ctx: {
    function_identifier: TFunctionIdentifier;
    stac_collection: TCollectionName;
    valid_options: TCollectionName[];
  };
  msg: string;
}

interface IAreaOfInterestTooBigError {
  type: 'area_of_interest_too_big_error';
  ctx: {
    max_size_imperial: number;
    max_size_metric: number;
    units_imperial: 'square miles';
    units_metric: 'square kilometers';
  };
  msg: string;
}

interface IAreaOfInterestMissingError {
  type: 'missing_area_of_interest_error';
  msg: string;
}

interface IInvalidDateRangeError {
  type: 'invalid_date_range_error';
  msg: string;
}

type TErrorMessage =
  | ICollectionNotSupportedError
  | IAreaOfInterestTooBigError
  | IAreaOfInterestMissingError
  | IInvalidDateRangeError;

export interface IErrorResponse {
  detail: TErrorMessage[];
}

const BASE_KEY = 'MAP.ACTION_CREATOR_PANEL.WORKFLOW.NODE.DATA_SET';
const collectionTranslationMap: Record<TCollectionName, string> = {
  'sentinel-1': `${BASE_KEY}.SENTINEL_1`,
  'sentinel-2-l1c': `${BASE_KEY}.SENTINEL_2`,
  'sentinel-2-l2a': `${BASE_KEY}.SENTINEL_2`,
  'sentinel-3': `${BASE_KEY}.SENTINEL_3`,
  'sentinel-5p': `${BASE_KEY}.SENTINEL_5P`,
  'esacci-globallc': `${BASE_KEY}.AUXILIARY.GLOBAL_LAND_COVER`,
  'clms-corinelc': `${BASE_KEY}.AUXILIARY.CORINE_LAND_COVER`,
  'clms-water-bodies': `${BASE_KEY}.AUXILIARY.WATER_BODIES`,
};

const getCollectionTranslationKey = (collection: TCollectionName): string | null => {
  return collectionTranslationMap[collection] || null;
};

const getFunctionTranslationKey = (functionIdentifier: TFunctionIdentifier) => {
  switch (functionIdentifier) {
    case 'raster-calculate': {
      return 'MAP.ACTION_CREATOR_PANEL.WORKFLOW.NODE.FUNCTION.OPTIONS.RASTER_CALCULATOR';
    }

    case 'lulc-change': {
      return 'MAP.ACTION_CREATOR_PANEL.WORKFLOW.NODE.FUNCTION.OPTIONS.LAND_COVER_CHANGES';
    }

    case 'water-quality': {
      return 'MAP.ACTION_CREATOR_PANEL.WORKFLOW.NODE.FUNCTION.OPTIONS.WATER_QUALITY';
    }

    case 'clip': {
      return 'MAP.ACTION_CREATOR_PANEL.WORKFLOW.NODE.FUNCTION.OPTIONS.CLIP';
    }
  }

  return null;
};

const useErrorMessage = () => {
  const { t } = useTranslation();

  return (error?: TErrorMessage | AxiosError<IErrorResponse>) => {
    if (!error) {
      return null;
    }

    if (error instanceof AxiosError) {
      return t('GLOBAL.ERRORS.SERVER_ERROR.MESSAGE');
    }

    switch (error.type) {
      case 'area_of_interest_too_big_error': {
        return t('MAP.ACTION_CREATOR_PANEL.WORKFLOW.ERROR.AOI_TOO_BIG', {
          maxSize: error.ctx.max_size_imperial.toFixed(2),
        });
      }

      case 'collection_not_supported_error': {
        const options = error.ctx.valid_options
          .map((collection) => getCollectionTranslationKey(collection))
          .map((translationKey) => (translationKey ? t(translationKey) : null))
          .filter((item) => !!item);

        return t('MAP.ACTION_CREATOR_PANEL.WORKFLOW.ERROR.COLLECTION_NOT_SUPPORTED', {
          collection: t(getCollectionTranslationKey(error.ctx.stac_collection) || ''),
          function: t(getFunctionTranslationKey(error.ctx.function_identifier) || ''),
          options: options.join(', '),
        });
      }

      case 'missing_area_of_interest_error': {
        return t('MAP.ACTION_CREATOR_PANEL.WORKFLOW.ERROR.AOI_MISSING');
      }

      case 'invalid_date_range_error': {
        return t('MAP.ACTION_CREATOR_PANEL.WORKFLOW.ERROR.INVALID_DATE_RANGE');
      }

      default: {
        return t('GLOBAL.ERRORS.SERVER_ERROR.MESSAGE');
      }
    }
  };
};

export const useWorkflowMessage = () => {
  const { enqueueSnackbar } = useSnackbar();
  const translateMessage = useErrorMessage();

  return {
    showErrorMessage: (error: AxiosError<IErrorResponse>) => {
      if (!error.response?.data.detail.length) {
        const message = translateMessage(error);
        enqueueSnackbar(message, { variant: 'error', persist: true });
        return;
      }

      const firstError = [...(error.response || []).data.detail].pop();
      const message = translateMessage(firstError);

      if (!message) {
        return;
      }

      enqueueSnackbar(message, { variant: 'error', persist: true });
    },
  };
};
