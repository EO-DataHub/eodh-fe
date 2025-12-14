import { ICategoricalLegendCategory } from '@ukri/shared/ui/legend';

export const LAND_COVER_WATERBODIES_TITLE = 'Waterbodies';

export const landCoverWaterbodiesCategories: readonly ICategoricalLegendCategory[] = [
  { label: 'Water body', color: '#0000ff' },
  { label: 'Not water body', color: '#ffffff' },
];
