import { WorkflowProvider } from '../workflow/workflow.context';
import { NodeArea } from './node-area.component';
import { NodeDataSet } from './node-data-set.component';
import { NodeDateRange } from './node-date-range.component';
import { NodeFunction } from './node-function.component';

export const Workflow = () => {
  return (
    <WorkflowProvider>
      <section className='text-text-primary flex justify-center'>
        <NodeArea />
        <NodeDataSet />
        <NodeDateRange />
        <NodeFunction />
      </section>
    </WorkflowProvider>
  );
};
