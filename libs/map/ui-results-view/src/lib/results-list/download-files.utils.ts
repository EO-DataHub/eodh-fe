import { TFeature } from '@ukri/map/data-access-stac-catalog';
import { saveAs } from 'file-saver';

type TAsset = {
  name: string;
  featureId: TFeature['id'];
} & TFeature['assets'][string];

const s3ProtocolPrefix = 's3:/';
const separator = '___';

const getFileName = (collectionId: string, fileName: string, ext: string | undefined) => {
  collectionId = collectionId ? `${collectionId}${separator}` : '';
  ext = ext ? `.${ext}` : '';

  return `${collectionId}${fileName}${ext}`;
};

const getFileNameFromAsset = (asset: TAsset, defaultFileName = 'download') => {
  const ext = asset.href.split('/').pop()?.split('.').pop();
  return getFileName(asset.featureId, asset.name || defaultFileName, ext);
};

const getAssets = (feature: TFeature): TAsset[] => {
  return Object.entries(feature.assets)
    .filter((item): item is [string, NonNullable<TFeature['assets']['string']>] => !!item[1])
    .filter(([, asset]) => asset.roles?.includes('data'))
    .filter(([, asset]) => !asset.href.startsWith(s3ProtocolPrefix))
    .filter(([, asset]) => !asset.href.endsWith('.xml'))
    .filter(([, asset]) => !asset.href.endsWith('.json'))
    .map(([key, asset]) => ({ name: key, featureId: feature.id, ...asset }));
};

const calculateSize = (assets: TAsset[], unit: 'mb' | 'gb' = 'mb', unitType: 'decimal' | 'binary' = 'decimal') => {
  const size = {
    size: 0,
    valid: true,
  };

  assets.forEach((asset: TAsset) => {
    if (asset.size === undefined) {
      size.valid = false;
    }

    size.size += asset.size || 0;
  });

  const byteToMbFactor = unitType === 'decimal' ? 1000 * 1000 : 1024 * 1024;
  const mbToGbFactor = unitType === 'decimal' ? 1000 : 1024;

  switch (unit) {
    case 'mb': {
      return {
        ...size,
        size: size.size / byteToMbFactor,
      };
    }

    case 'gb': {
      return {
        ...size,
        size: size.size / (byteToMbFactor * mbToGbFactor),
      };
    }
  }
};

const downloadAssetsInNewTab = (assets: TAsset[]) => {
  assets.forEach((asset) => {
    const a = document.createElement('a');
    a.download = getFileNameFromAsset(asset);
    a.href = asset.href;
    a.rel = 'noopener';
    a.target = '_blank';
    a.dispatchEvent(new MouseEvent('click'));
  });
};

const downloadAssets = (feature: TFeature) => {
  const assets = getAssets(feature);
  const size = calculateSize(assets);
  const oneGb = 1000;

  if (size.valid && size.size <= oneGb) {
    assets.forEach((asset) => {
      saveAs(asset.href, getFileNameFromAsset(asset));
    });
    return;
  }

  downloadAssetsInNewTab(assets);
};

const downloadMetadata = (feature: TFeature) => {
  const blob = new Blob([JSON.stringify(feature)], { type: 'text/plain;charset=utf-8' });
  const fileName = 'metadata';
  const ext = 'json';

  saveAs(blob, getFileName(feature.id, fileName, ext));
};

export const downloadFiles = (feature: TFeature) => {
  downloadMetadata(feature);
  downloadAssets(feature);
};
