import { ILinkedListNode } from './ILinkedListNode';

export class LinkedListNode<T> implements ILinkedListNode<T> {
  constructor(
    public value: T,
    public previous: ILinkedListNode<T> | undefined = undefined,
    public next: ILinkedListNode<T> | undefined = undefined
  ) {}
}
