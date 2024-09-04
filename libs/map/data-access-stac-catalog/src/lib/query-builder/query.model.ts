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
    cloudCoverage: number;
  };
  sentinel3: {
    enabled: boolean;
    slstr: boolean;
    cloudCoverage: number;
    olci: boolean;
  };
  sentinel5: {
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
  data: {
    copernicus: TCopernicusSearchParams;
  };
  date: {
    from: TDateString;
    to: TDateString;
  };
  aoi: Geometry;
};

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
