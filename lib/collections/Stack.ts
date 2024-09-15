import { IStack } from './IStack';

/**
 * Implementation of a stack, a FILO (first in, last out) data structure.
 */
export class Stack<T> implements IStack<T> {
  private _stack: T[];

  get length(): number {
    return this._stack.length;
  }

  get isEmpty(): boolean {
    return this._stack.length === 0;
  }

  constructor() {
    this._stack = [];
  }

  push(item: T): void {
    this._stack.push(item);
  }

  pop(): T | undefined {
    return this._stack.pop() ?? undefined;
  }

  peek(): T | undefined {
    return this._stack[this._stack.length - 1] ?? undefined;
  }

  clear(): void {
    this._stack = [];
  }

  toArray(): T[] {
    const arr = [];

    for (let i = this._stack.length - 1; i >= 0; i--) {
      arr.push(this._stack[i]);
    }

    return arr;
  }

  toString(): string {
    let str = '[';
    for (let i = this._stack.length - 1; i >= 0; i--) {
      str += `${this._stack[i]}${i !== 0 ? ', ' : ''}`;
    }

    return str + ']';
  }
}
