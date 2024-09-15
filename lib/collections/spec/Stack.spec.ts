import { beforeEach, describe, expect, test } from 'vitest';
import { Stack } from '../Stack';

describe('Stack', () => {
  let stack = new Stack<number>();
  beforeEach(() => {
    stack = new Stack<number>();
  });

  describe('push', () => {
    test('You can push an item onto the stack.', () => {
      expect(stack.length).toBe(0);

      stack.push(1);

      expect(stack.length).toBe(1);
    });
  });
  describe('pop', () => {
    test('Popping from an empty stack does not throw and returns undefined.', () => {
      expect(() => stack.pop()).not.toThrow();
      expect(stack.pop()).toBe(undefined);
    });
    test('You can pop an item from the stack.', () => {
      stack.push(1);

      expect(stack.pop()).toBe(1);
      expect(stack.length).toBe(0);
      expect(stack.pop()).toBe(undefined);
    });
  });
  describe('peek', () => {
    test('Peeking an empty stack does not throw and returns undefined.', () => {
      expect(() => stack.peek()).not.toThrow();
      expect(stack.peek()).toBe(undefined);
    });
    test('You can peek the first item on the stack.', () => {
      stack.push(1);

      expect(stack.peek()).toBe(1);
      expect(stack.length).toBe(1);
      expect(stack.peek()).toBe(1);
    });
  });
  describe('toArray', () => {
    test('An empty stack is correctly converted.', () => {
      expect(stack.toArray()).toEqual([]);
    });
    test('A non-empty stack is correctly converted.', () => {
      stack.push(1);
      stack.push(2);
      stack.push(3);

      expect(stack.toArray()).toEqual([3, 2, 1]);
    });
  });
  describe('toString', () => {
    test('An empty stack is correctly converted.', () => {
      expect(stack.toString()).toBe('[]');
    });
    test('A non-empty stack is correctly converted.', () => {
      stack.push(1);
      stack.push(2);
      stack.push(3);

      expect(stack.toString()).toBe('[3, 2, 1]');
    });
  });
});
