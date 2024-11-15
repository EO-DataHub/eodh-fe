import { TArrayKey, TIsTuple, TTupleKeys } from './common';
import { TFieldValues } from './fields';
import { TBrowserNativeObject, TIsAny, TIsEqual, TPrimitive } from './utils';

/**
 * Helper function to break apart T1 and check if any are equal to T2
 *
 * See {@link TIsEqual}
 */
type TAnyTIsEqual<T1, T2> = T1 extends T2 ? (TIsEqual<T1, T2> extends true ? true : never) : never;

/**
 * Helper type for recursively constructing paths through a type.
 * This actually constructs the strings and recurses into nested
 * object types.
 *
 * See {@link Path}
 */
type TPathImpl<K extends string | number, V, TraversedTypes> = V extends TPrimitive | TBrowserNativeObject
  ? `${K}`
  : // Check so that we don't recurse into the same type
  // by ensuring that the types are mutually assignable
  // mutually required to avoid false positives of subtypes
  true extends TAnyTIsEqual<TraversedTypes, V>
  ? `${K}`
  : `${K}` | `${K}.${TPathInternal<V, TraversedTypes | V>}`;

/**
 * Helper type for recursively constructing paths through a type.
 * This obscures the internal type param TraversedTypes from exported contract.
 *
 * See {@link Path}
 */
type TPathInternal<T, TraversedTypes = T> = T extends ReadonlyArray<infer V>
  ? TIsTuple<T> extends true
    ? {
        [K in TTupleKeys<T>]-?: TPathImpl<K & string, T[K], TraversedTypes>;
      }[TTupleKeys<T>]
    : TPathImpl<TArrayKey, V, TraversedTypes>
  : {
      [K in keyof T]-?: TPathImpl<K & string, T[K], TraversedTypes>;
    }[keyof T];

/**
 * Type which eagerly collects all paths through a type
 * @typeParam T - type which should be introspected
 * @example
 * ```
 * Path<{foo: {bar: string}}> = 'foo' | 'foo.bar'
 * ```
 */
// We want to explode the union type and process each individually
// so assignable types don't leak onto the stack from the base.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TPath<T> = T extends any ? TPathInternal<T> : never;

/**
 * See {@link Path}
 */
export type TFieldPath<FieldValues extends TFieldValues> = TPath<FieldValues>;

/**
 * Helper type for recursively constructing paths through a type.
 * This actually constructs the strings and recurses into nested
 * object types.
 *
 * See {@link ArrayPath}
 */
type TArrayPathImpl<K extends string | number, V, TraversedTypes> = V extends TPrimitive | TBrowserNativeObject
  ? TIsAny<V> extends true
    ? string
    : never
  : V extends ReadonlyArray<infer U>
  ? U extends TPrimitive | TBrowserNativeObject
    ? TIsAny<V> extends true
      ? string
      : never
    : // Check so that we don't recurse into the same type
    // by ensuring that the types are mutually assignable
    // mutually required to avoid false positives of subtypes
    true extends TAnyTIsEqual<TraversedTypes, V>
    ? never
    : `${K}` | `${K}.${TArrayPathInternal<V, TraversedTypes | V>}`
  : true extends TAnyTIsEqual<TraversedTypes, V>
  ? never
  : `${K}.${TArrayPathInternal<V, TraversedTypes | V>}`;

/**
 * Helper type for recursively constructing paths through a type.
 * This obscures the internal type param TraversedTypes from exported contract.
 *
 * See {@link ArrayPath}
 */
type TArrayPathInternal<T, TraversedTypes = T> = T extends ReadonlyArray<infer V>
  ? TIsTuple<T> extends true
    ? {
        [K in TTupleKeys<T>]-?: TArrayPathImpl<K & string, T[K], TraversedTypes>;
      }[TTupleKeys<T>]
    : TArrayPathImpl<TArrayKey, V, TraversedTypes>
  : {
      [K in keyof T]-?: TArrayPathImpl<K & string, T[K], TraversedTypes>;
    }[keyof T];

/**
 * Type which eagerly collects all paths through a type which point to an array
 * type.
 * @typeParam T - type which should be introspected.
 * @example
 * ```
 * Path<{foo: {bar: string[], baz: number[]}}> = 'foo.bar' | 'foo.baz'
 * ```
 */
// We want to explode the union type and process each individually
// so assignable types don't leak onto the stack from the base.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TArrayPath<T> = T extends any ? TArrayPathInternal<T> : never;

/**
 * See {@link ArrayPath}
 */
export type TFieldArrayPath<FieldValues extends TFieldValues> = TArrayPath<FieldValues>;

/**
 * Type to evaluate the type which the given path points to.
 * @typeParam T - deeply nested type which is indexed by the path
 * @typeParam P - path into the deeply nested type
 * @example
 * ```
 * PathValue<{foo: {bar: string}}, 'foo.bar'> = string
 * PathValue<[number, string], '1'> = string
 * ```
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TPathValue<T, P extends TPath<T> | TArrayPath<T>> = T extends any
  ? P extends `${infer K}.${infer R}`
    ? K extends keyof T
      ? R extends TPath<T[K]>
        ? TPathValue<T[K], R>
        : never
      : K extends `${TArrayKey}`
      ? T extends ReadonlyArray<infer V>
        ? TPathValue<V, R & TPath<V>>
        : never
      : never
    : P extends keyof T
    ? T[P]
    : P extends `${TArrayKey}`
    ? T extends ReadonlyArray<infer V>
      ? V
      : never
    : never
  : never;

/**
 * See {@link PathValue}
 */
export type TFieldPathValue<FieldValues extends TFieldValues, FieldPath extends TFieldPath<FieldValues>> = TPathValue<
  FieldValues,
  FieldPath
>;

/**
 * See {@link PathValue}
 */
export type TFieldArrayPathValue<
  FieldValues extends TFieldValues,
  FieldArrayPath extends TFieldArrayPath<FieldValues>
> = TPathValue<FieldValues, FieldArrayPath>;

/**
 * Type to evaluate the type which the given paths point to.
 * @typeParam TTFieldValues - field values which are indexed by the paths
 * @typeParam TPath        - paths into the deeply nested field values
 * @example
 * ```
 * FieldPathValues<{foo: {bar: string}}, ['foo', 'foo.bar']>
 *   = [{bar: string}, string]
 * ```
 */
export type TFieldPathValues<
  FieldValues extends TFieldValues,
  Path extends TFieldPath<FieldValues>[] | readonly TFieldPath<FieldValues>[]
> = {} & {
  [K in keyof Path]: TFieldPathValue<FieldValues, Path[K] & TFieldPath<FieldValues>>;
};

/**
 * Type which eagerly collects all paths through a fieldType that matches a give type
 * @typeParam TTFieldValues - field values which are indexed by the paths
 * @typeParam TValue       - the value you want to match into each type
 * @example
 * ```typescript
 * FieldPathByValue<{foo: {bar: number}, baz: number, bar: string}, number>
 *   = 'foo.bar' | 'baz'
 * ```
 */
export type TFieldPathByValue<FieldValues extends TFieldValues, Value> = {
  [Key in TFieldPath<FieldValues>]: TFieldPathValue<FieldValues, Key> extends Value ? Key : never;
}[TFieldPath<FieldValues>];
