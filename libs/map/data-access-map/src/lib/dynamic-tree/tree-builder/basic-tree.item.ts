import { nanoid } from 'nanoid';

import { IDynamicBaseItem } from '../tree-dynamic.model';
import {
  IBaseItem,
  ITreeRoot,
  TBaseItemExtensionProperties,
  TControlValue,
  TItemType,
  TOption,
  TValidationModel,
} from './tree-builder.model';

export abstract class BasicTreeItem<
  M extends IDynamicBaseItem,
  P extends IDynamicBaseItem,
  T extends ITreeRoot | null = null
> implements IBaseItem<M, P, T>
{
  public id: string;
  public model: M;
  public parent: T extends null ? IBaseItem<P> : IBaseItem<P> | T;
  public abstract type: TItemType;

  public constructor(
    id: string | undefined,
    props: IDynamicBaseItem | M,
    parent: T extends null ? IBaseItem<P> : IBaseItem<P> | T
  ) {
    this.id = id ? id : nanoid();
    this.model = {
      ...props,
      translationKey: props.translationKey,
    } as M;
    this.parent = parent;
  }

  public abstract toObject: (options?: TOption) => Omit<IBaseItem<M, P, T>, TBaseItemExtensionProperties>;

  public abstract getValues: (withChildren?: boolean) => TControlValue[];

  public abstract getValidationModel: () => TValidationModel[];
}
