import { TAsset, TFeature } from '@ukri/map/data-access-stac-catalog';
import { saveAs } from 'file-saver';
import isString from 'lodash/isString';

type TDownloadableAsset = {
  name: string;
  featureId: TFeature['id'];
} & TAsset;

const s3ProtocolPrefix = 's3:/';
const separator = '___';

const getFileName = (collectionId: string, fileName: string, ext: string | undefined) => {
  collectionId = collectionId ? `${collectionId}${separator}` : '';
  ext = ext ? `.${ext}` : '';

  return `${collectionId}${fileName}${ext}`;
};

const getFileNameFromAsset = (asset: TDownloadableAsset, defaultFileName = 'download') => {
  const ext = asset.href.split('/').pop()?.split('.').pop();
  return getFileName(asset.featureId, asset.name || defaultFileName, ext);
};

const getAssets = (feature: TFeature): TDownloadableAsset[] => {
  return Object.entries(feature.assets)
    .filter((item): item is [string, NonNullable<TAsset>] => !!item[1])
    .filter(([, asset]) => asset.roles?.includes('data'))
    .filter(([, asset]) => !asset.href.startsWith(s3ProtocolPrefix))
    .filter(([, asset]) => !asset.href.endsWith('.xml'))
    .filter(([, asset]) => !asset.href.endsWith('.json'))
    .map(([key, asset]) => ({ name: key, featureId: feature.id, ...asset }));
};

const calculateSize = (
  assets: TDownloadableAsset[],
  unit: 'mb' | 'gb' = 'mb',
  unitType: 'decimal' | 'binary' = 'decimal'
) => {
  const size = {
    size: 0,
    valid: true,
  };

  assets.forEach((asset: TDownloadableAsset) => {
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

const downloadFile = (file: string | Blob, fileName: string) => {
  const a: HTMLAnchorElement = document.createElementNS('http://www.w3.org/1999/xhtml', 'a') as HTMLAnchorElement;
  a.download = fileName;
  a.href = isString(file) ? file : URL.createObjectURL(file);
  a.rel = 'noopener';
  a.target = '_blank';

  if (!isString(file)) {
    setTimeout(() => URL.revokeObjectURL(a.href), 40000);
  }

  try {
    a.dispatchEvent(new MouseEvent('click'));
  } catch (e) {
    const evt = document.createEvent('MouseEvents');
    evt.initMouseEvent('click', true, true, window, 0, 0, 0, 80, 20, false, false, false, false, 0, null);
    a.dispatchEvent(evt);
  }
};

const downloadAssetsInNewTab = (assets: TDownloadableAsset[]) => {
  assets.forEach((asset) => {
    downloadFile(asset.href, getFileNameFromAsset(asset));
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

  downloadFile(blob, getFileName(feature.id, fileName, ext));
};

export const downloadFiles = (feature: TFeature) => {
  downloadMetadata(feature);
  downloadAssets(feature);
};
