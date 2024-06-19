import styled, { createGlobalStyle } from 'styled-components';

import { DisplayMap } from './map.component';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
  }
`;

const StyledApp = styled.div`
  // Your style here
`;

export function App() {
  return (
    <>
      <GlobalStyle />
      <StyledApp>
        <DisplayMap />
      </StyledApp>
    </>
  );
}

export default App;
