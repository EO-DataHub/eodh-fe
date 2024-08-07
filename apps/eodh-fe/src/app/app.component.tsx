import { withQueryClient } from '@ukri/shared/utils/react-query';

import { SearchLayout } from './layout/search.component';

export function App() {
  return <SearchLayout />;
}

export default withQueryClient(App);
