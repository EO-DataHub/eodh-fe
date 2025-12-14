import { ICategoricalLegendCategory } from '@ukri/shared/ui/legend';

export type TLegendType = 'image' | 'categorical';

export type TWaterQualityAssetName = 'cdom' | 'cya_cells' | 'doc' | 'turb' | 'ndwi' | 'data';

export type TLandCoverType = 'corine' | 'global' | 'waterbodies';

export interface IImageLegendConfig {
  readonly type: 'image';
  readonly title: string;
  readonly src: string;
  readonly alt: string;
}

export interface ICategoricalLegendConfig {
  readonly type: 'categorical';
  readonly title: string;
  readonly categories: readonly ICategoricalLegendCategory[];
}

export type TLegendConfig = IImageLegendConfig | ICategoricalLegendConfig;

export interface IWaterQualityLegendInfo {
  readonly src: string;
  readonly title: string;
  readonly alt: string;
}
