import { getCenter, getHeight, getWidth } from "ol/extent";
import { Polygon } from "ol/geom";

export const calculateCenter = (geometry: Polygon) => {
  const type = geometry.getType();
  let sqDistances;
  let center;
  let coordinates;
  let minRadius;

  if (type === 'Polygon') {
    let x = 0;
    let y = 0;
    let i = 0;
    coordinates = geometry.getCoordinates()[0].slice(1);
    coordinates.forEach((coordinate) => {
      x += coordinate[0];
      y += coordinate[1];
      i++;
    });
    center = [x / i, y / i];
  } else {
    center = getCenter(geometry.getExtent());
  }

  if (coordinates) {
    sqDistances = coordinates.map((coordinate) => {
      const dx = coordinate[0] - center[0];
      const dy = coordinate[1] - center[1];
      return dx * dx + dy * dy;
    });
    minRadius = Math.sqrt(Math.max.apply(Math, sqDistances)) / 3;
  } else {
    minRadius =
      Math.max(
        getWidth(geometry.getExtent()),
        getHeight(geometry.getExtent()),
      ) / 3;
  }
  return {
    center: center,
    coordinates: coordinates,
    minRadius: minRadius,
    sqDistances: sqDistances,
  };
}
