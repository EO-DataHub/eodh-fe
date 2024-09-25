import { useCallback, useContext, useState } from 'react';

import { Node } from './node.component';
import { NodeSelect } from './node-select.component';
import { Workflow } from './workflow.context';

export const NodeFunction = () => {
  const { enabledNodes, setNodeSelected } = useContext(Workflow);
  const [showInput, setShowInput] = useState(false);

  const handleClick = useCallback(() => {
    if (enabledNodes.includes('function')) {
      setNodeSelected('function');
      setShowInput(true);
    }
  }, [enabledNodes, setNodeSelected]);

  return (
    <div onClick={handleClick}>
      <Node type='function'>
        {showInput && (
          <>
            <NodeSelect
              onChange={() => {
                return;
              }}
            />
          </>
        )}
      </Node>
    </div>
  );
};
