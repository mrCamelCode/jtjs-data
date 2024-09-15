import { ILinkedListNode } from './ILinkedListNode';

export interface ILinkedList<T1> {
  /**
   * The first value in the linked list, or undefined if the list is empty.
   */
  readonly first: T1 | undefined;
  /**
   * The last value in the linked list, or undefined if the list is empty.
   */
  readonly last: T1 | undefined;
  /**
   * The first node in the linked list, undefined if the list is empty.
   */
  readonly head: ILinkedListNode<T1> | undefined;
  /**
   * The last node in the linked list, undefined if the list is empty.
   */
  readonly tip: ILinkedListNode<T1> | undefined;
  /**
   * The number of elements in the linked list.
   */
  readonly length: number;
  /**
   * Whether the linked list is empty.
   */
  readonly isEmpty: boolean;
  /**
   * The linked list with the head removed. The head of the linked list retrieved this way is equivalent to
   * `head.next`.
   */
  readonly tail: ILinkedList<T1>;
  /**
   * Adds the specified value to the front of the linked list.
   *
   * @param value - The value to add.
   */
  prepend(value: T1): void;
  /**
   * Adds the specified value to the end of the linked list.
   *
   * @param value - The value to add.
   */
  add(value: T1): void;
  /**
   * Removes the specified value from the linked list.
   *
   * @param value - The value to remove. Equality is based on strict equality.
   */
  remove(value: T1): void;
  /**
   * Removes the first element that passes the test of the passed `predicate`.
   *
   * @param predicate - The predicate to invoke on each element of the list. If the predicate returns `true`, the element
   * is removed and the iteration ceases.
   */
  removeBy(predicate: (value: T1) => boolean): void;
  /**
   * Removes the first value from the linked list.
   */
  removeFirst(): void;
  /**
   * Removes the final value from the linked list.
   */
  removeLast(): void;
  /**
   * Filters the linked list based on the prvoided predicate.
   *
   * @param predicate - The predicate to invoke on each element of the linked list.
   *
   * @returns A new linked list with the elements that passed the test of the provided predicate.
   */
  filter(predicate: (nodeValue: T1) => boolean): ILinkedList<T1>;
  /**
   * Generates a new linked list by iterating over each element and invoking the provided iteratee. The type of the
   * generated linked list depends on the type of the value returned by the iteratee.
   *
   * @param iteratee - The function to invoke on each element in the linked list. Returns a value.
   *
   * @returns A new linked list comprised of all values collectively returned from individual invocations of the
   * provided iteratee.
   */
  map<T2>(iteratee: (nodeValue: T1) => T2): ILinkedList<T2>;
  /**
   * Iterates over every element in the linked list.
   *
   * @param iteratee - The function to invoke on each element in the linked list.
   */
  forEach(iteratee: (nodeValue: T1) => void): void;
  /**
   * Searches the linked list for the specified value.
   *
   * @param value - The value to search for. Equality is based on strict equality.
   *
   * @returns Whether the specified value exists in the linked list.
   */
  includes(value: T1): boolean;
  /**
   * Goes through the elements in the linked list and tests them with the provided predicate.
   *
   * @param predicate - The predicate to invoke on each element in the linked list. Returns whether the
   * nodeValue for that iteration passed its test.
   *
   * @returns Whether any element in the array passed the test specified by the provided predicate.
   */
  some(predicate: (nodeValue: T1) => boolean): boolean;
  /**
   * Finds the element that passes the provided predicate.
   *
   * @param predicate - The predicate to invoke on each element in the linked list.
   *
   * @returns The element that passed the provided predicate, undefined if no element passed.
   */
  find(predicate: (nodeValue: T1) => boolean): T1 | undefined;
  /**
   * Clears the list, emptying it entirely.
   */
  clear(): void;
  /**
   * @returns The linked list as an array.
   */
  toArray(): T1[];
  /**
   * @returns The linked list as a human-readable string.
   */
  toString(): string;
}
