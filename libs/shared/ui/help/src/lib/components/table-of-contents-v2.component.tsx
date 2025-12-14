import { Text } from '@ukri/shared/design-system';
import { useCallback } from 'react';

import { IHelpConfig } from '../types/help-config.types';

interface IQuestionLinkProps {
  readonly question: string;
  readonly questionId: string;
  readonly answerId: string;
}

const styles = {
  subtitleContainer: 'pt-4',
  subtitle: 'leading-[18px]',
  question: 'text-primary visited:text-purple-600 hover:text-primary-dark relative',
  questionText: 'before:content-["•"] before:absolute before:left-1 pl-4 underline',
  questionsList: 'pb-4',
};

const QuestionLink = ({ question, questionId, answerId }: IQuestionLinkProps) => {
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
    <a href={`#${answerId}`} className={styles.question} id={questionId} onClick={handleClick}>
      <Text type='h4' content={question} fontSize='medium' fontWeight='regular' className={styles.questionText} />
    </a>
  );
};

interface ITableOfContentsV2Props {
  readonly config: IHelpConfig;
}

export const TableOfContentsV2 = ({ config }: ITableOfContentsV2Props) => {
  return (
    <div className={styles.questionsList}>
      {config.sections.map((section) => (
        <div key={section.id}>
          <div className={styles.subtitleContainer}>
            <Text
              type='h3'
              content={section.title}
              fontSize='large'
              fontWeight='semibold'
              className={styles.subtitle}
            />
          </div>
          <ul>
            {section.questions.map((question) => {
              const questionId = `${section.id}_${question.id}_question`;
              const answerId = `${section.id}_${question.id}_answer`;

              return (
                <li key={questionId}>
                  <QuestionLink questionId={questionId} answerId={answerId} question={question.question} />
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
};
