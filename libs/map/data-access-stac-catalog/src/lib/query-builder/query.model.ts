import { TDateString } from '@ukri/shared/utils/date';
import { Geometry } from 'ol/geom';

import { TCatalogueCollection } from './collection';

export type TCopernicusSearchParams = {
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

export type TPlanetSearchParams = {
  planetScope?: {
    enabled?: boolean;
  };
  skySat?: {
    enabled?: boolean;
  };
  rapidEye?: {
    enabled?: boolean;
  };
  cloudCoverage?: number;
};

export type TCatalogSearchParams = {
  userWorkspace?: never;
  jobId?: never;
  workflowId?: never;
  collection: TCatalogueCollection;
  dataSets: {
    public: {
      copernicus: TCopernicusSearchParams;
      auxiliary?: {
        enabled?: boolean;
        esacciGloballc?: {
          enabled?: boolean;
        };
        clmsCorinelc?: {
          enabled?: boolean;
        };
        clmsWaterBodies?: {
          enabled?: boolean;
        };
      };
    };
    private: {
      planet?: TPlanetSearchParams;
    };
  };
  date: {
    from: NonNullable<TDateString>;
    to: NonNullable<TDateString>;
  };
  aoi: Geometry;
};

export type TWorkflowSearchParams = {
  dataSets?: never;
  aoi?: never;
  collection?: never;
  userWorkspace: string;
  jobId: string;
  workflowId: string;
  date?: {
    from: NonNullable<TDateString>;
    to: NonNullable<TDateString>;
  };
};

export type TSearchParams = TCatalogSearchParams | TWorkflowSearchParams;

export type TCopernicusParams = {
  [Key in keyof TCopernicusSearchParams]: {
    type: Key;
    enabled: boolean;
    options: TCopernicusSearchParams[Key];
  };
}[keyof TCopernicusSearchParams];

export type TFilterParam = {
  op: string;
  args:
    | [{ property: string }, string | number | string[]]
    | [{ property: string }, string | number | string[], string | number | string[]]
    | TFilterParam[];
};

export type TFields = {
  include?: string[];
  exclude?: string[];
};
