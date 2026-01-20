import { CSSProperties, MouseEvent, ReactNode, RefObject } from 'react';

export interface IPosition {
  readonly x: number;
  readonly y: number;
}

export interface ILegendPanelProps {
  readonly title: string;
  readonly position: IPosition;
  readonly onPositionChange: (position: IPosition) => void;
  readonly isExpanded: boolean;
  readonly onToggleExpand: () => void;
  readonly onResetPosition?: () => void;
  readonly children: ReactNode;
  readonly className?: string;
  readonly maxHeight?: number;
  readonly isFocused?: boolean;
  readonly onMouseDown?: () => void;
}

export interface IUseDraggableOptions {
  readonly initialPosition: IPosition;
  readonly onPositionChange: (position: IPosition) => void;
  readonly constrainToViewport?: boolean;
  readonly elementRef?: RefObject<HTMLElement | null>;
}

export interface IDragHandleProps {
  readonly onMouseDown: (e: MouseEvent) => void;
  readonly style: CSSProperties;
}

export interface IUseDraggableReturn {
  readonly position: IPosition;
  readonly isDragging: boolean;
  readonly dragHandleProps: IDragHandleProps;
}
