export type TDataSetsDefaultValues = {
  status: 'initial' | 'updated';
  copernicus: {
    enabled: boolean;
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
      l1c: boolean;
      l2a: boolean;
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
    esacciGloballc?: {
      enabled: boolean;
      expanded: boolean;
    };
    clmsCorinelc?: {
      enabled: boolean;
      expanded: boolean;
    };
    clmsWaterBodies?: {
      enabled: boolean;
      expanded: boolean;
    };
  };
  planet: {
    enabled: boolean;
    planetScope: {
      enabled: boolean;
      expanded: boolean;
    };
    skySat: {
      enabled: boolean;
      expanded: boolean;
    };
    rapidEye: {
      enabled: boolean;
      expanded: boolean;
    };
  };
};

export const dataSets: TDataSetsDefaultValues = {
  status: 'initial',
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
  auxiliary: {
    esacciGloballc: {
      enabled: false,
      expanded: false,
    },
    clmsCorinelc: {
      enabled: false,
      expanded: false,
    },
    clmsWaterBodies: {
      enabled: false,
      expanded: false,
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
};
