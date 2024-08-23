import type { Meta, StoryObj } from '@storybook/react';

import { TreeItems, TTreeTemplate } from './stories/render-tree-items.helper';
import { Tree as TreeComponent } from './tree.component';

const TreeTemplate: StoryObj<TTreeTemplate> = {
  render: ({ icons, fontWeight, fontColor, level, expandable }) => {
    if (!level) {
      return <TreeComponent />;
    }

    return (
      <TreeComponent>
        <TreeItems icons={icons} fontWeight={fontWeight} fontColor={fontColor} level={level} expandable={expandable} />
      </TreeComponent>
    );
  },
};

const meta: Meta<TTreeTemplate> = {
  component: TreeTemplate.render,
  title: 'libs/shared/design-system/Tree',
  argTypes: {
    icons: {
      control: 'select',
      description: 'Select number of icons to be displayed',
      options: [
        '0',
        '0+1',
        '0+2',
        '0+3',
        '1+0',
        '1+1',
        '1+2',
        '1+3',
        '2+0',
        '2+1',
        '2+2',
        '2+3',
        '3+0',
        '3+1',
        '3+2',
        '3+3',
      ],
    },
    fontWeight: {
      control: 'select',
      description: 'Select font weight',
      options: ['bold', 'semibold', 'regular'],
    },
    fontColor: {
      control: 'select',
      description: 'Select font color',
      options: ['primary', 'disabled', 'error', 'warning', 'success', 'information'],
    },
    expandable: {
      control: 'select',
      options: [true, false],
    },
  },
  args: {
    icons: '0',
    expandable: true,
  },
  parameters: {
    docs: {
      source: { type: 'code' },
    },
  },
};

export default meta;

export const Tree1Level = {
  ...TreeTemplate,
  args: {
    level: 1,
  },
};

export const Tree2Level = {
  ...TreeTemplate,
  args: {
    level: 2,
  },
};

export const Tree3Level = {
  ...TreeTemplate,
  args: {
    level: 3,
  },
};

export const Tree4Level = {
  ...TreeTemplate,
  args: {
    level: 4,
  },
};

export const Tree5Level = {
  ...TreeTemplate,
  args: {
    level: 5,
  },
};
