import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { LinkedList } from '../LinkedList';

describe('LinkedList', () => {
  let linkedList = new LinkedList<number>();
  beforeEach(() => {
    linkedList = new LinkedList();
  });
  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('constructor', () => {
    test('The values are in the list and in the correct order', () => {
      linkedList = new LinkedList(1, 2, 3, 4, 5);

      const one = linkedList.head;
      const two = one!.next;
      const three = two!.next;
      const four = three!.next;
      const five = four!.next;

      expect(one!.value).toBe(1);
      expect(two!.value).toBe(2);
      expect(three!.value).toBe(3);
      expect(four!.value).toBe(4);
      expect(five!.value).toBe(5);
    });
  });
  describe('prepend', () => {
    test('Can add to an empty list.', () => {
      linkedList.prepend(10);

      expect(linkedList.head!.value === linkedList.first).toBe(true);
      expect(linkedList.first).toBe(10);
      expect(linkedList.head!.next).toBe(undefined);
      expect(linkedList.head!.previous).toBe(undefined);
      expect(linkedList.length).toBe(1);
    });
    test('The element is correctly inserted to the front of the list when adding to a non-empty list.', () => {
      linkedList = new LinkedList(1, 2, 3);

      expect(linkedList.first).toBe(1);

      linkedList.prepend(5);

      expect(linkedList.head!.value === linkedList.first).toBe(true);
      expect(linkedList.first).toBe(5);
      expect(linkedList.head!.next!.value).toBe(1);
      expect(linkedList.head!.previous).toBe(undefined);
      expect(linkedList.length).toBe(4);
    });
  });
  describe('add', () => {
    test('Can add to an empty list.', () => {
      linkedList.add(1);

      expect(linkedList.head!.value === linkedList.first && linkedList.last === linkedList.first).toBe(true);
      expect(linkedList.last).toBe(1);
      expect(linkedList.tip!.next).toBe(undefined);
      expect(linkedList.tip!.previous).toBe(undefined);
      expect(linkedList.length).toBe(1);
    });
    test('The element is correctly put at the end of a non-empty list.', () => {
      linkedList = new LinkedList(1, 2, 3);

      expect(linkedList.last).toBe(3);

      linkedList.add(10);

      expect(linkedList.tip!.value === linkedList.last).toBe(true);
      expect(linkedList.last).toBe(10);
      expect(linkedList.tip!.next).toBe(undefined);
      expect(linkedList.tip!.previous!.value).toBe(3);
      expect(linkedList.length).toBe(4);
    });
  });
  describe('remove', () => {
    test('Will do nothing and not throw when the list is empty', () => {
      expect(() => linkedList.remove(1)).not.toThrow();
      expect(linkedList.length).toBe(0);
    });
    test('Will remove the element from a list with one element.', () => {
      linkedList = new LinkedList(1);

      expect(linkedList.length).toBe(1);

      linkedList.remove(1);

      expect(linkedList.length).toBe(0);
      expect(linkedList.head).toBe(undefined);
      expect(linkedList.tip).toBe(undefined);
    });
    test('Will NOT remove the only element in a list if it does not match.', () => {
      linkedList = new LinkedList(1);

      expect(linkedList.length).toBe(1);

      expect(() => linkedList.remove(5)).not.toThrow();

      expect(linkedList.length).toBe(1);
      expect(linkedList.first).toBe(1);
    });
    test('Will correctly remove the specified element from a non-empty list.', () => {
      linkedList = new LinkedList(1, 2, 3, 4, 5);

      linkedList.remove(3);

      const one = linkedList.head;
      const two = one!.next;
      const four = two!.next;
      const five = four!.next;

      expect(linkedList.length).toBe(4);
      expect(two!.value).toBe(2);
      expect(four!.value).toBe(4);
      expect(four!.previous!.value).toBe(2);

      expect(one!.value).toBe(1);
      expect(five!.value).toBe(5);
    });
    test('Will correctly remove the first element from a non-empty list.', () => {
      linkedList = new LinkedList(1, 2, 3);

      linkedList.remove(1);

      expect(linkedList.length).toBe(2);
      expect(linkedList.head!.value).toBe(2);
      expect(linkedList.head!.previous).toBe(undefined);
      expect(linkedList.head!.next === linkedList.tip).toBe(true);
      expect(linkedList.tip!.value).toBe(3);
    });
    test('Will correctly remove the last element from a non-empty list.', () => {
      linkedList = new LinkedList(1, 2, 3);

      linkedList.remove(3);

      expect(linkedList.length).toBe(2);
      expect(linkedList.tip!.value).toBe(2);
      expect(linkedList.tip!.next).toBe(undefined);
      expect(linkedList.tip!.previous === linkedList.head).toBe(true);
      expect(linkedList.head!.value).toBe(1);
    });
  });
  describe('removeBy', () => {
    test('Will do nothing and not throw when the list is empty', () => {
      expect(() => linkedList.removeBy((val) => val === 1)).not.toThrow();
      expect(linkedList.length).toBe(0);
    });
    test('Will remove the element from a list with one element.', () => {
      linkedList = new LinkedList(1);

      expect(linkedList.length).toBe(1);

      linkedList.removeBy((val) => val === 1);

      expect(linkedList.length).toBe(0);
      expect(linkedList.head).toBe(undefined);
      expect(linkedList.tip).toBe(undefined);
    });
    test('Will NOT remove the only element in a list if it does not match.', () => {
      linkedList = new LinkedList(1);

      expect(linkedList.length).toBe(1);

      expect(() => linkedList.removeBy((val) => val === 5)).not.toThrow();

      expect(linkedList.length).toBe(1);
      expect(linkedList.first).toBe(1);
    });
    test('Will correctly remove the specified element from a non-empty list.', () => {
      linkedList = new LinkedList(1, 2, 3, 4, 5);

      linkedList.removeBy((val) => val === 3);

      const one = linkedList.head;
      const two = one!.next;
      const four = two!.next;
      const five = four!.next;

      expect(linkedList.length).toBe(4);
      expect(two!.value).toBe(2);
      expect(four!.value).toBe(4);
      expect(four!.previous!.value).toBe(2);

      expect(one!.value).toBe(1);
      expect(five!.value).toBe(5);
    });
    test('Will correctly remove the first element from a non-empty list.', () => {
      linkedList = new LinkedList(1, 2, 3);

      linkedList.removeBy((val) => val === 1);

      expect(linkedList.length).toBe(2);
      expect(linkedList.head!.value).toBe(2);
      expect(linkedList.head!.previous).toBe(undefined);
      expect(linkedList.head!.next === linkedList.tip).toBe(true);
      expect(linkedList.tip!.value).toBe(3);
    });
    test('Will correctly remove the last element from a non-empty list.', () => {
      linkedList = new LinkedList(1, 2, 3);

      linkedList.removeBy((val) => val === 3);

      expect(linkedList.length).toBe(2);
      expect(linkedList.tip!.value).toBe(2);
      expect(linkedList.tip!.next).toBe(undefined);
      expect(linkedList.tip!.previous === linkedList.head).toBe(true);
      expect(linkedList.head!.value).toBe(1);
    });
  });

  describe('removeFirst', () => {
    test('Does nothing and does not throw on an empty list.', () => {
      expect(() => linkedList.removeFirst()).not.toThrow();
      expect(linkedList.length).toBe(0);
    });
    test('Removes the only element in the list.', () => {
      linkedList = new LinkedList(1);

      linkedList.removeFirst();

      expect(linkedList.length).toBe(0);
      expect(linkedList.head).toBe(undefined);
      expect(linkedList.tip).toBe(undefined);
    });
    test('Removes the first element correctly in a non-empty list.', () => {
      linkedList = new LinkedList(1, 2, 3);

      linkedList.removeFirst();

      expect(linkedList.length).toBe(2);
      expect(linkedList.head!.value).toBe(2);
      expect(linkedList.head!.next!.value).toBe(3);
      expect(linkedList.head!.next === linkedList.tip).toBe(true);
      expect(linkedList.tip!.previous === linkedList.head).toBe(true);
    });
  });
  describe('removeLast', () => {
    test('Does nothing and does not throw on an empty list.', () => {
      expect(() => linkedList.removeLast()).not.toThrow();
      expect(linkedList.length).toBe(0);
    });
    test('Removes the only element in the list.', () => {
      linkedList = new LinkedList(1);

      linkedList.removeLast();

      expect(linkedList.length).toBe(0);
      expect(linkedList.head).toBe(undefined);
      expect(linkedList.tip).toBe(undefined);
    });
    test('Correctly removes the last element in a non-empty list.', () => {
      linkedList = new LinkedList(1, 2, 3, 4);

      linkedList.removeLast();

      expect(linkedList.length).toBe(3);
      expect(linkedList.tip!.value).toBe(3);
      expect(linkedList.tip!.next).toBe(undefined);
    });
  });
  describe('filter', () => {
    test('Does nothing and does not throw on an empty list', () => {
      expect(() => linkedList.filter((num) => num % 2 === 0)).not.toThrow();
    });
    test('The new linked list contains only the values that passed the test.', () => {
      linkedList = new LinkedList(1, 2, 3, 4, 5);

      const evens = linkedList.filter((num) => num % 2 === 0);

      expect(linkedList.length).toBe(5);

      expect(evens.length).toBe(2);
      expect(evens.first).toBe(2);
      expect(evens.last).toBe(4);
    });
  });
  describe('map', () => {
    test('Does nothing and does not throw on an empty list.', () => {
      expect(() => linkedList.map((num) => num * 2)).not.toThrow();
    });
    test('Can generate a new list of the same type.', () => {
      linkedList = new LinkedList(1, 2, 3, 4, 5);

      const doubled = linkedList.map((num) => num * 2);

      expect(doubled.length === linkedList.length).toBe(true);
      expect(doubled.first).toBe(2);
      expect(doubled.head!.next!.value).toBe(4);
      expect(doubled.last).toBe(10);
    });
    test('Can generate a new list of a different type.', () => {
      linkedList = new LinkedList(1, 2, 3, 4, 5);

      const asStrings = linkedList.map((num) => num.toString());

      expect(asStrings.length === linkedList.length).toBe(true);
      expect(asStrings.first).toBe('1');
      expect(asStrings.head!.next!.value).toBe('2');
      expect(asStrings.last).toBe('5');
    });
  });
  describe('forEach', () => {
    test('Does nothing and does not throw on an empty list.', () => {
      expect(() => linkedList.forEach(() => {})).not.toThrow();
    });
    test('Will go over a single element.', () => {
      linkedList = new LinkedList(1);

      const each = vi.fn();

      linkedList.forEach(each);

      expect(each).toHaveBeenCalledTimes(1);
      expect(each).toHaveBeenCalledWith(1);
    });
    test('Goes over all elements in the list', () => {
      linkedList = new LinkedList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

      const each = vi.fn();

      linkedList.forEach(each);

      expect(each).toHaveBeenCalledTimes(10);
      expect(each).toHaveBeenNthCalledWith(6, 6);
      expect(each).toHaveBeenLastCalledWith(10);
    });
  });
  describe('includes', () => {
    test('Returns false and does not throw on an empty list.', () => {
      expect(() => linkedList.includes(2)).not.toThrow();
      expect(linkedList.includes(2)).toBe(false);
    });
    test('Correctly works with a list with a single element.', () => {
      linkedList = new LinkedList(1);

      expect(linkedList.includes(1)).toBe(true);
      expect(linkedList.includes(2)).toBe(false);
    });
    test('Correctly works with a list with multiple elements.', () => {
      linkedList = new LinkedList(1, 2, 3, 4, 5);

      expect(linkedList.includes(3)).toBe(true);
      expect(linkedList.includes(10)).toBe(false);
      expect(linkedList.includes(5)).toBe(true);
      expect(linkedList.includes(1)).toBe(true);
    });
  });
  describe('some', () => {
    test('Returns false and does not throw on an empty list.', () => {
      expect(() => linkedList.some(() => false)).not.toThrow();
      expect(linkedList.some(() => false)).toBe(false);
    });
    test('Returns correctly depending on whether anything passed the predicate.', () => {
      linkedList = new LinkedList(1, 2, 3, 4, 5);

      expect(linkedList.some((num) => num % 2 === 0)).toBe(true);
      expect(linkedList.some((num) => num === 50 / 2)).toBe(false);
    });
    test('Abandons iteration after finding the first match.', () => {
      linkedList = new LinkedList(1, 2, 3, 4, 5);

      const some = vi.fn((num) => num === 3);
      linkedList.some(some);

      expect(some).toHaveBeenCalledTimes(3);
    });
  });
  describe('find', () => {
    test('Returns undefined and does not throw on an empty list.', () => {
      expect(() => linkedList.find(() => false)).not.toThrow();
      expect(linkedList.find(() => false)).toBe(undefined);
    });
    test('Returns the correct element that matched the predicate.', () => {
      const objectToFind = {
        test: 'val1',
        test2: 'val2',
        test3: 'val3',
      };

      const linkedList = new LinkedList<Record<string, any>>(
        {
          ...objectToFind,
        },
        {
          nope: 'not it',
        },
        {
          not: 'looking for this one',
        }
      );

      expect(linkedList.find((val) => val.test === objectToFind.test)).toEqual(objectToFind);
      expect(linkedList.find((val) => val.prop === 'val')).toBe(undefined);
    });
  });
  describe('clear', () => {
    test('The list is empty after a clear.', () => {
      linkedList = new LinkedList(1, 2, 3, 4, 5);

      expect(linkedList.length).toBe(5);

      linkedList.clear();

      expect(linkedList.length).toBe(0);
      expect(linkedList.head).toBe(undefined);
      expect(linkedList.tip).toBe(undefined);
    });
  });
  describe('toArray', () => {
    test('Returns an empty array when the list is empty.', () => {
      expect(linkedList.toArray()).toEqual([]);
    });
    test('Correctly turns the list into an array.', () => {
      linkedList = new LinkedList(1, 2, 3);

      expect(linkedList.toArray()).toEqual([1, 2, 3]);
    });
  });
  describe('toString', () => {
    test('Returns the correct string for an empty list.', () => {
      expect(linkedList.toString()).toBe('()');
    });
    test('Returns the correct string for a list with one element.', () => {
      linkedList = new LinkedList(1);

      expect(linkedList.toString()).toBe('(1)');
    });
    test('Returns the correct string for a list with two elements.', () => {
      linkedList = new LinkedList(1, 2);

      expect(linkedList.toString()).toBe('(1 <-> 2)');
    });
    test('Returns the correct string for a list with more than two elements.', () => {
      linkedList = new LinkedList(1, 2, 3, 4);

      expect(linkedList.toString()).toBe('(1 <-> 2 <-> 3 <-> 4)');
    });
  });
  describe('structure', () => {
    test('Nodes are correctly linked in a list with one element.', () => {
      linkedList = new LinkedList(1);

      expect(linkedList.head!.value).toBe(1);
      expect(linkedList.head!.previous).toBe(undefined);
      expect(linkedList.head!.next).toBe(undefined);
    });
    test('Nodes are correctly linked in a list with two elements.', () => {
      linkedList = new LinkedList(1, 2);

      expect(linkedList.head!.value).toBe(1);
      expect(linkedList.head!.next!.value).toBe(2);

      expect(linkedList.head!.previous).toBe(undefined);
      expect(linkedList.head!.next!.previous).toEqual(linkedList.head);
    });
    test('Nodes are correctly linked in a list with more than two elements.', () => {
      linkedList = new LinkedList(1, 2, 3, 4, 5);

      const one = linkedList.head;
      const two = one!.next;
      const three = two!.next;
      const four = three!.next;
      const five = four!.next;

      expect(one!.value).toBe(1);
      expect(one!.previous).toBe(undefined);

      expect(two!.value).toBe(2);
      expect(two!.previous).toEqual(one);

      expect(three!.value).toBe(3);
      expect(three!.previous).toEqual(two);

      expect(four!.value).toBe(4);
      expect(four!.previous).toEqual(three);

      expect(five!.value).toBe(5);
      expect(five!.previous).toEqual(four);
      expect(five!.next).toBe(undefined);
    });
  });
});
