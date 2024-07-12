// import { SharedUiButton } from '@storybook-publishing-strategies-single-framework/shared-ui-button';

import styles from './shared-ui-main.module.css';

export interface ISharedUiMainProps {
  text: string;
}

export function SharedUiMain(props: ISharedUiMainProps) {
  return (
    <main className={styles['container']}>
      {props.text}
      {/* <SharedUiButton ctaText='Click Me!' /> */}
    </main>
  );
}

export default SharedUiMain;
