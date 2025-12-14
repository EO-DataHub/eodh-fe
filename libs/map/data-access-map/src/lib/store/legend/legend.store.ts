import type {} from '@redux-devtools/extension';
import { nanoid } from 'nanoid';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { IActiveLegend, IPosition, TLegendStore } from './legend.model';

const getDefaultPosition = (existingCount: number): IPosition => {
  const baseX = 400;
  const baseY = 600;
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

    replaceLegendForFeature: (legendData) => {
      const { legends } = get();

      const existingIndex = legends.findIndex((legend) => legend.featureId === legendData.featureId);

      if (existingIndex !== -1) {
        const existingLegend = legends[existingIndex];

        if (existingLegend.assetName === legendData.assetName) {
          return;
        }

        const newLegend: IActiveLegend = {
          ...legendData,
          id: nanoid(),
          isExpanded: existingLegend.isExpanded,
          position: existingLegend.position,
        };

        const updatedLegends = [...legends];
        updatedLegends[existingIndex] = newLegend;

        set({ legends: updatedLegends });
      } else {
        const newLegend: IActiveLegend = {
          ...legendData,
          id: nanoid(),
          isExpanded: true,
          position: getDefaultPosition(legends.length),
        };

        set({ legends: [...legends, newLegend] });
      }
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
