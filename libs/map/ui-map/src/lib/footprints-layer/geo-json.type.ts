type TCoordinate = [number, number];

interface IGeometry {
  type: 'Polygon'; // TODO: will we support any other types?
  coordinates: TCoordinate[];
}

interface IProperties {
  datetime: string;
}

interface IAsset {
  title: string;
  description: string;
  href: string;
  type: string;
  roles: string[];
  'raster:bands'?: {
    nodata: number;
    data_type: string;
  }[];
}

interface ILink {
  href: string;
  rel: string;
  type: string;
  method?: string;
  body?: {
    collections: string[];
    token: string;
  };
}

interface IFeature {
  type: 'Feature';
  geometry: IGeometry;
  properties: IProperties;
  id: string;
  bbox: number[];
  stac_version: string;
  assets: Record<string, IAsset>;
  links: ILink[];
  collection: string;
}

export interface IFeatureCollection {
  type: 'FeatureCollection';
  features: IFeature[];
  links: ILink[];
  context: {
    returned: number;
    limit: number;
    matched: number;
  };
}
