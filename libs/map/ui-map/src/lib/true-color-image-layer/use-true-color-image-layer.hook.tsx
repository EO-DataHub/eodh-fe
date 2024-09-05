// import ImageLayer from 'ol/layer/Image';
// import { transformExtent } from 'ol/proj';
// import GeoTIFF from 'ol/source/GeoTIFF.js';
// import ImageStatic from 'ol/source/ImageStatic';
// import { useEffect, useState } from 'react';

// interface IImageLayerProps {
//   bbox: number[];
//   href: string;
// }

// export const useTrueColorImageLayer = ({ bbox, href }: IImageLayerProps) => {
//   const [imageLayer, setImageLayer] = useState<ImageLayer<ImageStatic> | null>(null);

//   useEffect(() => {
//     if (!bbox || !href) {
//       setImageLayer(null);
//       return;
//     }

//     // Transform bbox from EPSG:4326 to EPSG:3857 (Web Mercator)
//     const transformedExtent = transformExtent(bbox, 'EPSG:4326', 'EPSG:3857');

//     const source = new GeoTIFF({
//       sources: [
//         {
//           url: href,
//         },
//       ],
//     });

//     // const newImageLayer = new ImageLayer({
//     //   source: new ImageStatic({
//     //     url: href,
//     //     projection: 'EPSG:3857',
//     //     imageExtent: transformedExtent,
//     //   }),
//     // });

//     const newImageLayer = source;

//     setImageLayer(newImageLayer);

//     return () => {
//       setImageLayer(null);
//     };
//   }, [bbox, href]);

//   return imageLayer;
// };

// import TileLayer from 'ol/layer/Tile';
// import GeoTIFF from 'ol/source/GeoTIFF';
// import { useEffect, useState } from 'react';

// interface ISTACItem {
//   href: string;
// }

// export const useTrueColorImageLayer = ({ href }: ISTACItem) => {
//   const [tileLayer, setTileLayer] = useState<TileLayer<GeoTIFF> | null>(null);
//   const [source, setSource] = useState<GeoTIFF | null>(null);

//   useEffect(() => {
//     if (!href) {
//       setTileLayer(null);
//       return;
//     }

//     const imageUrl = href;

//     const newSource = new GeoTIFF({
//       sources: [
//         {
//           url: imageUrl,
//         },
//       ],
//     });
//     setSource(newSource);

//     const newTileLayer = new TileLayer({
//       source: newSource,
//       zIndex: 5,
//     });

//     setTileLayer(newTileLayer);

//     return () => {
//       setTileLayer(null);
//     };
//   }, [href]);

//   return { tileLayer, source };
// };

import 'ol/ol.css';

import TileLayer from 'ol/layer/WebGLTile';
import Map from 'ol/Map';
import GeoTIFF from 'ol/source/GeoTIFF';
import { useEffect, useRef } from 'react';

export const TrueColorImageLayer = () => {
  const mapRef = useRef(null);

  useEffect(() => {
    const source = new GeoTIFF({
      sources: [
        {
          url: 'https://sentinel-cogs.s3.us-west-2.amazonaws.com/sentinel-s2-l2a-cogs/36/Q/WD/2020/7/S2A_36QWD_20200701_0_L2A/TCI.tif',
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
};
