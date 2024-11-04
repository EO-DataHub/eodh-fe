import { BasicTreeItem } from './basic-tree.item';
import { ValueControl } from '../control/value.control';
import {
  IDynamicTreeSettingGroup,
  IDynamicTreeSettingItem,
  ITreeSettingGroup,
  ITreeSettingItem,
} from '../../tree.model';
import { SimpleControl } from '../control/simple.control';
import { createItemSettingChildren } from './create-children';

export class TreeSettingItem extends BasicTreeItem<ValueControl> implements ITreeSettingItem {
  public type = 'settingItem' as const;
  public name: string;
  public children: (TreeSettingItem | TreeSettingGroup)[] = [];

  public constructor(props: IDynamicTreeSettingItem | ITreeSettingItem, parent: BasicTreeItem<ValueControl | SimpleControl>) {
    super(props.id, props, props.control, parent);

    this.name = props.name;
    this.children = createItemSettingChildren(props.children, this);
    this.control.updateValue({ value: this.control.value, children: this.children });
  }

  public update = <T extends ValueControl>(type: 'value' | 'expand') => {
    switch (type) {
      case 'value': {
        this.control.updateValue({ value: !this.control.value, children: this.children })
        break;
      }

      case 'expand': {
        this.partialUpdate({ expanded: !this.control.expanded })
        break;
      }
    }
  }

  public toObject = () => ({
    translationKey: this.translationKey,
    control: this.control?.toObject(),
    name: this.name,
  });
}

export class TreeSettingGroup extends BasicTreeItem<SimpleControl> implements ITreeSettingGroup {
  public type = 'settingGroup' as const;
  public name: string | undefined = undefined;
  public children: (TreeSettingItem | TreeSettingGroup)[] = [];

  public constructor(props: IDynamicTreeSettingGroup | ITreeSettingGroup, parent: BasicTreeItem<ValueControl | SimpleControl>) {
    super(props.id, props, props.control, parent);

    this.name = props.name;
    this.children = createItemSettingChildren(props.children, this);
  }

  public update = <T extends ValueControl>(type: 'value' | 'expand') => {
    switch (type) {
      case 'expand': {
        this.partialUpdate({ expanded: !this.control.expanded })
        break;
      }
    }
  }

  public toObject = () => ({
    translationKey: this.translationKey,
    control: this.control?.toObject(),
    name: this.name,
  });
}
