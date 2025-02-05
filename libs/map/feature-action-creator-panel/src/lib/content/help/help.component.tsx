import { Text } from '@ukri/shared/design-system';
import { useMemo } from 'react';

import { Container, Content, Footer } from '../container.component';
import { Answers } from './answers';
import { helpStyles } from './help.styles';
import { helpContentWithTranslations } from './help-content';
import { TableOfContent } from './table-of-content';

export const Help = () => {
  const memoizedTitleTranslation = useMemo(() => {
    return helpContentWithTranslations().TITLE;
  }, []);

  const memoizedIntroTranslation = useMemo(() => {
    return helpContentWithTranslations().INTRO;
  }, []);

  return (
    <Container>
      <Content>
        <section className={helpStyles.helpSection}>
          <Text
            type='h1'
            content={memoizedTitleTranslation}
            fontSize='large'
            fontWeight='bold'
            className={helpStyles.helpTitle}
          />
          <Text
            type='p'
            content={memoizedIntroTranslation}
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
