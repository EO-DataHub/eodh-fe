export const TreeBasicItem = () => {
  return (
    <div className='hs-accordion-treeview-root' role='tree' aria-orientation='vertical'>
      <div className='hs-accordion-group' role='group' data-hs-accordion-always-open=''>
        <div className='hs-accordion active' role='treeitem' aria-expanded='true' id='hs-basic-tree-heading-one'>
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

            <div className='grow hs-accordion-selectable hs-accordion-selected:bg-gray-100 dark:hs-accordion-selected:bg-neutral-700 px-1.5 rounded-md cursor-pointer'>
              <div className='flex items-center gap-x-3'>
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
                <div className='grow'>
                  <span className='text-sm text-gray-800 dark:text-neutral-200'>assets</span>
                </div>
              </div>
            </div>
          </div>

          <div
            id='hs-basic-tree-collapse-one'
            className='hs-accordion-content w-full overflow-hidden transition-[height] duration-300'
            role='group'
            aria-labelledby='hs-basic-tree-heading-one'
          >
            <div
              className='hs-accordion-group ps-7 relative before:absolute before:top-0 before:start-3 before:w-0.5 before:-ms-px before:h-full before:bg-gray-100 dark:before:bg-neutral-700'
              role='group'
              data-hs-accordion-always-open=''
            >
              <div
                className='hs-accordion active'
                role='treeitem'
                aria-expanded='true'
                id='hs-basic-tree-sub-heading-one'
              >
                <div className='hs-accordion-heading py-0.5 flex items-center gap-x-0.5 w-full'>
                  <button
                    className='hs-accordion-toggle size-6 flex justify-center items-center hover:bg-gray-100 rounded-md focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:hover:bg-neutral-700 dark:focus:bg-neutral-700'
                    aria-expanded='true'
                    aria-controls='hs-basic-tree-sub-collapse-one'
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

                  <div className='grow hs-accordion-selectable hs-accordion-selected:bg-gray-100 dark:hs-accordion-selected:bg-neutral-700 px-1.5 rounded-md cursor-pointer'>
                    <div className='flex items-center gap-x-3'>
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
                      <div className='grow'>
                        <span className='text-sm text-gray-800 dark:text-neutral-200'>css</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  id='hs-basic-tree-sub-collapse-one'
                  className='hs-accordion-content w-full overflow-hidden transition-[height] duration-300'
                  role='group'
                  aria-labelledby='hs-basic-tree-sub-heading-one'
                >
                  <div
                    className='hs-accordion-group ps-7 relative before:absolute before:top-0 before:start-3 before:w-0.5 before:-ms-px before:h-full before:bg-gray-100 dark:before:bg-neutral-700'
                    role='group'
                    data-hs-accordion-always-open=''
                  >
                    <div
                      className='hs-accordion active'
                      role='treeitem'
                      aria-expanded='true'
                      id='hs-basic-tree-sub-level-two-heading-one'
                    >
                      <div className='hs-accordion-heading py-0.5 flex items-center gap-x-0.5 w-full'>
                        <button
                          className='hs-accordion-toggle size-6 flex justify-center items-center hover:bg-gray-100 rounded-md focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:hover:bg-neutral-700 dark:focus:bg-neutral-700'
                          aria-expanded='true'
                          aria-controls='hs-basic-tree-sub-level-two-collapse-one'
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

                        <div className='grow hs-accordion-selectable hs-accordion-selected:bg-gray-100 dark:hs-accordion-selected:bg-neutral-700 px-1.5 rounded-md cursor-pointer'>
                          <div className='flex items-center gap-x-3'>
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
                            <div className='grow'>
                              <span className='text-sm text-gray-800 dark:text-neutral-200'>main</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div
                        id='hs-basic-tree-sub-level-two-collapse-one'
                        className='hs-accordion-content w-full overflow-hidden transition-[height] duration-300'
                        role='group'
                        aria-labelledby='hs-basic-tree-sub-level-two-heading-one'
                      >
                        <div className='ms-3 ps-3 relative before:absolute before:top-0 before:start-0 before:w-0.5 before:-ms-px before:h-full before:bg-gray-100 dark:before:bg-neutral-700'>
                          <div
                            className='hs-accordion-selectable hs-accordion-selected:bg-gray-100 dark:hs-accordion-selected:bg-neutral-700 px-2 rounded-md cursor-pointer'
                            role='treeitem'
                          >
                            <div className='flex items-center gap-x-3'>
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
                              <div className='grow'>
                                <span className='text-sm text-gray-800 dark:text-neutral-200'>main.css</span>
                              </div>
                            </div>
                          </div>

                          <div
                            className='hs-accordion-selectable hs-accordion-selected:bg-gray-100 dark:hs-accordion-selected:bg-neutral-700 px-2 rounded-md cursor-pointer'
                            role='treeitem'
                          >
                            <div className='flex items-center gap-x-3'>
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
                              <div className='grow'>
                                <span className='text-sm text-gray-800 dark:text-neutral-200'>docs.css</span>
                              </div>
                            </div>
                          </div>

                          <div className='px-2'>
                            <span className='text-sm text-gray-800 dark:text-neutral-200'>README.txt</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div
                      className='hs-accordion'
                      role='treeitem'
                      aria-expanded='false'
                      id='hs-basic-tree-sub-level-two-heading-two'
                    >
                      <div className='hs-accordion-heading py-0.5 flex items-center gap-x-0.5 w-full'>
                        <button
                          className='hs-accordion-toggle size-6 flex justify-center items-center hover:bg-gray-100 rounded-md focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:hover:bg-neutral-700 dark:focus:bg-neutral-700'
                          aria-expanded='false'
                          aria-controls='hs-basic-tree-sub-level-two-collapse-two'
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

                        <div className='grow hs-accordion-selectable hs-accordion-selected:bg-gray-100 dark:hs-accordion-selected:bg-neutral-700 px-1.5 rounded-md cursor-pointer'>
                          <div className='flex items-center gap-x-3'>
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
                            <div className='grow'>
                              <span className='text-sm text-gray-800 dark:text-neutral-200'>tailwind</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div
                        id='hs-basic-tree-sub-level-two-collapse-two'
                        className='hs-accordion-content w-full overflow-hidden transition-[height] duration-300'
                        role='group'
                        aria-labelledby='hs-basic-tree-sub-level-two-heading-two'
                      >
                        <div className='ms-3 ps-3 relative before:absolute before:top-0 before:start-0 before:w-0.5 before:-ms-px before:h-full before:bg-gray-100 dark:before:bg-neutral-700'>
                          <div
                            className='hs-accordion-selectable hs-accordion-selected:bg-gray-100 dark:hs-accordion-selected:bg-neutral-700 px-2 rounded-md cursor-pointer'
                            role='treeitem'
                          >
                            <div className='flex items-center gap-x-3'>
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
                              <div className='grow'>
                                <span className='text-sm text-gray-800 dark:text-neutral-200'>input.css</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className='py-0.5 px-1.5' role='treeitem'>
                      <span className='text-sm text-gray-800 dark:text-neutral-200'>.gitignore</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className='hs-accordion' role='treeitem' aria-expanded='false' id='hs-basic-tree-sub-heading-two'>
                <div className='hs-accordion-heading py-0.5 flex items-center gap-x-0.5 w-full'>
                  <button
                    className='hs-accordion-toggle size-6 flex justify-center items-center hover:bg-gray-100 rounded-md focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:hover:bg-neutral-700 dark:focus:bg-neutral-700'
                    aria-expanded='false'
                    aria-controls='hs-basic-tree-sub-collapse-two'
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

                  <div className='grow hs-accordion-selectable hs-accordion-selected:bg-gray-100 dark:hs-accordion-selected:bg-neutral-700 px-1.5 rounded-md cursor-pointer'>
                    <div className='flex items-center gap-x-3'>
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
                      <div className='grow'>
                        <span className='text-sm text-gray-800 dark:text-neutral-200'>img</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  id='hs-basic-tree-sub-collapse-two'
                  className='hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300'
                  role='group'
                  aria-labelledby='hs-basic-tree-sub-heading-two'
                >
                  <div className='ms-3 ps-3 relative before:absolute before:top-0 before:start-0 before:w-0.5 before:-ms-px before:h-full before:bg-gray-100 dark:before:bg-neutral-700'>
                    <div
                      className='hs-accordion-selectable hs-accordion-selected:bg-gray-100 dark:hs-accordion-selected:bg-neutral-700 px-2 rounded-md cursor-pointer'
                      role='treeitem'
                    >
                      <div className='flex items-center gap-x-3'>
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
                          <circle cx='10' cy='12' r='2'></circle>
                          <path d='m20 17-1.296-1.296a2.41 2.41 0 0 0-3.408 0L9 22'></path>
                        </svg>
                        <div className='grow'>
                          <span className='text-sm text-gray-800 dark:text-neutral-200'>hero.jpg</span>
                        </div>
                      </div>
                    </div>

                    <div
                      className='hs-accordion-selectable hs-accordion-selected:bg-gray-100 dark:hs-accordion-selected:bg-neutral-700 px-2 rounded-md cursor-pointer'
                      role='treeitem'
                    >
                      <div className='flex items-center gap-x-3'>
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
                          <circle cx='10' cy='12' r='2'></circle>
                          <path d='m20 17-1.296-1.296a2.41 2.41 0 0 0-3.408 0L9 22'></path>
                        </svg>
                        <div className='grow'>
                          <span className='text-sm text-gray-800 dark:text-neutral-200'>tailwind.png</span>
                        </div>
                      </div>
                    </div>

                    <div
                      className='hs-accordion-selectable hs-accordion-selected:bg-gray-100 dark:hs-accordion-selected:bg-neutral-700 px-2 rounded-md cursor-pointer'
                      role='treeitem'
                    >
                      <div className='flex items-center gap-x-3'>
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
                          <circle cx='10' cy='12' r='2'></circle>
                          <path d='m20 17-1.296-1.296a2.41 2.41 0 0 0-3.408 0L9 22'></path>
                        </svg>
                        <div className='grow'>
                          <span className='text-sm text-gray-800 dark:text-neutral-200'>untitled.png</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className='hs-accordion' role='treeitem' aria-expanded='false' id='hs-basic-tree-sub-heading-three'>
                <div className='hs-accordion-heading py-0.5 flex items-center gap-x-0.5 w-full'>
                  <button
                    className='hs-accordion-toggle size-6 flex justify-center items-center hover:bg-gray-100 rounded-md focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:hover:bg-neutral-700 dark:focus:bg-neutral-700'
                    aria-expanded='false'
                    aria-controls='hs-basic-tree-sub-collapse-three'
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

                  <div className='grow hs-accordion-selectable hs-accordion-selected:bg-gray-100 dark:hs-accordion-selected:bg-neutral-700 px-1.5 rounded-md cursor-pointer'>
                    <div className='flex items-center gap-x-3'>
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
                      <div className='grow'>
                        <span className='text-sm text-gray-800 dark:text-neutral-200'>js</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  id='hs-basic-tree-sub-collapse-three'
                  className='hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300'
                  role='group'
                  aria-labelledby='hs-basic-tree-sub-heading-three'
                >
                  <div className='ms-3 ps-3 relative before:absolute before:top-0 before:start-0 before:w-0.5 before:-ms-px before:h-full before:bg-gray-100 dark:before:bg-neutral-700'>
                    <div
                      className='hs-accordion-selectable hs-accordion-selected:bg-gray-100 dark:hs-accordion-selected:bg-neutral-700 px-2 rounded-md cursor-pointer'
                      role='treeitem'
                    >
                      <div className='flex items-center gap-x-3'>
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
                          <circle cx='10' cy='12' r='2'></circle>
                          <path d='m20 17-1.296-1.296a2.41 2.41 0 0 0-3.408 0L9 22'></path>
                        </svg>
                        <div className='grow'>
                          <span className='text-sm text-gray-800 dark:text-neutral-200'>preline.jpg</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='hs-accordion' role='treeitem' aria-expanded='false' id='hs-basic-tree-heading-two'>
          <div className='hs-accordion-heading py-0.5 flex items-center gap-x-0.5 w-full'>
            <button
              className='hs-accordion-toggle size-6 flex justify-center items-center hover:bg-gray-100 rounded-md focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:hover:bg-neutral-700 dark:focus:bg-neutral-700'
              aria-expanded='false'
              aria-controls='hs-basic-tree-collapse-two'
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

            <div className='grow hs-accordion-selectable hs-accordion-selected:bg-gray-100 dark:hs-accordion-selected:bg-neutral-700 px-1.5 rounded-md cursor-pointer'>
              <div className='flex items-center gap-x-3'>
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
                <div className='grow'>
                  <span className='text-sm text-gray-800 dark:text-neutral-200'>scripts</span>
                </div>
              </div>
            </div>
          </div>

          <div
            id='hs-basic-tree-collapse-two'
            className='hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300'
            role='group'
            aria-labelledby='hs-basic-tree-heading-two'
          >
            <div className='ms-3 ps-3 relative before:absolute before:top-0 before:start-0 before:w-0.5 before:-ms-px before:h-full before:bg-gray-100 dark:before:bg-neutral-700'>
              <div
                className='hs-accordion-selectable hs-accordion-selected:bg-gray-100 dark:hs-accordion-selected:bg-neutral-700 px-2 rounded-md cursor-pointer'
                role='treeitem'
              >
                <div className='flex items-center gap-x-3'>
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
                  <div className='grow'>
                    <span className='text-sm text-gray-800 dark:text-neutral-200'>preline.js</span>
                  </div>
                </div>
              </div>

              <div
                className='hs-accordion-selectable hs-accordion-selected:bg-gray-100 dark:hs-accordion-selected:bg-neutral-700 px-2 rounded-md cursor-pointer'
                role='treeitem'
              >
                <div className='flex items-center gap-x-3'>
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
                  <div className='grow'>
                    <span className='text-sm text-gray-800 dark:text-neutral-200'>tailwind.js</span>
                  </div>
                </div>
              </div>

              <div
                className='hs-accordion-selectable hs-accordion-selected:bg-gray-100 dark:hs-accordion-selected:bg-neutral-700 px-2 rounded-md cursor-pointer'
                role='treeitem'
              >
                <div className='flex items-center gap-x-3'>
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
                  <div className='grow'>
                    <span className='text-sm text-gray-800 dark:text-neutral-200'>www.js</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='hs-accordion' role='treeitem' aria-expanded='false' id='hs-basic-tree-heading-three'>
          <div className='hs-accordion-heading py-0.5 flex items-center gap-x-0.5 w-full'>
            <button
              className='hs-accordion-toggle size-6 flex justify-center items-center hover:bg-gray-100 rounded-md focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:hover:bg-neutral-700 dark:focus:bg-neutral-700'
              aria-expanded='false'
              aria-controls='hs-basic-tree-collapse-three'
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

            <div className='grow hs-accordion-selectable hs-accordion-selected:bg-gray-100 dark:hs-accordion-selected:bg-neutral-700 px-1.5 rounded-md cursor-pointer'>
              <div className='flex items-center gap-x-3'>
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
                <div className='grow'>
                  <span className='text-sm text-gray-800 dark:text-neutral-200'>templates</span>
                </div>
              </div>
            </div>
          </div>

          <div
            id='hs-basic-tree-collapse-three'
            className='hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300'
            role='group'
            aria-labelledby='hs-basic-tree-heading-three'
          >
            <div className='ms-3 ps-3 relative before:absolute before:top-0 before:start-0 before:w-0.5 before:-ms-px before:h-full before:bg-gray-100 dark:before:bg-neutral-700'>
              <div
                className='hs-accordion-selectable hs-accordion-selected:bg-gray-100 dark:hs-accordion-selected:bg-neutral-700 px-2 rounded-md cursor-pointer'
                role='treeitem'
              >
                <div className='flex items-center gap-x-3'>
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
                  <div className='grow'>
                    <span className='text-sm text-gray-800 dark:text-neutral-200'>index.html</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
