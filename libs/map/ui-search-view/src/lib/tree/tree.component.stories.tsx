import { zodResolver } from '@hookform/resolvers/zod';
import type { Meta, StoryObj } from '@storybook/react';
import { OnboardingProvider } from '@ukri/shared/ui/ac-workflow-onboarding';
import { createDateString, formatDate } from '@ukri/shared/utils/date';
import { memo, useCallback, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { TInitialForm, TUpdateForm, updateSearchSchema } from '../schema/form.schema';
import { Tree as TreeComponent } from './tree.component';
import { defaultSettings, TTreeSettings } from './tree.context';

const oneMonthAgo = () => {
  const today = new Date();
  const oneMonthAgo = new Date();
  oneMonthAgo.setMonth(today.getMonth() - 1);

  return oneMonthAgo;
};

export const defaultValues: TInitialForm = {
  dataSets: {
    status: 'initial',
    copernicus: {
      enabled: false,
      sentinel1: {
        enabled: false,
        expanded: false,
        acquisitionMode: {
          ew: true,
          hh: true,
          hh_hv: true,
          iw: true,
          vv: true,
          vv_vh: true,
        },
        orbitDirection: {
          ascending: true,
          descending: true,
        },
      },
      sentinel2: {
        enabled: false,
        expanded: false,
        l1c: false,
        l2a: true,
        cloudCoverage: 100,
      },
      sentinel3: {
        enabled: false,
        expanded: false,
        slstr: false,
        cloudCoverage: 100,
        olci: true,
      },
      sentinel5P: {
        enabled: false,
        expanded: false,
        aer_ai: true,
        ch4: true,
        cloud: true,
        co: true,
        hcho: true,
        no2: true,
        o3: true,
        so2: true,
      },
    },
    planet: {
      enabled: false,
      planetScope: {
        enabled: false,
        expanded: false,
      },
      skySat: {
        enabled: false,
        expanded: false,
      },
      rapidEye: {
        enabled: false,
        expanded: false,
      },
    },
  },
  date: {
    from: formatDate(createDateString(oneMonthAgo())),
    to: formatDate(createDateString(new Date())),
  },
};

type TTreeTemplate = {
  values: TInitialForm;
  triggerValidation?: boolean;
  settings?: TTreeSettings;
};

const Form = memo(({ values, settings, triggerValidation }: TTreeTemplate) => {
  const form = useForm<TInitialForm, unknown, TUpdateForm>({
    values: { ...values },
    resolver: zodResolver(updateSearchSchema),
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
        <TreeComponent defaultSettings={settings} schema='search' />
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
  decorators: [
    (Story) => (
      <OnboardingProvider>
        <Story />
      </OnboardingProvider>
    ),
  ],
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
      dataSets: {
        copernicus: {
          ...defaultValues.dataSets?.copernicus,
          sentinel1: {
            ...defaultValues.dataSets?.copernicus.sentinel1,
            enabled: true,
            acquisitionMode: {
              ...defaultValues.dataSets?.copernicus.sentinel1?.acquisitionMode,
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
