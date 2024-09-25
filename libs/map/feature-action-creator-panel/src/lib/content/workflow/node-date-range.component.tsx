import { useCallback, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Node } from '../workflow/node.component';
import { NodeInput } from './node-input.component';
import { Workflow } from './workflow.context';

interface INodeDateRangeProps {
  dateFrom?: string;
  dateTo?: string;
}

export const NodeDateRange = ({ dateFrom, dateTo }: INodeDateRangeProps) => {
  const [text, setText] = useState('');
  const [showInput, setShowInput] = useState(false);
  const { enabledNodes, setNodeSelected } = useContext(Workflow);
  const { t } = useTranslation();
  const instructions = t('MAP.ACTION_CREATOR_PANEL.NODE.DATE_RANGE.INSTRUCTIONS');

  const handleClick = useCallback(() => {
    if (enabledNodes.includes('dateRange')) {
      setNodeSelected('dateRange');
      setText(instructions);
    }
  }, [enabledNodes, instructions, setNodeSelected]);

  useEffect(() => {
    if (dateFrom && dateTo) {
      setText('');
      setShowInput(true);
    }
  }, [dateFrom, dateTo]);

  return (
    <div onClick={handleClick}>
      <Node type='dateRange' text={text}>
        {showInput && (
          <>
            <NodeInput value={dateFrom} className='mb-1' />
            <NodeInput value={dateTo} />
          </>
        )}
      </Node>
    </div>
  );
};
