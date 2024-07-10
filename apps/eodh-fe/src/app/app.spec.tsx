import { render } from '@testing-library/react';
import { ComponentType, PropsWithChildren } from 'react';
import { expect, vi } from 'vitest';

import App from './app';

vi.mock('@ukri/map/ui-map', () => ({
  Map: vi.fn().mockImplementation(() => <div></div>),
  MapWrapper: vi.fn().mockImplementation(({ children }) => <div>{children}</div>),
}));

vi.mock('@ukri/shared/utils/react-query', () => ({
  withQueryClient: vi
    .fn()
    .mockImplementation((Cmp: ComponentType<PropsWithChildren>) => (props: PropsWithChildren) => <Cmp {...props} />),
}));

describe('App', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<App />);
    expect(baseElement).toBeTruthy();
  });
});
