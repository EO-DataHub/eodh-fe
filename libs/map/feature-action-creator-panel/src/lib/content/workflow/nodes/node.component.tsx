import { Icon } from '@ukri/shared/design-system';
import { OnboardingTooltip, useOnboarding } from '@ukri/shared/ui/ac-workflow-onboarding';
import { PropsWithChildren, useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';

type TNodeType = 'area' | 'dataSet' | 'dateRange' | 'function';

type TTypeOfNode = {
  [key in TNodeType]: {
    backgroundColor: string;
    borderColor: string;
    shadow: string;
    title: string;
  };
};

const titlePath = 'MAP.ACTION_CREATOR_PANEL.WORKFLOW.NODE';

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
    base: 'h-[20px] relative text-actionCreator-contrastText text-medium-semibold flex justify-center rounded-t border text-shadow-text-small',
    active: (nodeType: TTypeOfNode[TNodeType]) => `${nodeType.backgroundColor} ${nodeType.borderColor}`,
    inactive: 'bg-neutral-light border-neutral-light',
    selected: (nodeType: TTypeOfNode[TNodeType]) => `shadow-action-creator-node ${nodeType.shadow}`,
    removeButton: 'text-actionCreator-contrastText absolute right-0.5 top-0.5 cursor-pointer',
  },
  headerText: 'self-center',
  body: {
    base: 'rounded-b border-t-0 min-h-12 bg-background-main flex flex-col justify-center items-center min-h-10',
    active: (nodeType: TTypeOfNode[TNodeType]) =>
      `shadow-action-creator-node border-2 p-[7px] pt-2 ${nodeType.shadow} ${nodeType.borderColor}`,
    inactive: 'border-bright-dark border p-2',
  },
  error: 'text-center text-action-creator-body text-error mb-0.5 px-2',
  childrenWrapper: 'm-t-2 mb-1 w-[134px]',
  text: 'text-action-creator-body text-neutral-light text-center',
  arrow: 'flex justify-center items-center mt-[-3px] mb-0.5',
  add: {
    container: 'flex justify-center items-center mt-2',
    button:
      'border rounded-md  text-bright-dark border-bright-dark cursor-pointer disabled:text-bright-light disabled:border-bright-light disabled:cursor-not-allowed',
  },
};

interface INodeProps {
  type: TNodeType;
  hasNextNode: boolean;
  active: boolean;
  text?: string;
  error?: string;
  clickable?: boolean;
  selected?: boolean;
  className?: string;
  canAddNode?: boolean;
  canRemoveNode?: boolean;
  onAddNode?: () => void;
  onRemoveNode?: () => void;
}

export const Node = ({
  type = 'area',
  error,
  text,
  children,
  clickable,
  selected,
  active,
  canAddNode = false,
  canRemoveNode = false,
  hasNextNode = false,
  className = '',
  onAddNode,
  onRemoveNode,
}: PropsWithChildren<INodeProps>) => {
  const { t } = useTranslation();
  const nodeType = typeOfNode[type];
  const {
    context: { onboardingSteps, goToNextOnboardingStep },
  } = useOnboarding();
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleAddNode = useCallback(() => {
    if (onAddNode) {
      onAddNode();
      goToNextOnboardingStep(onboardingSteps.ADD_FUNCTION_NODE.step_name);
    }
  }, [onAddNode, goToNextOnboardingStep, onboardingSteps.ADD_FUNCTION_NODE.step_name]);

  return (
    <div className={`${styles.container} ${clickable ? styles.clickable : ''} ${className}`}>
      <div
        className={`
            ${styles.header.base}
            ${active ? styles.header.active(nodeType) : styles.header.inactive}
            ${active && selected ? styles.header.selected(nodeType) : ''}`}
      >
        <div className={styles.headerText}>{t(nodeType.title)}</div>
        {canRemoveNode && (
          <button className={styles.header.removeButton} onClick={onRemoveNode}>
            <Icon name='Close' width={16} height={16} />
          </button>
        )}
      </div>
      <div
        className={`${styles.body.base} ${active && selected ? styles.body.active(nodeType) : styles.body.inactive}`}
      >
        {error && (
          <div className={styles.error}>
            <span dangerouslySetInnerHTML={{ __html: error }}></span>
          </div>
        )}
        {children && <div className={styles.childrenWrapper}>{children}</div>}
        {text && <p className={styles.text} dangerouslySetInnerHTML={{ __html: text }}></p>}
      </div>
      {hasNextNode && (
        <div className={styles.arrow}>
          <Icon name='ActionCreatorArrow' />
        </div>
      )}
      {!hasNextNode && (
        <div className={styles.add.container}>
          <OnboardingTooltip
            tipLocation='right'
            stepName={onboardingSteps.ADD_FUNCTION_NODE.step_name}
            content={onboardingSteps.ADD_FUNCTION_NODE.tooltip_content}
            elementRef={buttonRef}
          >
            <button className={styles.add.button} disabled={!canAddNode} onClick={handleAddNode} ref={buttonRef}>
              <Icon name='Add' />
            </button>
          </OnboardingTooltip>
        </div>
      )}
    </div>
  );
};
