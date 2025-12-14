import { Button, Text } from '@ukri/shared/design-system';
import { useCallback } from 'react';

import { IHelpQuestion } from '../types/help-config.types';
import { ElementRenderer } from './elements/element-renderer.component';

interface IHelpQuestionProps {
  readonly sectionId: string;
  readonly question: IHelpQuestion;
  readonly pathToImages?: string;
  readonly backButtonText?: string;
  readonly isFirst: boolean;
}

const styles = {
  answerFirst: 'pb-4',
  answer: 'border-t border-bright-mid pb-4',
  answerTitle: 'pt-3 leading-[16px]',
  backButton: 'ml-auto pl-2 pr-3 py-[4px] mt-4',
};

export const HelpQuestion = ({ sectionId, question, pathToImages, backButtonText, isFirst }: IHelpQuestionProps) => {
  const questionId = `${sectionId}_${question.id}_question`;
  const answerId = `${sectionId}_${question.id}_answer`;

  const handleBackToTop = useCallback(() => {
    const element = document.getElementById(questionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, [questionId]);

  return (
    <div id={answerId} className={isFirst ? styles.answerFirst : styles.answer}>
      <Text
        type='h4'
        content={question.question}
        fontSize='medium'
        fontWeight='semibold'
        className={styles.answerTitle}
      />
      {question.answer.map((element, index) => (
        <ElementRenderer key={index} element={element} pathToImages={pathToImages} />
      ))}
      {backButtonText && (
        <Button
          size='medium'
          iconHeight={20}
          iconWidth={20}
          text={backButtonText}
          className={styles.backButton}
          iconName='ArrowUpward'
          onClick={handleBackToTop}
        />
      )}
    </div>
  );
};
