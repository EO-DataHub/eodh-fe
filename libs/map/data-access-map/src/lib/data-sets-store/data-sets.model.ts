export type TDataSetsDefaultValues = {
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

export type TDateSetsState = 'readonly' | 'edit';

export type TSchema = 'search' | 'action-creator';

export type TInitialData = TDataSetsDefaultValues | undefined;

export type TDataSetsStore<T = TInitialData> = {
  schema: TSchema;
  dataSets: T;
  state: TDateSetsState;
  updateDataSets: (state: T) => void;
  changeSchema: (schema: TSchema) => void;
  changeState: (state: TDateSetsState) => void;
};

export type TDataSetsStoreState = Omit<TDataSetsStore, 'updateDataSets' | 'changeSchema'>;

export const defaultState: Omit<TDataSetsStore, 'updateDataSets' | 'changeSchema' | 'changeState'> = {
  state: 'edit',
  schema: 'search',
  dataSets: undefined,
};
