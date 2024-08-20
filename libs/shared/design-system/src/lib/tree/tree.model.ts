// eslint-disable-next-line @nx/enforce-module-boundaries
import { TTranslation } from '@ukri/shared/utils/translate';
import { PropsWithChildren, ReactNode } from 'react';

export type TIcon = ReactNode | { icon: ReactNode; position: 'before' | 'after'; key: string | number }[];

export type TTree = PropsWithChildren<{
  title: TTranslation | ReactNode;
  className?: string;
  icon?: TIcon;
  collapsable?: boolean;
}>;

export type TSpacing = '0.5' | '1' | '1.5' | '2' | '3' | '4' | 1 | 2 | 3 | 4;
