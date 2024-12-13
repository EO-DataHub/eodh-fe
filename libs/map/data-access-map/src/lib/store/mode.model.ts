export type TMode = 'search' | 'action-creator';

export type TView = 'search' | 'results';

export interface IModeStore {
  mode: TMode;
  view: TView;
  changeMode: (mode: TMode) => void;
  changeView: (view: TView) => void;
  toggleMode: () => void;
  reset: () => void;
}

export type TModeStoreState = Omit<IModeStore, 'mode' | 'changeMode' | 'changeView' | 'toggleMode' | 'reset'>;

export const defaultState: TModeStoreState = {
  view: 'search',
};
