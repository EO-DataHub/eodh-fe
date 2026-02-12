import { ActionCreatorPanel } from '@ukri/map/feature-action-creator-panel';
import {
  ComparisonModeLayer,
  CoordinatesPanel,
  FootprintLayer,
  Map,
  MapWrapper,
  MeasureDistanceLayer,
  MeasureDistancePanel,
  TrueColorImageLayer,
} from '@ukri/map/ui-map';
import { Legend } from '@ukri/map/ui-results-view';
import { Checklist } from '@ukri/map/ui-search-view';

import { actionCreatorConfig } from '../help/action-creator.config';
import { legendConfig } from '../help/legend.config';
import { BottomPanel } from './bottom-panel.component';
import { LeftMenu } from './left-menu.component';
import { TopBar } from './top-bar.component';

export const DefaultLayout = () => {
  return (
    <div className='flex h-screen w-screen flex-col overflow-hidden' data-testid='default-layout'>
      <MapWrapper>
        <MeasureDistanceLayer>
          <TopBar />
          <div className='flex w-full h-full overflow-hidden'>
            <LeftMenu />
            <div className='flex w-full h-full flex-col'>
              <Map className='flex w-full h-full'>
                <CoordinatesPanel className='z-30' />
                <Legend config={legendConfig} />
                <TrueColorImageLayer />
                <FootprintLayer />
                <ComparisonModeLayer />
                <Checklist />
                <MeasureDistancePanel className='z-40' />
                <ActionCreatorPanel className='z-30' helpConfig={actionCreatorConfig} />
              </Map>
              <BottomPanel />
            </div>
          </div>
        </MeasureDistanceLayer>
      </MapWrapper>
    </div>
  );
};
