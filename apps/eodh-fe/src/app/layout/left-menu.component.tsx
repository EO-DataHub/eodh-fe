import { SatelliteTree } from './tree.component';

export const LeftMenu = () => {
  return (
    <div className='w-[360px] min-w-[360px] h-full bg-bright-main border-bright-mid border-r-[1px] overflow-scroll'>
      <SatelliteTree />
    </div>
  );
};
