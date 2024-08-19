import { TreeItem } from '@ukri/shared/design-system';

import { Sentinel1 } from './copernicus/sentinel-1.component';
import { Sentinel2 } from './copernicus/sentinel-2.component';
import { Sentinel3 } from './copernicus/sentinel-3.component';
import { Sentinel5P } from './copernicus/sentinel-5p.component';

export const PublicData = () => {
  return (
    <TreeItem title='Public' className='text-text-primary'>
      <TreeItem title='Copernicus'>
        <Sentinel1 />
        <Sentinel2 />
        <Sentinel3 />
        <Sentinel5P />
      </TreeItem>
    </TreeItem>
  );
};
