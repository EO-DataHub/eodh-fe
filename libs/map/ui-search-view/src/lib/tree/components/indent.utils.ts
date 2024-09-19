export type TIndent = 'small' | 'medium' | 'large' | 'extraLarge';

export const getIntend = (indent: TIndent | undefined) => {
  if (!indent) {
    return undefined;
  }

  switch (indent) {
    case 'small': {
      return 2;
    }

    case 'medium': {
      return 3;
    }

    case 'large': {
      return 4;
    }

    case 'extraLarge': {
      return 5;
    }
  }
};
