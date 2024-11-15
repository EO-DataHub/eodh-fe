import { nanoid } from 'nanoid';

import { IDynamicBaseItem, TControl } from '../tree-dynamic.model';
import { IBaseItem, ITreeRoot, TControlValue, TItemType } from './tree-builder.model';

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

  public abstract toObject: () => Omit<IBaseItem<M, P, T>, 'parent' | 'getValues' | 'toObject'>;

  public abstract getValues: () => TControlValue[];
}
