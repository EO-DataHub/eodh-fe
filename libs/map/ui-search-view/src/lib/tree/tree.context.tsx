import isFunction from 'lodash/isFunction';
import { createContext, PropsWithChildren, SetStateAction, useCallback, useState } from 'react';

export type TTreeSettings = {
  'copernicus.sentinel1.enabled': boolean;
  'copernicus.sentinel2.enabled': boolean;
  'copernicus.sentinel3.enabled': boolean;
  'copernicus.sentinel5.enabled': boolean;
  'planet.planetScope.enabled': boolean;
  'planet.skySat.enabled': boolean;
  'planet.rapidEye.enabled': boolean;
};

export const defaultSettings: TTreeSettings = {
  'copernicus.sentinel1.enabled': false,
  'copernicus.sentinel2.enabled': false,
  'copernicus.sentinel3.enabled': false,
  'copernicus.sentinel5.enabled': false,
  'planet.planetScope.enabled': false,
  'planet.skySat.enabled': false,
  'planet.rapidEye.enabled': false,
};

type TTreeSettingsContext = {
  settings: TTreeSettings;
  changeSettings: (settings: Partial<TTreeSettings> | ((settings: TTreeSettings) => TTreeSettings)) => void;
};

export const TreeSettings = createContext<TTreeSettingsContext>({
  settings: defaultSettings,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  changeSettings: () => {},
});

const isCallback = (
  settings: Partial<TTreeSettings> | ((settings: TTreeSettings) => TTreeSettings)
): settings is SetStateAction<TTreeSettings> => {
  return isFunction(settings);
};

type TTreeSettingsProviderProps = PropsWithChildren<{ defaultSettings?: TTreeSettings }>;

export const TreeSettingsProvider = ({
  children,
  defaultSettings: defaultValues = defaultSettings,
}: TTreeSettingsProviderProps) => {
  const [settings, setSettings] = useState({ ...defaultValues });

  const changeSettings = useCallback(
    (newSettings: Partial<TTreeSettings> | ((newSettings: TTreeSettings) => TTreeSettings)) => {
      if (isCallback(newSettings)) {
        setSettings(newSettings);
      } else {
        setSettings((currentSettings) => ({ ...currentSettings, ...newSettings }));
      }
    },
    [setSettings]
  );

  return <TreeSettings.Provider value={{ settings, changeSettings }}>{children}</TreeSettings.Provider>;
};
