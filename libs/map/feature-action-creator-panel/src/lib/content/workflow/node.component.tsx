import { Icon } from '@ukri/shared/design-system';
import { PropsWithChildren, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

type TNodeType = 'area' | 'dataSet' | 'dateRange' | 'function';

interface INodeProps {
  type: TNodeType;
  disabled: boolean; // not clickable (node before it is not filled in)
  active: boolean; // is colorfull
  selected?: boolean; // is being filled in ATM
  text?: string;
  error?: string;
}

type TTypeOfNode = {
  [key in TNodeType]: {
    backgroundColor: string;
    borderColor: string;
    shadow: string;
    title: string;
  };
};

const titlePath = 'MAP.ACTION_CREATOR_PANEL.NODE.TITLE';

const typeOfNode: TTypeOfNode = {
  area: {
    backgroundColor: 'bg-actionCreator-area',
    borderColor: 'border-actionCreator-area',
    shadow: 'shadow-actionCreator-area',
    title: `${titlePath}.AREA`,
  },
  dataSet: {
    backgroundColor: 'bg-actionCreator-data',
    borderColor: 'border-actionCreator-data',
    shadow: 'shadow-actionCreator-data',
    title: `${titlePath}.DATA_SET`,
  },
  dateRange: {
    backgroundColor: 'bg-actionCreator-date',
    borderColor: 'border-actionCreator-date',
    shadow: 'shadow-actionCreator-date',
    title: `${titlePath}.DATE_RANGE`,
  },
  function: {
    backgroundColor: 'bg-actionCreator-function',
    borderColor: 'border-actionCreator-function',
    shadow: 'shadow-actionCreator-function',
    title: `${titlePath}.FUNCTION`,
  },
};

export const Node = ({
  active = true,
  error,
  text,
  type = 'area',
  selected,
  children,
  disabled,
}: PropsWithChildren<INodeProps>) => {
  const [nodeSelected, setNodeSelected] = useState(selected);
  const { t } = useTranslation();
  const nodeType = typeOfNode[type];

  useEffect(() => {
    setNodeSelected(selected);
  }, [selected]);

  const handleNodeClick = useCallback(() => {
    if (!disabled) {
      setNodeSelected(true);
    }
  }, [disabled]);

  return (
    <div className={`max-w-[152px]`} onClick={handleNodeClick}>
      <div
        className={`
            ${active ? `${nodeType.backgroundColor} ${nodeType.borderColor}` : 'bg-neutral-light border-neutral-light'}
            ${active && nodeSelected && `shadow-action-creator-node ${nodeType.shadow}`}
            h-[20px] text-actionCreator-contrastText text-medium-semibold flex justify-center rounded-t border text-shadow-text-small`}
      >
        <div className='self-center'>{t(nodeType.title)}</div>
      </div>
      <div
        className={`${
          active && nodeSelected
            ? `shadow-action-creator-node border-2 p-[7px] pt-2 ${nodeType.shadow}  ${nodeType.borderColor}`
            : 'border-bright-dark border p-2'
        } rounded-b border-t-0 min-h-12 bg-background-main flex flex-col justify-center items-center min-h-10`}
      >
        {error && (
          <div className='text-center text-small-semibold text-error mb-0.5'>
            <span className='ml-2'>{error}</span>
          </div>
        )}
        {children && <div className='m-t-2 mb-1 w-[134px]'>{children}</div>}
        {/* TODO: newly added by Toby, move this text to Text */}
        {text && <p className='text-action-creator-body text-neutral-light text-center'>{text}</p>}
      </div>
      {type !== 'function' && (
        <div className='flex justify-center items-center mt-[-3px] mb-0.5'>
          <Icon name='ActionCreatorArrow' />
        </div>
      )}
    </div>
  );
};
