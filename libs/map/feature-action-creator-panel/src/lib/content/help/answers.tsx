import { useTranslation } from 'react-i18next';

import { Answer } from './answer';
import { helpContent } from './help-content';
import { Subtitle } from './subtitle';

const translationPath = 'MAP.ACTION_CREATOR_PANEL.HELP';

interface IQuestionsSection {
  SECTION_ID: string;
  CONTENT: {
    QUESTION_ID: string;
  }[];
}

export const Answers = () => {
  const { t } = useTranslation();

  return helpContent.QUESTIONS.map((category: IQuestionsSection) => (
    <div key={`${category.SECTION_ID}_answer`}>
      <Subtitle subtitle={`${translationPath}.SUBTITLES.${category.SECTION_ID}`} />
      {category.CONTENT.map((question) => (
        <div key={question.QUESTION_ID}>
          <Answer
            question={`${translationPath}.QUESTIONS.${question.QUESTION_ID}.QUESTION`}
            answerKey={question.QUESTION_ID}
            answer={t(`${translationPath}.QUESTIONS.${question.QUESTION_ID}.ANSWER`, {
              returnObjects: true,
            })}
          />
        </div>
      ))}
    </div>
  ));
};
