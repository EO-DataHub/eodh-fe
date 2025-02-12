import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { Answer } from './answer';
import { helpStyles } from './help.styles';
import { helpContentWithTranslations, IHelpContent } from './help-content';
import { Subtitle } from './subtitle';

interface IAnswersProps {
  helpContentConfig: IHelpContent;
  pathToImages?: string;
}

export const Answers = ({ helpContentConfig, pathToImages }: IAnswersProps) => {
  const { t } = useTranslation();
  const memoizedQuestions = useMemo(() => {
    return helpContentWithTranslations(helpContentConfig).QUESTIONS;
  }, [helpContentConfig]);

  return memoizedQuestions.map((category) => (
    <div key={category.SECTION_ID} className={helpStyles.answers}>
      <Subtitle subtitle={category.SECTION_TRANSLATION} />
      {category.CONTENT.map((question, index) => (
        <div key={question.UNIQUE_ANSWER_ID} className={index !== 0 ? helpStyles.answer : helpStyles.answerFirst}>
          <Answer
            question={question.QUESTION_TRANSLATION}
            questionKey={question.UNIQUE_QUESTION_ID}
            answerKey={question.UNIQUE_ANSWER_ID}
            answer={t(`${question.ANSWER_TRANSLATION}`, {
              returnObjects: true,
            })}
            pathToImages={pathToImages}
            translationPath={helpContentConfig.TRANSLATION_PATH}
          />
        </div>
      ))}
    </div>
  ));
};
