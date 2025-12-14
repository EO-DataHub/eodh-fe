import { Text } from '@ukri/shared/design-system';
import clsx from 'clsx';

import { HelpSection } from './components/help-section.component';
import { TableOfContentsV2 } from './components/table-of-contents-v2.component';
import { IHelpConfig } from './types/help-config.types';

interface IHelpProps {
  readonly config: IHelpConfig;
  readonly className?: string;
}

const styles = {
  helpSection: 'text-text-primary h-full overflow-x-visible overflow-y-scroll',
  helpTitle: 'text-lg leading-[18px]',
  helpIntro: 'pt-4',
};

export const Help = ({ config, className }: IHelpProps) => {
  return (
    <section className={clsx(styles.helpSection, className)}>
      {config.title && (
        <Text type='h1' content={config.title} fontSize='large' fontWeight='bold' className={styles.helpTitle} />
      )}
      <Text type='p' content={config.intro} fontSize='medium' fontWeight='regular' className={styles.helpIntro} />
      <TableOfContentsV2 config={config} />
      {config.sections.map((section) => (
        <HelpSection
          key={section.id}
          section={section}
          pathToImages={config.pathToImages}
          backButtonText={config.backButtonText}
        />
      ))}
    </section>
  );
};
