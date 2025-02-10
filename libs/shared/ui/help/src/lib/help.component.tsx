import { Text } from '@ukri/shared/design-system';
import { useMemo } from 'react';
import { Answers } from './components/answers';
import { helpStyles } from './components/help.styles';
import { helpContentWithTranslations, IHelpContent } from './components/help-content';
import { TableOfContent } from './components/table-of-content';

interface IHelpProps {
  translationPath: string;
  helpContentTranslationKeys: IHelpContent;
}


export const Help = ({translationPath, helpContentTranslationKeys}: IHelpProps) => {
  const memoizedTitleTranslation = useMemo(() => {
    return helpContentWithTranslations(helpContentTranslationKeys, translationPath).TITLE;
  }, []);

  const memoizedIntroTranslation = useMemo(() => {
    return helpContentWithTranslations(helpContentTranslationKeys, translationPath).INTRO;
  }, []);

  return (
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
      <TableOfContent translationPath={translationPath} helpContentTranslationKeys={helpContentTranslationKeys} />
      <Answers translationPath={translationPath} helpContentTranslationKeys={helpContentTranslationKeys}/>
    </section>
  );
};
