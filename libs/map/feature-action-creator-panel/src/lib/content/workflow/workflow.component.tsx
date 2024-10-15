import { TNode, useActionCreator } from '@ukri/map/data-access-map';

import { AreaNode } from './nodes/area/area-node.component';
import { DataSetNode } from './nodes/data-set/data-set-node.component';
import { NodeDateRange } from './nodes/date-range/date-range-node.component';
import { NodeFunction } from './nodes/function/function-node.component';

const renderNode = (node: TNode) => {
  switch (node.type) {
    case 'area': {
      return <AreaNode key={node.id} node={node} />;
    }

    case 'dataSet': {
      return <DataSetNode key={node.id} node={node} />;
    }

    case 'dateRange': {
      return <NodeDateRange key={node.id} node={node} />;
    }

    case 'function': {
      return <NodeFunction key={node.id} node={node} />;
    }
  }
};

export const Workflow = () => {
  const { nodes } = useActionCreator();

  return (
    <div className='flex justify-center'>
      <section className='p-4 text-text-primary flex justify-center flex-col'>
        {nodes.map((node) => renderNode(node))}
      </section>
    </div>
  );
};
