// import OlMap from 'ol/Map.js';
// import { createContext, PropsWithChildren, useState } from 'react';

// import { useGeoJsonLayer } from './use-footprint-layer.hook';

// export type TFootprintsLayer = { setFootprints: (draw: TDraw | undefined) => void };

// export const FootprintsLayerContext = createContext<TFootprintsLayer>({
//   // eslint-disable-next-line @typescript-eslint/no-empty-function
//   setFootprints: () => {},
// });

// export const FootprintsLayer = ({ children }: PropsWithChildren) => {
//   const [footprints, setFootprints] = useState<TDraw | undefined>(undefined);
//   useGeoJsonLayer({ geoJsonObject: setFootprints });

//   return (
//     <FootprintsLayerContext.Provider value={{ setFootprints: geoJsonObject }}>
//       {children}
//     </FootprintsLayerContext.Provider>
//   );
// };
