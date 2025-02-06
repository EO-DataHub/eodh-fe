import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { Answer } from './answer';
import { helpContentWithTranslations } from './help-content';
import { Subtitle } from './subtitle';

export const Answers = () => {
  const { t } = useTranslation();
  const memoizedQuestions = useMemo(() => {
    return helpContentWithTranslations().QUESTIONS;
  }, []);

  return memoizedQuestions.map((category) => (
    <div key={category.SECTION_ID}>
      <Subtitle subtitle={category.SECTION_TRANSLATION} />
      {category.CONTENT.map((question) => (
        <div key={question.UNIQUE_ANSWER_ID}>
          <Answer
            question={question.QUESTION_TRANSLATION}
            questionKey={question.UNIQUE_QUESTION_ID}
            answerKey={question.UNIQUE_ANSWER_ID}
            answer={t(`${question.ANSWER_TRANSLATION}`, {
              returnObjects: true,
            })}
          />
        </div>
      ))}
    </div>
  ));
};
