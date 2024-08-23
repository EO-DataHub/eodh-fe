import { useContext } from 'react';

import { HeaderSimple } from './header/header-simple.component';
import { TreeContext, TreeProvider } from './tree.component';
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
      <TreeProvider level={level + 1} spacing={spacing}>
        <div role='tree' aria-orientation='vertical'>
          <div role='group'>
            <HeaderSimple title={null} slots={null} />
          </div>
        </div>
      </TreeProvider>
    );
  }

  return (
    <TreeProvider level={level + 1} spacing={spacing}>
      <div className='w-full overflow-hidden transition-[height] duration-300' role='group'>
        <HeaderSimple title={null} slots={null} />
      </div>
    </TreeProvider>
  );
};
