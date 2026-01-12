import { Circle, LineString, Polygon } from 'ol/geom';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { transformGeometryToAreaValue } from '../store/aoi/aoi-import/shape-detector';
import { createShape } from './geometry';
import { TCoordinate } from './shape.model';

// Mock shape-detector module
vi.mock('../store/aoi/aoi-import/shape-detector', () => ({
  transformGeometryToAreaValue: vi.fn(),
}));

describe('createShape', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });
  describe('when coordinate or type is undefined', () => {
    it('should return undefined when coordinate is undefined', () => {
      const result = createShape(undefined, 'polygon');
      expect(result).toBeUndefined();
    });

    it('should return undefined when type is undefined', () => {
      const coordinate: TCoordinate = {
        type: 'polygon',
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
      const result = createShape(coordinate, undefined);
      expect(result).toBeUndefined();
    });

    it('should return undefined when both are undefined', () => {
      const result = createShape(undefined, undefined);
      expect(result).toBeUndefined();
    });
  });

  describe('when creating circle', () => {
    it('should create a circle shape', () => {
      const coordinate: TCoordinate = {
        type: 'circle',
        center: [0, 0],
        radius: 1000,
      };

      const result = createShape(coordinate, 'circle');

      expect(result).toBeDefined();
      expect(result?.type).toBe('circle');
      expect(result?.shape).toBeInstanceOf(Circle);
      expect((result?.shape as Circle).getCenter()).toEqual([0, 0]);
      expect((result?.shape as Circle).getRadius()).toBe(1000);
    });
  });

  describe('when creating line', () => {
    it('should create a line shape', () => {
      const coordinate: TCoordinate = {
        type: 'line',
        coordinates: [
          [0, 0],
          [1, 1],
          [2, 2],
        ],
      };

      const result = createShape(coordinate, 'line');

      expect(result).toBeDefined();
      expect(result?.type).toBe('line');
      expect(result?.shape).toBeInstanceOf(LineString);
      expect((result?.shape as LineString).getCoordinates()).toEqual([
        [0, 0],
        [1, 1],
        [2, 2],
      ]);
    });
  });

  describe('when creating polygon with shape detection', () => {
    it('should detect rectangle and return rectangle type', () => {
      const coordinate: TCoordinate = {
        type: 'polygon',
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

      vi.mocked(transformGeometryToAreaValue).mockReturnValue({
        type: 'rectangle',
        coordinates: coordinate.coordinates,
      });

      const result = createShape(coordinate, 'polygon');

      expect(result).toBeDefined();
      expect(result?.type).toBe('rectangle');
      expect(result?.shape).toBeInstanceOf(Polygon);
      expect(transformGeometryToAreaValue).toHaveBeenCalledWith({
        type: 'Polygon',
        coordinates: coordinate.coordinates,
      });
    });

    it('should detect circle and return circle type', () => {
      const coordinate: TCoordinate = {
        type: 'polygon',
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

      vi.mocked(transformGeometryToAreaValue).mockReturnValue({
        type: 'circle',
        center: [0.5, 0.5],
        radius: 0.5,
      });

      const result = createShape(coordinate, 'polygon');

      expect(result).toBeDefined();
      expect(result?.type).toBe('circle');
      expect(result?.shape).toBeInstanceOf(Circle);
      expect((result?.shape as Circle).getCenter()).toEqual([0.5, 0.5]);
      expect((result?.shape as Circle).getRadius()).toBe(0.5);
    });

    it('should keep polygon type when shape is polygon', () => {
      const coordinate: TCoordinate = {
        type: 'polygon',
        coordinates: [
          [
            [0, 0],
            [1, 0],
            [2, 1],
            [1, 2],
            [0, 0],
          ],
        ],
      };

      vi.mocked(transformGeometryToAreaValue).mockReturnValue({
        type: 'polygon',
        coordinates: coordinate.coordinates,
      });

      const result = createShape(coordinate, 'polygon');

      expect(result).toBeDefined();
      expect(result?.type).toBe('polygon');
      expect(result?.shape).toBeInstanceOf(Polygon);
    });

    it('should fallback to original type when transformGeometryToAreaValue throws error', () => {
      const coordinate: TCoordinate = {
        type: 'polygon',
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

      vi.mocked(transformGeometryToAreaValue).mockImplementation(() => {
        throw new Error('Invalid geometry');
      });

      const result = createShape(coordinate, 'polygon');

      expect(result).toBeDefined();
      expect(result?.type).toBe('polygon');
      expect(result?.shape).toBeInstanceOf(Polygon);
    });

    it('should return polygon when coordinates are valid even after transformGeometryToAreaValue throws', () => {
      const coordinate: TCoordinate = {
        type: 'polygon',
        coordinates: [
          [
            [0, 0],
            [1, 0],
            [1, 1],
            [0, 0],
          ],
        ],
      };

      vi.mocked(transformGeometryToAreaValue).mockImplementation(() => {
        throw new Error('Invalid geometry');
      });

      const result = createShape(coordinate, 'polygon');

      // Should fallback to creating polygon with original type
      expect(result).toBeDefined();
      expect(result?.type).toBe('polygon');
      expect(result?.shape).toBeInstanceOf(Polygon);
    });
  });

  describe('when creating rectangle with shape detection', () => {
    it('should detect rectangle and return rectangle type', () => {
      const coordinate: TCoordinate = {
        type: 'rectangle',
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

      vi.mocked(transformGeometryToAreaValue).mockReturnValue({
        type: 'rectangle',
        coordinates: coordinate.coordinates,
      });

      const result = createShape(coordinate, 'rectangle');

      expect(result).toBeDefined();
      expect(result?.type).toBe('rectangle');
      expect(result?.shape).toBeInstanceOf(Polygon);
    });

    it('should convert to polygon if detection determines it is not a rectangle', () => {
      const coordinate: TCoordinate = {
        type: 'rectangle',
        coordinates: [
          [
            [0, 0],
            [1, 0],
            [2, 1],
            [1, 2],
            [0, 0],
          ],
        ],
      };

      vi.mocked(transformGeometryToAreaValue).mockReturnValue({
        type: 'polygon',
        coordinates: coordinate.coordinates,
      });

      const result = createShape(coordinate, 'rectangle');

      expect(result).toBeDefined();
      expect(result?.type).toBe('polygon');
      expect(result?.shape).toBeInstanceOf(Polygon);
    });
  });

  describe('edge cases', () => {
    it('should handle polygon with invalid coordinates structure', () => {
      const coordinate: TCoordinate = {
        type: 'polygon',
        coordinates: [], // Empty coordinates
      };

      vi.mocked(transformGeometryToAreaValue).mockImplementation(() => {
        throw new Error('Invalid geometry');
      });

      const result = createShape(coordinate, 'polygon');

      // Should still create geometry even with empty coordinates
      expect(result).toBeDefined();
      expect(result?.type).toBe('polygon');
    });

    it('should return polygon even when transformGeometryToAreaValue returns empty coordinates', () => {
      const coordinate: TCoordinate = {
        type: 'polygon',
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

      // Mock returns empty coordinates
      vi.mocked(transformGeometryToAreaValue).mockReturnValue({
        type: 'polygon',
        coordinates: [[]],
      });

      const result = createShape(coordinate, 'polygon');

      // OpenLayers creates Polygon even with empty coordinates
      expect(result).toBeDefined();
      expect(result?.type).toBe('polygon');
      expect(result?.shape).toBeInstanceOf(Polygon);
    });
  });

  describe('coordinate type validation', () => {
    it('should not apply shape detection for circle type', () => {
      const coordinate: TCoordinate = {
        type: 'circle',
        center: [0, 0],
        radius: 1000,
      };

      const result = createShape(coordinate, 'circle');

      expect(result).toBeDefined();
      expect(result?.type).toBe('circle');
      expect(transformGeometryToAreaValue).not.toHaveBeenCalled();
    });

    it('should not apply shape detection for line type', () => {
      const coordinate: TCoordinate = {
        type: 'line',
        coordinates: [
          [0, 0],
          [1, 1],
        ],
      };

      const result = createShape(coordinate, 'line');

      expect(result).toBeDefined();
      expect(result?.type).toBe('line');
      expect(transformGeometryToAreaValue).not.toHaveBeenCalled();
    });

    it('should only apply shape detection when coordinates property exists', () => {
      const coordinate: TCoordinate = {
        type: 'circle',
        center: [0, 0],
        radius: 1000,
      };

      // Force type to polygon but coordinate is circle (no coordinates property)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const result = createShape(coordinate as any, 'polygon');

      expect(result).toBeDefined();
      expect(transformGeometryToAreaValue).not.toHaveBeenCalled();
    });
  });
});
