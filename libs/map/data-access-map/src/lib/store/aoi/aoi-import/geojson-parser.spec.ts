import { describe, expect, it } from 'vitest';

import { parseGeoJSONFile } from './geojson-parser';

const createMockFile = (content: string, fileName: string): File => {
  const file = new File([content], fileName, {
    type: 'application/geo+json',
  });

  file.text = () => Promise.resolve(content);

  return file;
};

describe('GeoJSON Parser', () => {
  describe('parseGeoJSONFile', () => {
    it('should parse valid FeatureCollection', async () => {
      const geojson = {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            geometry: {
              type: 'Polygon',
              coordinates: [
                [
                  [0, 0],
                  [1, 0],
                  [1, 1],
                  [0, 1],
                  [0, 0],
                ],
              ],
            },
            properties: {},
          },
        ],
      };

      const file = createMockFile(JSON.stringify(geojson), 'test.geojson');

      const result = await parseGeoJSONFile(file);
      expect(result.success).toBe(true);
      expect(result.areaValue).toBeDefined();
      expect(result.areaValue?.type).toBe('rectangle');
    });

    it('should parse valid Feature', async () => {
      const geojson = {
        type: 'Feature',
        geometry: {
          type: 'Polygon',
          coordinates: [
            [
              [0, 0],
              [1, 0],
              [0.5, 1.5],
              [0, 1],
              [0, 0],
            ],
          ],
        },
        properties: {},
      };

      const file = createMockFile(JSON.stringify(geojson), 'test.geojson');

      const result = await parseGeoJSONFile(file);
      expect(result.success).toBe(true);
      expect(result.areaValue).toBeDefined();
      expect(result.areaValue?.type).toBe('polygon');
    });

    it('should reject invalid JSON', async () => {
      const file = createMockFile('invalid json', 'test.geojson');

      const result = await parseGeoJSONFile(file);
      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
    });

    it('should reject empty FeatureCollection', async () => {
      const geojson = {
        type: 'FeatureCollection',
        features: [],
      };

      const file = createMockFile(JSON.stringify(geojson), 'test.geojson');

      const result = await parseGeoJSONFile(file);
      expect(result.success).toBe(false);
      expect(result.error).toContain('FeatureCollection must contain at least one feature');
    });

    it('should reject unsupported geometry type', async () => {
      const geojson = {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [0, 0],
        },
        properties: {},
      };

      const file = createMockFile(JSON.stringify(geojson), 'test.geojson');

      const result = await parseGeoJSONFile(file);
      expect(result.success).toBe(false);
      expect(result.error).toContain('Unsupported geometry type');
    });
  });
});
