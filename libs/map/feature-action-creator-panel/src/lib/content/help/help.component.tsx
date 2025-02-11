import { Help as HelpContent } from '@ukri/shared/ui/help';

import { Container, Content, Footer } from '../container.component';
import { helpContentTranslationKeys, translationPath } from './translation-keys';

const pathToImages = '/assets/images';

export const Help = () => {
  return (
    <Container>
      <Content>
        <HelpContent
          translationPath={translationPath}
          helpContentTranslationKeys={helpContentTranslationKeys}
          className='p-4'
          pathToImages={pathToImages}
        />
      </Content>
      <Footer></Footer>
    </Container>
  );
};
