import isString from 'lodash/isString';

import {
  IDynamicTreeCategory,
  IDynamicTreeItem,
  IDynamicValueControl,
  ITreeCategory,
  ITreeItem,
  IValueControl,
} from '../../tree.model';
import { BasicTreeItem } from './basic-tree.item';
import { ValueControl } from '../control/value.control';
import { TreeSettingGroup, TreeSettingItem } from './tree-setting';
import { SimpleControl } from '../control/simple.control';
import { Tree } from '../tree.builder';
import { createItemChildren, createItemSettingChildren } from './create-children';

const getDefaultControlProps = (props: IDynamicTreeItem | ITreeItem): IDynamicValueControl | IValueControl => {
  if (props.id) {
    return props.control;
  }

  if (isString(props.control)) {
    return {
      expanded: false,
      disabled: false,
      visible: true,
      expendable: false,
      type: props.control,
    }
  }

  return {
    ...props.control,
    expanded: props.control?.expanded !== undefined ? props.control?.expanded : false,
    disabled: props.control?.disabled !== undefined ? props.control?.disabled : false,
    visible: true,
    expendable: false,
    type: props.control?.type ? props.control?.type : 'checkbox',
  }
}

export class TreeItem extends BasicTreeItem<ValueControl> implements ITreeItem {
  public type = 'item' as const;
  public name: string;
  public children: (TreeSettingItem | TreeSettingGroup)[] = [];

  public constructor(props: IDynamicTreeItem | ITreeItem, parent: BasicTreeItem<ValueControl | SimpleControl> | Tree) {
    super(props.id, props, getDefaultControlProps(props), parent);

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

  private getDefaultControlProps = (props: IDynamicTreeItem | ITreeItem) => {
    if (props.id) {
      return props.control;
    }

    if (isString(props.control)) {
      return {
        expanded: false,
        disabled: false,
        visible: this,
        expendable: false,
        type: props.control,
      }
    }

    return {
      ...props.control,
      expanded: props.control?.expanded !== undefined ? props.control?.expanded : false,
      disabled: props.control?.disabled !== undefined ? props.control?.disabled : false,
      visible: this,
      expendable: false,
    }
  }
}

export class TreeCategory extends BasicTreeItem implements ITreeCategory {
  public type = 'category' as const;
  public name: string;
  public children: (TreeCategory | TreeItem)[] = [];

  public constructor(props: IDynamicTreeCategory | ITreeCategory, parent: BasicTreeItem<ValueControl | SimpleControl> | Tree) {
    super(props.id, props, props.control, parent);

    this.name = props.name;
    this.children = createItemChildren(props.children, this);

    if (this.control && this.control instanceof ValueControl) {
      this.control.updateValue({ value: this.control.value, children: this.children });
    }
  }

  public update = (type: 'value' | 'expand') => {
    switch (type) {
      case 'value': {
        if (this.control instanceof ValueControl) {
          this.control.updateValue({ value: !this.control.value, children: this.children })
        }

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
