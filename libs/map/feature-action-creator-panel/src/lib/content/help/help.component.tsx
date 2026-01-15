import { Help as HelpContent, IHelpConfig } from '@ukri/shared/ui/help';

import { Container, Content, Footer } from '../container.component';

interface IHelpProps {
  readonly config: IHelpConfig;
}

export const Help = ({ config }: IHelpProps) => {
  return (
    <Container>
      <Content>
        <HelpContent config={config} className='p-4' />
      </Content>
      <Footer></Footer>
    </Container>
  );
};
