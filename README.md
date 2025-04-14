# Weasydoo Monorepo 🚀

[![Built with Turbo](https://img.shields.io/badge/Built%20with-TurboRepo-5C47FF?style=flat)](https://turbo.build)
[![Web: Next.js](https://img.shields.io/badge/Web-Next.js-000000?logo=next.js)](https://nextjs.org)
[![Mobile: Expo](https://img.shields.io/badge/Mobile-Expo-4630EB?logo=expo)](https://expo.dev)
[![Code Style: Prettier](https://img.shields.io/badge/Code%20Style-Prettier-ff69b4?logo=prettier)](https://prettier.io)

A high-performance e-commerce solution with feature parity across web (Next.js) and mobile (React Native/Expo). Built with modern architecture patterns and developer experience in mind.

## 🌟 Features
- **Next.js Web App**: Auth, product CRUD, search/filter, responsive UI
- **Expo Mobile App**: Mirror web functionality with mobile-first UX
- **Shared API Client**: Type-safe API interactions
- **Monorepo Architecture**: TurboRepo-powered dependency management

## 🛠 Tech Stack

### Core Packages
| Package       | Tech                        | Key Dependencies                          |
|---------------|-----------------------------|-------------------------------------------|
| `web`         | Next.js 14                  | `@tanstack/react-query`, `shadcn/ui` ..etc |
| `mobile`      | Expo (React Native)         | `react-navigation`, `react-native-paper`, ..etc |
| `api-client`  | Axios + TypeScript          | `axios`, `react-query` ..etc     |

### Detailed Dependencies

#### Web App (`apps/web`)
- **Core**: Next.js 14, React 18
- **State**: Context API 
- **Styling**: Tailwind CSS, shadcn/ui components
- **API**: React Query for data fetching
- **Testing**: Vitest, React Testing Library

#### Mobile App (`apps/mobile`)
- **Core**: Expo SDK, React Native
- **Navigation**: expo router
- **State**: Context API
- **Testing**: Jest, React Native Testing Library

#### API Client (`packages/api`)
- **Core**: Axios for HTTP requests
- **Validation**: Zod for runtime type safety
- **Types**: Shared TypeScript interfaces

### Dev Tooling
- **Monorepo**: TurboRepo + PNPM workspaces
- **Styling**: Tailwind CSS (web)
- **Code Quality**: ESLint + Prettier
- **Testing**: Jest (unit), vitest

## 📂 Monorepo Structure
```bash
├── apps/
│   ├── web/           # Next.js 14 + App Router
│   └── mobile/        # Expo (React Native)
├── packages/
│   ├── api/           # Shared API client
│   └── (future) cart-provider/
│   └── (future) shared-ui/  # Reusable cart logic
└── turbo.json         # Build pipeline configuration
```

## 🚀 Getting Started

1. **Install Dependencies**
   ```bash
   pnpm install
   ```

2. **Run Web App**
   ```bash
   pnpm dev:web
   ```

3. **Run Mobile App**
   ```bash
   pnpm dev:mobile
   ```

4. **Build All Packages**
   ```bash
   pnpm build
   ```

## 🤔 Why These Technologies?

| Choice                | Rationale                                                                 |
|-----------------------|---------------------------------------------------------------------------|
| **TurboRepo**         | Blazing-fast monorepo builds with task caching. 70% faster CI times vs Lerna |
| **Next.js App Router**| Server Components + Suspense for optimized hydration                     |
| **Expo**              | Zero-config mobile development with OTA updates                          |             |
| **React Query**       | Automatic API caching/deduplication (50% fewer API calls)                |

## 🔧 Scripts Cheatsheet
```json
"web:dev": "pnpm --filter web run dev",    // Start Next.js dev server
"web:lint": "pnpm --filter web run lint",  // Lint web app
"web:build": "pnpm --filter web run build", // Build web app
"mobile:dev": "pnpm --filter mobile run start",  // Launch Expo dev client
"mobile:test": "pnpm --filter mobile run test", // Test mobile app
"format": "prettier --write \"**/*.{ts,tsx,js,jsx,md,mdx}\"", // Auto-format code
"test": "turbo test",                      // Run all tests
"build": "turbo build",                    // Build all packages
"lint": "turbo lint",                      // Lint all packages
"type-check": "turbo type-check",          // Type check all packages
```

## 🚧 Improvements (Future Roadmap)

### 1. Documentation App
```bash
apps/
  └── docs/       # Add Nextra-powered documentation
```
- **Why**: Centralize API docs, design system, and contribution guidelines
- **Tools**: [Nextra](https://nextra.site) (Next.js docs framework)

### 2. Cart State Package
```bash
packages/
  └── cart-provider/  # Shared cart logic
```
- **Current Implementation**: Currently duplicated in both web (`apps/web/src/providers/cart-provider.tsx`) and mobile (`apps/mobile/components/CartProvider.tsx`)
- **Benefit**: Single source of truth for cart operations across platforms
- **Tech**: Zustand + TypeScript + React Context
- **Migration Plan**: 
  1. Create new package under `packages/cart-provider`
  2. Refactor existing cart logic into shared package
  3. Update both apps to consume from shared package

### 3. Shared UI Library
```bash
packages/
  └── ui/  # Cross-platform components
```
- **Options**:
  - [Solito](https://solito.dev): Universal React components
  - [GlueStack](https://ui.gluestack.io): Accessible React Native primitives
- **Potential Components**:
  - Product cards
  - Buttons
  - Forms
  - Navigation elements
- **Benefit**: 80% UI code reuse between web/mobile

### 4. Additional Improvements
- **Performance Monitoring**: Add [React Native Performance](https://shopify.github.io/react-native-performance/)
- **CI/CD**: GitHub Actions for automated E2E tests ([Cypress Dashboard](https://www.cypress.io/dashboard/))
- **Storybook**: Component catalog ([Storybook for React Native](https://storybook.js.org/blog/storybook-for-react-native/))
- **Authentication**: Unified auth flow between web and mobile
- **Analytics**: Shared tracking implementation

## 📄 License
MIT © 2024 Weasydoo Team