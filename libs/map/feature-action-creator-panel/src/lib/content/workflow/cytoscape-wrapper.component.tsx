import cytoscape, { Core } from 'cytoscape';
import { useContext, useEffect, useMemo, useRef } from 'react';
import CytoscapeComponent from 'react-cytoscapejs';

import { createDagreLayout } from './cytoscape.config';
import { CytoscapeContext } from './context.context';
import { useStylesheet } from './cytoscape.stylesheet';
import { TCreateHtmlNode } from './html-node/register';

const componentId = 'CytoscapeComponent';

const elements = [
  {
    data: {
      id: 'a',
      label: 'a',
      nodeType: 'SVG'
    }
  },
  {
    data: {
      id: 'b',
      label: 'b',
      nodeType: 'SVG'
    }
  },
  {
    data: {
      id: 'c',
      label: 'c',
      nodeType: 'NODE'
    }
  },
  {
    data: {
      id: 'd',
      label: 'd',
      nodeType: 'NODE'
    }
  },
  {
    data: {
      id: 'e',
      label: 'e',
      nodeType: 'NODE'
    }
  },
  {
    data: {
      id: 'f',
      label: 'f',
      nodeType: 'NODE'
    }
  },
  {
    data: {
      id: 'g',
      label: 'g',
      nodeType: 'NODE'
    }
  },
  {
    data: { id: 'ab', source: 'a', target: 'b' }
  },
  {
    data: { id: 'bc', source: 'b', target: 'c' }
  },
  {
    data: { id: 'cd', source: 'c', target: 'd' }
  },
  {
    data: { id: 'de', source: 'd', target: 'e' }
  },
  {
    data: { id: 'df', source: 'd', target: 'f' }
  },
  {
    data: { id: 'eg', source: 'e', target: 'g' }
  },
  {
    data: { id: 'fg', source: 'f', target: 'g' }
  },

  // {
  //   group: 'nodes',
  //   data: {
  //     type: 'person',
  //     longName: 'Roger Kint',
  //     shortName: 'Kint',
  //     // image: picArray[Math.floor(Math.random() * picArray.length)],
  //   },
  // },
  // {
  //   group: 'nodes',
  //   data: {
  //     type: 'event',
  //     longName: 'event event',
  //     shortName: 'event',
  //     // image: picArray[Math.floor(Math.random() * picArray.length)],
  //   },
  // },
  // {
  //   group: 'nodes',
  //   data: {
  //     type: 'identifier',
  //     identifierTitle: 'Bank Info',
  //     icon: 'credit_card',
  //     shortSum: 'Details',
  //     longSum: 'this is some test info to use',
  //   },
  // },
];

export const CytoscapeWrapper = () => {
  const { cy, setCy } = useContext(CytoscapeContext);
  const layoutDagre = useMemo(() => createDagreLayout(elements), []);
  const stylesheet = useStylesheet();

  // useEffect(() => {
  //   if (cy) {
  //     // const { onNodeTap, onNodeMouseOut, onNodeMouseOver } = events;
  //     // cy.on('tap', 'node', onNodeTap);
  //     // cy.on('mouseover', 'node', onNodeMouseOver);
  //     // cy.on('mouseout', 'node', onNodeMouseOut);
  //     cy.on('layoutready', () => {
  //       // cy.zoom(diagramCache?.zoom);
  //       // cy.pan(diagramCache?.pan);
  //     });
  //   }
  //
  //   return () => {
  //     if (cy) {
  //       cy.off('tap', 'node');
  //       cy.off('mouseover', 'node');
  //       cy.off('mouseout', 'node');
  //       cy.off('layoutready');
  //       cy.nodes().off('data');
  //     }
  //   };
  // }, [cy]);

  const initCy = (cy: Core) => {
    setCy(cy);
  };

  // useEffect(() => {
  //   const reloadGraph = () => {
  //     cy?.elements().remove();
  //     // cy?.add(elements);
  //     cy?.layout(layoutDagre).run();
  //   };
  //
  //   reloadGraph();
  // }, [cy, layoutDagre]);

  useEffect(() => {
    if (!cy || !(cy as any).htmlnode) {
      return;
    }

    return;

    const htmlnode: TCreateHtmlNode = (cy as any).htmlnode();

    htmlnode.createHtmlNode(cytoscape, cy, {
      person: {
        query: "[type = 'person']",
        nodeStyle: {
          base: 'htmlNodeBaseStyle',
          alt: 'htmlNodeAltStyle',
        },
        staticZoomLevel: 0.3,
        template: [
          {
            zoomRange: [0.001, 100],

            template: {
              html: `<div id="htmlLabel:#{data.id}" class="">
                        <div class=" largeFont">#{data.longName}</div>
                        <img src="#{data.image}" loading="lazy">
                        </div>`,
              cssClass: 'htmlPerson',
            },
          },
        ],
      },

      event: {
        query: "[type = 'event']",
        nodeStyle: {
          base: 'htmlNodeBaseStyle',
          alt: 'htmlNodeAltStyle',
        },
        template: [
          {
            zoomRange: [0.3, 1],
            template: {
              html: `<div id="htmlLabel:#{data.id}">
                        <div class="main-container">
                        <div class="left-container"><i style="color:darkred;"class="material-icons font">event</i></div>
                        <div class="right-container">
                        <div class="half-containers largeFont"><b>#{data.eventTitle}</b></div>
                        </div>
                        </div>
                        </div>`,
              cssClass: 'htmlEvent',
            },
          },
          {
            zoomRange: [1, 3],
            template: {
              html: `<div id="htmlLabel:#{data.id}">
                        <div class="main-container">
                        <div class="left-container"><i style="color:darkred;"class="material-icons font">event</i></div>
                        <div class="right-container eventTitle">
                        <div class="half-containers"><b>#{data.eventTitle}</b></div>
                        <div class="half-containers">#{data.shortSum}</div>
                        </div>
                        </div>
                        </div>`,
              cssClass: 'htmlEvent',
            },
          },
          {
            zoomRange: [3, 100],
            template: {
              html: `<div id="htmlLabel:#{data.id}">
                        <div class="main-container">
                        <div class="left-container"><i style="color:darkred;"class="material-icons font">event</i></div>
                        <div class="right-container smallFont eventTitle">
                        <div class="half-containers"><b>#{data.eventTitle}</b></div>
                        <div class="half-containers">#{data.longSum}</div>
                        </div>
                        </div>
                        </div>`,
              cssClass: 'htmlEvent',
            },
          },
        ],
      },

      identifier: {
        query: "[type = 'identifier']",
        nodeStyle: {
          base: 'htmlNodeBaseStyle',
          alt: 'htmlNodeAltStyle',
        },
        staticZoomLevel: 0.7,
        template: [
          {
            zoomRange: [0.3, 1],
            template: {
              html: `<div id="htmlLabel:#{data.id}" >
                        <div class="largeFont">#{data.identifierTitle}</div>
                        <i style="color:darkgreen;"class="material-icons font">#{data.icon}</i>
                        </div>`,
              cssClass: 'htmlidentifier',
            },
          },
          {
            zoomRange: [1, 3],
            template: {
              html: `<div id="htmlLabel:#{data.id}" >
                        <div>#{data.identifierTitle}</div>
                        <i style="color:darkgreen;" class="material-icons font">#{data.icon}</i>
                        <div>#{data.shortSum}</div>
                        </div>`,
              cssClass: 'htmlidentifier',
            },
          },
          {
            zoomRange: [3, 100],
            template: {
              html: `<div id="htmlLabel:#{data.id}" >
                        <div>
                        <i style="color:darkgreen;" class="material-icons iconHeight smallFont">#{data.icon}</i>
                        <span class="smallFont cardField">#{data.identifierTitle}</span>
                        </div>

                        <div class="smallFont">#{data.longSum}</div>
                        </div>`,
              cssClass: 'htmlidentifier',
            },
          },
        ],
      },
    });
  }, [cy]);

  return (
    <>
      <CytoscapeComponent
        id={componentId}
        className='w-full h-full bg-transparent'
        zoom={1}
        maxZoom={3}
        minZoom={0.3}
        cy={initCy}
        stylesheet={stylesheet}
        elements={elements}
        layout={layoutDagre}
      />
    </>
  );
};
