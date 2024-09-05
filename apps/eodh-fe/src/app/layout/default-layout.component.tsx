import { Map, MapWrapper } from '@ukri/map/ui-map';
import TileLayer from 'ol/layer/WebGLTile.js';

import { LeftMenu } from './left-menu.component';
import COGMap from './test';
import { TopBar } from './top-bar.component';

export const DefaultLayout = () => {
  return (
    <div className='flex h-screen w-screen flex-col overflow-hidden' data-testid='default-layout'>
      <MapWrapper>
        {/* <COGMap /> */}
        <TopBar />
        <div className='flex w-full h-full overflow-hidden'>
          <LeftMenu />
          <Map className='flex w-full' />
        </div>
      </MapWrapper>
    </div>
  );
};
