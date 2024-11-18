import { TDynamicTreeModel } from '../tree-dynamic.model';
import { privateSchema } from './private.schema';
import { publicActionCreatorSchema } from './public.schema';

export const treeModel: TDynamicTreeModel = [publicActionCreatorSchema, privateSchema];
