import { describe, expect, it } from 'vitest';

import { transformGeometryToAreaValue } from './shape-detector';

describe('Shape Detector', () => {
  describe('transformGeometryToAreaValue', () => {
    it('should detect rectangle', () => {
      const geometry = {
        type: 'Polygon' as const,
        coordinates: [
          [
            [0, 0],
            [1, 0],
            [1, 1],
            [0, 1],
            [0, 0],
          ],
        ],
      };
      const result = transformGeometryToAreaValue(geometry);
      expect(result.type).toBe('rectangle');
    });

    it('should detect polygon for irregular shape', () => {
      const geometry = {
        type: 'Polygon' as const,
        coordinates: [
          [
            [0, 0],
            [1, 0],
            [0.5, 1.5],
            [0, 1],
            [0, 0],
          ],
        ],
      };
      const result = transformGeometryToAreaValue(geometry);
      expect(result.type).toBe('polygon');
    });

    it('should handle MultiPolygon', () => {
      const geometry = {
        type: 'MultiPolygon' as const,
        coordinates: [
          [
            [
              [0, 0],
              [1, 0],
              [1, 1],
              [0, 1],
              [0, 0],
            ],
          ],
        ],
      };
      const result = transformGeometryToAreaValue(geometry);
      expect(result.type).toBe('polygon');
    });

    it('should detect circle for circular polygon', () => {
      const centerX = 0;
      const centerY = 0;
      const radius = 1;
      const points = 50;
      const coordinates = [
        Array.from({ length: points + 1 }, (_, i) => {
          const angle = (i / points) * 2 * Math.PI;
          return [centerX + radius * Math.cos(angle), centerY + radius * Math.sin(angle)];
        }),
      ];

      const geometry = {
        type: 'Polygon' as const,
        coordinates: coordinates,
      };
      const result = transformGeometryToAreaValue(geometry);
      expect(result.type).toBe('circle');
      expect(result).toHaveProperty('center');
      expect(result).toHaveProperty('radius');
    });

    it('should not detect circle for polygon with few points', () => {
      const coordinates = [
        [
          [0, 0],
          [1, 0],
          [1, 1],
          [0, 1],
          [0.5, 1.5],
          [0, 0],
        ],
      ];

      const geometry = {
        type: 'Polygon' as const,
        coordinates: coordinates,
      };
      const result = transformGeometryToAreaValue(geometry);
      expect(result.type).toBe('polygon');
    });
  });
});
