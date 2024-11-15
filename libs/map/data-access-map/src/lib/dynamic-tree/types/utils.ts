declare const $NestedValue: unique symbol;

export type TNestedValue<TValue extends object = object> = {
  [$NestedValue]: never;
} & TValue;

/*
Projects that React Hook Form installed don't include the DOM library need these interfaces to compile.
React Native applications is no DOM available. The JavaScript runtime is ES6/ES2015 only.
These definitions allow such projects to compile with only --lib ES6.

Warning: all of these interfaces are empty.
If you want type definitions for various properties, you need to add `--lib DOM` (via command line or tsconfig.json).
*/

export type TNoop = () => void;

interface IFile extends Blob {
  readonly lastModified: number;
  readonly name: string;
}

interface IFileList {
  readonly length: number;
  item(index: number): File | null;
  [index: number]: File;
}

export type TPrimitive = null | undefined | string | number | boolean | symbol | bigint;

export type TBrowserNativeObject = Date | IFileList | IFile;

export type TEmptyObject = { [K in string | number]: never };

export type TNonUndefined<T> = T extends undefined ? never : T;

export type TLiteralUnion<T extends U, U extends TPrimitive> = T | (U & { _?: never });

export type TExtractObjects<T> = T extends infer U ? (U extends object ? U : never) : never;

export type TDeepPartial<T> = T extends TBrowserNativeObject | TNestedValue
  ? T
  : {
      [K in keyof T]?: TExtractObjects<T[K]> extends never ? T[K] : TDeepPartial<T[K]>;
    };

export type TDeepPartialSkipArrayKey<T> = T extends TBrowserNativeObject | TNestedValue
  ? T
  : // eslint-disable-next-line @typescript-eslint/no-explicit-any
  T extends ReadonlyArray<any>
  ? { [K in keyof T]: TDeepPartialSkipArrayKey<T[K]> }
  : { [K in keyof T]?: TDeepPartialSkipArrayKey<T[K]> };

/**
 * Checks whether the type is any
 * See {@link https://stackoverflow.com/a/49928360/3406963}
 * @typeParam T - type which may be any
 * ```
 * IsAny<any> = true
 * IsAny<string> = false
 * ```
 */
export type TIsAny<T> = 0 extends 1 & T ? true : false;

/**
 * Checks whether the type is never
 * @typeParam T - type which may be never
 * ```
 * IsAny<never> = true
 * IsAny<string> = false
 * ```
 */
export type TIsNever<T> = [T] extends [never] ? true : false;

/**
 * Checks whether T1 can be exactly (mutually) assigned to T2
 * @typeParam T1 - type to check
 * @typeParam T2 - type to check against
 * ```
 * IsEqual<string, string> = true
 * IsEqual<'foo', 'foo'> = true
 * IsEqual<string, number> = false
 * IsEqual<string, number> = false
 * IsEqual<string, 'foo'> = false
 * IsEqual<'foo', string> = false
 * IsEqual<'foo' | 'bar', 'foo'> = boolean // 'foo' is assignable, but 'bar' is not (true | false) -> boolean
 * ```
 */
export type TIsEqual<T1, T2> = T1 extends T2
  ? (<G>() => G extends T1 ? 1 : 2) extends <G>() => G extends T2 ? 1 : 2
    ? true
    : false
  : false;

export type TDeepMap<T, TValue> = TIsAny<T> extends true
  ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
    any
  : T extends TBrowserNativeObject | TNestedValue
  ? TValue
  : T extends object
  ? { [K in keyof T]: TDeepMap<TNonUndefined<T[K]>, TValue> }
  : TValue;

export type TIsFlatObject<T extends object> = Extract<
  Exclude<T[keyof T], TNestedValue | Date | FileList>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  any[] | object
> extends never
  ? true
  : false;

export type TMerge<A, B> = {
  [K in keyof A | keyof B]?: K extends keyof A & keyof B
    ? [A[K], B[K]] extends [object, object]
      ? TMerge<A[K], B[K]>
      : A[K] | B[K]
    : K extends keyof A
    ? A[K]
    : K extends keyof B
    ? B[K]
    : never;
};
