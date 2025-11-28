import { describe, expect, it } from 'vitest';

import { validateGeoJSON, validateGeometryType } from './geojson-validator';

describe('GeoJSON Validator', () => {
  describe('validateGeoJSON', () => {
    it('should validate valid FeatureCollection', () => {
      const geojson = {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            geometry: { type: 'Polygon', coordinates: [[[]]] },
            properties: {},
          },
        ],
      };
      const result = validateGeoJSON(geojson);
      expect(result.valid).toBe(true);
      expect(result.errors).toEqual([]);
    });

    it('should validate valid Feature', () => {
      const geojson = {
        type: 'Feature',
        geometry: { type: 'Polygon', coordinates: [[[]]] },
        properties: {},
      };
      const result = validateGeoJSON(geojson);
      expect(result.valid).toBe(true);
    });

    it('should reject invalid structure', () => {
      const result = validateGeoJSON(null);
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Invalid JSON structure');
    });

    it('should reject empty FeatureCollection', () => {
      const geojson = { type: 'FeatureCollection', features: [] };
      const result = validateGeoJSON(geojson);
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('FeatureCollection must contain at least one feature');
    });

    it('should reject invalid type', () => {
      const geojson = { type: 'InvalidType' };
      const result = validateGeoJSON(geojson);
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('GeoJSON must be a Feature or FeatureCollection');
    });

    it('should reject Feature without geometry', () => {
      const geojson = { type: 'Feature', properties: {} };
      const result = validateGeoJSON(geojson);
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Feature missing geometry');
    });
  });

  describe('validateGeometryType', () => {
    it('should accept Polygon', () => {
      const geometry = { type: 'Polygon' as const, coordinates: [[[]]] };
      const result = validateGeometryType(geometry);
      expect(result.valid).toBe(true);
      expect(result.errors).toEqual([]);
    });

    it('should accept MultiPolygon', () => {
      const geometry = { type: 'MultiPolygon' as const, coordinates: [[[[]]]] };
      const result = validateGeometryType(geometry);
      expect(result.valid).toBe(true);
    });

    it('should reject Point', () => {
      const geometry = { type: 'Point' as const, coordinates: [0, 0] };
      const result = validateGeometryType(geometry);
      expect(result.valid).toBe(false);
      expect(result.errors[0]).toContain('Unsupported geometry type: Point');
    });

    it('should reject LineString', () => {
      const geometry = { type: 'LineString' as const, coordinates: [[]] };
      const result = validateGeometryType(geometry);
      expect(result.valid).toBe(false);
      expect(result.errors[0]).toContain('Unsupported geometry type: LineString');
    });
  });
});
