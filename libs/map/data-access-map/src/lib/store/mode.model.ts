export type TMode = 'search' | 'action-creator';

export interface IModeStore {
  mode: TMode;
  changeMode: (mode: TMode) => void;
  toggleMode: () => void;
}
