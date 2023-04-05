// This file is a home for homeless functions & utilities :)

// https://github.com/microsoft/TypeScript/issues/31018#issuecomment-950225712
// Array.includes() as typeguard
export function belongsToArray<TValue>(value: unknown, allowedValues: ReadonlyArray<TValue>): value is TValue {
  return (allowedValues as ReadonlyArray<unknown>).includes(value)
}
