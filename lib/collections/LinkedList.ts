import { ILinkedList } from './ILinkedList';
import { ILinkedListNode } from './ILinkedListNode';
import { LinkedListNode } from './LinkedListNode';

/**
 * Implementation of a doubly linked list.
 */
export class LinkedList<T> implements ILinkedList<T> {
  private _head: ILinkedListNode<T> | undefined;
  get head(): ILinkedListNode<T> | undefined {
    return this._head;
  }

  private _tip: ILinkedListNode<T> | undefined;
  get tip(): ILinkedListNode<T> | undefined {
    return this._tip;
  }

  get tail(): ILinkedList<T> {
    // TODO: This should be done better to avoid O(n-1).
    const tail = new LinkedList<T>();
    this.forEach((element) => {
      if (element === this.head?.value) {
        return;
      } else {
        tail.add(element);
      }
    });

    return tail;
  }

  get first(): T | undefined {
    return this._head?.value;
  }

  get last(): T | undefined {
    return this._tip?.value;
  }

  private _length: number;
  get length(): number {
    return this._length;
  }

  get isEmpty(): boolean {
    return this._length === 0;
  }

  constructor(...values: T[]) {
    this._head = undefined;
    this._tip = undefined;
    this._length = 0;

    values.forEach((val) => {
      this.add(val);
    });
  }

  add(value: T): void {
    const node = new LinkedListNode(value);

    node.previous = this._tip;
    if (this._tip) {
      this._tip.next = node;
    }

    this._tip = node;
    this._length++;

    if (this._length === 1) {
      // This is the first element added to the list.
      this._head = node;
    }
  }

  prepend(value: T): void {
    const node = new LinkedListNode(value);

    node.next = this._head;
    if (this._head) {
      this._head.previous = node;
    }

    this._head = node;
    this._length++;

    if (this._length === 1) {
      // This is the first element added to the list.
      this._tip = node;
    }
  }

  remove(value: T): void {
    let foundNode: ILinkedListNode<T> | undefined = undefined;

    for (let node = this._head; node !== undefined; node = node.next) {
      if (node.value === value) {
        foundNode = node;
        break;
      }
    }

    this.removeNode(foundNode);
  }

  removeBy(predicate: (value: T) => boolean): void {
    let foundNode: ILinkedListNode<T> | undefined = undefined;

    for (let node = this._head; node !== undefined; node = node.next) {
      if (predicate(node.value)) {
        foundNode = node;
        break;
      }
    }

    this.removeNode(foundNode);
  }

  removeFirst(): void {
    this.removeNode(this._head);
  }

  removeLast(): void {
    this.removeNode(this._tip);
  }

  filter(predicate: (nodeValue: T) => boolean): LinkedList<T> {
    const list = new LinkedList<T>();

    for (let node = this._head; node !== undefined; node = node.next) {
      if (predicate(node.value)) {
        list.add(node.value);
      }
    }

    return list;
  }

  map<T2>(iteratee: (nodeValue: T) => T2): LinkedList<T2> {
    const list = new LinkedList<T2>();

    for (let node = this._head; node !== undefined; node = node.next) {
      list.add(iteratee(node.value));
    }

    return list;
  }

  forEach(iteratee: (nodeValue: T) => void): void {
    for (let node = this._head; node !== undefined; node = node.next) {
      iteratee(node.value);
    }
  }

  includes(value: T): boolean {
    for (let node = this._head; node !== undefined; node = node.next) {
      if (node.value === value) {
        return true;
      }
    }

    return false;
  }

  some(predicate: (nodeValue: T) => boolean): boolean {
    for (let node = this._head; node !== undefined; node = node.next) {
      if (predicate(node.value)) {
        return true;
      }
    }

    return false;
  }

  find(predicate: (nodeValue: T) => boolean): T | undefined {
    for (let node = this._head; node !== undefined; node = node.next) {
      if (predicate(node.value)) {
        return node.value;
      }
    }

    return undefined;
  }

  clear(): void {
    this._head = undefined;
    this._tip = undefined;
    this._length = 0;
  }

  toArray(): T[] {
    const arr = [];

    for (let node = this._head; node !== undefined; node = node.next) {
      arr.push(node.value);
    }

    return arr;
  }

  toString(): string {
    let str = '(';
    for (let node = this._head; node !== undefined; node = node.next) {
      if (node === this._head) {
        str += `${node.value}`;
      } else {
        str += ` <-> ${node.value}`;
      }
    }

    return str + ')';
  }

  private removeNode(node: ILinkedListNode<T> | undefined) {
    if (!node) {
      return;
    }

    if (node.previous) {
      node.previous.next = node.next;
    }
    if (node.next) {
      node.next.previous = node.previous;
    }

    if (node === this._head) {
      this._head = node.next;
    }
    if (node === this._tip) {
      this._tip = node.previous;
    }

    node.previous = undefined;
    node.next = undefined;

    this._length--;
  }
}
