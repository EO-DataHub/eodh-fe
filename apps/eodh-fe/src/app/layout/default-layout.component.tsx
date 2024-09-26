import { ActionCreatorPanel } from '@ukri/map/feature-action-creator-panel';
import { FootprintLayer, Map, MapWrapper, TrueColorImageLayer } from '@ukri/map/ui-map';
import { Checklist } from '@ukri/map/ui-search-view';

import { LeftMenu } from './left-menu.component';
import { TopBar } from './top-bar.component';

export const DefaultLayout = () => {
  return (
    <div className='flex h-screen w-screen flex-col overflow-hidden' data-testid='default-layout'>
      <MapWrapper>
        <TopBar />
        <div className='flex w-full h-full overflow-hidden'>
          <LeftMenu />
          <TrueColorImageLayer />
          <FootprintLayer />
          <Map className='flex w-full'>
            <Checklist />
            <ActionCreatorPanel />
          </Map>
        </div>
      </MapWrapper>
    </div>
  );
};
