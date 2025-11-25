export interface IGeoJSONGeometry {
  type: 'Point' | 'LineString' | 'Polygon' | 'MultiPolygon' | 'MultiPoint' | 'MultiLineString' | 'GeometryCollection';
  coordinates: number[] | number[][] | number[][][] | number[][][][];
}

export interface IGeoJSONFeature {
  type: 'Feature';
  geometry: IGeoJSONGeometry;
  properties: Record<string, unknown>;
}

export interface IGeoJSONFeatureCollection {
  type: 'FeatureCollection';
  features: IGeoJSONFeature[];
}

export type TGeoJSON = IGeoJSONFeature | IGeoJSONFeatureCollection;
