import type {} from '@redux-devtools/extension';
import { nanoid } from 'nanoid';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { IActiveLegend, IPosition, TLegendStore } from './legend.model';

const getDefaultPosition = (index: number): IPosition => {
  const baseX = 350;
  const baseY = 620;
  const stackOffset = 60;

  return {
    x: baseX,
    y: baseY + index * stackOffset,
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

    setActiveLegend: (legendData) => {
      const { legends } = get();

      const existingSameLegend = legends.find(
        (legend) => legend.featureId === legendData.featureId && legend.assetName === legendData.assetName
      );

      if (existingSameLegend) {
        return;
      }

      const previousLegend = legends[0];

      const newLegend: IActiveLegend = {
        ...legendData,
        id: nanoid(),
        isExpanded: previousLegend?.isExpanded ?? true,
        position: previousLegend?.position ?? getDefaultPosition(0),
      };

      set({ legends: [newLegend] });
    },

    updatePosition: (id, position) => {
      const { legends } = get();
      set({
        legends: legends.map((legend) => (legend.id === id ? { ...legend, position } : legend)),
      });
    },

    resetPosition: (id) => {
      const { legends } = get();
      const index = legends.findIndex((legend) => legend.id === id);

      if (index === -1) {
        return;
      }

      set({
        legends: legends.map((legend, i) =>
          legend.id === id ? { ...legend, position: getDefaultPosition(i) } : legend
        ),
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
