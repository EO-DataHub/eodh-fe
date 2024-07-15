import { Map, MapWrapper } from '@ukri/map/ui-map';
import { withQueryClient } from '@ukri/shared/utils/react-query';

export function App() {
  return (
    <div className='bg-bright-dark text-base-content p-4 text-small-semibold'>
      <h1 className='text-4xl'>Welcome to My App!</h1>
      <p className='mt-2'>This is a sample application using custom TailwindCSS theme.</p>
    </div>
    // <div className='bg-gray-100' data-testid='app-root'>
    //   <MapWrapper>
    //     <Map />
    //   </MapWrapper>
    // </div>
  );
}

export default withQueryClient(App);
