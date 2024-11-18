import { TTreeElementIterable } from '@ukri/map/data-access-map';

import { SettingsItem } from './setting-item/settings-item.component';
import { SettingsGroup } from './settings-group.component';
import { SliderItem } from './slider-item.component';
import { TreeCategory } from './tree-category/tree-category.component';
import { TreeItem } from './tree-item/tree-item.component';

export interface IOption {
  disabled?: boolean;
  expendable?: boolean;
}

type TTreeElementProps = {
  item: TTreeElementIterable;
  options?: IOption;
  disabled?: boolean;
};

export const TreeElement = ({ item, disabled, options }: TTreeElementProps) => {
  switch (item.type) {
    case 'category': {
      const itemModel = item.toObject(options);

      return (
        <TreeCategory item={itemModel} disabled={disabled}>
          {(disabled) =>
            item.children?.map((item) => (
              <TreeElement key={item.id} item={item} options={itemModel.model.options} disabled={disabled} />
            ))
          }
        </TreeCategory>
      );
    }

    case 'item': {
      const itemModel = item.toObject(options);
      return (
        <TreeItem item={itemModel} disabled={disabled}>
          {(disabled) =>
            item.children?.map((item) => (
              <TreeElement key={item.id} item={item} options={itemModel.model.options} disabled={disabled} />
            ))
          }
        </TreeItem>
      );
    }

    case 'settingGroup': {
      const itemModel = item.toObject(options);
      return (
        <SettingsGroup item={itemModel} disabled={disabled}>
          {(disabled) =>
            item.children?.map((item) => (
              <TreeElement key={item.id} item={item} disabled={disabled} options={itemModel.model.options} />
            ))
          }
        </SettingsGroup>
      );
    }

    case 'settingItem': {
      const itemModel = item.toObject(options);
      return (
        <SettingsItem item={itemModel} disabled={disabled}>
          {(disabled) =>
            item.children?.map((item) => (
              <TreeElement key={item.id} item={item} disabled={disabled} options={itemModel.model.options} />
            ))
          }
        </SettingsItem>
      );
    }

    case 'slider': {
      const itemModel = item.toObject(options);
      return <SliderItem item={itemModel} disabled={disabled} />;
    }

    default: {
      return null;
    }
  }
};
