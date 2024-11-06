import { ControlledCheckbox, TreeItem } from '@ukri/shared/design-system';
import { PropsWithChildren } from 'react';

import { ITreeSettingItem } from '../tree.model';
import { Error } from './error.component';
import { getTreeIndent, IndentProvider, TIndent, useIndent, useNextIndent } from './indent.provider';
import { Title } from './title.component';

type TSettingsItemProps = PropsWithChildren<{
  item: ITreeSettingItem;
  indent?: TIndent;
}>;

export const SettingsItem = ({ item, indent: currentIndent, children }: TSettingsItemProps) => {
  const indent = useIndent(currentIndent);
  const nextIndent = useNextIndent(currentIndent);

  const handleChange = () => {};

  return (
    <>
      {/*<Error name={name} indent={indent} />*/}
      <TreeItem
        title={<Title title={item.translationKey} fontWeight='regular' disabled={item.control.disabled} />}
        slots={[
          {
            position: 'title:after',
            element: (
              <ControlledCheckbox
                name={item.name}
                value={!!item.control.value}
                disabled={item.control.disabled}
                onChange={handleChange}
              />
            ),
            key: 'checkbox',
          },
        ]}
        disabled={item.control.disabled}
        indent={getTreeIndent(indent)}
      />
      {children && <IndentProvider indent={nextIndent}>{children}</IndentProvider>}
    </>
  );
};
