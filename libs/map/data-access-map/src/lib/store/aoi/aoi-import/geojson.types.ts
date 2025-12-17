export interface IGeoJSONPolygonGeometry {
  type: 'Polygon';
  coordinates: number[][][];
}

export interface IGeoJSONMultiPolygonGeometry {
  type: 'MultiPolygon';
  coordinates: number[][][][];
}

export interface IGeoJSONPointGeometry {
  type: 'Point';
  coordinates: number[];
}

export interface IGeoJSONLineStringGeometry {
  type: 'LineString';
  coordinates: number[][];
}

export interface IGeoJSONMultiPointGeometry {
  type: 'MultiPoint';
  coordinates: number[][];
}

export interface IGeoJSONMultiLineStringGeometry {
  type: 'MultiLineString';
  coordinates: number[][][];
}

export interface IGeoJSONGeometryCollectionGeometry {
  type: 'GeometryCollection';
  geometries: TGeoJSONGeometry[];
}

export type TGeoJSONGeometry =
  | IGeoJSONPointGeometry
  | IGeoJSONLineStringGeometry
  | IGeoJSONPolygonGeometry
  | IGeoJSONMultiPolygonGeometry
  | IGeoJSONMultiPointGeometry
  | IGeoJSONMultiLineStringGeometry
  | IGeoJSONGeometryCollectionGeometry;

export interface IGeoJSONFeature {
  type: 'Feature';
  geometry: TGeoJSONGeometry;
  properties: Record<string, unknown>;
}

export interface IGeoJSONFeatureCollection {
  type: 'FeatureCollection';
  features: IGeoJSONFeature[];
}

export type TGeoJSON = IGeoJSONFeature | IGeoJSONFeatureCollection;
