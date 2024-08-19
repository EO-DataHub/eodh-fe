import { useContext } from 'react';

import { TreeHeaderSimple } from './header.component';
import { TreeContext } from './tree.component';
import { TSpacing } from './tree.model';

export const getSpacingClassName = (spacing: TSpacing) => {
  switch (spacing) {
    case '0.5': {
      return 'py-0.5';
    }

    case 1:
    case '1': {
      return 'py-1';
    }

    case '1.5': {
      return 'py-1.5';
    }

    case 2:
    case '2': {
      return 'py-2';
    }

    case 3:
    case '3': {
      return 'py-3';
    }

    case 4:
    case '4': {
      return 'py-4';
    }
  }
};

export const Spacing = ({ spacing = 2 }: { spacing?: TSpacing }) => {
  const { level } = useContext(TreeContext);

  if (level === 0) {
    return (
      <TreeContext.Provider value={{ level: level + 1, spacing }}>
        <div role='tree' aria-orientation='vertical'>
          <div role='group'>
            <TreeHeaderSimple title={null} icon={null} />
          </div>
        </div>
      </TreeContext.Provider>
    );
  }

  return (
    <TreeContext.Provider value={{ level: level + 1, spacing }}>
      <div className='w-full overflow-hidden transition-[height] duration-300' role='group'>
        <TreeHeaderSimple title={null} icon={null} />
      </div>
    </TreeContext.Provider>
  );
};
