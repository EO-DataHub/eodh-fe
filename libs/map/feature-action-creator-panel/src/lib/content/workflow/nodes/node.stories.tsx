import { Meta, StoryObj } from '@storybook/react';
import { useEffect, useMemo, useState } from 'react';

import { Node } from './node.component';
import { NodeInput } from './node-input.component';
import { NodeSelect } from './node-select.component';

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
    clickable: {
      control: 'boolean',
    },
    selected: {
      control: 'boolean',
    },
  },
};
export default meta;

export const Area: StoryObj<typeof Node> = {
  args: {
    type: 'area',
    text: 'Area Node',
  },
};

export const DataSet: StoryObj<typeof Node> = {
  args: {
    type: 'dataSet',
    text: 'Data Set Node',
  },
};

export const DateRange: StoryObj<typeof Node> = {
  args: {
    type: 'dateRange',
    text: 'Date Range Node',
  },
};

export const Function: StoryObj<typeof Node> = {
  args: {
    type: 'function',
    text: 'Function Node',
  },
};

type TAllNodesProps = {
  enabled: boolean;
  aoi: string;
  dataSet: string;
  dateFrom: string;
  dateTo: string;
  function: string;
};

export const AllNodes = ({ enabled, aoi, dataSet, dateFrom, dateTo, function: selectedFunction }: TAllNodesProps) => {
  const [currentAoi, setCurrentAoi] = useState<string | undefined>(aoi);
  const [currentDataSet, setCurrentDataSet] = useState<string | undefined>(dataSet);
  const [currentDateFrom, setCurrentDateFrom] = useState<string | undefined>(dateFrom);
  const [currentDateTo, setCurrentDateTo] = useState<string | undefined>(dateTo);
  const options = useMemo((): { value: string; label: string }[] => {
    return [
      { value: 'NDVI', label: 'NDVI' },
      { value: 'FALSE_COLOR', label: 'False Color' },
      { value: 'MOISTURE_INDEX', label: 'Moisture Index' },
      { value: 'SWIR', label: 'SWIR' },
      { value: 'NDWI', label: 'NDWI' },
      { value: 'NDSI', label: 'NDSI' },
    ];
  }, []);

  useEffect(() => {
    setCurrentAoi(aoi);
  }, [aoi]);

  useEffect(() => {
    setCurrentDataSet(dataSet);
  }, [dataSet]);

  useEffect(() => {
    setCurrentDateFrom(dateFrom);
  }, [dateFrom]);

  useEffect(() => {
    setCurrentDateTo(dateTo);
  }, [dateTo]);

  return (
    <div>
      <div>
        <Node type='area' active={true} clickable={true} selected={true} hasNextNode={true}>
          {enabled && <NodeInput iconName='Polygon' value={currentAoi} onClearButtonClick={() => setCurrentAoi('')} />}
        </Node>
        <Node type='dataSet' active={true} clickable={true} selected={false} hasNextNode={true}>
          {enabled && (
            <NodeInput value={currentDataSet} iconName='Satellite' onClearButtonClick={() => setCurrentDataSet('')} />
          )}
        </Node>
        <Node type='dateRange' active={true} clickable={true} selected={false} hasNextNode={true}>
          {enabled && (
            <>
              <NodeInput value={currentDateFrom} className='mb-1' onClearButtonClick={() => setCurrentDateFrom('')} />
              <NodeInput value={currentDateTo} onClearButtonClick={() => setCurrentDateTo('')} />
            </>
          )}
        </Node>
        <Node type='function' active={true} clickable={true} selected={false} hasNextNode={false}>
          {enabled && <NodeSelect value={selectedFunction} options={options} />}
        </Node>
      </div>
    </div>
  );
};
AllNodes.argTypes = {
  error: {
    table: {
      disable: true,
    },
  },
  text: {
    table: {
      disable: true,
    },
  },
  type: {
    table: {
      disable: true,
    },
  },
  selected: {
    table: {
      disable: true,
    },
  },
  aoi: {
    control: {
      type: 'text',
      description: 'Use the drawing tools to define an area of interest',
    },
  },
  dataSet: {
    control: {
      type: 'text',
      description: 'Select Data Set',
    },
  },
  dateFrom: {
    control: {
      type: 'text',
      description: 'Select Date From',
    },
  },
  dateTo: {
    control: {
      type: 'text',
      description: 'Select Date To',
    },
  },
  function: {
    control: {
      type: 'select',
    },
    options: ['NDVI', 'FALSE_COLOR', 'MOISTURE_INDEX', 'SWIR', 'NDWI', 'NDSI'],
  },
};
AllNodes.args = {
  aoi: 'Area of Interest',
  dataSet: 'Sentinel2',
  dateFrom: '22/12/2021',
  dateTo: '22/12/2022',
  function: 'NDVI',
};
