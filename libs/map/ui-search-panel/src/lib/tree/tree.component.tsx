import { Tree as TreeWrapper } from '@ukri/shared/design-system';

import { PrivateData } from './private-data.component';
import { PublicData } from './public-data.component';
import { TreeSettingsProvider, TTreeSettings } from './tree.context';

type TTreeProps = { defaultSettings?: TTreeSettings };

export const Tree = ({ defaultSettings }: TTreeProps) => {
  return (
    <TreeSettingsProvider defaultSettings={defaultSettings}>
      <TreeWrapper>
        <PublicData />
        <PrivateData />
      </TreeWrapper>
    </TreeSettingsProvider>
  );
};
