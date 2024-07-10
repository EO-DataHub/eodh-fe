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
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    );
