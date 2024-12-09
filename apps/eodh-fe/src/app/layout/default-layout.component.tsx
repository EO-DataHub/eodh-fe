import { ActionCreatorPanel } from '@ukri/map/feature-action-creator-panel';
import {
  ComparisonModeLayer,
  ComparisonToolSlider,
  FootprintLayer,
  Map,
  MapWrapper,
  TrueColorImageLayer,
} from '@ukri/map/ui-map';
import { Checklist } from '@ukri/map/ui-search-view';

import { BottomPanel } from './bottom-panel.component';
import { LeftMenu } from './left-menu.component';
import { TopBar } from './top-bar.component';

export const DefaultLayout = () => {
  return (
    <div className='flex h-screen w-screen flex-col overflow-hidden' data-testid='default-layout'>
      <MapWrapper>
        <TopBar />
        <div className='flex w-full h-full overflow-hidden'>
          <LeftMenu />
          <div className='flex w-full h-full flex-col'>
            <TrueColorImageLayer />
            <FootprintLayer />
            <ComparisonModeLayer />
            <Map className='flex w-full h-full'>
              <Checklist />
              <ActionCreatorPanel className='z-20' />
              <ComparisonToolSlider className='z-10' />
            </Map>
            <BottomPanel />
          </div>
        </div>
      </MapWrapper>
    </div>
  );
};
