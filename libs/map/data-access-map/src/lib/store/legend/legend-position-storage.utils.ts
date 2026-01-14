import { IPosition, IStoredLegendPosition, LEGEND_POSITIONS_STORAGE_KEY } from './legend.model';

export const loadStoredPositions = (): Record<string, IStoredLegendPosition> => {
  try {
    const stored = localStorage.getItem(LEGEND_POSITIONS_STORAGE_KEY);
    if (!stored) {
      return {};
    }
    return JSON.parse(stored) as Record<string, IStoredLegendPosition>;
  } catch {
    return {};
  }
};

export const savePosition = (featureId: string, position: IPosition, isExpanded: boolean): void => {
  try {
    const stored = loadStoredPositions();
    stored[featureId] = { featureId, position, isExpanded };
    localStorage.setItem(LEGEND_POSITIONS_STORAGE_KEY, JSON.stringify(stored));
  } catch {
    return;
  }
};

export const getStoredPosition = (featureId: string): IStoredLegendPosition | undefined => {
  const stored = loadStoredPositions();
  return stored[featureId];
};

export const removeStoredPosition = (featureId: string): void => {
  try {
    const stored = loadStoredPositions();
    delete stored[featureId];
    localStorage.setItem(LEGEND_POSITIONS_STORAGE_KEY, JSON.stringify(stored));
  } catch {
    return;
  }
};

export const clearAllStoredPositions = (): void => {
  try {
    localStorage.removeItem(LEGEND_POSITIONS_STORAGE_KEY);
  } catch {
    return;
  }
};
