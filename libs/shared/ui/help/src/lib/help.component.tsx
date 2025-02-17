import { Text } from '@ukri/shared/design-system';
import clsx from 'clsx';
import { useMemo } from 'react';

import { Answers } from './components/answers';
import { helpStyles } from './components/help.styles';
import { helpContentWithTranslations, IHelpContent } from './components/help-content';
import { TableOfContent } from './components/table-of-content';

interface IHelpProps {
  helpContentConfig: IHelpContent;
  className?: string;
  pathToImages?: string;
}

export const Help = ({ helpContentConfig, pathToImages, className }: IHelpProps) => {
  const memoizedTitleTranslation = useMemo(() => {
    return helpContentConfig.TITLE && helpContentWithTranslations(helpContentConfig).TITLE;
  }, [helpContentConfig]);

  const memoizedIntroTranslation = useMemo(() => {
    return helpContentWithTranslations(helpContentConfig).INTRO;
  }, [helpContentConfig]);

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
      <TableOfContent helpContentConfig={helpContentConfig} />
      <Answers helpContentConfig={helpContentConfig} pathToImages={pathToImages} />
    </section>
  );
};
