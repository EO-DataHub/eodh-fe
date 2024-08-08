import { PropsWithChildren, ReactChild } from 'react';

type TTree = PropsWithChildren<{ title: string; icon?: ReactChild }>;

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

const Tree = ({ title, icon, children }: TTree) => {
  return (
    <div role='tree' aria-orientation='vertical'>
      <div role='group' data-hs-accordion-always-open=''>
        <div className='active' role='treeitem' aria-expanded='true'></div>
        {!!children && (
          <TreeCollapse>
            <TreeHeader title={title} icon={icon} />
          </TreeCollapse>
        )}

        {!children && <TreeHeader title={title} icon={icon} />}

        {children}
      </div>
    </div>
  );
};

export const TreeItem = () => {
  return (
    <>
      <Tree title='assets' icon={<DirectoryIcon />}>
        <TreeLevel title='css' icon={<DirectoryIcon />}>
          <TreeLevel title='main' icon={<DirectoryIcon />}>
            <TreeItem3>
              <div
                className='hs-accordion-selectable hs-accordion-selected:bg-gray-100 dark:hs-accordion-selected:bg-neutral-700 px-2 rounded-md cursor-pointer'
                role='treeitem'
              >
                <div className='flex items-center gap-x-3'>
                  <FileIcon />
                  <div className='grow'>
                    <span className='text-sm text-gray-800 dark:text-neutral-200'>main.css</span>
                  </div>
                </div>
              </div>
            </TreeItem3>
            <TreeLevel title='main.css' icon={<FileIcon />} />
            <TreeItem3>
              <div
                className='hs-accordion-selectable hs-accordion-selected:bg-gray-100 dark:hs-accordion-selected:bg-neutral-700 px-2 rounded-md cursor-pointer'
                role='treeitem'
              >
                <div className='flex items-center gap-x-3'>
                  <FileIcon />
                  <div className='grow'>
                    <span className='text-sm text-gray-800 dark:text-neutral-200'>docs.css</span>
                  </div>
                </div>
              </div>
            </TreeItem3>
            <TreeLevel title='docs.css' icon={<FileIcon />} />
            <TreeItem3>
              <div className='px-2' role='treeitem'>
                <span className='text-sm text-gray-800 dark:text-neutral-200'>README.txt</span>
              </div>
            </TreeItem3>
            <TreeLevel title='README.txt' />
          </TreeLevel>
          <TreeLevel title='tailwind' icon={<DirectoryIcon />}>
            <TreeLevel title='README2.txt' />
          </TreeLevel>
          {/*<TreeItem3>*/}
          {/*  <div className='py-0.5 px-1.5' role='treeitem'>*/}
          {/*    <span className='text-sm text-gray-800 dark:text-neutral-200'>.gitignore</span>*/}
          {/*  </div>*/}
          {/*</TreeItem3>*/}
          {/*<TreeLevel title='.gitignore' />*/}
        </TreeLevel>
        <TreeLevel title='img' icon={<DirectoryIcon />} />
        <TreeLevel title='js' icon={<DirectoryIcon />} />
      </Tree>
      <Tree title='scripts' icon={<DirectoryIcon />} />
      <Tree title='templates' icon={<DirectoryIcon />} />
    </>
  );
};

export const CollapsableTreeLevel = ({ title, icon, children }: TTree) => {
  if (!children) {
    return null;
  }

  return (
    <div
      className='ps-7 relative before:absolute before:top-0 before:start-3 before:w-0.5 before:-ms-px before:h-full before:bg-gray-100 dark:before:bg-neutral-700'
      role='group'
    >
      <div className='active' role='treeitem' aria-expanded='true'>
        <TreeCollapse>
          <TreeHeader title={title} icon={icon} />
        </TreeCollapse>

        {children}
      </div>
    </div>
  );
};

export const TreeLevel = ({ title, icon, children }: TTree) => {
  return (
    <div
      className='w-full overflow-hidden transition-[height] duration-300'
      role='group'
      aria-labelledby='hs-basic-tree-heading-one'
    >
      <CollapsableTreeLevel title={title} icon={icon}>
        {children}
      </CollapsableTreeLevel>
      <TreeHeaderSimple title={title} icon={icon}>
        {children}
      </TreeHeaderSimple>
      {/*<div*/}
      {/*  className='ps-7 relative before:absolute before:top-0 before:start-3 before:w-0.5 before:-ms-px before:h-full before:bg-gray-100 dark:before:bg-neutral-700'*/}
      {/*  role='group'*/}
      {/*>*/}
      {/*  <div className='active' role='treeitem' aria-expanded='true'>*/}
      {/*    {!!children && (*/}
      {/*      <TreeCollapse>*/}
      {/*        <TreeHeader title={title} icon={icon} />*/}
      {/*      </TreeCollapse>*/}
      {/*    )}*/}

      {/*    {!children && <TreeHeaderSimple title={title} icon={icon} />}*/}

      {/*    {children}*/}
      {/*  </div>*/}
      {/*</div>*/}
    </div>
  );
};

export const TreeItem3 = ({ children }: PropsWithChildren) => {
  return (
    <div
      className='w-full overflow-hidden transition-[height] duration-300'
      role='group'
      aria-labelledby='hs-basic-tree-heading-one'
    >
      <div
        className='ms-3 ps-3 relative before:absolute before:top-0 before:start-0 before:w-0.5 before:-ms-px before:h-full before:bg-gray-100 dark:before:bg-neutral-700'
        role='group'
        data-hs-accordion-always-open=''
      >
        <div className='active' role='treeitem' aria-expanded='true'>
          {children}
        </div>
      </div>
    </div>
  );
};

const TreeHeader = ({ title, icon }: { title: string; icon?: ReactChild }) => {
  return (
    <div className='grow hs-accordion-selectable hs-accordion-selected:bg-gray-100 dark:hs-accordion-selected:bg-neutral-700 px-1.5 rounded-md cursor-pointer'>
      <div className='flex items-center gap-x-3'>
        {icon}
        <div className='grow'>
          <span className='text-sm text-gray-800 dark:text-neutral-200'>{title}</span>
        </div>
      </div>
    </div>
  );
};

const TreeHeaderSimple = ({ title, icon, children }: TTree) => {
  if (children) {
    return null;
  }

  return (
    <div
      className='ms-3 ps-3 relative before:absolute before:top-0 before:start-0 before:w-0.5 before:-ms-px before:h-full before:bg-gray-100 dark:before:bg-neutral-700'
      role='group'
      data-hs-accordion-always-open=''
    >
      <div className='active' role='treeitem' aria-expanded='true'>
        {/*<div className='px-2' role='treeitem'>*/}
        {/*  <span className='text-sm text-gray-800 dark:text-neutral-200'>{title}</span>*/}
        {/*</div>*/}

        <div
          className='hs-accordion-selectable hs-accordion-selected:bg-gray-100 dark:hs-accordion-selected:bg-neutral-700 px-2 rounded-md cursor-pointer'
          role='treeitem'
        >
          <div className='flex items-center gap-x-3'>
            {icon}
            <div className='grow'>
              <span className='text-sm text-gray-800 dark:text-neutral-200'>{title}</span>
            </div>
          </div>
        </div>
        {/*<TreeHeader title={title} icon={icon} />*/}
      </div>
    </div>
  );
};

const TreeCollapse = ({ children }: PropsWithChildren) => {
  return (
    <div className='hs-accordion-heading py-0.5 flex items-center gap-x-0.5 w-full'>
      <button
        className='hs-accordion-toggle size-6 flex justify-center items-center hover:bg-gray-100 rounded-md focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:hover:bg-neutral-700 dark:focus:bg-neutral-700'
        aria-expanded='true'
        aria-controls='hs-basic-tree-collapse-one'
      >
        <svg
          className='size-4 text-gray-800 dark:text-neutral-200'
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
          <path d='M5 12h14'></path>
          <path className='hs-accordion-active:hidden block' d='M12 5v14'></path>
        </svg>
      </button>

      {children}
    </div>
  );
};
