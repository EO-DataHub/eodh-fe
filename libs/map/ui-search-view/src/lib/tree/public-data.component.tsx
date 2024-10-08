import { TreeItem } from '@ukri/shared/design-system';

import { Copernicus } from './copernicus/copernicus.component';

export const PublicData = () => {
  return (
    <TreeItem title='MAP.SEARCH_VIEW.DATA_SETS.PUBLIC' expanded={true} className='text-text-primary'>
      <Copernicus />
    </TreeItem>
  );
};
