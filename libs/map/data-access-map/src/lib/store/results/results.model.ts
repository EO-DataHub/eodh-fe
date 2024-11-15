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

export type TCatalogueSearchParams = {
  id: string;
  dataSets: TDataSets;
  date: {
    from: NonNullable<TDateString>;
    to: NonNullable<TDateString>;
  };
  aoi: Geometry;
  jobId?: never;
  userWorkspace?: never;
  timeSliderBoundaries: {
    from: NonNullable<TDateString>;
    to: NonNullable<TDateString>;
  };
};

export type TWorkflowSearchParams = {
  id: string;
  dataSets?: never;
  aoi?: never;
  date?: {
    from: NonNullable<TDateString>;
    to: NonNullable<TDateString>;
  };
  jobId: string;
  userWorkspace: string;
  timeSliderBoundaries?: {
    from: NonNullable<TDateString>;
    to: NonNullable<TDateString>;
  };
};

export type TSearchParams = TCatalogueSearchParams | TWorkflowSearchParams;

export type TSearchType = 'catalogue' | 'workflow';

export type TResultsStore<T = TSearchParams> = {
  searchType: TSearchType | undefined;
  searchParams: T | undefined;
  coordinates: TCoordinate | undefined;
  updateSearchParams: (state: T | undefined) => void;
  setShape: (coordinates: TCoordinate | undefined) => void;
  restore: (coordinates: TCoordinate | undefined, searchParams: Omit<TSearchParams, 'aoi'> | undefined) => void;
};

export type TResultsStoreState = Omit<TResultsStore, 'setShape' | 'updateSearchParams' | 'restore'>;

export const defaultState: TResultsStoreState = {
  searchType: undefined,
  searchParams: undefined,
  coordinates: undefined,
};
