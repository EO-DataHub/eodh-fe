import { ITableElement } from '@ukri/shared/ui/help';

import { ITableRow } from './shared.types';

const T = 'APP.HELP.SHARED.ASSET.LAND_COVER';

const createTableElement = (rows: readonly ITableRow[]): ITableElement => ({
  type: 'table',
  rows: [...rows],
});

const corineCategories: readonly ITableRow[] = [
  { label: `${T}.CORINE.CONTINUOUS_URBAN_FABRIC`, color: '#e6004d' },
  { label: `${T}.CORINE.DISCONTINUOUS_URBAN_FABRIC`, color: '#ff0000' },
  { label: `${T}.CORINE.INDUSTRIAL_OR_COMMERCIAL_UNITS`, color: '#cc4df2' },
  { label: `${T}.CORINE.ROAD_AND_RAIL_NETWORKS`, color: '#cc0000' },
  { label: `${T}.CORINE.PORT_AREAS`, color: '#e6cccc' },
  { label: `${T}.CORINE.AIRPORTS`, color: '#e6cce6' },
  { label: `${T}.CORINE.MINERAL_EXTRACTION_SITES`, color: '#600ccc' },
  { label: `${T}.CORINE.DUMP_SITES`, color: '#a64d00' },
  { label: `${T}.CORINE.CONSTRUCTION_SITES`, color: '#ff4dff' },
  { label: `${T}.CORINE.GREEN_URBAN_AREAS`, color: '#ffa6ff' },
  { label: `${T}.CORINE.SPORT_AND_LEISURE_FACILITIES`, color: '#ffe6ff' },
  { label: `${T}.CORINE.NON_IRRIGATED_ARABLE_LAND`, color: '#ffffa8' },
  { label: `${T}.CORINE.PERMANENTLY_IRRIGATED_LAND`, color: '#ffff00' },
  { label: `${T}.CORINE.RICE_FIELDS`, color: '#e6e600' },
  { label: `${T}.CORINE.VINEYARDS`, color: '#e68000' },
  { label: `${T}.CORINE.FRUIT_TREES_AND_BERRY_PLANTATIONS`, color: '#f2a64d' },
  { label: `${T}.CORINE.OLIVE_GROVES`, color: '#e6a600' },
  { label: `${T}.CORINE.PASTURES`, color: '#e6e64d' },
  { label: `${T}.CORINE.ANNUAL_CROPS_WITH_PERMANENT_CROPS`, color: '#ffe6a6' },
  { label: `${T}.CORINE.COMPLEX_CULTIVATION_PATTERNS`, color: '#ffe64d' },
  { label: `${T}.CORINE.AGRO_FORESTRY_AREAS`, color: '#f2cca6' },
  { label: `${T}.CORINE.BROAD_LEAVED_FOREST`, color: '#80ff00' },
  { label: `${T}.CORINE.CONIFEROUS_FOREST`, color: '#00a600' },
  { label: `${T}.CORINE.MIXED_FOREST`, color: '#4dff00' },
  { label: `${T}.CORINE.NATURAL_GRASSLANDS`, color: '#ccf24d' },
  { label: `${T}.CORINE.MOORS_AND_HEATHLAND`, color: '#a6ff80' },
  { label: `${T}.CORINE.SCLEROPHYLLOUS_VEGETATION`, color: '#a6e64d' },
  { label: `${T}.CORINE.TRANSITIONAL_WOODLAND_SHRUB`, color: '#a6f200' },
  { label: `${T}.CORINE.BEACHES_DUNES_SANDS`, color: '#e6e6e6' },
  { label: `${T}.CORINE.BARE_ROCKS`, color: '#cccccc' },
  { label: `${T}.CORINE.SPARSELY_VEGETATED_AREAS`, color: '#ccffcc' },
  { label: `${T}.CORINE.BURNT_AREAS`, color: '#000000' },
  { label: `${T}.CORINE.GLACIERS_AND_PERPETUAL_SNOW`, color: '#a6e6cc' },
  { label: `${T}.CORINE.INLAND_MARSHES`, color: '#a6a6ff' },
  { label: `${T}.CORINE.PEAT_BOGS`, color: '#4d4dff' },
  { label: `${T}.CORINE.SALT_MARSHES`, color: '#ccccff' },
  { label: `${T}.CORINE.SALINES`, color: '#e6e6ff' },
  { label: `${T}.CORINE.INTERTIDAL_FLATS`, color: '#a6a6e6' },
  { label: `${T}.CORINE.WATER_COURSES`, color: '#00ccf2' },
  { label: `${T}.CORINE.WATER_BODIES`, color: '#80f2e6' },
  { label: `${T}.CORINE.COASTAL_LAGOONS`, color: '#00ffa6' },
  { label: `${T}.CORINE.ESTUARIES`, color: '#a6ffe6' },
  { label: `${T}.CORINE.SEA_AND_OCEAN`, color: '#e6f2ff' },
  { label: `${T}.CORINE.NODATA`, color: '#ffffff' },
];

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
  corine: {
    title: `${T}.CORINE.TITLE`,
    element: createTableElement(corineCategories),
  },
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
