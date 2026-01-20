import { MouseEvent as ReactMouseEvent, RefObject, useCallback, useEffect, useRef, useState } from 'react';

import { IPosition, IUseDraggableOptions, IUseDraggableReturn } from './legend.types';

const getContainerBounds = (elementRef?: RefObject<HTMLElement | null>) => {
  const element = elementRef?.current;
  if (!element) {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
      offsetX: 0,
      offsetY: 0,
    };
  }

  const parent = element.offsetParent as HTMLElement | null;
  if (!parent) {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
      offsetX: 0,
      offsetY: 0,
    };
  }

  const parentRect = parent.getBoundingClientRect();

  return {
    width: parent.clientWidth,
    height: parent.clientHeight,
    offsetX: parentRect.left,
    offsetY: parentRect.top,
  };
};

export const useDraggable = ({
  initialPosition,
  onPositionChange,
  constrainToViewport = true,
  elementRef,
}: IUseDraggableOptions): IUseDraggableReturn => {
  const [position, setPosition] = useState<IPosition>(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const dragOffset = useRef<IPosition>({ x: 0, y: 0 });
  const positionRef = useRef<IPosition>(position);
  const containerBoundsRef = useRef(getContainerBounds(elementRef));

  useEffect(() => {
    positionRef.current = position;
  }, [position]);

  const constrainPosition = useCallback(
    (pos: IPosition, bounds: ReturnType<typeof getContainerBounds>): IPosition => {
      if (!constrainToViewport) {
        return pos;
      }

      const element = elementRef?.current;
      const elementWidth = element?.offsetWidth ?? 350;
      const elementHeight = element?.offsetHeight ?? 200;

      const minX = 0;
      const minY = 0;
      const maxX = Math.max(0, bounds.width - elementWidth);
      const maxY = Math.max(0, bounds.height - elementHeight);

      return {
        x: Math.max(minX, Math.min(pos.x, maxX)),
        y: Math.max(minY, Math.min(pos.y, maxY)),
      };
    },
    [constrainToViewport, elementRef]
  );

  useEffect(() => {
    const bounds = getContainerBounds(elementRef);
    containerBoundsRef.current = bounds;
    const constrainedPosition = constrainPosition(initialPosition, bounds);
    setPosition(constrainedPosition);
  }, [initialPosition, constrainPosition, elementRef]);

  const handleResize = useCallback(() => {
    const bounds = getContainerBounds(elementRef);
    containerBoundsRef.current = bounds;
    setPosition((currentPosition) => constrainPosition(currentPosition, bounds));
  }, [elementRef, constrainPosition]);

  useEffect(() => {
    if (!constrainToViewport) {
      return;
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [constrainToViewport, handleResize]);

  const handleMouseDown = useCallback(
    (e: ReactMouseEvent) => {
      e.preventDefault();

      const bounds = getContainerBounds(elementRef);
      containerBoundsRef.current = bounds;

      setIsDragging(true);
      dragOffset.current = {
        x: e.clientX - bounds.offsetX - positionRef.current.x,
        y: e.clientY - bounds.offsetY - positionRef.current.y,
      };
    },
    [elementRef]
  );

  useEffect(() => {
    if (!isDragging) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      const bounds = containerBoundsRef.current;

      const newPosition = constrainPosition(
        {
          x: e.clientX - bounds.offsetX - dragOffset.current.x,
          y: e.clientY - bounds.offsetY - dragOffset.current.y,
        },
        bounds
      );

      setPosition(newPosition);
      positionRef.current = newPosition;
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      onPositionChange(positionRef.current);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, constrainPosition, onPositionChange]);

  return {
    position,
    isDragging,
    dragHandleProps: {
      onMouseDown: handleMouseDown,
      style: { cursor: isDragging ? 'grabbing' : 'grab' },
    },
  };
};
