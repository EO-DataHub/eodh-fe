import { Text } from '@ukri/shared/design-system';

import { Container, Content, Footer } from '../container.component';
import helpContent from './help-content.json';

interface ISubtitleProps {
  subtitle: string;
}

const Subtitle = ({ subtitle }: ISubtitleProps) => {
  return (
    <div className='pt-4'>
      <Text type='h3' content={subtitle} fontSize='large' fontWeight='semibold' className='' />
    </div>
  );
};

interface IQuestionProps {
  question: string;
}

const Question = ({ question }: IQuestionProps) => {
  return (
    <a className=''>
      <Text type='h4' content={question} fontSize='medium' fontWeight='regular' className='text-primary' />
    </a>
  );
};
interface IAnswerProps {
  answer: string;
}

const Answer = ({ answer }: IAnswerProps) => {
  return (
    <div className=''>
      <Text content={answer} fontSize='large' fontWeight='bold' className='' />
    </div>
  );
};

const translationPath = 'MAP.ACTION_CREATOR_PANEL.HELP';

export const Help = () => {
  return (
    <Container>
      <Content>
        <section className='text-text-primary p-4'>
          <Text
            type='h1'
            content={`${translationPath}.${helpContent.TITLE}`}
            fontSize='large'
            fontWeight='bold'
            className='text-[18px]'
          />
          <Text
            type='p'
            content={`${translationPath}.${helpContent.INTRO}`}
            fontSize='medium'
            fontWeight='regular'
            className='pt-4'
          />
          {Object.entries(helpContent.CONTENT).map(([key, value]) => (
            <div key={key}>
              {'SUBTITLE' in value ? (
                <Subtitle subtitle={`${translationPath}.CONTENT.${value.SUBTITLE}.SUBTITLE`} />
              ) : (
                <Question question={`${translationPath}.CONTENT.${value.QUESTION}.QUESTION`} />
              )}
            </div>
          ))}
          {/* {Object.entries(helpContent.CONTENT).map(([key, value]) => (
            <div key={key}>
              {'SUBTITLE' in value ? (
                <Subtitle subtitle={`${translationPath}.CONTENT.${value.SUBTITLE}.SUBTITLE`} />
              ) : (
                <Answer answer={`${translationPath}.CONTENT.${value.ANSWER}.ANSWER`} />
              )}
            </div>
          ))} */}
        </section>
      </Content>
      <Footer></Footer>
    </Container>
  );
};
