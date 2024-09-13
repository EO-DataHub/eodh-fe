import { useContext } from 'react';

import { FeatureFlagContext, TFeatureFlag } from './feature-flag.context';

export function useFeatureFlag(featureFlag: keyof TFeatureFlag): boolean {
  const flags = useContext(FeatureFlagContext);
  const value = flags[featureFlag];

  if (value === 'true') {
    return true;
  } else if (value === 'false') {
    return false;
  }

  return !!value;
}
