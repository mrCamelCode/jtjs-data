export interface IStack<T> {
  /**
   * The number of items in the stack.
   */
  readonly length: number;
  /**
   * Whether the stack is empty.
   */
  readonly isEmpty: boolean;
  /**
   * Pushes an item onto the stack, making that item the first one in the stack.
   *
   * @param item - The item to put on the stack.
   */
  push(item: T): void;
  /**
   * Pops the first item on the stack off. This mutates the stack.
   *
   * @returns The popped item, or undefined if the stack is empty.
   */
  pop(): T | undefined;
  /**
   * Shows you the first item in the stack without removing it.
   *
   * @returns The first item in the stack, or undefined if the stack is empty.
   */
  peek(): T | undefined;
  /**
   * Clears the stack entirely.
   */
  clear(): void;
  /**
   * @returns The stack as an array.
   */
  toArray(): T[];
  /**
   * @returns The stack as a human-readable string.
   */
  toString(): string;
}
