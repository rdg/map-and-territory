Status: Draft
Last Updated: 2025-09-03
title: AppAPI Hex Geometry and Pointer→Hex Routing
deciders: Core Orchestrator, Rendering Lead, Plugin Architect

## Context

Hex-centric tools and layers (terrain paint, fog-of-war) require reliable coordinate conversions and kernels (rings/cones) independent of internal store shapes. Standardizing axial hex utilities and pointer→hex routing in the public API enables consistent plugin behavior and testability.

## Decision

1) Public Hex Geometry in `AppAPI.hex`
- `fromPoint(x: number, y: number): { q: number; r: number } | null`
- `toPoint(q: number, r: number): { x: number; y: number }`
- `distance(a: {q,r}, b: {q,r}): number`
- `neighbors(q: number, r: number): Array<{q:number;r:number}>`
- `ring(center: {q,r}, radius: number): Array<{q,r}>`
- `cone(center: {q,r}, dir: 0|1|2|3|4|5, radius: number, spread60s: number): Array<{q,r}>`

2) Pointer→Hex Routing
- Canvas pointer events provide `{q,r}` alongside pixel coordinates when a `hexgrid` layer is present and visible. If absent or disabled, return `null` and tools should degrade gracefully.
- Calculations respect active hexgrid layer parameters (size, rotation, origin) via the public API, not internal store coupling.

3) Independence & Versioning
- `AppAPI.hex` remains selector-oriented and versioned per ADR-0002, avoiding leakage of internal store shapes.

## Rationale

- Centralizes geometry logic to ensure consistency across plugins and tools.
- Simplifies testing (deterministic kernels) and improves performance via shared utilities.
- Supports future features (pathfinding, FOV) without API churn.

## Consequences

- Host implements geometry once; plugins consume via `AppAPI`.
- Hit-test path must integrate with canvas event system to attach `{q,r}`.
- Unit tests added for geometry correctness and edge cases.

## Validation

- Unit: `neighbors`, `ring`, `cone`, and `fromPoint/toPoint` against known fixtures.
- Integration: Pointer events deliver `{q,r}` when hexgrid is active; `null` otherwise.

## Follow-ups

- Evaluate continuous-angle cones (float radians) if needed; keep initial API discrete (6 facings) for simplicity.
- Consider exposing range/line-of-sight helpers once kernels are validated in production.

