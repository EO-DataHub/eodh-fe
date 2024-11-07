import { TCollectionInfoParams } from './collection-info.query';
const QUERY_KEY = {
  PRESETS: 'presets',
  FUNCTIONS: 'functions',
  COLLECTION_INFO: 'collection-info',
};

export const queryKey = {
  PRESETS: () => [QUERY_KEY.PRESETS],
  FUNCTIONS: () => [QUERY_KEY.FUNCTIONS],
  COLLECTION_INFO: (params: TCollectionInfoParams) => [QUERY_KEY.COLLECTION_INFO, params],
};
