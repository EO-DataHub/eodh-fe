import { TTreeElementIterable } from '@ukri/map/data-access-map';

import { SettingsItem } from './setting-item/settings-item.component';
import { SettingsGroup } from './settings-group.component';
import { SliderItem } from './slider-item.component';
import { TreeCategory } from './tree-category/tree-category.component';
import { TreeItem } from './tree-item/tree-item.component';

type TTreeElementProps = {
  item: TTreeElementIterable;
  disabled?: boolean;
};

export const TreeElement = ({ item, disabled }: TTreeElementProps) => {
  switch (item.type) {
    case 'category': {
      return (
        <TreeCategory item={item.toObject()}>
          {item.children?.map((item) => (
            <TreeElement key={item.id} item={item} />
          ))}
        </TreeCategory>
      );
    }

    case 'item': {
      return (
        <TreeItem item={item.toObject()}>
          {item.children?.map((item) => (
            <TreeElement key={item.id} item={item} />
          ))}
        </TreeItem>
      );
    }

    case 'settingGroup': {
      return (
        <SettingsGroup item={item.toObject()} disabled={disabled}>
          {(disabled) => item.children?.map((item) => <TreeElement key={item.id} item={item} disabled={disabled} />)}
        </SettingsGroup>
      );
    }

    case 'settingItem': {
      return (
        <SettingsItem item={item.toObject()} disabled={disabled}>
          {(disabled) => item.children?.map((item) => <TreeElement key={item.id} item={item} disabled={disabled} />)}
        </SettingsItem>
      );
    }

    case 'slider': {
      return <SliderItem item={item.toObject()} />;
    }

    default: {
      return null;
    }
  }
};
