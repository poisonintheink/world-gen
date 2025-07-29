# Travel Model

This document captures the current assumptions for how characters traverse the world. The model will evolve as design decisions are finalized.

## Current Assumptions

- **Mode of travel:** Primarily on foot. Mounts or vehicles are not yet defined.
- **Movement capabilities:** Foot travel assumes moderate speeds and limited ability to handle steep grades.
- **Road usage:** Paths are expected to be single-width tracks suitable for foot traffic.

## Influence on Road Generation

Because the travel model is currently focused on foot traffic, road generation favors routes that avoid steep slopes and difficult terrain. Costs for movement are tuned to walking speeds, and grade limits are conservative. As mounts or faster travel options are introduced, these parameters may shift to allow steeper grades or wider paths.

## Updating This Document

The travel model will impact many systems, especially road and settlement placement. As requirements are clarified (e.g., introduction of mounts, carts, or regional travel speeds), update this document to reflect the new assumptions and how they modify the road generation logic.