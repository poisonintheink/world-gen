# Save Constraints & Overlay Retention

This document outlines the current assumptions for how persistent overlays are saved and rotated. The parameters below will evolve as the project moves forward but provide an initial baseline for tooling and design.

## Expected Overlay Sizes

- **Chunk granularity:** Overlays are stored per world chunk (256x256 tiles) so that only touched regions need to be loaded.
- **Typical size:** Around **100–200 KB** per chunk after compression. Heavily modified areas may reach **500 KB**.
- **World scale:** For a 40k x 20k grid this results in roughly 30–50 GB of overlay data if every chunk was modified, which is considered an upper bound.

## World Lifetime Considerations

- Worlds are expected to remain active for multiple seasons (1–3 years).
- Older overlays accumulate and must be compressed or archived to keep disk usage reasonable.
- Periodic maintenance should prune dormant regions that have seen no updates for six months or more.

## Retention Policy

1. **Active regions** (touched in the last three months) are kept uncompressed for fast access.
2. **Dormant regions** are compressed and moved to a slower tier of storage after six months.
3. **Archived regions** older than a year can be snapshotted or deleted depending on gameplay requirements.

## Guidelines for Persistent Overlay Implementation

- Maintain an append-only log per chunk so that writes are deterministic and can be replayed.
- Store a compact manifest listing overlay files with checksums, sizes and last-modified timestamps.
- Provide tools to pack/unpack, compress and archive overlays as part of build or maintenance scripts.
- Ensure loading logic can gracefully skip missing overlays (e.g., when a region was pruned) without breaking determinism.

These values and policies are placeholders and should be revisited once final world lifetime and storage budgets are confirmed.