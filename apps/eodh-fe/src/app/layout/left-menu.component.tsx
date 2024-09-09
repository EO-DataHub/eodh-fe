import { SearchModePanel } from '@ukri/map/feature-search-mode-panel';

export const LeftMenu = () => {
  return (
    <div className='w-[361px] min-w-[361px] h-full bg-bright-main border-bright-mid border-r-[1px] overflow-scroll'>
      <SearchModePanel />
    </div>
  );
};
