import { TDynamicTreeModel } from '../tree-dynamic.model';
import { privateActionCreatorSchema, privateSearchSchema } from './private.schema';
import { publicActionCreatorSchema, publicSearchSchema } from './public.schema';

export const searchSchema: TDynamicTreeModel = [publicSearchSchema, privateSearchSchema];

export const actionCreatorSchema: TDynamicTreeModel = [publicActionCreatorSchema, privateActionCreatorSchema];
