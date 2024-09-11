import { NodeSingular, StylesheetStyle } from 'cytoscape';
import { useMemo } from 'react';
import { getIconPath, renderSvgBackground } from './svg.utils';
import { Node } from './node';

export type TNodeSelector = 'node' | 'edge' | '.htmlNodeBaseStyle' | '.htmlNodeAltStyle';

export type TElementSelector = TNodeSelector | `node[nodeType = "SVG"]` | `node[nodeType = "NODE"]`;

type TFlowMapStylesheet = StylesheetStyle & {
  selector: TElementSelector;
  style: StylesheetStyle['style'];
};

const nodeIconPath = getIconPath(<Node />);

export const useStylesheet = (): TFlowMapStylesheet[] => {
  return useMemo(() => {
    return [
      {
        selector: 'node',
        style: {
          'text-halign': 'left',
          'text-valign': 'center',
          'font-weight': 'bold',
          // 'font-size': theme.typography.body1.fontSize,
          // 'font-family': theme.typography.fontFamily,
          'line-height': 1.6,
          padding: '50px 50px',
          events: 'no',
          'background-color': 'red',
          'border-style': 'dashed',
          'border-color': 'yellow',
          shape: 'rectangle',
        },
      },
      {
        selector: 'node[nodeType = "SVG"]',
        style: {
          events: 'no',
          // padding: '76px 32px',
          shape: 'rectangle',
          width: "152px", //width
          height: "64px", //height
          'background-color': 'white',
          'background-image': (elem: NodeSingular) => renderSvgBackground(elem, nodeIconPath, 'rectangle'),
        },
      },
      {
        selector: 'node[nodeType = "NODE"]',
        style: {
          'text-halign': 'left',
          'text-valign': 'center',
          'font-weight': 'bold',
          // 'font-size': theme.typography.body1.fontSize,
          // 'font-family': theme.typography.fontFamily,
          'line-height': 1.6,
          padding: '50px 50px',
          events: 'no',
          'background-color': 'red',
          'border-style': 'dashed',
          'border-color': 'yellow',
          shape: 'rectangle',
        },
      }

      // {
      //   selector: 'node',
      //   css: {
      //     content: ' ',
      //   },
      //   style: {
      //     content: '',
      //     'background-color': 'lightgrey',
      //     shape: 'round-rectangle',
      //   },
      // },
      // {
      //   selector: 'edge',
      //   style: {
      //     'curve-style': 'bezier',
      //     'target-arrow-shape': 'triangle',
      //   },
      // },
      // {
      //   selector: '.htmlNodeBaseStyle',
      //   style: {
      //     'background-color': 'lightgrey',
      //   },
      // },
      // {
      //   selector: '.htmlNodeAltStyle',
      //   style: {
      //     'background-color': 'darkblue',
      //   },
      // },
    ];
  }, []);
};
