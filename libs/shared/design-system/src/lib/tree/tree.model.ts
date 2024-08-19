import { PropsWithChildren, ReactNode } from 'react';

export type TIcon = ReactNode | { icon: ReactNode; position: 'before' | 'after' }[];

export type TTree = PropsWithChildren<{
  title: string | ReactNode;
  className?: string;
  icon?: TIcon;
  collapsable?: boolean;
}>;

export type TSpacing = '0.5' | '1' | '1.5' | '2' | '3' | '4' | 1 | 2 | 3 | 4;
