import { TreeItem as UiTreeItem } from '@ukri/shared/design-system';
import { PropsWithChildren, useEffect } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { SettingsTree } from '../../../tree/components/settings-tree.component';
import { ITreeItem } from '../../tree-builder/tree-builder.model';
import { Title } from '../title.component';
import { useControl } from './use-control.hook';
import { useSlots } from './use-slots.hook';

type TTreeItemProps = {
  item: ITreeItem;
};

export const TreeItem = ({ item, children }: PropsWithChildren<TTreeItemProps>) => {
  const { setValue } = useFormContext();
  const { showSettingsControlName, valueControlName, disabled } = useControl(item);
  const showSettings = useWatch({ name: showSettingsControlName });
  const enabled = useWatch({ name: valueControlName });
  const slots = useSlots(item, !!children);

  useEffect(() => {
    const options = { shouldDirty: true, shouldValidate: true, shouldTouch: true };
    if (!enabled && showSettingsControlName) {
      setValue(showSettingsControlName, false, options);
    }
  }, [enabled, showSettings, showSettingsControlName, setValue]);

  return (
    <UiTreeItem
      className='text-text-primary'
      title={<Title title={item.model.translationKey} fontWeight='regular' disabled={disabled} />}
      slots={slots}
      expandable={false}
      disabled={disabled}
    >
      {showSettings && <SettingsTree>{children}</SettingsTree>}
    </UiTreeItem>
  );
};
