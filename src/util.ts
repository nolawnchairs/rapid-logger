
/**
 * Memoizer for a single value that is computed lazily.
 *
 * @export
 * @class Memoized
 * @template T
 */
export class Memoized<T> {
  private value: T | undefined
  constructor(private readonly fn: () => T) { }
  get(): T {
    if (this.value === undefined) {
      this.value = this.fn()
    }
    return this.value
  }
}
