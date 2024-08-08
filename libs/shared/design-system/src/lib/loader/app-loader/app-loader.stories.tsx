import type { Meta } from '@storybook/react';

import { AppLoader as AppLoaderComponent } from './app-loader.component';

const meta: Meta<typeof AppLoaderComponent> = {
  component: AppLoaderComponent,
  title: 'libs/shared/design-system/loader/AppLoader',
};
export default meta;

export const AppLoader = {
  args: {},
};
