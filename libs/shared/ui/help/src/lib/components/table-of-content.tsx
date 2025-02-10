import { Text } from '@ukri/shared/design-system';
import { useMemo } from 'react';

import { helpStyles } from './help.styles';
import { Subtitle } from './subtitle';
import { helpContentWithTranslations, IHelpContent } from './help-content';

interface IQuestionProps {
  question: string;
  questionId: string;
  answerId: string;
}

const Question = ({ question, questionId, answerId }: IQuestionProps) => {
  return (
    <a href={`#${answerId}`} className='relative' id={questionId}>
      <Text type='h4' content={question} fontSize='medium' fontWeight='regular' className={helpStyles.question} />
    </a>
  );
};

interface ITableOfContentProps {
  translationPath: string;
  helpContentTranslationKeys: IHelpContent;
}

export const TableOfContent = ({ translationPath, helpContentTranslationKeys}: ITableOfContentProps) => {
  const memoizedHelpContent = useMemo(() => {
    return helpContentWithTranslations(helpContentTranslationKeys, translationPath).QUESTIONS;
  }, []);

  return (
    <div className={helpStyles.questionsList}>
      {memoizedHelpContent.map((value) => (
        <div key={value.SECTION_ID}>
          <Subtitle subtitle={value.SECTION_TRANSLATION} />
          <ul>
            {value.CONTENT.map((entry) => {
              return (
                <li key={entry.UNIQUE_QUESTION_ID}>
                  <Question
                    questionId={entry.UNIQUE_QUESTION_ID}
                    answerId={entry.UNIQUE_ANSWER_ID}
                    question={entry.QUESTION_TRANSLATION}
                  />
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
};
