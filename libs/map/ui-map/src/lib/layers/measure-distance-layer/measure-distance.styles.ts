import { FeatureLike } from 'ol/Feature';
import { LineString } from 'ol/geom';
import { Fill, Stroke, Style } from 'ol/style';
import CircleStyle from 'ol/style/Circle';

export const measureDistanceDrawingFinishedStyles = new Style({
  fill: new Fill({
    // TODO to check if it is possible to get styles from tailwind
    color: 'rgba(143, 68, 255, 0.2)',
  }),
  stroke: new Stroke({
    // TODO to check if it is possible to get styles from tailwind
    color: 'rgba(143, 68, 255, 0.5)',
    width: 1.5,
  }),
  image: new CircleStyle({
    radius: 6,
    stroke: new Stroke({
      color: getComputedStyle(document.documentElement).getPropertyValue('--colors-bright'),
      width: 1,
    }),
    fill: new Fill({
      color: getComputedStyle(document.documentElement).getPropertyValue('--colors-text-visited'),
    }),
  }),
});

export const measureDistanceDrawingInProgressStyles = new Style({
  fill: new Fill({
    // TODO to check if it is possible to get styles from tailwind
    color: 'rgba(143, 68, 255, 0.2)',
  }),
  stroke: new Stroke({
    // TODO to check if it is possible to get styles from tailwind
    color: 'rgba(143, 68, 255, 0.7)',
    lineDash: [10, 10],
    width: 2,
  }),
  image: new CircleStyle({
    radius: 6,
    stroke: new Stroke({
      color: getComputedStyle(document.documentElement).getPropertyValue('--colors-bright'),
      width: 1,
    }),
    fill: new Fill({
      color: getComputedStyle(document.documentElement).getPropertyValue('--colors-text-visited'),
    }),
  }),
});

export const createLineStyles = (feature: FeatureLike): Style[] | Style => {
  const geometry = feature.getGeometry();

  if (!geometry || geometry.getType() !== 'LineString') {
    return measureDistanceDrawingInProgressStyles;
  }

  const coordinates = (geometry as LineString).getCoordinates();
  if (!coordinates) {
    return measureDistanceDrawingInProgressStyles;
  }

  const finishedStyles = measureDistanceDrawingInProgressStyles.clone();
  finishedStyles.setGeometry(new LineString(coordinates.slice(-2)));

  if (coordinates.length > 2) {
    const inProgressStyles = measureDistanceDrawingFinishedStyles.clone();
    inProgressStyles.setGeometry(new LineString(coordinates.slice(0, -1)));

    return [finishedStyles, inProgressStyles];
  }

  return finishedStyles;
};
