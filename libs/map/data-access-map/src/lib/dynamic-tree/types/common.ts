import { TIsAny, TIsNever } from './utils';

/**
 * Type alias to `string` which describes a lodash-like path through an object.
 * E.g. `'foo.bar.0.baz'`
 */
export type TPathString = string;

/**
 * Type which can be traversed through with a {@link PathString}.
 * I.e. objects, arrays, and tuples
 */
export type TTraversable = object;

/**
 * Type to query whether an array type T is a tuple type.
 * @typeParam T - type which may be an array or tuple
 * @example
 * ```
 * IsTuple<[number]> = true
 * IsTuple<number[]> = false
 * ```
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TIsTuple<T extends ReadonlyArray<any>> = number extends T['length'] ? false : true;

/**
 * Type which can be used to index an array or tuple type.
 */
export type TArrayKey = number;

/**
 * Type which can be used to index an object.
 */
export type TKey = string;

/**
 * Type to assert that a type is a {@link Key}.
 * @typeParam T - type which may be a {@link Key}
 */
export type TAsKey<T> = Extract<T, TKey>;

/**
 * Type to convert a type to a {@link Key}.
 * @typeParam T - type which may be converted to a {@link Key}
 */
export type TToKey<T> = T extends TArrayKey ? `${T}` : TAsKey<T>;

/**
 * Type which describes a path through an object
 * as a list of individual {@link Key}s.
 */
export type TPathTuple = TKey[];

/**
 * Type to assert that a type is a {@link PathTuple}.
 * @typeParam T - type which may be a {@link PathTuple}
 */
export type TAsPathTuple<T> = Extract<T, TPathTuple>;

/**
 * Type to intersect a union type.
 * See https://fettblog.eu/typescript-union-to-intersection/
 * @typeParam U - union
 * @example
 * ```
 * UnionToIntersection<{ foo: string } | { bar: number }>
 *   = { foo: string; bar: number }
 * ```
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TUnionToIntersection<U> = (U extends any ? (_: U) => any : never) extends (_: infer I) => any ? I : never;

/**
 * Type which appends a {@link Key} to the {@link PathTuple} only if it is not
 * blank, i.e. not the empty string.
 * @typeParam PT - path
 * @typeParam K  - key
 * @example
 * ```
 * AppendNonBlankKey<['foo'], 'bar'> = ['foo', 'bar']
 * AppendNonBlankKey<['foo'], ''> = ['foo']
 * ```
 */
type TAppendNonBlankKey<PT extends TPathTuple, K extends TKey> = K extends '' ? PT : [...PT, K];

/**
 * Type to implement {@link SplitPathString} tail recursively.
 * @typeParam PS - remaining {@link PathString} which should be split into its
 *                 individual {@link Key}s
 * @typeParam PT - accumulator of the {@link Key}s which have been split from
 *                 the original {@link PathString} already
 */
type TSplitPathStringImpl<PS extends TPathString, PT extends TPathTuple> = PS extends `${infer K}.${infer R}`
  ? TSplitPathStringImpl<R, TAppendNonBlankKey<PT, K>>
  : TAppendNonBlankKey<PT, PS>;

/**
 * Type to split a {@link PathString} into a {@link PathTuple}.
 * The individual {@link Key}s may be empty strings.
 * @typeParam PS  - {@link PathString} which should be split into its
 *                  individual {@link Key}s
 * @example
 * ```
 * SplitPathString<'foo'> = ['foo']
 * SplitPathString<'foo.bar.0.baz'> = ['foo', 'bar', '0', 'baz']
 * SplitPathString<'.'> = []
 * ```
 */
export type TSplitPathString<PS extends TPathString> = TSplitPathStringImpl<PS, []>;

/**
 * Type to implement {@link JoinPathTuple} tail-recursively.
 * @typeParam PT - remaining {@link Key}s which needs to be joined
 * @typeParam PS - accumulator of the already joined {@link Key}s
 */
type TJoinPathTupleImpl<PT extends TPathTuple, PS extends TPathString> = PT extends [infer K, ...infer R]
  ? TJoinPathTupleImpl<TAsPathTuple<R>, `${PS}.${TAsKey<K>}`>
  : PS;

/**
 * Type to join a {@link PathTuple} to a {@link PathString}.
 * @typeParam PT - {@link PathTuple} which should be joined.
 * @example
 * ```
 * JoinPathTuple<['foo']> = 'foo'
 * JoinPathTuple<['foo', 'bar', '0', 'baz']> = 'foo.bar.0.baz'
 * JoinPathTuple<[]> = never
 * ```
 */
export type TJoinPathTuple<PT extends TPathTuple> = PT extends [infer K, ...infer R]
  ? TJoinPathTupleImpl<TAsPathTuple<R>, TAsKey<K>>
  : never;

/**
 * Type which converts all keys of an object to {@link Key}s.
 * @typeParam T - object type
 * @example
 * ```
 * MapKeys<{0: string}> = {'0': string}
 * ```
 */
type TMapKeys<T> = { [K in keyof T as TToKey<K>]: T[K] };

/**
 * Type to access a type by a key.
 *  - Returns undefined if it can't be indexed by that key.
 *  - Returns null if the type is null.
 *  - Returns undefined if the type is not traversable.
 * @typeParam T - type which is indexed by the key
 * @typeParam K - key into the type
 * ```
 * TryAccess<{foo: string}, 'foo'> = string
 * TryAccess<{foo: string}, 'bar'> = undefined
 * TryAccess<null, 'foo'> = null
 * TryAccess<string, 'foo'> = undefined
 * ```
 */
type TTryAccess<T, K> = K extends keyof T ? T[K] : T extends null ? null : undefined;

/**
 * Type to access an array type by a key.
 * Returns undefined if the key is non-numeric.
 * @typeParam T - type which is indexed by the key
 * @typeParam K - key into the type
 * ```
 * TryAccessArray<string[], '0'> = string
 * TryAccessArray<string[], 'foo'> = undefined
 * ```
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type TTryAccessArray<T extends ReadonlyArray<any>, K extends TKey> = K extends `${TArrayKey}`
  ? T[number]
  : TTryAccess<T, K>;

/**
 * Type to evaluate the type which the given key points to.
 * @typeParam T - type which is indexed by the key
 * @typeParam K - key into the type
 * @example
 * ```
 * EvaluateKey<{foo: string}, 'foo'> = string
 * EvaluateKey<[number, string], '1'> = string
 * EvaluateKey<string[], '1'> = string
 * ```
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TEvaluateKey<T, K extends TKey> = T extends ReadonlyArray<any>
  ? TIsTuple<T> extends true
    ? TTryAccess<T, K>
    : TTryAccessArray<T, K>
  : TTryAccess<TMapKeys<T>, K>;

/**
 * Type to evaluate the type which the given path points to.
 * @typeParam T  - deeply nested type which is indexed by the path
 * @typeParam PT - path into the deeply nested type
 * @example
 * ```
 * EvaluatePath<{foo: {bar: string}}, ['foo', 'bar']> = string
 * EvaluatePath<[number, string], ['1']> = string
 * EvaluatePath<number, []> = number
 * EvaluatePath<number, ['foo']> = undefined
 * ```
 */
export type TEvaluatePath<T, PT extends TPathTuple> = PT extends [infer K, ...infer R]
  ? TEvaluatePath<TEvaluateKey<T, TAsKey<K>>, TAsPathTuple<R>>
  : T;

/**
 * Type which given a tuple type returns its own keys, i.e. only its indices.
 * @typeParam T - tuple type
 * @example
 * ```
 * TupleKeys<[number, string]> = '0' | '1'
 * ```
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TTupleKeys<T extends ReadonlyArray<any>> = Exclude<keyof T, keyof any[]>;

/**
 * Type which extracts all numeric keys from an object.
 * @typeParam T - type
 * @example
 * ```
 * NumericObjectKeys<{0: string, '1': string, foo: string}> = '0' | '1'
 * ```
 */
type TNumericObjectKeys<T extends TTraversable> = TToKey<Extract<keyof T, TArrayKey | `${TArrayKey}`>>;

/**
 * Type which extracts all numeric keys from an object, tuple, or array.
 * If a union is passed, it evaluates to the overlapping numeric keys.
 * @typeParam T - type
 * @example
 * ```
 * NumericKeys<{0: string, '1': string, foo: string}> = '0' | '1'
 * NumericKeys<number[]> = `${number}`
 * NumericKeys<[string, number]> = '0' | '1'
 * NumericKeys<{0: string, '1': string} | [number] | number[]> = '0'
 * ```
 */
export type TNumericKeys<T extends TTraversable> = TUnionToIntersection<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  T extends ReadonlyArray<any>
    ? TIsTuple<T> extends true
      ? [TTupleKeys<T>]
      : [TToKey<TArrayKey>]
    : [TNumericObjectKeys<T>]
>[never];

/**
 * Type which extracts all keys from an object.
 * If a union is passed, it evaluates to the overlapping keys.
 * @typeParam T - object type
 * @example
 * ```
 * ObjectKeys<{foo: string, bar: string}> = 'foo' | 'bar'
 * ObjectKeys<{foo: string, bar: number} | { foo: string }> = 'foo'
 * ```
 */
export type TObjectKeys<T extends TTraversable> = Exclude<TToKey<keyof T>, `${string}.${string}` | ''>;

/**
 * Type to check whether a type's property matches the constraint type
 * and return its key. Converts the key to a {@link Key}.
 * @typeParam T - type whose property should be checked
 * @typeParam K - key of the property
 * @typeParam U - constraint type
 * @example
 * ```
 * CheckKeyConstraint<{foo: string}, 'foo', string> = 'foo'
 * CheckKeyConstraint<{foo: string}, 'foo', number> = never
 * CheckKeyConstraint<string[], number, string> = `${number}`
 * ```
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TCheckKeyConstraint<T, K extends TKey, U> = K extends any
  ? TEvaluateKey<T, K> extends U
    ? K
    : never
  : never;

/**
 * Type which evaluates to true when the type is an array or tuple or is a union
 * which contains an array or tuple.
 * @typeParam T - type
 * @example
 * ```
 * ContainsIndexable<{foo: string}> = false
 * ContainsIndexable<{foo: string} | number[]> = true
 * ```
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TContainsIndexable<T> = TIsNever<Extract<T, ReadonlyArray<any>>> extends true ? false : true;

/**
 * Type to implement {@link Keys} for non-nullable values.
 * @typeParam T - non-nullable type whose property should be checked
 */
type TKeysImpl<T> = [T] extends [TTraversable]
  ? TContainsIndexable<T> extends true
    ? TNumericKeys<T>
    : TObjectKeys<T>
  : never;

/**
 * Type to find all properties of a type that match the constraint type
 * and return their keys.
 * If a union is passed, it evaluates to the overlapping keys.
 * @typeParam T - type whose property should be checked
 * @typeParam U - constraint type
 * @example
 * ```
 * Keys<{foo: string, bar: string}, string> = 'foo' | 'bar'
 * Keys<{foo?: string, bar?: string}> = 'foo' | 'bar'
 * Keys<{foo: string, bar: number}, string> = 'foo'
 * Keys<[string, number], string> = '0'
 * Keys<string[], string> = `${number}`
 * Keys<{0: string, '1': string} | [number] | number[]> = '0'
 * ```
 */
export type TKeys<T, U = unknown> = TIsAny<T> extends true
  ? TKey
  : TIsNever<T> extends true
  ? TKey
  : TIsNever<NonNullable<T>> extends true
  ? never
  : TCheckKeyConstraint<T, TKeysImpl<NonNullable<T>>, U>;

/**
 * Type to check whether a {@link Key} is present in a type.
 * If a union of {@link Key}s is passed, all {@link Key}s have to be present
 * in the type.
 * @typeParam T - type which is introspected
 * @typeParam K - key
 * @example
 * ```
 * HasKey<{foo: string}, 'foo'> = true
 * HasKey<{foo: string}, 'bar'> = false
 * HasKey<{foo: string}, 'foo' | 'bar'> = false
 * ```
 */
export type THasKey<T, K extends TKey> = TIsNever<Exclude<K, TKeys<T>>>;

/**
 * Type to implement {@link ValidPathPrefix} tail recursively.
 * @typeParam T   - type which the path should be checked against
 * @typeParam PT  - path which should exist within the given type
 * @typeParam VPT - accumulates the prefix of {@link Key}s which have been
 *                  confirmed to exist already
 */
type TValidPathPrefixImpl<T, PT extends TPathTuple, VPT extends TPathTuple> = PT extends [infer K, ...infer R]
  ? THasKey<T, TAsKey<K>> extends true
    ? TValidPathPrefixImpl<TEvaluateKey<T, TAsKey<K>>, TAsPathTuple<R>, TAsPathTuple<[...VPT, K]>>
    : VPT
  : VPT;

/**
 * Type to find the longest path prefix which is still valid,
 * i.e. exists within the given type.
 * @typeParam T  - type which the path should be checked against
 * @typeParam PT - path which should exist within the given type
 * @example
 * ```
 * ValidPathPrefix<{foo: {bar: string}}, ['foo', 'bar']> = ['foo', 'bar']
 * ValidPathPrefix<{foo: {bar: string}}, ['foo', 'ba']> = ['foo']
 * ```
 */
export type TValidPathPrefix<T, PT extends TPathTuple> = TValidPathPrefixImpl<T, PT, []>;

/**
 * Type to check whether a path through a type exists.
 * @typeParam T  - type which the path should be checked against
 * @typeParam PT - path which should exist within the given type
 * @example
 * ```
 * HasPath<{foo: {bar: string}}, ['foo', 'bar']> = true
 * HasPath<{foo: {bar: string}}, ['foo', 'ba']> = false
 * ```
 */
export type THasPath<T, PT extends TPathTuple> = TValidPathPrefix<T, PT> extends PT ? true : false;
