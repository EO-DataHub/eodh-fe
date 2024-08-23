import { ParseKeys } from 'i18next';
import { PropsWithChildren, ReactNode } from 'react';

type TReactNode =
  | Exclude<ReactNode, string | Iterable<ReactNode>>
  | Iterable<Exclude<ReactNode, string | Iterable<ReactNode>>>;
export type TSlotPosition = 'title:before' | 'title:after';
export type TSlots = { element: ReactNode; position: TSlotPosition; key: string | number }[];

export type TTree = PropsWithChildren<{
  title: ParseKeys | TReactNode;
  className?: string;
  slots?: TSlots | null;
  expandable?: boolean;
}>;

export type TSpacing = '0.5' | '1' | '1.5' | '2' | '3' | '4' | 1 | 2 | 3 | 4;
