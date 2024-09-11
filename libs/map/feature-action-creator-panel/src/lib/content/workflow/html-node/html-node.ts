import nodeHtmlLabel from 'cytoscape-node-html-label';

export function loadHtmlNode() {
  // Sets starting html for labels based on cytoscape zoom level
  function intializeCardHtml(cy, templates, query, staticZoomLevel) {
    let cyZoom = cy.zoom();
    for (let i = 0; i < templates.length; i++) {
      if (cyZoom >= templates[i].zoomRange[0] && cyZoom < templates[i].zoomRange[1]) {
        templates.htmlSet = true;
        setCardData(cy, templates[i].template, query, staticZoomLevel);
        return templates[i].zoomRange;
      }
    }
  }

  // Replaces string targets with cytoscape node data
  function getCardHtml(data, cardData) {
    let htmlString = cardData.html;
    let dataProp;

    let final = htmlString.replaceAll(/#{.*?}/g, (target) => {
      // '#{data.prop}' => 'prop'
      dataProp = target.substring('#{data.'.length, target.length - 1);
      return data[dataProp];
    });
    return final;
  }

  // Updates html label for node
  function updateCardData(cy, cardData, query) {
    cy.nodes(query).forEach(function (ele) {
      if (ele.data('htmlNode')) {
        ele.data('htmlNode').innerHTML = getCardHtml(ele.data(), cardData);
      }
    });
  }

  // Call to nodeHtmlLabel, displays html
  function setCardData(cy, cardData, query, staticZoomLevel) {
    cy.nodeHtmlLabel([
      {
        query: query, // cytoscape query selector
        halign: 'center', // title vertical position. Can be 'left',''center, 'right'
        valign: 'center', // title vertical position. Can be 'top',''center, 'bottom'
        halignBox: 'center', // title vertical position. Can be 'left',''center, 'right'
        valignBox: 'center', // title relative box vertical position. Can be 'top',''center, 'bottom'
        cssClass: cardData.cssClass, // any classes will be as attribute of <div> container for every title
        staticZoomLevel: staticZoomLevel,
        tpl(data) {
          return getCardHtml(data, cardData);
        },
      },
    ]);
  }

  // Removes html labels for corresponding cytoscape query
  function removeHtmlLabels(cy, query) {
    let cyNodes = cy.elements(query);
    let length = cyNodes.length;

    for (let i = 0; i < length; i++) {
      try {
        if (cyNodes[i].data('htmlNode') != undefined) {
          cyNodes[i].data('htmlNode').parentElement.style.visibility = 'hidden';
          return;
        }
      } catch {
        console.warn('cytoscape.js-html-node: unable to hide html');
      }
    }
  }

  // Removes html labels for corresponding cytoscape query
  function showHtmlLabels(cy, query) {
    let cyNodes = cy.elements(query);
    let length = cyNodes.length;

    for (let i = 0; i < length; i++) {
      try {
        if (cyNodes[i].data('htmlNode') != undefined) {
          cyNodes[i].data('htmlNode').parentElement.style.visibility = 'visible';
          return;
        }
      } catch {
        console.warn('cytoscape.js-html-node: unable to show html');
      }
    }
  }

  // Set html labels based on templates, sets cytoscape zoom to change html based on cytoscape zoom level
  function setTemplate(cy, templates, query, nodeStyle, staticZoomLevel) {
    let curZoomRange = intializeCardHtml(cy, templates, query, staticZoomLevel);
    let minZoom = templates[0].zoomRange[0];
    let htmlRemoved = false;
    let altColorSet = false;
    let i;

    cy.on('add', query, function (evt) {
      // Using set timeout with time = 0 allows html to finish rendering
      setTimeout(function () {
        let curretnIndex = i;

        if (altColorSet && nodeStyle != undefined) {
          cy.batch(() => {
            evt.target.addClass(nodeStyle.alt);
          });

          removeHtmlLabels(cy, `node#${evt.target.id()}`);
        } else if (nodeStyle != undefined) {
          cy.batch(() => {
            evt.target.addClass(nodeStyle.base);
          });

          if (templates[curretnIndex] != undefined) {
            updateCardData(cy, templates[curretnIndex].template, `node#${evt.target.id()}`);
          }
        }
      }, 0);
    });

    cy.on('zoom', function (evt) {
      let zoom = cy.zoom();

      if (zoom < minZoom && !htmlRemoved) {
        removeHtmlLabels(cy, query);

        htmlRemoved = true;
        curZoomRange = [0, templates[0].zoomRange[0]];

        if (nodeStyle != undefined) {
          cy.batch(() => {
            cy.$(query).addClass(nodeStyle.alt);
            cy.$(query).removeClass(nodeStyle.base);
          });
        }
        altColorSet = true;

        // Zoom level is new range, update html for node
      } else if (zoom < curZoomRange[0] || zoom > curZoomRange[1]) {
        for (i = 0; i < templates.length; i++) {
          if (zoom > templates[i].zoomRange[0] && zoom < templates[i].zoomRange[1]) {
            updateCardData(cy, templates[i].template, query);

            curZoomRange = templates[i].zoomRange;

            if (altColorSet) {
              if (nodeStyle != undefined) {
                cy.batch(() => {
                  cy.$(query).removeClass(nodeStyle.alt);
                  cy.$(query).addClass(nodeStyle.base);
                });
              }

              altColorSet = false;

              showHtmlLabels(cy, query);

              if (templates.htmlSet != true) {
                intializeCardHtml(cy, templates, query, staticZoomLevel);
                templates.htmlSet = true;
              }
            }
            htmlRemoved = false;
            break;
          }
        }
      }
    });
    cy.emit('zoom');
  }

  function createHtmlNode(cytoscape, cy, templates) {
    try {
      if (!cy.__proto__.nodeHtmlLabel) {
        nodeHtmlLabel(cytoscape);
      }

      for (let key in templates) {
        setTemplate(
          cy,
          templates[key].template,
          templates[key].query,
          templates[key].nodeStyle,
          templates[key].staticZoomLevel
        );
      }
    } catch (error) {
      console.warn('cytoscape.js-html-node: ', error);
    }
  }
  return {
    createHtmlNode: createHtmlNode,
  };
}
