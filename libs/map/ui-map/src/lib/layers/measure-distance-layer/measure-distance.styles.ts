import { FeatureLike } from 'ol/Feature';
import { LineString } from 'ol/geom';
import { Fill, Stroke, Style } from 'ol/style';
import CircleStyle from 'ol/style/Circle';

// TODO to check if it is possible to get styles from tailwind
const COLORS = {
  primary: 'rgba(143, 68, 255, 0.7)',
  primaryLight: 'rgba(143, 68, 255, 0.5)',
  fill: 'rgba(143, 68, 255, 0.2)',
} as const;

const getCircleStyle = () =>
  new CircleStyle({
    radius: 6,
    stroke: new Stroke({
      color: getComputedStyle(document.documentElement).getPropertyValue('--colors-bright'),
      width: 1,
    }),
    fill: new Fill({
      color: getComputedStyle(document.documentElement).getPropertyValue('--colors-text-visited'),
    }),
  });

const createMeasureStyle = (strokeOptions: { color: string; width: number; lineDash?: number[] }) =>
  new Style({
    fill: new Fill({ color: COLORS.fill }),
    stroke: new Stroke(strokeOptions),
    image: getCircleStyle(),
  });

export const measureDistanceDrawingFinishedStyles = createMeasureStyle({
  color: COLORS.primaryLight,
  width: 1.5,
});

export const measureDistanceDrawingInProgressStylesPolygon = createMeasureStyle({
  color: COLORS.primary,
  width: 2,
});

export const measureDistanceDrawingInProgressStylesLine = createMeasureStyle({
  color: COLORS.primary,
  width: 2,
  lineDash: [10, 10],
});

export const createPolygonStyles = (feature: FeatureLike): Style[] | Style => {
  const geometry = feature.getGeometry();

  if (!geometry || geometry.getType() !== 'Polygon') {
    return measureDistanceDrawingInProgressStylesPolygon;
  }

  const currentEdgeStyle = measureDistanceDrawingInProgressStylesPolygon.clone();
  currentEdgeStyle.setStroke(
    new Stroke({
      color: COLORS.primaryLight,
      lineDash: [10, 10],
      width: 2,
    })
  );

  return currentEdgeStyle;
};

export const createLineStyles = (feature: FeatureLike): Style[] | Style => {
  const geometry = feature.getGeometry();

  if (!geometry || geometry.getType() !== 'LineString') {
    return measureDistanceDrawingInProgressStylesLine;
  }

  const coordinates = (geometry as LineString).getCoordinates();
  if (!coordinates) {
    return measureDistanceDrawingInProgressStylesLine;
  }

  const finishedStyles = measureDistanceDrawingInProgressStylesLine.clone();
  finishedStyles.setGeometry(new LineString(coordinates.slice(-2)));

  if (coordinates.length > 2) {
    const inProgressStyles = measureDistanceDrawingFinishedStyles.clone();
    inProgressStyles.setGeometry(new LineString(coordinates.slice(0, -1)));

    return [finishedStyles, inProgressStyles];
  }

  return finishedStyles;
};
