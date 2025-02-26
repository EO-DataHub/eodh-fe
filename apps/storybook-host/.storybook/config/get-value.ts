export const getValue = <T extends string | string[] | undefined[] | boolean>(
  envValue: T | undefined,
  configValue: T | undefined,
  defaultValue: T
): T => {
  if (
    (Array.isArray(envValue) && !!envValue.filter((item) => !!item).length) ||
    (!Array.isArray(envValue) && envValue)
  ) {
    return envValue;
  }

  if (
    (Array.isArray(configValue) && !!configValue.filter((item) => !!item).length) ||
    (!Array.isArray(configValue) && configValue)
  ) {
    return configValue;
  }

  return defaultValue;
};
