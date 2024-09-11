import { Core } from 'cytoscape';
import { loadHtmlNode } from './html-node.js';

type TTemplate = {
  [key: string]: {
    template: {
      zoomRange: number[],
      template: {
        html: string;
        cssClass: string;
      }
    }[];
    query: string;
    staticZoomLevel?: number;
    nodeStyle?: {
      base: string;
      alt: string;
    }
  }
}

export type TCreateHtmlNode = {
  createHtmlNode: (cytoscape: any, cy: Core, templates: TTemplate) => void
}
function register(cytoscape) {
  if (!cytoscape) {
    console.warn('Attempt to register cytoscape-stickynote with invalid cytoscape instance!');
    return;
  }
  cytoscape('core', 'htmlnode', loadHtmlNode);
}

// auto-register if there is global cytoscape (i.e. window.cytoscape)
if (typeof cytoscape !== 'undefined') {
  register(cytoscape);
}

export { register };
