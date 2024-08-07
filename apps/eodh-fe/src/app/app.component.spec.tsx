import { render } from '@testing-library/react';
import { ComponentType, PropsWithChildren } from 'react';
import { expect, vi } from 'vitest';

import App from './app.component';

vi.mock('@ukri/shared/utils/react-query', () => ({
  withQueryClient: vi
    .fn()
    .mockImplementation((Cmp: ComponentType<PropsWithChildren>) => (props: PropsWithChildren) => <Cmp {...props} />),
}));

vi.mock('./layout/search.component', () => ({
  SearchLayout: vi.fn().mockImplementation(() => <div></div>),
}));

describe('App', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<App />);
    expect(baseElement).toBeTruthy();
  });
});
