import { FunctionSelectInput } from '../workflow/function-input.component';
import { Node } from '../workflow/node.component';
import { PseudoInput } from '../workflow/pseudo-input.component';

const args = {
  text: 'NodeSample',
  error: '',
  type: 'area',
  active: false,
  disabled: true,
  selected: false,
};

export const Workflow = () => {
  const showInputs = false;
  return (
    <section className='text-text-primary flex justify-center'>
      <div>
        <Node {...args} type='area'>
          {showInputs && <PseudoInput iconName='Polygon' value={'sample aoi'} />}
        </Node>
        <Node {...args} type='dataSet'>
          {showInputs && <PseudoInput value={'sample dataSet'} />}
        </Node>
        <Node {...args} type='dateRange'>
          {showInputs && (
            <>
              <PseudoInput value={'12/12/2012'} className='mb-1' />
              <PseudoInput value={'22/12/2012'} />
            </>
          )}
        </Node>
        <Node {...args} type='function'>
          {showInputs && (
            <FunctionSelectInput
              onChange={() => {
                return;
              }}
            />
          )}
        </Node>
      </div>
    </section>
  );
};
