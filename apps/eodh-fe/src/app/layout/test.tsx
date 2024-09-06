import 'ol/ol.css';

import TileLayer from 'ol/layer/WebGLTile';
import Map from 'ol/Map';
import GeoTIFF from 'ol/source/GeoTIFF';
import React, { useEffect, useRef } from 'react';

function COGMap() {
  const mapRef = useRef(null);

  useEffect(() => {
    const source = new GeoTIFF({
      sources: [
        {
          url: 'https://sentinel-cogs.s3.us-west-2.amazonaws.com/sentinel-s2-l2a-cogs/42/L/VQ/2024/3/S2B_42LVQ_20240319_0_L2A/TCI.tif',
        },
      ],
    });

    const map = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: source,
        }),
      ],
      view: source.getView(),
    });
    // map.setView
    return () => {
      map.setTarget(null);
    };
  }, []);

  return <div ref={mapRef} style={{ width: '100%', height: '400px' }} />;
}

export default COGMap;
