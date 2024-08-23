import { Spacing } from '@ukri/shared/design-system';
import { Tree } from '@ukri/shared/design-system';
import { PropsWithChildren } from 'react';

export const SettingsTree = ({ children }: PropsWithChildren) => {
  return (
    <Tree spacing='1'>
      <Spacing spacing='0.5' />
      {children}
      <Spacing spacing='0.5' />
    </Tree>
  );
};
