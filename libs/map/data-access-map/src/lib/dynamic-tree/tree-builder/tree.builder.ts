import get from 'lodash/get';
import set from 'lodash/set';
import toPath from 'lodash/toPath';
import { z, ZodType } from 'zod';

import { TDataSetsValues, TDataSetsValuesPath } from '../data-sets.model';
import { TDynamicTreeModel } from '../tree-dynamic.model';
import { TreeCategoryIterable } from './tree.category';
import { TreeItemIterable } from './tree.item';
import { ITreeRoot } from './tree-builder.model';

const flattenKeys = (item: object | object[], initialPathPrefix = '') => {
  if (!item || typeof item !== 'object') {
    return [{ [initialPathPrefix]: item }];
  }

  const prefix = initialPathPrefix ? (Array.isArray(item) ? initialPathPrefix : `${initialPathPrefix}.`) : '';

  return Object.keys(item)
    .flatMap((key) => flattenKeys(item[key], Array.isArray(item) ? `${prefix}[${key}]` : `${prefix}${key}`))
    .reduce((acc, path) => ({ ...acc, ...path }));
};

// const mapToZodSchema = (item: object | ZodType) => {
//   return Object.fromEntries(
//     Object.entries(item).map(([key, value]) => {
//       if (value instanceof ZodType) {
//         return [key, value];
//       }
//
//       return [key, mapToZodSchema(value, fn)];
//     })
//   );
// };

const mapToZodSchema = (item: object | ZodType, fieldsToValidate: object | string[]) => {
  return Object.keys(item).reduce((acc, key) => {
    const value = item[key];
    const fields = Array.isArray(fieldsToValidate) ? fieldsToValidate : fieldsToValidate[key];

    if (value instanceof ZodType) {
      acc[key] = value;
    } else {
      acc[key] = z.object(mapToZodSchema(value, fields)).superRefine((schema, ctx) => {
        if (Array.isArray(fields)) {
          return;
        }

        //  || !Object.values(fields).some((item) => Array.isArray(item) && item.length)

        // Object.entries(fields).forEach(([key, field], indexParent) => {
        //   if (Array.isArray(field) && field.length > 0 && schema[key] === false) {
        //     field.forEach((path, index) => {
        //       ctx.addIssue({
        //         code: z.ZodIssueCode.custom,
        //         message: index === 0 ? 'MAP.SEARCH_VIEW.VALIDATION.ONE_OF_FIELDS_REQUIRED' : '',
        //         path: [`dataSets.${path}`.replace(`${ctx.path.join('.')}.`, '')],
        //       });
        //       // console.log('key', schema, `dataSets.${path}`.replace(`${ctx.path.join('.')}.`, ''));
        //     });
        //   }
        // });
      });
    }

    return acc;
  }, {});
};

const mapToZodSchema2 = (item: object | ZodType) => {
  return Object.keys(item).reduce((acc, key) => {
    const value = item[key];

    if (value instanceof ZodType) {
      acc[key] = value;
    } else {
      acc[key] = z.object(mapToZodSchema2(value));
    }

    return acc;
  }, {});
};

const mapToZodSchema3 = (item: object | ZodType) => {
  return Object.keys(item).reduce((acc, key) => {
    const value = item[key];

    if (value instanceof ZodType) {
      acc[key] = value;
    } else {
      if (key === 'public') {
        acc[key] = z.object(mapToZodSchema3(value)).superRefine((schema: any, ctx) => {
          if (
            !schema.copernicus.sentinel1.enabled &&
            !schema.copernicus.sentinel2.enabled &&
            !schema.copernicus.sentinel3.enabled &&
            !schema.copernicus.sentinel5P.enabled &&
            !schema.auxiliary.clmsCorinelc.enabled &&
            !schema.auxiliary.clmsWaterBodies.enabled &&
            !schema.auxiliary.esacciGloballc.enabled
          ) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: 'MAP.SEARCH_VIEW.VALIDATION.ONE_OF_FIELDS_REQUIRED',
              path: ['copernicus.sentinel1.enabled'],
            });

            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: '',
              path: ['copernicus.sentinel2.enabled'],
            });

            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: '',
              path: ['copernicus.sentinel3.enabled'],
            });

            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: '',
              path: ['copernicus.sentinel5P.enabled'],
            });

            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: '',
              path: ['auxiliary.esacciGloballc.enabled'],
            });

            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: '',
              path: ['auxiliary.clmsCorinelc.enabled'],
            });

            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: '',
              path: ['auxiliary.clmsWaterBodies.enabled'],
            });
          }
        });
      } else {
        acc[key] = z.object(mapToZodSchema3(value));
      }
    }

    return acc;
  }, {});
};

export class TreeBuilder implements ITreeRoot {
  public id = 'root';
  public type = 'root' as const;
  public items: (TreeCategoryIterable | TreeItemIterable)[] = [];

  public constructor(items: TDynamicTreeModel) {
    items.forEach((item) => {
      switch (item.type) {
        case 'category': {
          this.items.push(TreeCategoryIterable.create(item, this));
          break;
        }

        case 'item': {
          this.items.push(TreeItemIterable.create(item, this));
          break;
        }
      }
    });
  }

  public toObject = () => this.items.map((item) => item.toObject());

  public getValues = (): TDataSetsValues => {
    const values = this.items.map((item) => item.getValues()).flat();

    const result: TDataSetsValues = {} as TDataSetsValues;

    values.forEach((control) => {
      set(result, control.name, control.value);
    });

    return result;
  };

  public getValidationModel = (): ZodType => {
    const values = this.items.map((item) => item.getValidationModel()).flat();

    const result: any = {};
    const fieldValidation: { [key in TDataSetsValuesPath]?: TDataSetsValuesPath[] } = {};

    values.forEach((control) => {
      set(result, control.name, control.validation);
      fieldValidation[control.name] = control.validateFields;
      // set(fieldValidation, control.name, control.validateFields);
    });

    // console.log('fieldValidation', fieldValidation);

    const schema = z.object(mapToZodSchema2(result));
    // const schema = z.object(mapToZodSchema3(result));
    // const schema = z.object(mapToZodSchema(result, fieldValidation));
    // const schema = z.object(mapToZodSchema2(result)).superRefine((schema, ctx) => {
    //   console.log('schema---validation', schema);
    //
    //   Object.entries(fieldValidation).forEach(([key, value]) => {
    //     if (key === 'public.copernicus.enabled') {
    //       console.log('schema', schema, key, get(schema, key), value.length, value, ctx.path);
    //     }
    //
    //     if (value.length && get(schema, key) !== true) {
    //       value.forEach((path, index) => {
    //         ctx.addIssue({
    //           code: z.ZodIssueCode.custom,
    //           message: index === 0 ? 'MAP.SEARCH_VIEW.VALIDATION.ONE_OF_FIELDS_REQUIRED' : '',
    //           path: [path],
    //         });
    //         console.log('schema---addIssue', path, index === 0 ? 'MAP.SEARCH_VIEW.VALIDATION.ONE_OF_FIELDS_REQUIRED' : '');
    //       });
    //     }
    //   });
    // });

    // console.log('zod-schema', schema);

    // return z.object({
    //   dataSets: z.object({
    //     public: z.any(),
    //   }),
    // });

    return z.object({
      dataSets: schema,
    });
  };

  public validate = () => {
    return z.custom<TDataSetsValues>().superRefine((schema: z.infer<TDataSetsValues>, ctx: z.RefinementCtx) => {
      // console.log('schema', schema);

      // console.log('toPath', flattenKeys(schema));

      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'MAP.SEARCH_VIEW.VALIDATION.ONE_OF_FIELDS_REQUIRED',
        path: ['public.copernicus.sentinel1.acquisitionMode.ew'],
      });

      return true;
    });
  };
}
