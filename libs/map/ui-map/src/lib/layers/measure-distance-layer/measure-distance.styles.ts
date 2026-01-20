import { FeatureLike } from 'ol/Feature';
import { Polygon } from 'ol/geom';
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

export const measureDistanceDrawingInProgressStylesFirstEdge = new Style({
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

export const measureDistanceDrawingInProgressStyles = new Style({
  fill: new Fill({
    // TODO to check if it is possible to get styles from tailwind
    color: 'rgba(143, 68, 255, 0.2)',
  }),
  stroke: new Stroke({
    // TODO to check if it is possible to get styles from tailwind
    color: 'rgba(143, 68, 255, 0.7)',
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

export const createPolygonStyles = (feature: FeatureLike): Style[] | Style => {
  const geometry = feature.getGeometry();

  if (!geometry || geometry.getType() !== 'Polygon') {
    return measureDistanceDrawingInProgressStyles;
  }

  const coordinates = (geometry as Polygon).getCoordinates()[0];
  if (!coordinates || coordinates.length < 2) {
    return measureDistanceDrawingInProgressStylesFirstEdge;
  }

  const currentEdgeStyle = measureDistanceDrawingInProgressStyles.clone();
  currentEdgeStyle.setStroke(
    new Stroke({
      color: 'rgba(143, 68, 255, 0.5)',
      lineDash: [10, 10],
      width: 2,
    })
  );

  return currentEdgeStyle;
};
