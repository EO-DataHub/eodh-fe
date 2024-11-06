import { createContext, PropsWithChildren, useCallback, useContext, useState } from 'react';

import { TDynamicTreeModel } from './tree.model';
import { TreeCategory, TreeItem } from './tree-builder/item/tree.item';
import { TreeSettingGroup, TreeSettingItem } from './tree-builder/item/tree-setting';
import { Tree } from './tree-builder/tree.builder';

type TTreeSettingsContext = {
  tree: Tree;
  update: (id: string, type: 'value' | 'expand') => void;
};

const TreeContext = createContext<TTreeSettingsContext>({
  tree: new Tree([]),
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  update: () => {},
});

type TTreeEl = TreeSettingItem | TreeSettingGroup | TreeItem | TreeCategory;

const findElement = (id: string, items: TTreeEl[]): TTreeEl | undefined => {
  let result: TTreeEl | undefined = undefined;

  for (let i = 0; i < items.length; i++) {
    const item = items[i];

    if (!result) {
      if (item.id === id && !result) {
        result = item;
      } else if (item.children) {
        const element = findElement(id, item.children);

        if (element) {
          result = element;
        }
      }
    }
  }

  return result;
};

type TTreeProviderProps = {
  defaultValues: TDynamicTreeModel;
};

export const TreeProvider = ({ defaultValues, children }: PropsWithChildren<TTreeProviderProps>) => {
  const [tree, setTree] = useState(new Tree(defaultValues));

  const update = useCallback(
    (id: string, type: 'value' | 'expand') => {
      const element = findElement(id, tree.items);

      console.log('element', id, element);

      if (!element) {
        return;
      }

      element.update(type);
      console.log('tree.items', tree.items, type);
      setTree(new Tree(tree.items));
    },
    [tree, setTree]
  );

  return <TreeContext.Provider value={{ tree, update }}>{children}</TreeContext.Provider>;
};

export const useTreeContext = () => {
  return useContext(TreeContext);
};
