export interface ITrueImageStore {
  stacUrl: string | undefined;
  setStacUrl: (url: string | undefined) => void;
}

export type TTrueImageStoreState = Omit<ITrueImageStore, 'setStacUrl'>;
