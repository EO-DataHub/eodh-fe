import {
  DefaultOptions,
  QueryClient,
  QueryClientProvider,
  UseMutationOptions,
  UseQueryOptions,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { FC, PropsWithChildren } from 'react';

const queryConfig: DefaultOptions = {
  queries: {
    refetchOnWindowFocus: false,
    retry: false,
  },
};

export const queryClient = new QueryClient({ defaultOptions: queryConfig });

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TExtractFnReturnType<FnType extends (...args: any) => any> = Awaited<ReturnType<FnType>>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TQueryConfig<QueryFnType extends (...args: any) => any> = Omit<
  UseQueryOptions<TExtractFnReturnType<QueryFnType>>,
  'queryKey' | 'queryFn'
>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TMutationConfig<MutationFnType extends (...args: any) => any> = UseMutationOptions<
  TExtractFnReturnType<MutationFnType>,
  AxiosError,
  Parameters<MutationFnType>[0]
>;

export const createReactQueryWrapper = () => {
  const wrapper: FC<PropsWithChildren> = ({ children }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
  return wrapper;
};
