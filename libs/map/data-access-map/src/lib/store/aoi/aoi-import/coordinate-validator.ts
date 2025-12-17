export type TCoordinateSystem = 'EPSG:4326' | 'EPSG:3857' | 'unknown';

interface ICoordinateValidationResult {
  valid: boolean;
  detectedProjection: TCoordinateSystem;
  error?: string;
}

const isValidLongitude = (value: number): boolean => {
  return value >= -180 && value <= 180;
};

const isValidLatitude = (value: number): boolean => {
  return value >= -90 && value <= 90;
};

// eslint-disable-next-line @typescript-eslint/naming-convention
const isLikelyWGS84 = (x: number, y: number): boolean => {
  return isValidLongitude(x) && isValidLatitude(y);
};

const isLikelyWebMercator = (x: number, y: number): boolean => {
  const maxWebMercator = 20037508.34;
  return Math.abs(x) <= maxWebMercator && Math.abs(y) <= maxWebMercator && (Math.abs(x) > 180 || Math.abs(y) > 90);
};

export const detectCoordinateSystem = (coordinates: number[][]): ICoordinateValidationResult => {
  if (!coordinates || coordinates.length === 0) {
    return {
      valid: false,
      detectedProjection: 'unknown',
      error: 'No coordinates provided',
    };
  }

  const firstCoord = coordinates[0];
  if (!firstCoord || firstCoord.length < 2) {
    return {
      valid: false,
      detectedProjection: 'unknown',
      error: 'Invalid coordinate format',
    };
  }

  const [x, y] = firstCoord;

  if (isLikelyWebMercator(x, y)) {
    return {
      valid: true,
      detectedProjection: 'EPSG:3857',
    };
  }

  if (isLikelyWGS84(x, y)) {
    return {
      valid: true,
      detectedProjection: 'EPSG:4326',
    };
  }

  return {
    valid: false,
    detectedProjection: 'unknown',
    error: `Unable to detect coordinate system. Coordinates [${x}, ${y}] do not match known projections (EPSG:4326 or EPSG:3857).`,
  };
};
