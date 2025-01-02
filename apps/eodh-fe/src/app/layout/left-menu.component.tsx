import { SearchModePanel } from '@ukri/map/feature-search-mode-panel';

export const LeftMenu = () => {
  return (
    <div className='w-[360px] min-w-[360px] box-content h-full bg-bright-main border-bright-dark border-r-[1px] overflow-x-visible overflow-y-visible'>
      <SearchModePanel />
    </div>
  );
};
