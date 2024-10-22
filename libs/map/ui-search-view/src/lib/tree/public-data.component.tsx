import { TreeItem } from '@ukri/shared/design-system';

import { TSchema } from '../schema/form.schema';
import { useSearchView } from '../search-view.context';
import { AuxiliaryData } from './auxiliary-data.component';
import { Copernicus } from './copernicus/copernicus.component';

type TPublicDataProps = {
  schema: TSchema;
};

export const PublicData = ({ schema }: TPublicDataProps) => {
  const { isDisabled } = useSearchView();

  return (
    <TreeItem
      title='MAP.SEARCH_VIEW.DATA_SETS.PUBLIC'
      expanded={true}
      className='text-text-primary'
      disabled={isDisabled(false, 'data-sets')}
    >
      <Copernicus />
      {schema === 'action-creator' && <AuxiliaryData />}
    </TreeItem>
  );
};
