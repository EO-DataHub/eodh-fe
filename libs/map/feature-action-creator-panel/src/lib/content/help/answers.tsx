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
    <div key={`${category.SECTION_ID}_answer`}>
      <Subtitle subtitle={category.SECTION_TRANSLATION} />
      {category.CONTENT.map((question) => (
        <div key={question.QUESTION_ID}>
          <Answer
            question={question.QUESTION_TRANSLATION}
            answerKey={question.QUESTION_ID}
            answer={t(`${question.ANSWER_TRANSLATION}`, {
              returnObjects: true,
            })}
          />
        </div>
      ))}
    </div>
  ));
};
