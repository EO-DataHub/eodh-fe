import { Icon, Select } from '@ukri/shared/design-system';
import React from 'react';

const options = [
  { value: 'NDVI', label: 'NDVI' },
  { value: 'False colour (urban)', label: 'False colour (urban)' },
  { value: 'Moisture index', label: 'Moisture index' },
  { value: 'SWIR', label: 'SWIR' },
  { value: 'NDWI', label: 'NDWI' },
  { value: 'NDSI', label: 'NDSI' },
];
const placeholder = 'GLOBAL.DESIGN_SYSTEM.SELECT.PLACEHOLDER';

type TNodeType = 'area' | 'dataSet' | 'dateRange' | 'function';

interface INodeProps {
  disabled: boolean; // not clickable (node before it is not filled in)
  selected: boolean; // is selected and being filled in ATM
  active: boolean; // is filled in
  error?: string;
  text?: string;
  type?: TNodeType;
}

type TTypeOfNode = {
  [key in TNodeType]: {
    backgroundColor: string;
    borderColor: string;
    shadow: string;
    text: string;
    input: React.ReactNode;
  };
};

const typeOfNode: TTypeOfNode = {
  area: {
    backgroundColor: 'bg-actionCreator-area',
    borderColor: 'border-actionCreator-area',
    shadow: 'shadow-actionCreator-area',
    text: 'Area',
    input: <span>Area input placeholder</span>,
  },
  dataSet: {
    backgroundColor: 'bg-actionCreator-data',
    borderColor: 'border-actionCreator-data',
    shadow: 'shadow-actionCreator-data',
    text: 'Data set',
    input: <span>Data set input placeholder</span>,
  },
  dateRange: {
    backgroundColor: 'bg-actionCreator-date',
    borderColor: 'border-actionCreator-date',
    shadow: 'shadow-actionCreator-date',
    text: 'Date range',
    input: <span>Date Range input placeholder</span>,
  },
  function: {
    backgroundColor: 'bg-actionCreator-function',
    borderColor: 'border-actionCreator-function',
    shadow: 'shadow-actionCreator-function',
    text: 'Function',
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    input: <Select options={options} placeholder={placeholder} onChange={() => {}} />,
  },
};

export const Node = ({ active = true, error, text, type = 'area', selected }: INodeProps) => {
  const nodeType = typeOfNode[type];
  return (
    <div className={`max-w-[152px]`}>
      {/* NODE TOP BAR */}
      <div
        className={`
            ${active ? `${nodeType.backgroundColor} ${nodeType.borderColor}` : 'bg-neutral-light border-neutral-light'}
            ${active && selected && `shadow-action-creator-node ${nodeType.shadow}`}
            h-[20px] text-actionCreator-contrastText text-medium-semibold flex justify-center rounded-t border text-shadow-text-small`}
      >
        <div className='self-center'>{nodeType.text}</div>
      </div>
      {/* NODE CONTAINER */}
      <div
        className={`${
          active && selected
            ? `shadow-action-creator-node border-2 p-[7px] pt-2 ${nodeType.shadow}  ${nodeType.borderColor}`
            : 'border-bright-dark border p-2'
        } rounded-b border-t-0 min-h-12 bg-background-main`}
      >
        {/* // ERROR */}
        {error && (
          <div className='text-center text-small-semibold text-error'>
            <span className='ml-2'>{error}</span>
          </div>
        )}
        {/* // INPUT */}
        <div className='m-t-2'>{nodeType.input}</div>
        {/* // TEXT */}
        {/* TODO: newly added by Toby, move this text to Text */}
        <p className='text-action-creator-body text-neutral-light text-center'>{text}</p>
      </div>
      {/* SVG CONTAINER */}
      {type !== 'function' && (
        <div className='flex justify-center items-center mt-[-3px]'>
          <Icon name='ActionCreatorArrow' />
        </div>
      )}
    </div>
  );
};
