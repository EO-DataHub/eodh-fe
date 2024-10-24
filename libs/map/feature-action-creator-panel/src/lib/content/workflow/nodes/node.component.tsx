import { Icon } from '@ukri/shared/design-system';
import { PropsWithChildren, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

type TNodeType = 'area' | 'dataSet' | 'dateRange' | 'function';

interface INodeProps {
  type: TNodeType;
  text?: string;
  error?: string;
  clickable?: boolean;
  selected?: boolean;
  className?: string;
}

type TTypeOfNode = {
  [key in TNodeType]: {
    backgroundColor: string;
    borderColor: string;
    shadow: string;
    title: string;
  };
};

const titlePath = 'MAP.ACTION_CREATOR_PANEL.NODE';

const typeOfNode: TTypeOfNode = {
  area: {
    backgroundColor: 'bg-actionCreator-area',
    borderColor: 'border-actionCreator-area',
    shadow: 'shadow-actionCreator-area',
    title: `${titlePath}.AREA.TITLE`,
  },
  dataSet: {
    backgroundColor: 'bg-actionCreator-data',
    borderColor: 'border-actionCreator-data',
    shadow: 'shadow-actionCreator-data',
    title: `${titlePath}.DATA_SET.TITLE`,
  },
  dateRange: {
    backgroundColor: 'bg-actionCreator-date',
    borderColor: 'border-actionCreator-date',
    shadow: 'shadow-actionCreator-date',
    title: `${titlePath}.DATE_RANGE.TITLE`,
  },
  function: {
    backgroundColor: 'bg-actionCreator-function',
    borderColor: 'border-actionCreator-function',
    shadow: 'shadow-actionCreator-function',
    title: `${titlePath}.FUNCTION.TITLE`,
  },
};

const styles = {
  container: 'w-[152px]',
  clickable: 'cursor-pointer',
  header: {
    base: 'h-[20px] text-actionCreator-contrastText text-medium-semibold flex justify-center rounded-t border text-shadow-text-small',
    active: (nodeType: TTypeOfNode[TNodeType]) => `${nodeType.backgroundColor} ${nodeType.borderColor}`,
    inactive: 'bg-neutral-light border-neutral-light',
    selected: (nodeType: TTypeOfNode[TNodeType]) => `shadow-action-creator-node ${nodeType.shadow}`,
  },
  headerText: 'self-center',
  body: {
    base: 'rounded-b border-t-0 min-h-12 bg-background-main flex flex-col justify-center items-center min-h-10',
    active: (nodeType: TTypeOfNode[TNodeType]) =>
      `shadow-action-creator-node border-2 p-[7px] pt-2 ${nodeType.shadow} ${nodeType.borderColor}`,
    inactive: 'border-bright-dark border p-2',
  },
  error: 'text-center text-small-semibold text-error mb-0.5',
  errorText: 'ml-2',
  childrenWrapper: 'm-t-2 mb-1 w-[134px]',
  text: 'text-action-creator-body text-neutral-light text-center',
  arrow: 'flex justify-center items-center mt-[-3px] mb-0.5',
};

export const Node = ({
  type = 'area',
  error,
  text,
  children,
  clickable,
  selected,
  className = '',
}: PropsWithChildren<INodeProps>) => {
  const [active, setActive] = useState(false);
  const { t } = useTranslation();
  const nodeType = typeOfNode[type];

  useEffect(() => {
    if (text || children) {
      setActive(true);
    } else {
      setActive(false);
    }
  }, [text, children]);

  return (
    <div className={`${styles.container} ${clickable ? styles.clickable : ''} ${className}`}>
      <div
        className={`
            ${styles.header.base}
            ${active ? styles.header.active(nodeType) : styles.header.inactive}
            ${active && selected ? styles.header.selected(nodeType) : ''}`}
      >
        <div className={styles.headerText}>{t(nodeType.title)}</div>
      </div>
      <div
        className={`${styles.body.base} ${active && selected ? styles.body.active(nodeType) : styles.body.inactive}`}
      >
        {error && (
          <div className={styles.error}>
            <span className={styles.errorText}>{error}</span>
          </div>
        )}
        {children && <div className={styles.childrenWrapper}>{children}</div>}
        {text && <p className={styles.text} dangerouslySetInnerHTML={{ __html: text }}></p>}
      </div>
      {type !== 'function' && (
        <div className={styles.arrow}>
          <Icon name='ActionCreatorArrow' />
        </div>
      )}
    </div>
  );
};
