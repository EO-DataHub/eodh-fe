import { useCallback, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Node } from '../workflow/node.component';
import { NodeInput } from './node-input.component';
import { Workflow } from './workflow.context';

interface INodeDataSetProps {
  value?: string;
}

export const NodeDataSet = ({ value }: INodeDataSetProps) => {
  const [text, setText] = useState('');
  const [showInput, setShowInput] = useState(false);
  const { enabledNodes, setNodeSelected } = useContext(Workflow);
  const { t } = useTranslation();
  const instructions = t('MAP.ACTION_CREATOR_PANEL.NODE.DATA_SET.INSTRUCTIONS');

  const handleClick = useCallback(() => {
    if (enabledNodes.includes('dataSet')) {
      setNodeSelected('dataSet');
      setText(instructions);
    }
  }, [enabledNodes, instructions, setNodeSelected]);

  useEffect(() => {
    if (value) {
      setText('');
      setShowInput(true);
    }
  }, [value]);

  return (
    <div onClick={handleClick}>
      <Node type='dataSet' text={text}>
        {showInput && <NodeInput iconName='Satellite' value={value} />}
      </Node>
    </div>
  );
};
