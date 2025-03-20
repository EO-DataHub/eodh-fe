import { getHttpClient, queryClient, TRequestConfig } from '@ukri/shared/utils/react-query';

function arrayBufferToBase64(buffer: ArrayBuffer) {
  let binary = '';
  const bytes = [].slice.call(new Uint8Array(buffer));

  bytes.forEach((b) => (binary += String.fromCharCode(b)));

  return window.btoa(binary);
}

interface IExtendedRequestConfig extends TRequestConfig {
  responseType?: string;
}

export async function fetchImage(url: string): Promise<string> {
  const response = await queryClient
    .getMutationCache()
    .build(queryClient, {
      mutationFn: (): Promise<Response> => getHttpClient().get(url, { responseType: 'blob' } as IExtendedRequestConfig),
      retry: 3,
    })
    .execute(url);

  const image = await response.arrayBuffer();
  const base64Flag = 'data:image/jpeg;base64,';
  const imageStr = arrayBufferToBase64(image);

  return base64Flag + imageStr;
}
