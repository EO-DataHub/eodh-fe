import { createContext, PropsWithChildren } from 'react';

import { useEdit } from './use-edit.hook';

export type TEditMode = {
  editMode: 'simple' | 'rectangle';
  setEditMode: (editMode: TEditMode['editMode']) => void;
};

const defaultValues: TEditMode = {
  editMode: 'simple',
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setEditMode: () => {},
};

export const EditModeContext = createContext<TEditMode>(defaultValues);

export const EditModeProvider = ({ children }: PropsWithChildren) => {
  const { editMode, setEditMode } = useEdit();

  return <EditModeContext.Provider value={{ editMode, setEditMode }}>{children}</EditModeContext.Provider>;
};
