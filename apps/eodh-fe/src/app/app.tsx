import { Map, MapWrapper } from '@ukri/map/ui-map';
import { withQueryClient } from '@ukri/shared/utils/react-query';

export function App() {
  return (
    <div className='bg-gray-100' data-testid='app-root'>
      <p className='text-medium-bold'>qswqds</p>
      <p className='text-medium-semibold'>qswqds</p>
      <p className='text-medium-regular'>qswqds</p>
      <MapWrapper>
        <Map />
      </MapWrapper>
    </div>
  );
}

export default withQueryClient(App);
