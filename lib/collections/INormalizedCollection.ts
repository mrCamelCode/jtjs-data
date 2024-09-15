/**
 * A collection structure that combines the benefits of an object
 * (O(1) lookup, stable identifiers) and an array (preservation of
 * order and sorting). Also serializes to JSON nicely provided the
 * data type used for the elements is JSON-serializable.
 */
export interface INormalizedCollection<T extends { id: string }> {
  /**
   * The number of items in the collection.
   */
  readonly length: number;
  /**
   * Whether the collection is currently empty.
   */
  readonly isEmpty: boolean;
  /**
   * Adds the provided `item`. If the ID of the item matches an item
   * already in the collection, you can customize behaviour of the method
   * with the `overwriteExisting` param.
   *
   * @param item
   * @param overwriteExisting - (Optional, defaults to false) Whether
   * an existing item in the collection with the same ID should be replaced
   * with the provided `item`. If `false` and there's an existing item that matches,
   * this method does nothing.
   */
  add(item: T, overwriteExisting?: boolean): void;
  /**
   * Removes the item specified by the `id`.
   *
   * @param id
   */
  remove(id: string): void;
  /**
   * @param id
   *
   * @returns The collection item specified by `id`, or `undefined` if there was
   * no item with the provided ID.
   */
  get(id: string): T | undefined;
  /**
   * @param others - The other collections to merge into the new collection
   * after this one is merged. Collections are merged in order, and items with
   * the same IDs defined in later collections will overwrite those in earlier
   * collections.
   *
   * @example
   * ```ts
   * // Returns a new collection where
   * // the contents of `collection`, `otherCollection`, and `anotherCollection` are all present.
   * // Assuming all collections had an item with ID '123', item '123' in the new collection
   * // will be the '123' from `anotherCollection` because it was specified last in the merge
   * // chain.
   * collection.merge(otherCollection, anotherCollection);
   * ```
   */
  merge(...others: INormalizedCollection<T>[]): INormalizedCollection<T>;
  /**
   * Removes all items from the collection.
   */
  clear(): void;
  /**
   * @param id
   *
   * @returns Whether the collection includes the item with the specified ID.
   */
  includesId(id: string): boolean;
  /**
   * Determines whether an item exists in the collection. By default, items are compared
   * by identity (`item === otherItem`). If that's insufficient for your use case, use the
   * optional `comparator` param of the method to specify how equality is determined.
   *
   * Note that because this method requires traversing the list to find a match, it's
   * preferable to use `includesId` when possible.
   *
   * @param item
   * @param comparator - (Optional) A custom comparator function to be used to decide
   * if the `otherItem` is equivalent to the provided `item`.
   *
   * @returns Whether the collection includes the specified item.
   */
  includesItem(
    item: T,
    comparator?: (item: T, otherItem: T) => boolean
  ): boolean;
  /**
   * @param iteratee - The function to invoke on every item in the collection.
   *
   * @returns The result of invoking `iteratee` on every item in the collection.
   */
  map<U>(iteratee: (item: T) => U): U[];
  /**
   * @param iteratee - The function to invoke on every item in the collection.
   */
  forEach(iteratee: (item: T) => void): void;
  /**
   * @param predicate - The function invoked per-item that determines if the item is the one
   * we're looking for.
   *
   * @returns The first occurrence of an item returning `true` when given to the
   * provided `predicate`, or `undefined` if no item passed the `predicate`.
   */
  find(predicate: (item: T) => boolean): T | undefined;
  /**
   * @param predicate - The function invoked per-item to determine whether the item
   * should be included in the new collection. Items that evaluate to `true` will
   * be in the new collection.
   *
   * @returns A new collection that contains only the items from this collection that passed
   * the `predicate`.
   */
  filter(predicate: (item: T) => boolean): INormalizedCollection<T>;
  /**
   * @param json - A JSON string representing a serialized normalized collection.
   *
   * @returns A new collection instance that represents the serialized JSON, or `undefined`
   * if parsing wasn't possible.
   */
  fromJSON<U extends { id: string }>(json: string): INormalizedCollection<U> | undefined;
  /**
   * @returns The collection as an array.
   */
  toArray(): T[];
  /**
   * @returns The collection as a string. If trying to obtain the JSON-serialized version of
   * the collection, use `toJSON`.
   */
  toString(): string;
  /**
   * @returns The collection serialized as a JSON string.
   */
  toJSON(): string;
}
