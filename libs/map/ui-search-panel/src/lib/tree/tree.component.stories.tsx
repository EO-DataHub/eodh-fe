import { zodResolver } from '@hookform/resolvers/zod';
import type { Meta } from '@storybook/react';
import { useCallback } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { defaultValues } from './form.default-data';
import { TForm } from './form.model';
import { validationSchema } from './form.schema';
import { Tree as TreeComponent } from './tree.component';

const TreeTemplate = () => {
  const form = useForm<TForm>({
    defaultValues,
    resolver: zodResolver(validationSchema),
    reValidateMode: 'onChange',
    mode: 'onChange',
  });

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const submit = useCallback(() => {}, []);

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(submit)}>
        <TreeComponent />
      </form>
    </FormProvider>
  );
};

const meta: Meta<typeof TreeTemplate> = {
  component: TreeTemplate,
  title: 'libs/map/ui-search-panel/Tree',
};
export default meta;

export const Tree = {
  args: {},
};
