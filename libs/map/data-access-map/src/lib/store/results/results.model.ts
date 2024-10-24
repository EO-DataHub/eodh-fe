import { TDateString } from '@ukri/shared/utils/date';
import { Geometry } from 'ol/geom';

type TDataSets = {
  copernicus: {
    sentinel1: {
      enabled: boolean;
      acquisitionMode: {
        ew: boolean;
        hh: boolean;
        hh_hv: boolean;
        iw: boolean;
        vv: boolean;
        vv_vh: boolean;
      };
      orbitDirection: {
        ascending: boolean;
        descending: boolean;
      };
    };
    sentinel2: {
      enabled: boolean;
      l1c: boolean;
      l2a: boolean;
      cloudCoverage: number;
    };
    sentinel3: {
      enabled: boolean;
      slstr: boolean;
      cloudCoverage: number;
      olci: boolean;
    };
    sentinel5P: {
      enabled: boolean;
      aer_ai: boolean;
      ch4: boolean;
      cloud: boolean;
      co: boolean;
      hcho: boolean;
      no2: boolean;
      o3: boolean;
      so2: boolean;
    };
  };
  planet: {
    enabled: boolean;
    planetScope: {
      enabled: boolean;
    };
    skySat: {
      enabled: boolean;
    };
    rapidEye: {
      enabled: boolean;
    };
  };
};

type TCoordinates = number[][][] | [number, number][][];

export type TCoordinate =
  | {
      type: 'circle';
      center: number[];
      radius: number;
    }
  | {
      type: 'rectangle';
      coordinates: TCoordinates;
    }
  | {
      type: 'polygon';
      coordinates: TCoordinates;
    };

export type TSearchParams = {
  dataSets: TDataSets;
  date: {
    from: NonNullable<TDateString>;
    to: NonNullable<TDateString>;
  };
  aoi: Geometry;
};

export type TResultsStore<T = TSearchParams> = {
  searchParams: T | undefined;
  coordinates: TCoordinate | undefined;
  updateSearchParams: (state: T | undefined) => void;
  setShape: (coordinates: TCoordinate | undefined) => void;
};

export type TResultsStoreState = Omit<TResultsStore, 'setShape' | 'updateSearchParams'>;

export const defaultState: TResultsStoreState = {
  searchParams: undefined,
  coordinates: undefined,
};
