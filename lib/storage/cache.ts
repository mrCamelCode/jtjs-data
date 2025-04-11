export interface CacheEntry<T> {
  value: T;
  /**
   * The point in time in MS that the cache entry expires
   * and should be considered invalid.
   */
  expiryMs: number;
}

export interface CacheOptions {
  /**
   * How long entries to this cache should live before being considered
   * invalid.
   *
   * If a value is provided for the lifetime when calling `set`, that
   * lifetime takes precedence over this one.
   */
  entryLifetimeMs?: number;
}

/**
 * Facilitates caching generic data. Generic arguments allow setting
 * the type of the value stored in cache entries as well as the expected
 * names (defaults to any `string`) for cache entries.
 *
 * Entries are added to the cache via `set`. Entries can later be retrieved
 * from the cache by calling `get` with the name originally provided to `set`.
 *
 * Once an entry expires, attempts to `get` it will report a miss and the
 * expired entry will be removed from the cache.
 *
 * **Note:** If an `entryLifetimeMs` is not configured on the cache instance
 * during construction, you must set a lifetime on every call to `set`. If
 * you exclude a lifetime both at construction and when calling `set`, your
 * entries will expire immediately.
 */
export class Cache<TCacheValue, TCacheEntryName extends string = string> {
  #cache: Record<string, CacheEntry<TCacheValue>> = {};
  #options: CacheOptions;

  constructor(options: CacheOptions = {}) {
    this.#options = options;
  }

  get hasUnexpiredEntries(): boolean {
    return Object.values(this.#cache).some(this.#isEntryValid);
  }

  /**
   * Whether the cache has **no unexpired entries**. Note that if the cache
   * technically has entries but they're all expired, this will still
   * be `true`.
   */
  get isEmpty(): boolean {
    return !this.hasUnexpiredEntries;
  }

  /**
   * @param name - The name the cache entry was registered under.
   *
   * @returns The value that was last cached under the specified `name`, or
   * `undefined` if the entry is absent or expired.
   */
  get(name: TCacheEntryName): TCacheValue | undefined {
    const entry = this.#cache[name];

    if (entry) {
      if (this.#isEntryValid(entry)) {
        return entry.value;
      } else {
        delete this.#cache[name];
      }
    }

    return undefined;
  }

  /**
   * Sets the specified cache entry to the `value`. After `lifetimeMs`,
   * the entry will be invalid and attempts to `get` it will result in
   * a miss. Setting an entry that already exists will overwrite
   * the existing entry and update its lifetime.
   *
   * @param name - The name of the value to cache. This is the name the value
   * will be associated with in the cache. To retrieve this value from the cache later,
   * you provide `get` with this name. If there's an entry with this name already
   * in the cache, it's overwritten.
   * @param value - The value to associate with `name`.
   * @param lifetimeMs - The number of MS from now that the cache entry should live
   * before being considered invalid. If not provided, the `entryLifetimeMs` option
   * provided to the cache on construction will be used. If that wasn't provided, the
   * entry won't have a lifetime and will be considered immediately expired.
   */
  set(name: TCacheEntryName, value: TCacheValue, lifetimeMs: number = this.#options.entryLifetimeMs ?? 0): void {
    this.#cache[name] = {
      value,
      expiryMs: Date.now() + (lifetimeMs >= 0 ? lifetimeMs : 0),
    };
  }

  /**
   * Removes the specified entry from the cache.
   *
   * If an entry with the name doesn't exist, this is a no-op.
   *
   * @param name - The name of the entry to remove.
   */
  remove(name: TCacheEntryName): void {
    delete this.#cache[name];
  }

  /**
   * Removes all expired entries from the cache.
   *
   * Keep in mind that expired entries are automatically cleaned up as they're
   * requested via `get`. You should only be calling this if your use case satisfies all of
   * the following:
   *
   * 1. The cache itself has a long lifetime, high volume, and/or high memory usage.
   * 1. Invoking `get` on the potentially expired entries is infrequent.
   * 1. You want to free the memory being used by expired entries.
   */
  purge(): void {
    this.#cache = Object.fromEntries(
      Object.entries(this.#cache).filter(([, entry]) => {
        return this.#isEntryValid(entry);
      })
    );
  }

  /**
   * Removes all entries from the cache, including unexpired ones that are still valid.
   */
  wipe(): void {
    this.#cache = {};
  }

  /**
   * @returns The cache as an array of unexpired entries.
   *
   * @example
   * ```ts
   * const cache = new Cache<number>();
   *
   * const cacheEntries = cache.toArray();
   *
   * cacheEntries.forEach(([entryName, entryValue]) => console.log(`${entryName}: ${entryValue}`));
   * ```
   */
  toArray(): [TCacheEntryName, TCacheValue][] {
    return Object.entries(this.#cache)
      .filter(([, entryValue]) => this.#isEntryValid(entryValue))
      .map(([key, value]) => [key as TCacheEntryName, value.value]);
  }

  #isEntryValid(entry: CacheEntry<TCacheValue>): boolean {
    return entry.expiryMs >= Date.now();
  }
}
