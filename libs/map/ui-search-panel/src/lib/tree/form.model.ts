export type TForm = {
  copernicus: {
    sentinel1: {
      acquisitionMode: {
        EW: boolean;
        HH: boolean;
        'HH+HV': boolean;
        IW: boolean;
        VV: boolean;
        'VV+VH': boolean;
      };
      orbitDirection: {
        ascending: boolean;
        descending: boolean;
      };
    };
  };
};
