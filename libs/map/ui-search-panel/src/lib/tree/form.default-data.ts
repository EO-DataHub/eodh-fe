import { TForm } from './form.model';

export const defaultValues: TForm = {
  copernicus: {
    enabled: false,
    sentinel1: {
      enabled: false,
      acquisitionMode: {
        ew: true,
        hh: true,
        hh_hv: true,
        iw: true,
        vv: true,
        vv_vh: true,
      },
      orbitDirection: {
        ascending: true,
        descending: true,
      },
    },
    sentinel2: {
      enabled: false,
      l1c: false,
      l2a: true,
      cloudCoverage: 100,
    },
    sentinel3: {
      enabled: false,
      slstr: false,
      cloudCoverage: 100,
      olci: true,
    },
    sentinel5: {
      enabled: false,
      aer_ai: true,
      ch4: true,
      cloud: true,
      co: true,
      hcho: true,
      no2: true,
      o3: true,
      so2: true,
    },
  },
  planet: {
    enabled: false,
    planetScope: {
      enabled: false,
    },
    skySat: {
      enabled: false,
    },
    rapidEye: {
      enabled: false,
    },
  },
};
