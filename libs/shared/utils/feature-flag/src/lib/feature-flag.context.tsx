import { createContext, PropsWithChildren } from 'react';

export type TFeatureFlag = NonNullable<unknown>;

const defaultValues: TFeatureFlag = {};

export const FeatureFlagContext = createContext<TFeatureFlag>(defaultValues);

type TFeatureFlagProviderProps = PropsWithChildren<{ featureFlags: TFeatureFlag }>;

export const FeatureFlagProvider = ({ featureFlags, children }: TFeatureFlagProviderProps) => {
  return <FeatureFlagContext.Provider value={featureFlags}>{children}</FeatureFlagContext.Provider>;
};
