import MapBrowserEvent from 'ol/MapBrowserEvent';
import { useCallback, useContext, useEffect } from 'react';

import { MapContext } from '../map.component';

type TEventType = 'click' | 'pointermove' | undefined;

export const getEventType = (event: MapBrowserEvent<UIEvent>): TEventType => {
  switch (event.type) {
    case 'pointermove': {
      return 'pointermove';
    }

    case 'click': {
      return 'click';
    }
  }

  return undefined;
};

interface IUseMapClickOptions {
  readonly enabled?: boolean;
  readonly includePointerMove?: boolean;
}

type TMapClickCallback = (event: MapBrowserEvent<UIEvent>, eventType: TEventType) => void;

export const useMapClick = (callback: TMapClickCallback, options: IUseMapClickOptions = {}) => {
  const map = useContext(MapContext);
  const { enabled = true, includePointerMove = false } = options;

  const handleEvent = useCallback(
    (event: MapBrowserEvent<UIEvent>) => {
      const eventType = getEventType(event);
      callback(event, eventType);
    },
    [callback]
  );

  useEffect(() => {
    if (!map || !enabled) {
      return;
    }

    map.on('click', handleEvent);

    if (includePointerMove) {
      map.on('pointermove', handleEvent);
    }

    return () => {
      map.un('click', handleEvent);

      if (includePointerMove) {
        map.un('pointermove', handleEvent);
      }
    };
  }, [map, enabled, includePointerMove, handleEvent]);
};
