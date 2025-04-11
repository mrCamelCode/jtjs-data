import { afterAll, beforeAll, describe, expect, test, vi, VitestUtils } from 'vitest';
import { Cache } from '../cache';

describe('Cache', () => {
  let utils: VitestUtils;
  beforeAll(() => {
    utils = vi.useFakeTimers();
  });
  afterAll(() => {
    vi.useRealTimers();
  });

  describe('isEmpty', () => {
    describe('true when...', () => {
      test('there are no elements in the cache', () => {
        const cache = new Cache<string>();

        expect(cache.isEmpty).toBe(true);
      });
      test('all elements in the cache are expired', () => {
        const cache = new Cache<number>();

        cache.set('test', 0, 1_000);
        cache.set('test1', 1, 1_000);

        utils.advanceTimersByTime(1_001);

        expect(cache.isEmpty).toBe(true);
      });
      test('all elements were removed', () => {
        const cache = new Cache<number>();

        cache.set('test', 0, 1_000);
        cache.set('test1', 1, 1_000);

        cache.wipe();

        expect(cache.isEmpty).toBe(true);
      });
      test('all valid elements were removed', () => {
        const cache = new Cache<number>();

        cache.set('test', 0, 1_000);
        cache.set('test1', 1, 10_000);

        utils.advanceTimersByTime(1_500);

        cache.remove('test1');

        expect(cache.isEmpty).toBe(true);
      });
    });

    describe('false when...', () => {
      test('there are elements in the cache', () => {
        const cache = new Cache<number>();

        cache.set('test', 0, 1_000);
        cache.set('test1', 1, 10_000);

        expect(cache.isEmpty).toBe(false);
      });
      test(`there are expired entries and valid entries`, () => {
        const cache = new Cache<number>();

        cache.set('test', 0, 1_000);
        cache.set('test1', 1, 10_000);

        utils.advanceTimersByTime(1_500);

        expect(cache.isEmpty).toBe(false);
      });
    });
  });

  describe('entry lifetime', () => {
    test(`the instance lifetime is used when not provided to set`, () => {
      const cache = new Cache<number>({ entryLifetimeMs: 10_000 });

      cache.set('test', 1);

      expect(cache.get('test')).toBe(1);

      utils.advanceTimersByTime(9_000);

      expect(cache.get('test')).toBe(1);

      utils.advanceTimersByTime(2_000);

      expect(cache.get('test')).toBe(undefined);
    });
    test(`the lifetime provided to set is used when the instance has no configured lifetime`, () => {
      const cache = new Cache<number>();

      cache.set('test', 1, 5_000);

      expect(cache.get('test')).toBe(1);

      utils.advanceTimersByTime(4_000);

      expect(cache.get('test')).toBe(1);

      utils.advanceTimersByTime(2_000);

      expect(cache.get('test')).toBe(undefined);
    });
    test(`the lifetime provided to set is used when the instance has a configured lifetime`, () => {
      const cache = new Cache<number>({ entryLifetimeMs: 10_000 });

      cache.set('test', 1, 5_000);

      expect(cache.get('test')).toBe(1);

      utils.advanceTimersByTime(4_000);

      expect(cache.get('test')).toBe(1);

      utils.advanceTimersByTime(2_000);

      expect(cache.get('test')).toBe(undefined);
    });
  });

  describe('cache setting/retrieval', () => {
    test(`existing entry is returned`, () => {
      const cache = new Cache<number>();

      cache.set('something', 100, 10000);
      expect(cache.get('something')).toBe(100);
    });
    test(`missing entry returns undefined`, () => {
      const cache = new Cache<number>();

      expect(cache.get('something')).toBe(undefined);
    });
    test(`expired entry returns undefined`, () => {
      const cache = new Cache<number>();

      cache.set('something', 100, 10000);

      utils.advanceTimersByTime(11000);

      expect(cache.get('something')).toBe(undefined);
    });
  });

  describe('purge', () => {
    test(`expired entries are removed`, () => {
      const cache = new Cache<number>();

      cache.set('something', 100, 500);
      cache.set('else', 50, 10000);

      utils.advanceTimersByTime(600);
      cache.purge();

      expect(cache.get('something')).toBe(undefined);
    });
    test(`unexpired entries are unaffected`, () => {
      const cache = new Cache<number>();

      cache.set('something', 100, 500);
      cache.set('else', 50, 10000);

      utils.advanceTimersByTime(600);
      cache.purge();

      expect(cache.get('else')).toBe(50);
    });
  });

  describe('wipe', () => {
    test(`all entries are removed`, () => {
      const cache = new Cache<number>();

      const keys = ['something', 'else', 'another', 'thing'];

      keys.forEach((key, index) => cache.set(key, 100, index * 1000));

      cache.wipe();

      keys.forEach((key) => expect(cache.get(key)).toBe(undefined));
    });
  });

  describe('toArray', () => {
    test(`all unexpired entries are present`, () => {
      const cache = new Cache<number>({
        entryLifetimeMs: 1_000,
      });

      cache.set('test', 10);
      cache.set('test1', 20, 200);
      cache.set('test2', 30);

      utils.advanceTimersByTime(300);

      expect(cache.toArray()).toEqual([
        ['test', 10],
        ['test2', 30],
      ]);
    });
  });
});
