import { register } from 'ol/proj/proj4.js';
import proj4 from 'proj4';

const epsg27700projection =
  '+proj=tmerc +lat_0=49 +lon_0=-2 +k=0.9996012717 +x_0=400000 +y_0=-100000 +ellps=airy +units=m +no_defs';
const epsg29902projection =
  '+proj=tmerc +lat_0=53.5 +lon_0=-8 +k=1.000035 +x_0=200000 +y_0=250000 +a=6377340.189 +rf=299.3249646 +towgs84=482.5,-130.6,564.6,-1.042,-0.214,-0.631,8.15 +units=m +no_defs +type=crs';

type TProjection = {
  name: string;
  projection: string;
};

const projections: TProjection[] = [
  {
    name: 'EPSG:27700',
    projection: epsg27700projection,
  },
  {
    name: 'EPSG:29902',
    projection: epsg29902projection,
  },
];

export const registerOpenLayersProjections = () => {
  projections.forEach((projection) => {
    proj4.defs(projection.name, projection.projection);
  });

  register(proj4);
};
