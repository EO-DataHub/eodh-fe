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

export const savePosition = (id: string, position: IPosition, isExpanded: boolean): void => {
  const stored = loadStoredPositions();
  stored[id] = { id, position, isExpanded };
  localStorage.setItem(LEGEND_POSITIONS_STORAGE_KEY, JSON.stringify(stored));
};

export const getStoredPosition = (id: string): IStoredLegendPosition | undefined => {
  const stored = loadStoredPositions();
  return stored[id];
};

export const removeStoredPosition = (id: string): void => {
  const stored = loadStoredPositions();
  delete stored[id];
  localStorage.setItem(LEGEND_POSITIONS_STORAGE_KEY, JSON.stringify(stored));
};

export const clearStoredPositions = (): void => {
  try {
    localStorage.removeItem(LEGEND_POSITIONS_STORAGE_KEY);
  } catch {
    // Ignore errors
  }
};
