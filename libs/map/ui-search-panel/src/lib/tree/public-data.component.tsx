import { TreeItem } from '@ukri/shared/design-system';

import { CategoryItem } from './components/category-item.component';
import { Sentinel1 } from './copernicus/sentinel-1.component';
import { Sentinel2 } from './copernicus/sentinel-2.component';
import { Sentinel3 } from './copernicus/sentinel-3.component';
import { Sentinel5P } from './copernicus/sentinel-5p.component';

export const PublicData = () => {
  return (
    <TreeItem title='MAP.SEARCH_PANEL.PUBLIC' className='text-text-primary'>
      <CategoryItem title='MAP.SEARCH_PANEL.COPERNICUS.NAME'>
        <Sentinel1 />
        <Sentinel2 />
        <Sentinel3 />
        <Sentinel5P />
      </CategoryItem>
    </TreeItem>
  );
};
