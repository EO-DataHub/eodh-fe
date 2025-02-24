import { createContext, PropsWithChildren } from 'react';

export type TFeatureFlag = {
  downloadAsset: 'true' | 'false' | boolean;
};

const defaultValues: TFeatureFlag = {
  downloadAsset: 'false',
};

export const FeatureFlagContext = createContext<TFeatureFlag>(defaultValues);

type TFeatureFlagProviderProps = PropsWithChildren<{ featureFlags: TFeatureFlag }>;

export const FeatureFlagProvider = ({ featureFlags, children }: TFeatureFlagProviderProps) => {
  return <FeatureFlagContext.Provider value={featureFlags}>{children}</FeatureFlagContext.Provider>;
};
