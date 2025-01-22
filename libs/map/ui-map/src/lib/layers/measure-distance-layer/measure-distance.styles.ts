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
      // TODO to check if it is possible to get styles from tailwind
      color: 'rgba(255, 255, 255, 1)',
      width: 1,
    }),
    fill: new Fill({
      // TODO to check if it is possible to get styles from tailwind
      color: 'rgba(143, 68, 255, 1)',
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
      // TODO to check if it is possible to get styles from tailwind
      color: 'rgba(255, 255, 255, 1)',
      width: 1,
    }),
    fill: new Fill({
      // TODO to check if it is possible to get styles from tailwind
      color: 'rgba(143, 68, 255, 1)',
    }),
  }),
});
