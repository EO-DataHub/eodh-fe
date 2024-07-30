import { AoiLayer, DrawCircleButton, DrawPolygonButton, DrawRectangleButton, Map, MapWrapper } from '@ukri/map/ui-map';
import { withQueryClient } from '@ukri/shared/utils/react-query';

export function App() {
  return (
    <div data-testid='app-root' className='flex h-screen w-screen flex-col'>
      <MapWrapper>
        <AoiLayer>
          <div className='w-full bg-background flex'>
            <DrawRectangleButton />
            <DrawCircleButton />
            <DrawPolygonButton />
          </div>
          <Map className='h-full w-full flex' />
        </AoiLayer>
      </MapWrapper>
    </div>
  );
}

export default withQueryClient(App);
