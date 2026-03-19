import { ITableElement } from '@ukri/shared/ui/help';

import { ITableRow } from './shared.types';

const T = 'APP.HELP.SHARED.ASSET.LAND_COVER';

const createTableElement = (rows: readonly ITableRow[]): ITableElement => ({
  type: 'table',
  rows: [...rows],
});

const globalCategories: readonly ITableRow[] = [
  { label: `${T}.GLOBAL.NO_DATA`, color: '#000000' },
  { label: `${T}.GLOBAL.CROPLAND_RAINFED`, color: '#ffff64' },
  { label: `${T}.GLOBAL.HERBACEOUS_COVER`, color: '#ffff64' },
  { label: `${T}.GLOBAL.TREE_OR_SHRUB_COVER`, color: '#ffff00' },
  { label: `${T}.GLOBAL.CROPLAND_IRRIGATED`, color: '#aaf0f0' },
  { label: `${T}.GLOBAL.MOSAIC_CROPLAND_NATURAL_VEGETATION`, color: '#dbf064' },
  { label: `${T}.GLOBAL.MOSAIC_NATURAL_VEGETATION_CROPLAND`, color: '#c8c864' },
  { label: `${T}.GLOBAL.TREE_COVER_BROADLEAVED_EVERGREEN`, color: '#006400' },
  { label: `${T}.GLOBAL.TREE_COVER_BROADLEAVED_DECIDUOUS_CLOSED_OPEN`, color: '#00a000' },
  { label: `${T}.GLOBAL.TREE_COVER_BROADLEAVED_DECIDUOUS_CLOSED`, color: '#00a000' },
  { label: `${T}.GLOBAL.TREE_COVER_BROADLEAVED_DECIDUOUS_OPEN`, color: '#aac800' },
  { label: `${T}.GLOBAL.TREE_COVER_NEEDLELEAVED_EVERGREEN_CLOSED_OPEN`, color: '#003c00' },
  { label: `${T}.GLOBAL.TREE_COVER_NEEDLELEAVED_EVERGREEN_CLOSED`, color: '#003c00' },
  { label: `${T}.GLOBAL.TREE_COVER_NEEDLELEAVED_EVERGREEN_OPEN`, color: '#005000' },
  { label: `${T}.GLOBAL.TREE_COVER_NEEDLELEAVED_DECIDUOUS_CLOSED_OPEN`, color: '#400500' },
  { label: `${T}.GLOBAL.TREE_COVER_NEEDLELEAVED_DECIDUOUS_CLOSED`, color: '#400500' },
  { label: `${T}.GLOBAL.TREE_COVER_NEEDLELEAVED_DECIDUOUS_OPEN`, color: '#400640' },
  { label: `${T}.GLOBAL.TREE_COVER_MIXED_LEAF_TYPE`, color: '#788200' },
  { label: `${T}.GLOBAL.MOSAIC_TREE_SHRUB_HERBACEOUS`, color: '#1400a0' },
  { label: `${T}.GLOBAL.MOSAIC_HERBACEOUS_TREE_SHRUB`, color: '#be9500' },
  { label: `${T}.GLOBAL.SHRUBLAND`, color: '#150064' },
  { label: `${T}.GLOBAL.SHRUBLAND_EVERGREEN`, color: '#784c00' },
  { label: `${T}.GLOBAL.SHRUBLAND_DECIDUOUS`, color: '#150064' },
  { label: `${T}.GLOBAL.GRASSLAND`, color: '#ffb432' },
  { label: `${T}.GLOBAL.LICHENS_AND_MOSSES`, color: '#ffdcd2' },
  { label: `${T}.GLOBAL.SPARSE_VEGETATION`, color: '#ffebaf' },
  { label: `${T}.GLOBAL.SPARSE_TREE`, color: '#ffc964' },
  { label: `${T}.GLOBAL.SPARSE_SHRUB`, color: '#ffd278' },
  { label: `${T}.GLOBAL.SPARSE_HERBACEOUS_COVER`, color: '#ffebaf' },
  { label: `${T}.GLOBAL.TREE_COVER_FLOODED_FRESH`, color: '#00785a' },
  { label: `${T}.GLOBAL.TREE_COVER_FLOODED_SALINE`, color: '#009678' },
  { label: `${T}.GLOBAL.SHRUB_HERBACEOUS_FLOODED`, color: '#00dc80' },
  { label: `${T}.GLOBAL.URBAN_AREAS`, color: '#c31300' },
  { label: `${T}.GLOBAL.BARE_AREAS`, color: '#fff5d7' },
  { label: `${T}.GLOBAL.CONSOLIDATED_BARE_AREAS`, color: '#dcdcdc' },
  { label: `${T}.GLOBAL.UNCONSOLIDATED_BARE_AREAS`, color: '#fff5d7' },
  { label: `${T}.GLOBAL.WATER_BODIES`, color: '#0046c8' },
  { label: `${T}.GLOBAL.PERMANENT_SNOW_AND_ICE`, color: '#ffffff' },
];

const waterbodiesCategories: readonly ITableRow[] = [
  { label: `${T}.WATERBODIES.WATER_BODY`, color: '#0000ff' },
  { label: `${T}.WATERBODIES.NOT_WATER_BODY`, color: '#ffffff' },
];

export const landCoverConfigs = {
  global: {
    title: `${T}.GLOBAL.TITLE`,
    element: createTableElement(globalCategories),
  },
  waterbodies: {
    title: `${T}.WATERBODIES.TITLE`,
    element: createTableElement(waterbodiesCategories),
  },
};

export type TLandCoverType = keyof typeof landCoverConfigs;
