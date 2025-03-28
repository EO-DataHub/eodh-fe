import { TDateString } from '@ukri/shared/utils/date';
import { Geometry } from 'ol/geom';

import { TCoordinate } from '../../geometry/shape.model';

type TDataSets = {
  public: {
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
        l2aARD: boolean;
        cloudCoverage: number;
      };
    };
  };
  private: {
    planet?: {
      planetScope?: {
        enabled?: boolean;
        cloudCoverage?: number;
      };
      skySat?: {
        enabled?: boolean;
        cloudCoverage?: number;
      };
      rapidEye?: {
        enabled?: boolean;
        cloudCoverage?: number;
      };
    };
  };
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
  workflowId?: never;
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
  workflowId: string;
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
