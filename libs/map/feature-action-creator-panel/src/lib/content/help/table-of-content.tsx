import { Text } from '@ukri/shared/design-system';

import { helpStyles } from './help.styles';
import { helpContent } from './help-content';
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

const translationPath = 'MAP.ACTION_CREATOR_PANEL.HELP';

interface IQuestionsSection {
  SECTION_ID: string;
  CONTENT: {
    QUESTION_ID: string;
  }[];
}

export const TableOfContent = () => {
  return (
    <div className={helpStyles.questionsList}>
      {helpContent.QUESTIONS.map((value: IQuestionsSection) => (
        <div key={`${value.SECTION_ID}_question`}>
          <Subtitle subtitle={`${translationPath}.SUBTITLES.${value.SECTION_ID}`} />
          <ul>
            {Object.entries(value.CONTENT).map((entry) => {
              const questionKey = entry[1].QUESTION_ID;
              return (
                <li key={questionKey}>
                  <Question
                    questionKey={questionKey}
                    question={`${translationPath}.QUESTIONS.${questionKey}.QUESTION`}
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
