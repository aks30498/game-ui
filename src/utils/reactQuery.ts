import {
  useInfiniteQuery,
  UseInfiniteQueryOptions,
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from '@tanstack/react-query';
import { AxiosError, type AxiosRequestConfig, type AxiosResponse } from 'axios';

import { api } from './api';

export interface GetInfinitePagesInterface<T> {
  nextId?: number;
  previousId?: number;
  data: T;
  count: number;
}

type QueryKeyT = [string, AxiosRequestConfig | undefined];

type FetcherProps = {
  queryKey: QueryKeyT;
  method?: Exclude<keyof typeof api, 'client'>;
};

interface APIOptions extends AxiosRequestConfig {
  method?: Exclude<keyof typeof api, 'client'>;
}

export const fetcher = <T>({
  queryKey,
  method = 'get',
}: FetcherProps): Promise<T> => {
  const [url, options] = queryKey;
  return api[method](url, options).then((res) => res.data);
};

export const useLoadMore = <T, U = GetInfinitePagesInterface<T>>(
  url: string,
  data?: object,
  config: Omit<
    UseInfiniteQueryOptions<U, Error, U, U, QueryKeyT>,
    'queryKey' | 'queryFn'
  > = {},
  FETCH_LIMIT = 15,
) => {
  const context = useInfiniteQuery<U, Error, U, QueryKeyT>(
    [url, data],
    ({ pageParam = 0 }) =>
      api
        .post(url, data, {
          ...(FETCH_LIMIT > 0
            ? { offset: pageParam * FETCH_LIMIT, limit: FETCH_LIMIT }
            : {}),
        })
        .then((res) => res.data),
    {
      getPreviousPageParam: (_firstPage) => undefined,
      getNextPageParam: (_lastPage) => undefined,
      ...config,
    },
  );

  return context;
};

export const useLoadMoreWithCustomData = <T, U = GetInfinitePagesInterface<T>>(
  url: string,
  data?: object,
  config: { getCustomData?: (pageParam: number) => any } & Omit<
    UseInfiniteQueryOptions<U, Error, U, U, QueryKeyT>,
    'queryKey' | 'queryFn'
  > = {},
) => {
  const context = useInfiniteQuery<U, Error, U, QueryKeyT>(
    [url, data],
    ({ pageParam = 0 }) =>
      api
        .post<T>(url, config.getCustomData?.(pageParam))
        .then((res) => res.data),
    {
      getPreviousPageParam: (_firstPage) => undefined,
      getNextPageParam: (_lastPage) => undefined,
      ...config,
    },
  );

  return context;
};

export const useLoadMoreFetcher = <T, U = GetInfinitePagesInterface<T>>(
  url: string,
  options: AxiosRequestConfig = {},
  config: Omit<
    UseInfiniteQueryOptions<U, Error, U, U, QueryKeyT>,
    'queryKey' | 'queryFn'
  > = {},
  FETCH_LIMIT = 15,
) => {
  const context = useInfiniteQuery<U, Error, U, QueryKeyT>(
    [url, options],
    ({ pageParam = 0 }) =>
      fetcher({
        queryKey: [
          url,
          {
            params: {
              offset: pageParam * FETCH_LIMIT,
              limit: FETCH_LIMIT,
              ...options.params,
            },
          },
        ],
        method: 'get',
      }),
    {
      getPreviousPageParam: (_firstPage) => undefined,
      getNextPageParam: (_lastPage) => undefined,
      ...config,
    },
  );

  return context;
};

export const useFetch = <T, U = T>(
  url: string,
  options?: APIOptions,
  config: UseQueryOptions<T, Error, U, QueryKeyT> = {},
) => {
  const context = useQuery<T, Error, U, QueryKeyT>(
    [url, options],
    ({ queryKey }) => fetcher({ queryKey, method: options?.method }),
    {
      ...config,
    },
  );

  return context;
};

const useGenericMutation = <T, S = T>(
  func: (data: S) => Promise<AxiosResponse<S>>,
  url: string,
  params?: object,
  updater?: ((oldData: T, newData: S) => T) | undefined,
) => {
  const queryClient = useQueryClient();

  return useMutation<AxiosResponse, AxiosError, T | S>(func, {
    onMutate: async (data) => {
      await queryClient.cancelQueries([url, params]);

      const previousData = queryClient.getQueryData([url, params]);
      queryClient.setQueryData<T>([url, params], (oldData) => {
        return updater ? updater(oldData!, data as S) : (data as T);
      });

      return previousData;
    },
    onError: (err, _, context) => {
      queryClient.setQueryData([url, params], context);
    },
    onSettled: () => {
      queryClient.invalidateQueries([url, params]);
    },
  });
};

export const useDelete = <T>(
  url: string,
  params?: object,
  updater?: (oldData: T, id: string | number) => T,
) => {
  return useGenericMutation<T, string | number>(
    (id) => api.delete(`${url}/${id}`, params),
    url,
    params,
    updater,
  );
};

export const usePut = <T, S>(
  url: string,
  params?: object,
  updater?: (oldData: T, newData: S) => T,
) => {
  return useGenericMutation<T, S>(
    (data) => api.put(url, data),
    url,
    params,
    updater,
  );
};

export const usePost = <T, S>(
  url: string,
  params?: object,
  updater?: (oldData: T, newData: S) => T,
) => {
  return useGenericMutation<T, S>(
    (data) => api.post<S>(url, data),
    url,
    params,
    updater,
  );
};

export const useUpdate = <T, S>(
  url: string,
  params?: object,
  updater?: (oldData: T, newData: S) => T,
) => {
  return useGenericMutation<T, S>(
    (data) => api.patch(url, data),
    url,
    params,
    updater,
  );
};

export const useInvalidateQuery = (key: string) => {
  const queryClient = useQueryClient();

  return {
    invalidate: () => queryClient.invalidateQueries(key),
  };
};
