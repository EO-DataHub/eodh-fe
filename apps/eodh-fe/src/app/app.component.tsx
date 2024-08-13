import { AppLoader } from '@ukri/shared/design-system';
import { withQueryClient } from '@ukri/shared/utils/react-query';
import Axios from 'axios';
import { Suspense, useEffect } from 'react';
import { I18nextProvider } from 'react-i18next';

import i18n from '../i18n';
import { SearchLayout } from './layout/search-layout.component';

export function App() {
  useEffect(() => {
    Axios.create()
      .get('https://test.eodatahub.org.uk/api/catalogue/stac/collections?limit=99999&q=')
      .then((response) => {
        console.log('data', response);
      });
  }, []);

  return (
    <Suspense fallback={<AppLoader />}>
      <I18nextProvider i18n={i18n}>
        <SearchLayout />
      </I18nextProvider>
    </Suspense>
  );
}

export default withQueryClient(App);
