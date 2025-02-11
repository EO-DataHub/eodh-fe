import { Text } from '@ukri/shared/design-system';
import clsx from 'clsx';
import { useMemo } from 'react';

import { Answers } from './components/answers';
import { helpStyles } from './components/help.styles';
import { helpContentWithTranslations, IHelpContent } from './components/help-content';
import { TableOfContent } from './components/table-of-content';

interface IHelpProps {
  translationPath: string;
  helpContentTranslationKeys: IHelpContent;
  className?: string;
  pathToImages?: string;
}

export const Help = ({ translationPath, helpContentTranslationKeys, pathToImages, className }: IHelpProps) => {
  const memoizedTitleTranslation = useMemo(() => {
    return (
      helpContentTranslationKeys.TITLE && helpContentWithTranslations(helpContentTranslationKeys, translationPath).TITLE
    );
  }, [helpContentTranslationKeys, translationPath]);

  const memoizedIntroTranslation = useMemo(() => {
    return helpContentWithTranslations(helpContentTranslationKeys, translationPath).INTRO;
  }, [helpContentTranslationKeys, translationPath]);

  return (
    <section className={clsx(helpStyles.helpSection, className)}>
      {memoizedTitleTranslation && (
        <Text
          type='h1'
          content={memoizedTitleTranslation}
          fontSize='large'
          fontWeight='bold'
          className={helpStyles.helpTitle}
        />
      )}
      <Text
        type='p'
        content={memoizedIntroTranslation}
        fontSize='medium'
        fontWeight='regular'
        className={helpStyles.helpIntro}
      />
      <TableOfContent translationPath={translationPath} helpContentTranslationKeys={helpContentTranslationKeys} />
      <Answers
        translationPath={translationPath}
        helpContentTranslationKeys={helpContentTranslationKeys}
        pathToImages={pathToImages}
      />
    </section>
  );
};
