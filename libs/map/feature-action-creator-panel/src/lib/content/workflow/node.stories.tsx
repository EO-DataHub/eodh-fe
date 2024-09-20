import { Meta } from '@storybook/react';
import { useState } from 'react';

import { FunctionSelectInput } from './function-input.component';
import { Node } from './node.component';
import { PseudoInput } from './pseudo-input.component';

const meta: Meta<typeof Node> = {
  component: Node,
  title: 'Example/Node',
  argTypes: {
    disabled: {
      control: {
        type: 'boolean',
        default: false,
      },
    },
    active: {
      control: {
        type: 'boolean',
        default: true,
      },
    },
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

export const NodeSample = {
  args: {
    text: 'NodeSample',
    error: '',
    type: 'area',
    active: true,
    disabled: false,
    selected: false,
  },
};

export const AreaNode = (args: React.ComponentProps<typeof Node>) => {
  const [inputValue, setInputValue] = useState('Sample value');
  return (
    <div>
      <input
        type='text'
        placeholder='Sample value'
        onChange={(e) => setInputValue(e.target.value)}
        className='border mb-4 p-2'
      />

      <Node {...args} type='area'>
        <PseudoInput iconName='Polygon' value={inputValue} />
      </Node>
    </div>
  );
};

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
          {showInputs && <PseudoInput iconName='Polygon' value={aoi} />}
        </Node>
        <Node {...args} type='dataSet'>
          {showInputs && <PseudoInput value={dataSet} />}
        </Node>
        <Node {...args} type='dateRange'>
          {showInputs && (
            <>
              <PseudoInput value={dateFrom} className='mb-1' />
              <PseudoInput value={dateTo} />
            </>
          )}
        </Node>
        <Node {...args} type='function'>
          {showInputs && <FunctionSelectInput />}
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
