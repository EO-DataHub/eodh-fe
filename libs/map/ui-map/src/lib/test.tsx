import TileLayer from 'ol/layer/Tile';
import GeoTIFF from 'ol/source/GeoTIFF';
import { useContext, useEffect, useState } from 'react';

import { MapContext } from './map.component';

interface IGeoTIFFLayerProps {
  url: string;
}

export const GeoTiffLayer = ({ url }: IGeoTIFFLayerProps) => {
  const map = useContext(MapContext);
  const [layer, setLayer] = useState<TileLayer<GeoTIFF> | null>(null);

  useEffect(() => {
    if (!map || !url) {
      return;
    }

    const geoTiffLayer = new TileLayer({
      source: new GeoTIFF({
        sources: [{ url }],
      }),
    });

    map.addLayer(geoTiffLayer);
    setLayer(geoTiffLayer);

    return () => {
      if (map && layer) {
        map.removeLayer(layer);
      }
    };
  }, [map, url, layer]);

  return null;
};
