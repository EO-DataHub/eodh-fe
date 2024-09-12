import { useContext } from 'react';

import { FeatureFlagContext, TFeatureFlag } from './feature-flag.context';

export function useFeatureFlag(featureFlag: keyof TFeatureFlag) {
  const flags = useContext(FeatureFlagContext);

  return flags[featureFlag];
}
