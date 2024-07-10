import { withQueryClient } from '@ukri/shared/utils/react-query';

import { DisplayMap } from './map.component';

export function App() {
  return (
    <div className='bg-gray-100' data-testid='app-root'>
      <DisplayMap />
    </div>
  );
}

export default withQueryClient(App);
