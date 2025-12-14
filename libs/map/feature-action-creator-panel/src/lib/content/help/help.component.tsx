import { Help as HelpContent } from '@ukri/shared/ui/help';

import { Container, Content, Footer } from '../container.component';
import { actionCreatorHelpConfig } from './action-creator-help.config';

export const Help = () => {
  return (
    <Container>
      <Content>
        <HelpContent config={actionCreatorHelpConfig} className='p-4' />
      </Content>
      <Footer></Footer>
    </Container>
  );
};
