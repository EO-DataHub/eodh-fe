import { render } from '@testing-library/react';
import { ComponentType, PropsWithChildren } from 'react';
import { expect, vi } from 'vitest';

import App from './app.component';

vi.mock('@ukri/shared/utils/authorization', () => ({
  AuthProvider: vi.fn().mockImplementation(() => <div></div>),
  AuthInterceptor: vi.fn(),
  KeycloakAdapter: vi.fn(),
}));

vi.mock('@ukri/shared/utils/react-query', () => ({
  withQueryClient: vi
    .fn()
    .mockImplementation((Cmp: ComponentType<PropsWithChildren>) => (props: PropsWithChildren) => <Cmp {...props} />),
  getHttpClient: vi.fn().mockImplementation(() => ({
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
    options: vi.fn(),
    patch: vi.fn(),
  })),
  initHttpClient: vi.fn(),
}));

vi.mock('../env.config', () => ({
  getEnvConfig: vi.fn().mockImplementation(() => ({
    production: false,
    baseUrl: '',
    module: {
      translation: {
        language: '',
        fallbackLng: '',
        path: '',
      },
      authorization: {
        url: '',
        realm: '',
        clientId: '',
      },
      http: {
        baseUrl: '',
      },
    },
  })),
  env: {
    production: false,
    baseUrl: '',
    module: {
      translation: {
        language: '',
        fallbackLng: '',
        path: '',
      },
      authorization: {
        url: '',
        realm: '',
        clientId: '',
      },
      http: {
        baseUrl: '',
      },
    },
  },
}));

vi.mock('./layout/default-layout.component', () => ({
  DefaultLayout: vi.fn().mockImplementation(() => <div></div>),
}));

describe('App', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<App />);
    expect(baseElement).toBeTruthy();
  });
});
