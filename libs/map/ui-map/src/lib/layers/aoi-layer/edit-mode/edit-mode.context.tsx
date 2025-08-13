import { PropsWithChildren } from 'react';

import { useEdit } from './use-edit.hook';

export const EditModeProvider = ({ children }: PropsWithChildren) => {
  useEdit();

  return children;
};
