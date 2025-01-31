import { TDateString } from '@ukri/shared/utils/date';
import { Geometry } from 'ol/geom';

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
    l1c: boolean;
    l2a: boolean;
    l2aARD: boolean;
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

export type TCatalogSearchParams = {
  userWorkspace?: never;
  jobId?: never;
  dataSets: {
    public: {
      copernicus: TCopernicusSearchParams;
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
  userWorkspace: string;
  jobId: string;
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
