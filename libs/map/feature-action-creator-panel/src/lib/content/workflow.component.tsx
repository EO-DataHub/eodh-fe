import { CytoscapeWrapper } from './workflow/cytoscape-wrapper.component';
import { CytoscapeProvider } from './workflow/context.context';

export const Workflow = () => {
  return (
    <CytoscapeProvider>
      <section className='text-text-primary w-full h-full relative'>
        <CytoscapeWrapper />
      </section>
    </CytoscapeProvider>
  )
};
