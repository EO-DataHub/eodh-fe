import { createDateString, formatDate } from '@ukri/shared/utils/date';

import { TForm } from './form.model';

const oneMonthAgo = () => {
  const today = new Date();
  const oneMonthAgo = new Date();
  oneMonthAgo.setMonth(today.getMonth() - 1);

  return oneMonthAgo;
};

export const defaultValues: TForm = {
  data: {
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
  },
  date: {
    from: formatDate(createDateString(oneMonthAgo())),
    to: formatDate(createDateString(new Date())),
  },
};
