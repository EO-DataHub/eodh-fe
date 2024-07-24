import { Map, MapWrapper } from '@ukri/map/ui-map';
import { withQueryClient } from '@ukri/shared/utils/react-query';

export function App() {
  return (
    <div className='bg-gray-100' data-testid='app-root'>
      <MapWrapper>
        <Map />
      </MapWrapper>
    </div>
  );
}

export default withQueryClient(App);
