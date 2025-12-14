import { useCallback, useEffect, useRef, useState } from 'react';

import { IPosition, IUseDraggableOptions, IUseDraggableReturn } from '../legend.types';

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

  useEffect(() => {
    positionRef.current = position;
  }, [position]);

  useEffect(() => {
    setPosition(initialPosition);
  }, [initialPosition]);

  const constrainPosition = useCallback(
    (pos: IPosition): IPosition => {
      if (!constrainToViewport) {
        return pos;
      }

      const elementWidth = elementRef?.current?.offsetWidth ?? 300;
      const elementHeight = elementRef?.current?.offsetHeight ?? 200;

      const maxX = window.innerWidth - elementWidth;
      const maxY = window.innerHeight - elementHeight;

      return {
        x: Math.max(0, Math.min(pos.x, maxX)),
        y: Math.max(0, Math.min(pos.y, maxY)),
      };
    },
    [constrainToViewport, elementRef]
  );

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    dragOffset.current = {
      x: e.clientX - positionRef.current.x,
      y: e.clientY - positionRef.current.y,
    };
  }, []);

  useEffect(() => {
    if (!isDragging) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      const newPosition = constrainPosition({
        x: e.clientX - dragOffset.current.x,
        y: e.clientY - dragOffset.current.y,
      });
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
