import { createContext, PropsWithChildren } from 'react';

export type TFeatureFlag = {
  search: 'true' | 'false' | boolean;
  actionCreator: 'true' | 'false' | boolean;
  toggleLayerButton: 'true' | 'false' | boolean;
  clearLayerButton: 'true' | 'false' | boolean;
};

const defaultValues: TFeatureFlag = {
  search: 'false',
  actionCreator: 'false',
  toggleLayerButton: 'false',
  clearLayerButton: 'false',
};

export const FeatureFlagContext = createContext<TFeatureFlag>(defaultValues);

type TFeatureFlagProviderProps = PropsWithChildren<{ featureFlags: TFeatureFlag }>;

export const FeatureFlagProvider = ({ featureFlags, children }: TFeatureFlagProviderProps) => {
  return <FeatureFlagContext.Provider value={featureFlags}>{children}</FeatureFlagContext.Provider>;
};
