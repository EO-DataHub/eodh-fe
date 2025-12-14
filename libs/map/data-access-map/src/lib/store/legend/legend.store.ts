import type {} from '@redux-devtools/extension';
import { nanoid } from 'nanoid';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { IActiveLegend, IPosition, TLegendStore } from './legend.model';

const getDefaultPosition = (existingCount: number): IPosition => {
  const baseX = 16;
  const baseY = 400;
  const stackOffset = 60;

  return {
    x: baseX,
    y: baseY + existingCount * stackOffset,
  };
};

export const useLegendStore = create<TLegendStore>()(
  devtools((set, get) => ({
    legends: [],

    addLegend: (legendData) => {
      const { legends } = get();

      const exists = legends.some(
        (legend) => legend.featureId === legendData.featureId && legend.assetName === legendData.assetName
      );

      if (exists) {
        return;
      }

      const newLegend: IActiveLegend = {
        ...legendData,
        id: nanoid(),
        isExpanded: true,
        position: getDefaultPosition(legends.length),
      };

      set({ legends: [...legends, newLegend] });
    },

    removeLegend: (id) => {
      const { legends } = get();
      set({ legends: legends.filter((legend) => legend.id !== id) });
    },

    removeLegendByFeatureId: (featureId) => {
      const { legends } = get();
      set({ legends: legends.filter((legend) => legend.featureId !== featureId) });
    },

    updatePosition: (id, position) => {
      const { legends } = get();
      set({
        legends: legends.map((legend) => (legend.id === id ? { ...legend, position } : legend)),
      });
    },

    toggleExpanded: (id) => {
      const { legends } = get();
      set({
        legends: legends.map((legend) => (legend.id === id ? { ...legend, isExpanded: !legend.isExpanded } : legend)),
      });
    },

    clearAllLegends: () => {
      set({ legends: [] });
    },
  }))
);
