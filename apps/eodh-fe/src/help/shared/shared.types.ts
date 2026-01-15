import { IImageElement, ITableElement } from '@ukri/shared/ui/help';

export interface IHelpElementConfig {
  readonly title: string;
  readonly element: ITableElement | IImageElement;
}

export interface ITableRow {
  readonly label: string;
  readonly color: string;
}
