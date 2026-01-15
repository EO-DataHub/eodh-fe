import { THelpElement } from '@ukri/shared/ui/help';

export interface IHelpElementConfig {
  readonly title: string;
  readonly element: THelpElement;
}

export interface ITableRow {
  readonly label: string;
  readonly color: string;
}
