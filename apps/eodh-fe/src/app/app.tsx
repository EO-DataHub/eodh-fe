import { Map, MapWrapper } from '@ukri/map/ui-map';
import styled, { createGlobalStyle } from 'styled-components';

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
        <MapWrapper>
          <Map />
        </MapWrapper>
      </StyledApp>
    </>
  );
}

export default App;
