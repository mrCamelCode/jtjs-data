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
});
