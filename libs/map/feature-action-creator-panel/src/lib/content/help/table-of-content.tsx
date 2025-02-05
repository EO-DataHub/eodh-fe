import { Text } from '@ukri/shared/design-system';
import { useMemo } from 'react';

import { helpStyles } from './help.styles';
import { helpContentWithTranslations } from './help-content';
import { Subtitle } from './subtitle';

interface IQuestionProps {
  question: string;
  questionKey: string;
}

const Question = ({ question, questionKey }: IQuestionProps) => {
  return (
    <a href={`#${questionKey}_answer`} className='relative' id={`${questionKey}_question`}>
      <Text type='h4' content={question} fontSize='medium' fontWeight='regular' className={helpStyles.question} />
    </a>
  );
};

export const TableOfContent = () => {
  const memoizedHelpContent = useMemo(() => {
    return helpContentWithTranslations().QUESTIONS;
  }, []);

  return (
    <div className={helpStyles.questionsList}>
      {memoizedHelpContent.map((value) => (
        <div key={`${value.SECTION_ID}_question`}>
          <Subtitle subtitle={value.SECTION_TRANSLATION} />
          <ul>
            {value.CONTENT.map((entry) => {
              const questionKey = entry.QUESTION_ID;
              return (
                <li key={questionKey}>
                  <Question questionKey={questionKey} question={entry.QUESTION_TRANSLATION} />
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
};
