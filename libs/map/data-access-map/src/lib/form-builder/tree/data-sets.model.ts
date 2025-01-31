import { FieldPath } from 'react-hook-form';

export type TDataSetsValues = {
  public: {
    expanded: boolean;
    copernicus: {
      enabled?: boolean;
      expanded: boolean;
      sentinel1?: {
        enabled: boolean;
        expanded: boolean;
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
      sentinel2?: {
        enabled: boolean;
        expanded: boolean;
        l1c?: boolean;
        l2a?: boolean;
        l2aARD?: boolean;
        cloudCoverage: number;
      };
      sentinel3?: {
        enabled: boolean;
        expanded: boolean;
        slstr: boolean;
        cloudCoverage: number;
        olci: boolean;
      };
      sentinel5P?: {
        enabled: boolean;
        expanded: boolean;
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
    auxiliary?: {
      expanded?: boolean;
      enabled?: boolean;
      esacciGloballc?: {
        enabled?: boolean;
        expanded?: boolean;
      };
      clmsCorinelc?: {
        enabled?: boolean;
        expanded?: boolean;
      };
      clmsWaterBodies?: {
        enabled?: boolean;
        expanded?: boolean;
      };
    };
  };
  private: {
    expanded: boolean;
    planet: {
      enabled: boolean;
      planetScope: {
        enabled: boolean;
        expanded?: boolean;
      };
      skySat: {
        enabled: boolean;
        expanded?: boolean;
      };
      rapidEye: {
        enabled: boolean;
        expanded?: boolean;
      };
    };
  };
};

export type TDataSetsValuesPath = FieldPath<TDataSetsValues>;
