import { PropsWithChildren, useContext } from 'react';

import { TreeContext } from '../tree.component';
import { TSpacing } from '../tree.model';

export const getIndentClassName = (spacing: TSpacing | undefined) => {
  if (!spacing) {
    return '';
  }

  switch (spacing) {
    case '0.5': {
      return 'pl-0.5';
    }

    case 1:
    case '1': {
      return 'pl-1';
    }

    case '1.5': {
      return 'pl-1.5';
    }

    case 2:
    case '2': {
      return 'pl-2';
    }

    case 3:
    case '3': {
      return 'pl-3';
    }

    case 4:
    case '4': {
      return 'pl-4';
    }

    case 5:
    case '5': {
      return 'pl-5';
    }
  }
};

type TIndentProps = PropsWithChildren<{ className?: string }>;

export const Indent = ({ className = '', children }: TIndentProps) => {
  const { indent } = useContext(TreeContext);

  return <div className={`flex ${getIndentClassName(indent)} ${className}`}>{children}</div>;
};
