# Technology Stack 2025 - Core Platform

## Runtime Environment

**Node.js 22 LTS** - Latest LTS with enhanced V8 optimizations and superior ESM support

**TypeScript 5.6+** - Enhanced type inference, performance optimizations, and improved developer experience

**Target: ES2022** - Optimal performance while maintaining 95%+ browser coverage (Chrome 109+, Firefox 102+, Safari 16+)

## Frontend Framework

**React 19** - Server Components, enhanced concurrent features, and improved developer experience

**Next.js 15** - App Router with Turbopack providing 10x faster development and native ESM support

## State Management

**Zustand v5** - Lightweight, TypeScript-first client state with minimal boilerplate

**TanStack Query v6** - Industry standard server state management with React 19 compatibility and enhanced garbage collection

## Styling & Components

**Tailwind CSS v4** - Rust-based compilation for 10x speed improvement, CSS-first configuration approach

**shadcn/ui v2** - Radix UI v2 primitives with React 19 support and enhanced accessibility patterns

**react-grid-layout v2** - Mature drag-and-drop layout system with improved performance

## Development Experience

**Turbopack** (Next.js 15) - Native TypeScript support, 10x faster than Webpack, enhanced HMR

**pnpm v9** - 2x faster than npm with Node.js 22, superior dependency management

**Biome v2** - Unified linting and formatting with 100x faster performance than ESLint + Prettier

**Vitest v2** - Faster test execution with enhanced ESM support

## Data & Validation

**Valibot v2** - 90% smaller bundle than Zod with superior TypeScript integration and modular architecture

**@hey-api/openapi-ts** - Enhanced OpenAPI type generation with better TypeScript inference

**Dexie v4** - IndexedDB wrapper for browser storage with improved TypeScript support

## Performance

**@tanstack/react-virtual v3** - Enhanced virtual scrolling with improved overscan handling

**Native ES Modules** - Import Maps for plugin architecture without bundler complexity

**Web Workers** - Plugin sandboxing and parallel processing without external dependencies

## Security

**OAuth 2.1 + PKCE** - Modern authentication without server-side secrets

**Content Security Policy v3** - Enhanced security headers with WASM support

**Web Worker Sandboxing** - Plugin isolation through native browser security boundaries

## Desktop Application

**Tauri v2** - Rust-based runtime with 90% smaller bundle than Electron and native performance

## Deployment

**Vercel v3** - Edge optimization with superior Next.js 15 support

**GitHub Actions** - Native CI/CD without external dependencies

## Monitoring

**Next.js 15 Speed Insights** - Built-in Real User Monitoring with zero configuration

**React 19 Error Boundaries** - Enhanced error handling with improved component stack traces

## Browser Compatibility

**Progressive Enhancement** - Feature detection for WebGPU, OffscreenCanvas, BroadcastChannel

**No Polyfills** - ES2022 target eliminates polyfill overhead while maintaining broad compatibility

## Package Management

**Import Maps** - Native browser module resolution for plugin ecosystem

**Module Federation** - Scalable plugin architecture with shared dependency management

**T3 Env** - Compile-time environment validation preventing runtime configuration errors

## Key Architectural Principles

1. **Native Web Standards First** - Prefer browser APIs over external libraries
2. **Zero Configuration** - Eliminate configuration files where possible
3. **Performance by Default** - Choose tools optimized for speed and bundle size
4. **TypeScript Throughout** - Full type safety across application layers
5. **Progressive Enhancement** - Graceful degradation across browser capabilities

## Related ADRs

- ADR Index: `guidance/adrs/README.md`
- ADR-006: `guidance/adrs/006-auth-authz.md`
- ADR-007: `guidance/adrs/007-frontend-backend-boundaries.md`

---

## Theming and Tokens

We use a CSS-variables token system with a root theme class (`light` | `dark`) applied to `<html>`. Components consume tokens via Tailwind utilities (e.g., `bg-background`, `text-foreground`, `border-input`, `ring-ring`). No hardcoded colors in components or plugins.

### Token Set

| Token | Purpose | Typical Usage |
|---|---|---|
| `--background` | App/page background | `bg-background` |
| `--foreground` | Primary text color | `text-foreground` |
| `--muted` | Subtle surface (fills) | `bg-muted` |
| `--muted-foreground` | Subtle text | `text-muted-foreground` |
| `--border` | Generic borders | `border`, `border-border` |
| `--input` | Input borders/background | `border-input` |
| `--ring` | Focus ring color | `ring-ring` |
| `--card` | Card surfaces | `bg-card` |
| `--card-foreground` | Card text | `text-card-foreground` |
| `--popover` | Popover surfaces | `bg-popover` |
| `--popover-foreground` | Popover text | `text-popover-foreground` |
| `--primary` | Brand/action | `bg-primary`, `text-primary` |
| `--primary-foreground` | Text on primary | `text-primary-foreground` |
| `--secondary` | Secondary accents | `bg-secondary`, `text-secondary` |
| `--secondary-foreground` | Text on secondary | `text-secondary-foreground` |
| `--accent` | Hover/selection accents | `bg-accent`, `text-accent-foreground` |
| `--accent-foreground` | Text on accent | `text-accent-foreground` |
| `--destructive` | Errors/danger | `bg-destructive`, `text-destructive` |
| `--destructive-foreground` | Text on destructive | `text-destructive-foreground` |
| `--success` | Success states | `bg-success`, `text-success` |
| `--success-foreground` | Text on success | `text-success-foreground` |
| `--warning` | Warnings | `bg-warning`, `text-warning` |
| `--warning-foreground` | Text on warning | `text-warning-foreground` |

Light mode defines defaults under `:root`, dark overrides under `.dark`.

```css
:root {
  --background: 0 0% 100%;
  --foreground: 240 10% 3.9%;
  --muted: 240 4.8% 95.9%;
  --muted-foreground: 240 3.8% 46.1%;
  --border: 240 5.9% 90%;
  --input: 240 5.9% 90%;
  --ring: 240 4.9% 83.9%;
  --card: 0 0% 100%;
  --card-foreground: 240 10% 3.9%;
  --popover: 0 0% 100%;
  --popover-foreground: 240 10% 3.9%;
  --primary: 240 5.9% 10%;
  --primary-foreground: 0 0% 98%;
  --secondary: 240 4.8% 95.9%;
  --secondary-foreground: 240 5.9% 10%;
  --accent: 240 4.8% 95.9%;
  --accent-foreground: 240 5.9% 10%;
  --destructive: 0 84.2% 60.2%;
  --destructive-foreground: 0 0% 98%;
  --success: 142 44% 36%;
  --success-foreground: 0 0% 98%;
  --warning: 38 92% 50%;
  --warning-foreground: 25 30% 15%;
}

.dark {
  --background: 240 10% 3.9%;
  --foreground: 0 0% 98%;
  --muted: 240 3.7% 15.9%;
  --muted-foreground: 240 5% 64.9%;
  --border: 240 3.7% 15.9%;
  --input: 240 3.7% 15.9%;
  --ring: 240 3.7% 15.9%;
  --card: 240 10% 3.9%;
  --card-foreground: 0 0% 98%;
  --popover: 240 10% 3.9%;
  --popover-foreground: 0 0% 98%;
  --primary: 0 0% 98%;
  --primary-foreground: 240 5.9% 10%;
  --secondary: 240 3.7% 15.9%;
  --secondary-foreground: 0 0% 98%;
  --accent: 240 3.7% 15.9%;
  --accent-foreground: 0 0% 98%;
  --destructive: 0 62.8% 30.6%;
  --destructive-foreground: 0 85.7% 97.3%;
  --success: 142 44% 32%;
  --success-foreground: 0 0% 98%;
  --warning: 38 92% 55%;
  --warning-foreground: 55 30% 88%;
}
```

Notes
- Values use HSL triplets to align with Tailwind v4 token patterns and shadcn/ui conventions.
- Token naming matches existing utilities used in the codebase.
- The properties panel design should only use these tokens (see `guidance/feature/properties-panel/design_system.md`).

### Theme Application
- Root class set by `ThemeToggle` and layout store: `.light | .dark` (or system-resolved).
- `document.documentElement.style.colorScheme` is updated for native form styling.
- Plugins must not hardcode colors; they must rely on component library or CSS tokens.

### Theme Packs (Optional)
- Future: `data-theme="grimdark|parchment|terminal"` on `<html>` to alias core tokens for different aesthetics. Each pack provides light/dark overrides.
