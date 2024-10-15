import { TreeItem } from '@ukri/shared/design-system';

import { useSearchView } from '../search-view.context';
import { Copernicus } from './copernicus/copernicus.component';

export const PublicData = () => {
  const { isDisabled } = useSearchView();

  return (
    <TreeItem
      title='MAP.SEARCH_VIEW.DATA_SETS.PUBLIC'
      expanded={true}
      className='text-text-primary'
      disabled={isDisabled(false, 'data-sets')}
    >
      <Copernicus />
    </TreeItem>
  );
};
