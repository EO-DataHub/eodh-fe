import { Button, Text } from '@ukri/shared/design-system';
import { useTranslation } from 'react-i18next';

import { Container, Content, Footer } from '../container.component';
import { helpStyles } from './help.styles';
import helpContent from './help-content.json';

interface ISubtitleProps {
  subtitle: string;
}

const Subtitle = ({ subtitle }: ISubtitleProps) => {
  return (
    <div className={helpStyles.subtitle}>
      <Text type='h3' content={subtitle} fontSize='large' fontWeight='semibold' />
    </div>
  );
};

interface IQuestionProps {
  question: string;
  questionKey?: string;
}

const Question = ({ question, questionKey }: IQuestionProps) => {
  return (
    <a href={questionKey && `#${questionKey}_answer`} className='relative' id={`${questionKey}_question`}>
      <Text type='h4' content={question} fontSize='medium' fontWeight='regular' className={helpStyles.question} />
    </a>
  );
};

type TAnswerType = string | [string] | [string][];
interface IAnswerProps {
  answer: TAnswerType[];
  answerKey: string;
  question: string;
}

const Answer = ({ answer, answerKey, question }: IAnswerProps) => {
  const handleBackClick = () => {
    const questionElement = document.getElementById(`${answerKey}_question`);
    if (questionElement) {
      questionElement.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (
    <div className={helpStyles.answer} id={`${answerKey}_answer`}>
      <Text type='h4' content={question} fontSize='medium' fontWeight='semibold' className={helpStyles.answerTitle} />
      {answer.map((item, arrayIndex) => {
        if (typeof item === 'string') {
          return <Text content={item} fontSize='medium' fontWeight='regular' />;
        } else if (Array.isArray(item)) {
          return (
            <ul key={`${answerKey}_${arrayIndex}`}>
              {item.map((subItem, index) => {
                if (typeof subItem === 'string') {
                  return (
                    <Text
                      key={`${answerKey}_${index}_string`}
                      content={subItem}
                      fontSize='medium'
                      fontWeight='regular'
                      className={helpStyles.listItem}
                    />
                  );
                } else if (Array.isArray(subItem)) {
                  return (
                    <ul key={`${answerKey}_${index}_array`}>
                      {subItem.map((subSubItem, subindex) => {
                        return (
                          <Text
                            key={`${answerKey}_${index}_${subindex}`}
                            content={subSubItem}
                            fontSize='medium'
                            fontWeight='regular'
                            className={helpStyles.nestedListItem}
                          />
                        );
                      })}
                    </ul>
                  );
                }
                return null;
              })}
            </ul>
          );
        }
        return null;
      })}
      <Button
        size='medium'
        iconHeight={20}
        iconWidth={20}
        text={`${translationPath}.BACK_BTN`}
        className={helpStyles.backButton}
        iconName='ArrowUpward'
        onClick={handleBackClick}
      />
    </div>
  );
};

const translationPath = 'MAP.ACTION_CREATOR_PANEL.HELP';

export const Help = () => {
  const { t } = useTranslation();
  return (
    <Container>
      <Content>
        <section className={helpStyles.helpSection}>
          <Text
            type='h1'
            content={`${translationPath}.${helpContent.TITLE}`}
            fontSize='large'
            fontWeight='bold'
            className={helpStyles.helpTitle}
          />
          <Text
            type='p'
            content={`${translationPath}.${helpContent.INTRO}`}
            fontSize='medium'
            fontWeight='regular'
            className={helpStyles.helpIntro}
          />
          {/* // QUESTIONS LIST */}
          <div className={helpStyles.questionsList}>
            {helpContent.QUESTIONS.map((value) => (
              <div key={`${value.SECTION_ID}_question`}>
                <Subtitle subtitle={`${translationPath}.SUBTITLES.${value.SECTION_ID}`} />
                <ul>
                  {Object.entries(value.CONTENT).map((entry) => {
                    const questionKey = entry[1].QUESTION_ID;
                    return (
                      <li key={questionKey}>
                        <Question
                          questionKey={questionKey}
                          question={`${translationPath}.QUESTIONS.${entry[1].QUESTION_ID}.QUESTION`}
                        />
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>

          {/* // ANSWERS LIST */}
          {helpContent.QUESTIONS.map((category) => (
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
          ))}
        </section>
      </Content>
      <Footer></Footer>
    </Container>
  );
};
