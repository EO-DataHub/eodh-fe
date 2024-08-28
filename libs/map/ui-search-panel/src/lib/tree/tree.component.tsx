import { Tree as TreeWrapper } from '@ukri/shared/design-system';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';

import { TForm } from './form.model';
import { PrivateData } from './private-data.component';
import { PublicData } from './public-data.component';

type TTreeProps = {
  onSubmit: (data: TForm) => unknown | Promise<unknown>;
};

export const Tree = ({ onSubmit }: TTreeProps) => {
  const { handleSubmit } = useForm<TForm>();

  return (
    <TreeWrapper>
      <form onSubmit={handleSubmit(onSubmit)}>
        <PublicData />
        <PrivateData />
      </form>
    </TreeWrapper>
  );
};
