import { TDynamicTreeElement } from '../tree-dynamic.model';
import { SettingsGroup } from './settings-group.component';
import { SettingsItem } from './settings-item.component';
import { SliderItem } from './slider-item.component';
import { TreeCategory } from './tree-category.component';
import { TreeItem } from './tree-item.component';

type TTreeElementProps = {
  item: TDynamicTreeElement;
};

export const TreeElement = ({ item }: TTreeElementProps) => {
  switch (item.type) {
    case 'category': {
      return (
        <TreeCategory item={item}>
          {item.children?.map((item) => (
            <TreeElement key={item.id} item={item} />
          ))}
        </TreeCategory>
      );
    }

    case 'item': {
      return (
        <TreeItem item={item}>
          {item.children?.map((item) => (
            <TreeElement key={item.id} item={item} />
          ))}
        </TreeItem>
      );
    }

    case 'settingGroup': {
      return (
        <SettingsGroup item={item}>
          {item.children?.map((item) => (
            <TreeElement key={item.id} item={item} />
          ))}
        </SettingsGroup>
      );
    }

    case 'settingItem': {
      return (
        <SettingsItem item={item}>
          {item.children?.map((item) => (
            <TreeElement key={item.id} item={item} />
          ))}
        </SettingsItem>
      );
    }

    case 'slider': {
      return <SliderItem item={item} />;
    }

    default: {
      return null;
    }
  }
};
