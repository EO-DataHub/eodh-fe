import { withQueryClient } from '@ukri/shared/utils/react-query';

import { DisplayMap } from './map.component';

export function App() {
  return (
    <div className='bg-gray-100'>
      <DisplayMap />
    </div>
  );
}

export default withQueryClient(App);
