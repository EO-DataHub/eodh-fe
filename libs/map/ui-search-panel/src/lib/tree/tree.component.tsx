import { Tree as TreeWrapper } from '@ukri/shared/design-system';

import { PrivateData } from './private-data.component';
import { PublicData } from './public-data.component';

export const Tree = () => {
  return (
    <TreeWrapper>
      <PublicData />
      <PrivateData />
    </TreeWrapper>
  );
};
