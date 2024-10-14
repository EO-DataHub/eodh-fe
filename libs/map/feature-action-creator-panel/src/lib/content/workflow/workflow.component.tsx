import { WorkflowProvider } from '../workflow/workflow.context';
import { NodeArea } from './node-area.component';
import { NodeDataSet } from './node-data-set.component';
import { NodeDateRange } from './node-date-range.component';
import { NodeFunction } from './node-function.component';

export const Workflow = () => {
  return (
    <WorkflowProvider>
      <div className='flex justify-center'>
        <section className='p-4 text-text-primary flex justify-center flex-col'>
          <NodeArea />
          <NodeDataSet />
          <NodeDateRange />
          <NodeFunction />
        </section>
      </div>
    </WorkflowProvider>
  );
};
