import type { Meta } from '@storybook/react';

import { Tree as TreeComponent } from './tree.component';

const TreeTemplate = () => {
  return <TreeComponent />;
};

const meta: Meta<typeof TreeTemplate> = {
  component: TreeTemplate,
  title: 'libs/map/ui-search-panel/Tree',
};
export default meta;

export const Tree = {
  args: {},
};
