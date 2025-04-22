import { createContext, memo, PropsWithChildren } from 'react';

export type TSettings = {
  eodhPageUrl: string;
};

export const SettingsContext = createContext<{ settings: TSettings }>({
  settings: {
    eodhPageUrl: '',
  },
});

export const SettingsProvider = memo(({ children, settings }: PropsWithChildren<{ settings: TSettings }>) => {
  return <SettingsContext.Provider value={{ settings }}>{children}</SettingsContext.Provider>;
});
