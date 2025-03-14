import { Help as HelpContent } from '@ukri/shared/ui/help';

import { Container, Content, Footer } from '../container.component';
import { getHelpContent } from './translation-keys';

const pathToImages = '/assets/images';

export const Help = () => {
  return (
    <Container>
      <Content>
        <HelpContent helpContentConfig={getHelpContent()} className='p-4' pathToImages={pathToImages} />
      </Content>
      <Footer></Footer>
    </Container>
  );
};
