import { AoiLayer, DrawCircleButton, DrawPolygonButton, DrawRectangleButton, Map, MapWrapper } from '@ukri/map/ui-map';
import { AppLoader } from '@ukri/shared/design-system';
import { withQueryClient } from '@ukri/shared/utils/react-query';
import { Suspense } from 'react';
import { I18nextProvider } from 'react-i18next';

import i18n from '../i18n';

export function App() {
  return (
    <Suspense fallback={<AppLoader />}>
      <I18nextProvider i18n={i18n}>
        <div data-testid='app-root' className='flex h-screen w-screen flex-col'>
          <MapWrapper>
            <AoiLayer>
              <div className='w-full bg-background flex text-text'>
                <DrawRectangleButton />
                <DrawCircleButton />
                <DrawPolygonButton />
              </div>
              <Map className='h-full w-full flex' />
            </AoiLayer>
          </MapWrapper>
        </div>
      </I18nextProvider>
    </Suspense>
  );
}

export default withQueryClient(App);
