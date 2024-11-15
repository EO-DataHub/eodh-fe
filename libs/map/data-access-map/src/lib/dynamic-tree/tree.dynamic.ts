import { privateSchema } from './schema/private.schema';
import { publicSchema } from './schema/public.schema';
import { TDynamicTreeModel } from './tree-dynamic.model';

export const treeModel: TDynamicTreeModel = [publicSchema, privateSchema];
