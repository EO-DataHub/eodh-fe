import { Text } from '@ukri/shared/design-system';

import { IHelpSection } from '../types/help-config.types';
import { HelpQuestion } from './help-question.component';

interface IHelpSectionProps {
  readonly section: IHelpSection;
  readonly pathToImages?: string;
  readonly backButtonText?: string;
}

const styles = {
  answers: 'border-t border-bright-mid',
  subtitleContainer: 'pt-4',
  subtitle: 'leading-[18px]',
};

export const HelpSection = ({ section, pathToImages, backButtonText }: IHelpSectionProps) => {
  return (
    <div className={styles.answers}>
      <div className={styles.subtitleContainer}>
        <Text type='h3' content={section.title} fontSize='large' fontWeight='semibold' className={styles.subtitle} />
      </div>
      {section.questions.map((question, index) => (
        <HelpQuestion
          key={question.id}
          sectionId={section.id}
          question={question}
          pathToImages={pathToImages}
          backButtonText={backButtonText}
          isFirst={index === 0}
        />
      ))}
    </div>
  );
};
