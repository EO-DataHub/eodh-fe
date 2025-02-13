import { Text } from '@ukri/shared/design-system';
import { useCallback, useMemo } from 'react';

import { helpStyles } from './help.styles';
import { helpContentWithTranslations, IHelpContent } from './help-content';
import { Subtitle } from './subtitle';

interface IQuestionProps {
  question: string;
  questionId: string;
  answerId: string;
}

const Question = ({ question, questionId, answerId }: IQuestionProps) => {
  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
      event.preventDefault();
      const element = document.getElementById(answerId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    },
    [answerId]
  );

  return (
    <a href={`#${answerId}`} className={helpStyles.question} id={questionId} onClick={handleClick}>
      <Text type='h4' content={question} fontSize='medium' fontWeight='regular' className={helpStyles.questionText} />
    </a>
  );
};

interface ITableOfContentProps {
  helpContentConfig: IHelpContent;
}

export const TableOfContent = ({ helpContentConfig }: ITableOfContentProps) => {
  const memoizedHelpContent = useMemo(() => {
    return helpContentWithTranslations(helpContentConfig).QUESTIONS;
  }, [helpContentConfig]);

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
