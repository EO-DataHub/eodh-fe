const QUERY_KEY = {
  PRESETS: 'presets',
  FUNCTIONS: 'functions',
};

export const queryKey = {
  PRESETS: () => [QUERY_KEY.PRESETS],
  FUNCTIONS: () => [QUERY_KEY.FUNCTIONS],
};
