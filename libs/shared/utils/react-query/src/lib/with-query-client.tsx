import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ComponentType, PropsWithChildren, ReactNode } from 'react';

import { queryClient } from './react-query';

export const withQueryClient =
  (Cmp: ComponentType<PropsWithChildren>) =>
  (props: PropsWithChildren): ReactNode =>
    (
      <QueryClientProvider client={queryClient}>
        <Cmp {...props} />
        {/* <ReactQueryDevtools initialIsOpen={false} styleNonce='94bf401884d3eade93c7ab13c45437c5' /> */}
      </QueryClientProvider>
    );
