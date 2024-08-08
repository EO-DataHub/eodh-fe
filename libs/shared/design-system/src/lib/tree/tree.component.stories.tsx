import type { Meta } from '@storybook/react';

import { Tree as TreeComponent, TreeItem } from './tree.component';

const DirectoryIcon = () => {
  return (
    <svg
      className='shrink-0 size-4 text-gray-500 dark:text-neutral-500'
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      stroke-width='1.5'
      stroke-linecap='round'
      stroke-linejoin='round'
    >
      <path d='M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z'></path>
    </svg>
  );
};

const FileIcon = () => {
  return (
    <svg
      className='shrink-0 size-4 text-gray-500 dark:text-neutral-500'
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      stroke-width='1.5'
      stroke-linecap='round'
      stroke-linejoin='round'
    >
      <path d='M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z'></path>
      <path d='M14 2v4a2 2 0 0 0 2 2h4'></path>
    </svg>
  );
};

const TreeTemplate = () => {
  return (
    <TreeComponent>
      <TreeItem title='assets' icon={<DirectoryIcon />}>
        <TreeItem title='css' icon={<DirectoryIcon />}>
          <TreeItem title='main' icon={<DirectoryIcon />}>
            <TreeItem title='main.css' icon={<FileIcon />} />
            <TreeItem title='docs.css' icon={<FileIcon />} />
            <TreeItem title='README.txt' />
          </TreeItem>
          <TreeItem title='tailwind' icon={<DirectoryIcon />}>
            <TreeItem title='README2.txt' />
          </TreeItem>
        </TreeItem>
        <TreeItem title='img' icon={<DirectoryIcon />} />
        <TreeItem title='js' icon={<DirectoryIcon />} />
      </TreeItem>
      <TreeItem title='scripts' icon={<DirectoryIcon />} />
      <TreeItem title='templates' icon={<DirectoryIcon />} />
    </TreeComponent>
  );
};

const meta: Meta<typeof TreeTemplate> = {
  component: TreeTemplate,
  title: 'libs/shared/design-system/Tree',
};
export default meta;

export const Tree = {
  args: {},
};
