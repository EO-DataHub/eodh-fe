import { zodResolver } from '@hookform/resolvers/zod';
import type { Meta, StoryObj } from '@storybook/react';
import { memo, useCallback, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { defaultValues } from './form.default-data';
import { TForm } from './form.model';
import { validationSchema } from './form.schema';
import { Tree as TreeComponent } from './tree.component';
import { defaultSettings, TTreeSettings } from './tree.context';

type TTreeTemplate = {
  values: TForm;
  triggerValidation?: boolean;
  settings?: TTreeSettings;
};

const Form = memo(({ values, settings, triggerValidation }: TTreeTemplate) => {
  const form = useForm<TForm>({
    values: { ...values },
    resolver: zodResolver(validationSchema),
    reValidateMode: 'onChange',
    mode: 'onChange',
  });

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const submit = useCallback(() => {}, []);

  useEffect(() => {
    if (triggerValidation) {
      // hack for triggering validation with error messages from zod on react hook form
      setTimeout(() => {
        form.trigger();
      }, 1);
    }
  }, [form, submit, triggerValidation]);

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(submit)}>
        <TreeComponent defaultSettings={settings} />
      </form>
    </FormProvider>
  );
});

const TreeTemplate: StoryObj<TTreeTemplate> = {
  render: ({ values, settings, triggerValidation }) => {
    return <Form values={values} settings={settings} triggerValidation={triggerValidation} />;
  },
};

const meta: Meta<TTreeTemplate> = {
  component: TreeTemplate.render,
  title: 'libs/map/ui-search-view/Tree',
};
export default meta;

export const TreeDefaultState = {
  ...TreeTemplate,
  args: {
    values: defaultValues,
    settings: defaultSettings,
  },
  docs: {
    source: {
      type: 'code',
    },
  },
};

export const TreeError = {
  ...TreeTemplate,
  args: {
    values: {
      ...defaultValues,
      data: {
        copernicus: {
          ...defaultValues.data.copernicus,
          sentinel1: {
            ...defaultValues.data.copernicus.sentinel1,
            enabled: true,
            acquisitionMode: {
              ...defaultValues.data.copernicus.sentinel1.acquisitionMode,
              hh: false,
              hh_hv: false,
            },
          },
        },
      },
    },
    settings: {
      ...defaultSettings,
      'copernicus.sentinel1.enabled': true,
    },
    triggerValidation: true,
  },
  docs: {
    source: {
      type: 'code',
    },
  },
};
