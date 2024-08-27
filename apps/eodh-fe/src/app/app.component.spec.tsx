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

vi.mock('./layout/default-layout.component', () => ({
  DefaultLayout: vi.fn().mockImplementation(() => <div></div>),
}));

describe('App', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<App />);
    expect(baseElement).toBeTruthy();
  });
});
