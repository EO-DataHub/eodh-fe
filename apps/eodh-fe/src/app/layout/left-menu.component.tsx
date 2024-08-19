import { SearchPanel } from '@ukri/map/ui-search-panel';

export const LeftMenu = () => {
  return (
    <div className='w-[360px] min-w-[360px] h-full bg-bright-main border-bright-mid border-r-[1px] overflow-scroll'>
      <SearchPanel />
    </div>
  );
};
