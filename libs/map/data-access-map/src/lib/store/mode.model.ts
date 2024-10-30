import type { TCollection } from '../query/workflow-result.model';
export type TMode = 'search' | 'action-creator';
export type TACView = 'acTreeView' | 'acResultsView';

export interface IModeStore {
  mode: TMode;
  changeMode: (mode: TMode) => void;
  toggleMode: () => void;
  acView: TACView;
  changeAcView: (view: TACView) => void;
  acResultsData?: TCollection;
  setAcResultsData: (data?: TCollection) => void;
  acResultStatus: 'error' | 'success' | 'pending';
  setAcResultStatus: (status: 'error' | 'success' | 'pending') => void;
}
