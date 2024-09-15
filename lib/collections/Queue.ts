import { ILinkedList } from './ILinkedList';
import { IQueue } from './IQueue';
import { LinkedList } from './LinkedList';

/**
 * Implementation of a queue, a FIFO (first in, first out) structure.
 */
export class Queue<T> implements IQueue<T> {
  private _queue: ILinkedList<T>;

  get length(): number {
    return this._queue.length;
  }

  get isEmpty(): boolean {
    return this._queue.isEmpty;
  }

  constructor() {
    this._queue = new LinkedList<T>();
  }

  enqueue(item: T): void {
    this._queue.add(item);
  }

  dequeue(): T | undefined {
    const item = this._queue.first ?? undefined;

    this._queue.removeFirst();

    return item;
  }

  peek(): T | undefined {
    return this._queue.first ?? undefined;
  }

  clear(): void {
    this._queue.clear();
  }

  toArray(): T[] {
    return this._queue.toArray();
  }

  toString(): string {
    let str = '[';
    let isFirstIteration = true;
    this._queue.forEach((item) => {
      str += `${isFirstIteration ? '' : ', '}${item}`;

      isFirstIteration = false;
    });

    return str + ']';
  }
}
