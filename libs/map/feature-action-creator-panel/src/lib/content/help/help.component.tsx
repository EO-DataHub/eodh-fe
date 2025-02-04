import { Text } from '@ukri/shared/design-system';

import { Container, Content, Footer } from '../container.component';
import { Answers } from './answers';
import { helpStyles } from './help.styles';
import { helpContent } from './help-content';
import { TableOfContent } from './table-of-content';

const translationPath = 'MAP.ACTION_CREATOR_PANEL.HELP';

export const Help = () => {
  return (
    <Container>
      <Content>
        <section className={helpStyles.helpSection}>
          <Text
            type='h1'
            content={`${translationPath}.${helpContent.TITLE}`}
            fontSize='large'
            fontWeight='bold'
            className={helpStyles.helpTitle}
          />
          <Text
            type='p'
            content={`${translationPath}.${helpContent.INTRO}`}
            fontSize='medium'
            fontWeight='regular'
            className={helpStyles.helpIntro}
          />
          <TableOfContent />
          <Answers />
        </section>
      </Content>
      <Footer></Footer>
    </Container>
  );
};
