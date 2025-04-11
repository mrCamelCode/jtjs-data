# 0.0.13
  - `Cache`
    - Constructor now takes an optional options object to customize the cache
      - Options currently include `entryLifetimeMs`, which allows you to configure the lifetime used for any entry in the cache so you don't have to set the same one on every call to `set`.
    - The third argument of `set` (the entry lifetime) is now optional. The entry will use what you provide. If not provided, it will use the instance's `entryLifetimeMs`. If not provided, the entry will have no lifetime and expire immediately.
    - New properties
      - `isEmpty`: `true` when the cache has no entries, or when all entries are expired.
      - `hasUnexpiredEntries`: `true` when the cache has at least one unexpired entry.

# 0.0.12

- Correct repo information.

# 0.0.11

- Add repo information.

# 0.0.10

- `toArray` no longer returns expired entries.

# 0.0.9

- Added `toArray` and `remove` methods to `Cache`.

# 0.0.8

- Added `Cache`.

# 0.0.7

- Fix types not being bundled.

# 0.0.6

## Breaking Changes

- Package now only supports ESM.

## Other Updates

- Added interface for normalized collection, default implementation in progress.