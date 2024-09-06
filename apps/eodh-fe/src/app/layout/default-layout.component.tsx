import { Map, MapWrapper, StacLayer } from '@ukri/map/ui-map';

import { LeftMenu } from './left-menu.component';
import { TopBar } from './top-bar.component';

export const DefaultLayout = () => {
  return (
    <div className='flex h-screen w-screen flex-col overflow-hidden' data-testid='default-layout'>
      <MapWrapper>
        <TopBar />
        <div className='flex w-full h-full overflow-hidden'>
          <LeftMenu />
          <StacLayer />
          <Map className='flex w-full' />
        </div>
      </MapWrapper>
    </div>
  );
};
