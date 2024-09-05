# map-ui-map

This library was generated with [Nx](https://nx.dev).

## Running unit tests

Run `nx test map-ui-map` to execute the unit tests via [Vitest](https://vitest.dev/).

## Order of layers

To manage order of layers on the map, we use `zIndex` property.

- Main map layer (`osmLayer` created in `MapWrapper`) should always have `zIndex: 0`
- We want to keep `AOI layer` under `Footprints layer`, therefore layer created in `useAoiLayer` have `zIndex: 1`, and layer created in `useFootprintsLayer` have `zIndex: 2`.
