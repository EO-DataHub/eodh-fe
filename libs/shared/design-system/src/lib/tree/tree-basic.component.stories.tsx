import type { Meta } from '@storybook/react';

import { TreeBasicItem as TreeItemComponent } from './tree-basic.component';

const meta: Meta<typeof TreeItemComponent> = {
  component: TreeItemComponent,
  title: 'libs/shared/design-system/Tree',
};
export default meta;

export const TreeBasicItem = {
  args: {},
};
