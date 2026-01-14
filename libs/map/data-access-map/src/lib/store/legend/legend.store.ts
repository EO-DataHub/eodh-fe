import type {} from '@redux-devtools/extension';
import { nanoid } from 'nanoid';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { IActiveLegend, IPosition, TLegendStore } from './legend.model';
import { getStoredPosition, savePosition } from './legend-position-storage.utils';

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

      const storedPosition = getStoredPosition(legendData.featureId);
      const position = storedPosition?.position ?? getDefaultPosition(legends.length);
      const isExpanded = storedPosition?.isExpanded ?? true;

      const newLegend: IActiveLegend = {
        ...legendData,
        id: nanoid(),
        isExpanded,
        position,
        isFocused: false,
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
      const storedPosition = getStoredPosition(legendData.featureId);

      const newLegend: IActiveLegend = {
        ...legendData,
        id: nanoid(),
        isExpanded: storedPosition?.isExpanded ?? previousLegend?.isExpanded ?? true,
        position: storedPosition?.position ?? previousLegend?.position ?? getDefaultPosition(0),
        isFocused: false,
      };

      set({ legends: [newLegend] });
    },

    updatePosition: (id, position) => {
      const { legends } = get();
      const legend = legends.find((l) => l.id === id);

      if (legend) {
        savePosition(legend.featureId, position, legend.isExpanded);
      }

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

      const legend = legends[index];
      const newPosition = getDefaultPosition(index);

      if (legend) {
        savePosition(legend.featureId, newPosition, legend.isExpanded);
      }

      set({
        legends: legends.map((legend) => (legend.id === id ? { ...legend, position: newPosition } : legend)),
      });
    },

    toggleExpanded: (id) => {
      const { legends } = get();
      const legend = legends.find((l) => l.id === id);

      if (legend) {
        savePosition(legend.featureId, legend.position, !legend.isExpanded);
      }

      set({
        legends: legends.map((legend) => (legend.id === id ? { ...legend, isExpanded: !legend.isExpanded } : legend)),
      });
    },

    clearAllLegends: () => {
      set({ legends: [] });
    },

    focusLegend: (featureId) => {
      const { legends } = get();
      const legendIndex = legends.findIndex((l) => l.featureId === featureId);

      if (legendIndex === -1) {
        return;
      }

      const legend = legends[legendIndex];
      const otherLegends = legends.filter((l) => l.featureId !== featureId).map((l) => ({ ...l, isFocused: false }));

      set({
        legends: [...otherLegends, { ...legend, isFocused: true }],
      });
    },

    clearFocus: () => {
      const { legends } = get();
      set({
        legends: legends.map((legend) => ({ ...legend, isFocused: false })),
      });
    },
  }))
);
