export interface ILinkedListNode<T> {
  value: T;
  previous: ILinkedListNode<T> | undefined;
  next: ILinkedListNode<T> | undefined;
}
