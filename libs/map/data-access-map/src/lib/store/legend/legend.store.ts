import type {} from '@redux-devtools/extension';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { createLegendId, IActiveLegend, IPosition, TLegendStore } from './legend.model';
import { getStoredPosition, savePosition } from './legend-position-storage.utils';

const getDefaultPosition = (index: number): IPosition => {
  const baseX = 16;
  const baseY = 60;
  const legendHeight = 140;
  const gap = 16;

  return {
    x: baseX,
    y: baseY + index * (legendHeight + gap),
  };
};

export const useLegendStore = create<TLegendStore>()(
  devtools((set, get) => ({
    legends: [],

    addLegend: (legendData) => {
      const { legends } = get();
      const id = createLegendId(legendData.featureId, legendData.assetName);
      const exists = legends.some((legend) => legend.id === id);

      if (exists) {
        return;
      }

      const storedPosition = getStoredPosition(id);
      const position = storedPosition?.position ?? getDefaultPosition(legends.length);
      const isExpanded = storedPosition?.isExpanded ?? true;

      const newLegend: IActiveLegend = {
        ...legendData,
        id,
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
      const id = createLegendId(legendData.featureId, legendData.assetName);
      const existingSameLegend = legends.find((legend) => legend.id === id);

      if (existingSameLegend) {
        return;
      }

      const previousLegend = legends[0];
      const storedPosition = getStoredPosition(id);

      const newLegend: IActiveLegend = {
        ...legendData,
        id,
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
        savePosition(id, position, legend.isExpanded);
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
        savePosition(id, newPosition, legend.isExpanded);
      }

      set({
        legends: legends.map((legend) => (legend.id === id ? { ...legend, position: newPosition } : legend)),
      });
    },

    toggleExpanded: (id) => {
      const { legends } = get();
      const legend = legends.find((l) => l.id === id);

      if (legend) {
        savePosition(id, legend.position, !legend.isExpanded);
      }

      set({
        legends: legends.map((legend) => (legend.id === id ? { ...legend, isExpanded: !legend.isExpanded } : legend)),
      });
    },

    clearAllLegends: () => {
      set({ legends: [] });
    },

    focusLegend: (featureId, assetName) => {
      const { legends } = get();
      const id = createLegendId(featureId, assetName);
      const legendIndex = legends.findIndex((l) => l.id === id);

      if (legendIndex === -1) {
        return;
      }

      const legend = legends[legendIndex];
      const otherLegends = legends.filter((l) => l.id !== id).map((l) => ({ ...l, isFocused: false }));

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
