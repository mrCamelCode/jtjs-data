import { beforeEach, describe, expect, test } from 'vitest';
import { Queue } from '../Queue';

describe('Queue', () => {
  let queue = new Queue<number>();
  beforeEach(() => {
    queue = new Queue<number>();
  });

  describe('enqueue', () => {
    test('Can enqueue an item.', () => {
      expect(queue.length).toBe(0);

      queue.enqueue(1);

      expect(queue.length).toBe(1);
    });
  });
  describe('dequeue', () => {
    test('Dequeueing from an empty queue does not throw and returns undefined.', () => {
      expect(() => queue.dequeue()).not.toThrow();
      expect(queue.dequeue()).toBe(undefined);
    });
    test('Can dequeue an item.', () => {
      queue.enqueue(1);

      expect(queue.dequeue()).toBe(1);
      expect(queue.length).toBe(0);
      expect(queue.dequeue()).toBe(undefined);
    });
  });
  describe('peek', () => {
    test('Peeking on an empty queue does not throw and returns undefined.', () => {
      expect(() => queue.peek()).not.toThrow();
      expect(queue.peek()).toBe(undefined);
    });
    test('Can peek an item.', () => {
      queue.enqueue(1);

      expect(queue.peek()).toBe(1);
      expect(queue.length).toBe(1);
      expect(queue.peek()).toBe(1);
    });
  });
  describe('clear', () => {
    test('Can clear the queue.', () => {
      queue.enqueue(1);
      queue.enqueue(2);
      queue.enqueue(3);

      expect(queue.length).toBe(3);

      queue.clear();

      expect(queue.length).toBe(0);
      expect(queue.isEmpty).toBe(true);
      expect(queue.peek()).toBe(undefined);
    });
  });
  describe('toArray', () => {
    test('Correctly converts an empty queue.', () => {
      expect(queue.toArray()).toEqual([]);
    });
    test('Correctly converts a non-empty queue.', () => {
      queue.enqueue(1);
      queue.enqueue(2);
      queue.enqueue(3);

      expect(queue.toArray()).toEqual([1, 2, 3]);
    });
  });
  describe('toString', () => {
    test('Correctly converts an empty queue.', () => {
      expect(queue.toString()).toBe('[]');
    });
    test('Correctly converts a non-empty queue.', () => {
      queue.enqueue(1);
      queue.enqueue(2);
      queue.enqueue(3);

      expect(queue.toString()).toBe('[1, 2, 3]');
    });
  });
});
