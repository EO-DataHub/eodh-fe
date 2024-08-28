import { TForm } from './form.model';

export const defaultValues: TForm = {
  copernicus: {
    enabled: false,
    sentinel1: {
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
      l1c: true,
      l2a: true,
      cloudCoverage: 100,
    },
    sentinel3: {
      slstr: false,
      cloudCoverage: 100,
      olci: true,
    },
    sentinel5: {
      aer_ai: false,
      ch4: false,
      cloud: false,
      co: false,
      hcho: false,
      no2: false,
      o3: false,
      so2: false,
    },
  },
  planet: {
    enabled: false,
  },
};
