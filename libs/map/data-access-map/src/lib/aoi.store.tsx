import type {} from '@redux-devtools/extension';
import { Circle, Geometry, Polygon } from 'ol/geom';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type TAoiMode = 'search' | 'view';

type TCoordinates = number[][][] | [number, number][][];

type TCoordinate =
  | {
      type: 'Circle';
      center: number[];
      radius: number;
    }
  | {
      type: 'Polygon';
      coordinates: TCoordinates;
    };

interface IAoiStore {
  mode: TAoiMode;
  coordinates: TCoordinate | undefined;
  currentShape: undefined | Geometry;
  setCurrentShape: (shape: Geometry | undefined) => void;
  visible: boolean;
  toggleVisibility: () => void;
  show: () => void;
  hide: () => void;
  changeMode: (mode: TAoiMode) => void;
}

const isCircle = (geometry: Geometry): geometry is Circle => geometry.getType() === 'Circle';

const isPolygon = (geometry: Geometry): geometry is Polygon => geometry.getType() === 'Polygon';

const getCoordinates = (shape?: Geometry): TCoordinate | undefined => {
  if (!shape) {
    return undefined;
  }

  if (isCircle(shape)) {
    return {
      type: 'Circle',
      center: shape.getCenter(),
      radius: shape.getRadius(),
    };
  } else if (isPolygon(shape)) {
    return {
      type: 'Polygon',
      coordinates: shape.getCoordinates(),
    };
  }

  return undefined;
};

const createPolygon = (coordinate: TCoordinate | undefined): Geometry | undefined => {
  if (!coordinate) {
    return undefined;
  }

  switch (coordinate.type) {
    case 'Polygon': {
      return new Polygon(coordinate.coordinates);
    }

    case 'Circle': {
      return new Circle(coordinate.center, coordinate.radius);
    }

    default: {
      return undefined;
    }
  }
};

const useAoiStore = create<IAoiStore>()(
  devtools((set) => ({
    mode: 'search',
    currentShape: undefined,
    coordinates: undefined,
    setCurrentShape: (shape: Geometry | undefined) =>
      set((state) => ({
        ...state,
        currentShape: createPolygon(getCoordinates(shape)),
        coordinates: getCoordinates(shape),
      })),
    visible: true,
    toggleVisibility: () => set((state) => ({ visible: !state.visible })),
    show: () => set(() => ({ visible: true })),
    hide: () => set(() => ({ visible: false })),
    changeMode: (mode: TAoiMode) => set(() => ({ mode })),
  }))
);

export const useAoiMode = () => {
  return useAoiStore((state) => state.mode);
};

export const useCurrentAoi = () => {
  return useAoiStore((state) => state.currentShape);
};

export const useCurrentAoiMutation = () => {
  return useAoiStore((state) => state.setCurrentShape);
};

export const useAoiLayerVisible = () => {
  return useAoiStore((state) => state.visible);
};

export const useChangeAoiLayerVisibility = () => {
  return useAoiStore((state) => ({
    show: state.show,
    hide: state.hide,
    toggle: state.toggleVisibility,
  }));
};

export const useChangeAoiMode = () => {
  return useAoiStore((state) => state.changeMode);
};
