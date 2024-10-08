import { createDateString, formatDate } from '@ukri/shared/utils/date';

import { TInitialForm } from './schema/form.schema';

const oneMonthAgo = () => {
  const today = new Date();
  const oneMonthAgo = new Date();
  oneMonthAgo.setMonth(today.getMonth() - 1);

  return oneMonthAgo;
};

export const defaultValues: TInitialForm = {
  dataSets: {
    copernicus: {
      enabled: false,
      sentinel1: {
        enabled: false,
        expanded: false,
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
        expanded: false,
        l1c: false,
        l2a: true,
        cloudCoverage: 100,
      },
      sentinel3: {
        enabled: false,
        expanded: false,
        slstr: false,
        cloudCoverage: 100,
        olci: true,
      },
      sentinel5P: {
        enabled: false,
        expanded: false,
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
        expanded: false,
      },
      skySat: {
        enabled: false,
        expanded: false,
      },
      rapidEye: {
        enabled: false,
        expanded: false,
      },
    },
  },
  date: {
    from: formatDate(createDateString(oneMonthAgo())),
    to: formatDate(createDateString(new Date())),
  },
};
