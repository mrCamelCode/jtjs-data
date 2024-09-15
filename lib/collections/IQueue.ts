export interface IQueue<T> {
  /**
   * The number of items in the queue.
   */
  readonly length: number;
  /**
   * Whether the queue is empty.
   */
  readonly isEmpty: boolean;
  /**
   * Adds the specified item to the end of the queue.
   *
   * @param item - The item to add to the queue.
   */
  enqueue(item: T): void;
  /**
   * Removes the first item in the queue.
   *
   * @returns The removed item, or undefined if the queue was empty.
   */
  dequeue(): T | undefined;
  /**
   * @returns The first item in the queue, or undefined if the queue is empty.
   */
  peek(): T | undefined;
  /**
   * Clears the queue entirely.
   */
  clear(): void;
  /**
   * @returns The queue as an array.
   */
  toArray(): T[];
  /**
   * @returns The queue as a human-readable string.
   */
  toString(): string;
}
