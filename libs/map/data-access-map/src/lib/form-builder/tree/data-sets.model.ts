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
        l2aARD: boolean;
        cloudCoverage: number;
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
    planet?: {
      enabled?: boolean;
      expanded?: boolean;
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
  };
};

export type TDataSetsValuesPath = FieldPath<TDataSetsValues>;
