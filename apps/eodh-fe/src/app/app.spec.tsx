import { render } from '@testing-library/react';

import App from './app';

vi.mock('@ukri/map/ui-map', () => ({
  MapWrapper: vi.fn().mockImplementation(({ children }) => <div>{children}</div>),
  Map: vi.fn().mockImplementation(() => <div></div>),
}));

describe('App', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<App />);
    expect(baseElement).toBeTruthy();
  });
});
