import { NodeSingular } from 'cytoscape';
import { ReactElement } from 'react';
import { renderToString } from 'react-dom/server';

export type TNodeShape = 'rectangle' | 'ellipse';

/**
 * Get path data for a rounded rectangle. Allows for different radius on each corner.
 * @param  {Number} w   Width of rounded rectangle
 * @param  {Number} h   Height of rounded rectangle
 * @param  {Number} tlr Top left corner radius
 * @param  {Number} trr Top right corner radius
 * @param  {Number} brr Bottom right corner radius
 * @param  {Number} blr Bottom left corner radius
 * @return {String}     Rounded rectangle SVG path data
 */
const roundedRectData = (w: number, h: number, tlr: number, trr: number, brr: number, blr: number) => {
  return 'M 0 ' + tlr
    + ' A ' + tlr + ' ' + tlr + ' 0 0 1 ' + tlr + ' 0'
    + ' L ' + (w - trr) + ' 0'
    + ' A ' + trr + ' ' + trr + ' 0 0 1 ' + w + ' ' + trr
    + ' L ' + w + ' ' + (h - brr)
    + ' A ' + brr + ' ' + brr + ' 0 0 1 ' + (w - brr) + ' ' + h
    + ' L ' + blr + ' ' + h
    + ' A ' + blr + ' ' + blr + ' 0 0 1 0 ' + (h - blr)
    + ' Z';
};

const calculateRectangleBgPosition = (elem: NodeSingular) => {
  const borderSize = 2;
  const iconTranslateX = 16;
  const iconTranslateY = elem.height() / 2 - borderSize;

  return { iconTranslateX, iconTranslateY };
};

const calculateEllipsisBgPosition = (elem: NodeSingular) => {
  const borderSize = 2;
  const iconSize = 20;
  const iconTranslateX = (elem.outerWidth() - iconSize) / 2 - borderSize;
  const iconTranslateY = elem.outerHeight() / 4 - borderSize;

  return { iconTranslateX, iconTranslateY };
};

export const getIconPath = (element: ReactElement): string[] => {
  const iconString = renderToString(element);
  const parser = new DOMParser();
  const svgDoc = parser.parseFromString(iconString, 'image/svg+xml');
  return Array.from(svgDoc.querySelectorAll('path')).map((el) => el.getAttribute('d') as string);
};

export const renderSvgBackground = (
  elem: NodeSingular,
  iconPaths: string[],
  shape: TNodeShape,
  linkIcon?: string[]
): string => {
  const { iconTranslateX, iconTranslateY } =
    shape === 'ellipse' ? calculateEllipsisBgPosition(elem) : calculateRectangleBgPosition(elem);

  const fill = elem.style('color');

  let paths = iconPaths
    .map(
      (iconPath) =>
        `<path fill="${fill}" d="${iconPath}" transform="translate(${iconTranslateX}, ${iconTranslateY}) "></path>`
    )
    .join('');

  if (linkIcon && elem.data('nodeType') === 'ATTACHMENT') {
    paths += linkIcon
      .map(
        (iconPath) =>
          `<path fill="#039BE5" d="${iconPath}" transform="translate(${iconTranslateX}, ${
            elem.height() - 12
          })" ></path>`
      )
      .join('');
  }

  const width = 152;
  const height = 64;
  const headerHeight = 16;

  const svg = `
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none" xmlns="http://www.w3.org/2000/svg">
  <svg width="${width}" height="${headerHeight}" viewBox="0 0 ${width} ${headerHeight}" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M0 4.08C0 4.00572 0 3.96858 0.00049347 3.93717C0.0344248 1.77721 1.77721 0.0344248 3.93717 0.00049347C3.96858 0 4.00572 0 4.08 0H147.92C147.994 0 148.031 0 148.063 0.00049347C150.223 0.0344248 151.966 1.77721 152 3.93717C152 3.96858 152 4.00572 152 4.08V16H0V4.08Z" fill="#A3A3A3"/>
<!--    <path d="${roundedRectData(width, headerHeight, 5, 5, 0, 0)}" stroke="black" stroke-width="1" fill="blue" />-->
    <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="red" font-size="4">Function</text>
  </svg>
</svg>
`;
  return 'data:image/svg+xml;base64,' + btoa(svg);
};
