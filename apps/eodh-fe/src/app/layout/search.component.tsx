import { Map, MapWrapper } from '@ukri/map/ui-map';

import { LeftMenu } from './left-menu.component';
import { TopBar } from './top-bar.component';

export const SearchLayout = () => {
  return (
    <div className='flex h-screen w-screen flex-col' data-testid='search-layout'>
      <MapWrapper>
        <TopBar />
        <div className='flex h-screen w-screen'>
          <LeftMenu />
          <Map className='h-full w-full flex' />
        </div>
      </MapWrapper>
    </div>
  );
};
