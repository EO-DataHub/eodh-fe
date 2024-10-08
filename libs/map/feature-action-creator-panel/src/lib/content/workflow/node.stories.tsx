import { Meta, Story } from '@storybook/react';
import { useState } from 'react';

import { Node } from './node.component';
import { NodeInput } from './nodes/node-input.component';
import { NodeSelect } from './nodes/node-select.component';

const withWorkflowContext = (Story) => {
  return <Story />;
};

const meta: Meta<typeof Node> = {
  component: Node,
  title: 'libs/map/action-creator-panel/content/Node',
  argTypes: {
    error: {
      control: {
        type: 'text',
        default: 'Sample error message',
      },
    },
    text: {
      control: {
        type: 'text',
        default: 'Use the drawing tools to define an area of interest',
      },
    },
    type: {
      control: {
        type: 'select',
      },
      options: ['area', 'dataSet', 'dateRange', 'function'],
    },
  },
};
export default meta;

const Template: Story = (args) => <Node type={'function'} {...args} />;

export const Area = Template.bind({});
Area.args = {
  type: 'area',
  text: 'Area Node',
  enabledNodes: ['area'],
  nodeSelected: 'area',
};
Area.decorators = [withWorkflowContext];

export const DataSet = Template.bind({});
DataSet.args = {
  type: 'dataSet',
  text: 'Data Set Node',
  enabledNodes: ['dataSet'],
  nodeSelected: 'dataSet',
};
DataSet.decorators = [withWorkflowContext];

export const DateRange = Template.bind({});
DateRange.args = {
  type: 'dateRange',
  text: 'Date Range Node',
  enabledNodes: ['dateRange'],
  nodeSelected: 'dateRange',
};
DateRange.decorators = [withWorkflowContext];

export const Function = Template.bind({});
Function.args = {
  type: 'function',
  text: 'Function Node',
  enabledNodes: ['function'],
  nodeSelected: 'function',
};
Function.decorators = [withWorkflowContext];

export const AllNodes = (args: React.ComponentProps<typeof Node>) => {
  const [aoi, setAoi] = useState('Sample area');
  const [dataSet, setDataSet] = useState('Sample data set');
  const [dateFrom, setDateFrom] = useState('22/12/2021');
  const [dateTo, setDateTo] = useState('22/12/2022');
  const [showInputs, setShowInputs] = useState(true);

  const handleToggleInputs = () => {
    setShowInputs((prevShowInputs) => !prevShowInputs);
  };

  return (
    <div>
      <div>
        <Node {...args} type='area'>
          {showInputs && <NodeInput iconName='Polygon' value={aoi} />}
        </Node>
        <Node {...args} type='dataSet'>
          {showInputs && <NodeInput value={dataSet} iconName='Satellite' />}
        </Node>
        <Node {...args} type='dateRange'>
          {showInputs && (
            <>
              <NodeInput value={dateFrom} className='mb-1' />
              <NodeInput value={dateTo} />
            </>
          )}
        </Node>
        <Node {...args} type='function'>
          {/* eslint-disable-next-line prettier/prettier */}
          {showInputs && (
            <NodeSelect
              onChange={() => {
                return;
              }}
            />
          )}
        </Node>
      </div>

      <button className='bg-primary-light text-white p-2 mt-4' onClick={handleToggleInputs}>
        Hide inputs
      </button>
      <div className='bg-bright-light mt-4 p-2'>
        Testing panel
        <div>
          Select Area
          <input
            type='text'
            placeholder='Sample area'
            onChange={(e) => setAoi(e.target.value)}
            className='border m-4 p-2'
          />
        </div>
        <div>
          Select Data set
          <input
            type='text'
            placeholder='Sample data set'
            onChange={(e) => setDataSet(e.target.value)}
            className='border m-4 p-2'
          />
        </div>
        <div>
          Select Date From
          <input
            type='text'
            placeholder='22/12/2021'
            onChange={(e) => setDateFrom(e.target.value)}
            className='border m-4 p-2'
          />
        </div>
        <div>
          Select Date to
          <input
            type='text'
            placeholder='22/12/2022'
            onChange={(e) => setDateTo(e.target.value)}
            className='border m-4 p-2'
          />
        </div>
      </div>
    </div>
  );
};
AllNodes.decorators = [withWorkflowContext];
