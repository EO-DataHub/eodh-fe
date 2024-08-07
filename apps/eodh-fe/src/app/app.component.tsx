import { AppLoader } from '@ukri/shared/design-system';
import { withQueryClient } from '@ukri/shared/utils/react-query';
import { Suspense } from 'react';
import { I18nextProvider } from 'react-i18next';

import i18n from '../i18n';
import { SearchLayout } from './layout/search.component';

export function App() {
  return (
    <Suspense fallback={<AppLoader />}>
      <I18nextProvider i18n={i18n}>
        <SearchLayout />
      </I18nextProvider>
    </Suspense>
  );
}

export default withQueryClient(App);
