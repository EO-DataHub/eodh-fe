import cytoscape, { NodeSingular, Position } from 'cytoscape';
import { register as htmlnode } from 'cytoscape-html-node';
import klay from 'cytoscape-klay';

cytoscape.use(klay);
// cytoscape.use(htmlnode);

export const createDagreLayout = (elements: any[]) => ({
  name: 'klay',
  padding: 20,
  nodeDimensionsIncludeLabels: true,
  klay: {
    direction: 'DOWN',
    spacing: 60,
    aspectRatio: 3,
    edgeRouting: 'SPLINES',
    layoutHierarchy: elements.length <= 100,
  },
  // transform: function (node: NodeSingular, pos: Position): Position {
  //   const initialElement = elements.find((el) => el.data.id === node.id()) as TGraphAsset;
  //   if (initialElement && initialElement.position) {
  //     return initialElement.position;
  //   }
  //   return pos;
  // },
});
