import { AoiLayer, DrawCircleButton, DrawPolygonButton, DrawRectangleButton, Map, MapWrapper } from '@ukri/map/ui-map';
import { withQueryClient } from '@ukri/shared/utils/react-query';

export function App() {
  return (
    <div className='bg-gray-100' data-testid='app-root'>
      <MapWrapper>
        <AoiLayer>
          <div className='w-full h-50px bg-[#F0F0F0] flex'>
            <DrawRectangleButton />
            <DrawCircleButton />
            <DrawPolygonButton />
          </div>
          <Map />
        </AoiLayer>
      </MapWrapper>
    </div>
  );
}

export default withQueryClient(App);
