import { render } from '@testing-library/react';

import App from './app';

vi.mock('./map.component', () => ({
  DisplayMap: vi.fn().mockImplementation(() => <div></div>),
}));

describe('App', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<App />);
    expect(baseElement).toBeTruthy();
  });
});
