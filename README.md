# Glamour

<a alt="Nx logo" href="https://nx.dev" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="45"></a>

✨ A modern fashion e-commerce platform built with React, Redux Toolkit, Apollo GraphQL, and Nx
monorepo ✨

## 🎯 Recent Updates

### ✨ React Hook Form Integration (Latest)

We've implemented a comprehensive form management system using React Hook Form with Zod validation:

- **Type-safe forms** with full TypeScript support
- **Reusable form components** (FormInput, FormTextarea, FormSelect, FormCheckbox)
- **Pre-built validation schemas** for common use cases
- **Advanced hooks** for async submission, auto-save, multi-step forms
- **Comprehensive documentation** and working examples

**Quick Start**: See [`docs/QUICK_START_FORMS.md`](docs/QUICK_START_FORMS.md) **Complete Guide**:
See [`docs/REACT_HOOK_FORM_GUIDE.md`](docs/REACT_HOOK_FORM_GUIDE.md)

## 📚 Documentation

- [Quick Start - Forms](docs/QUICK_START_FORMS.md) - Get started with React Hook Form in 5 minutes
- [React Hook Form Guide](docs/REACT_HOOK_FORM_GUIDE.md) - Comprehensive form implementation guide
- [React Hook Form Summary](docs/REACT_HOOK_FORM_SUMMARY.md) - Implementation summary
- [Type-Safe Router](docs/TYPE_SAFE_ROUTER.md) - Type-safe routing implementation
- [Glamour Roadmap](docs/GLAMOUR_REAL_ESTATE_ROADMAP.md) - Project roadmap

## 📦 Project Overview

A production-ready React e-commerce monorepo featuring:

### Applications

| App        | Description                                                                        |
| ---------- | ---------------------------------------------------------------------------------- |
| `shop`     | React e-commerce storefront with product listings, detail views, and shopping cart |
| `api`      | Express backend API serving product data via REST & GraphQL                        |
| `shop-e2e` | Playwright end-to-end tests                                                        |

### Libraries

| Library                            | Description                                                               |
| ---------------------------------- | ------------------------------------------------------------------------- |
| `@org/shop-feature-products`       | Product listing feature with filtering and pagination                     |
| `@org/shop-feature-product-detail` | Product detail page with add-to-cart functionality                        |
| `@org/shop-data`                   | Data access layer (Redux Toolkit, RTK Query, Apollo Client, React Router) |
| `@org/shared-ui`                   | Shared UI components (shadcn/ui, Tailwind CSS) with Storybook             |
| `@org/models`                      | Shared TypeScript data models                                             |
| `@org/api-products`                | API product service library                                               |
| `@org/shared-test-utils`           | Shared testing utilities and mock data                                    |

### Tech Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS, shadcn/ui
- **State Management**: Redux Toolkit, RTK Query
- **Data Fetching**: Apollo Client (GraphQL), TanStack Query (REST)
- **Routing**: React Router v6 with type-safe routes
- **Backend**: Express, GraphQL
- **Testing**: Vitest (unit), Playwright (e2e), Storybook (component)
- **Build System**: Nx, Vite

## 🚀 Quick Start

```bash
# Clone the repository
git clone git@github.com:juliusossim/glamour.git
cd glamour

# Install dependencies
npm install

# Serve the React shop application (this will simultaneously serve the API backend)
npx nx serve shop

# ...or serve the API separately
npx nx serve api

# Build all projects
npx nx run-many -t build

# Run tests
npx nx run-many -t test

# Lint all projects
npx nx run-many -t lint

# Run e2e tests
npx nx e2e shop-e2e

# Run Storybook (component library)
npx nx storybook shared-ui

# Generate GraphQL types
npm run codegen

# Visualize the project graph
npx nx graph
```

## ⭐ Featured Nx Capabilities

This repository showcases several powerful Nx features:

### 1. 🔒 Module Boundaries

Enforces architectural constraints using tags. Each project has specific dependencies it can use:

- `scope:shared` - Can be used by all projects
- `scope:shop` - Shop-specific libraries
- `scope:api` - API-specific libraries
- `type:feature` - Feature libraries
- `type:data` - Data access libraries
- `type:ui` - UI component libraries

**Try it out:**

```bash
# See the current project graph and boundaries
npx nx graph

# View a specific project's details
npx nx show project shop --web
```

[Learn more about module boundaries →](https://nx.dev/features/enforce-module-boundaries)

### 2. 🎭 Playwright E2E Testing

End-to-end testing with Playwright is pre-configured:

```bash
# Run e2e tests
npx nx e2e shop-e2e

# Run e2e tests in CI mode
npx nx e2e-ci shop-e2e
```

[Learn more about E2E testing →](https://nx.dev/technologies/test-tools/playwright/introduction#e2e-testing)

### 3. 📖 Storybook Component Library

Interactive component documentation with Storybook: Shadcn components excluded in the config.

```bash
# Generate stories using nx generators
npx nx g @nx/react:stories --project=@org/shared-ui
# Run Storybook dev server
npx nx storybook shared-ui

# Build static Storybook
npx nx build-storybook @org/shared-ui
```

Components include: ProductCard, ProductGrid, LoadingSpinner, ErrorMessage, and shadcn/ui
primitives.

[Learn more about Storybook →](https://storybook.js.org/)

### 4. ⚡ Vitest for Unit Testing

Fast unit testing with Vitest for React libraries:

```bash
# Test a specific library
npx nx test shop-data

# Test all projects
npx nx run-many -t test
```

[Learn more about Vite testing →](https://nx.dev/recipes/vite)

### 5. 🛒 State Management

Multiple state management patterns are demonstrated:

- **Redux Toolkit** - Global state (cart, filters)
- **RTK Query** - REST API data fetching with caching
- **Apollo Client** - GraphQL data fetching
- **React Router** - Type-safe routing with loaders

### 6. 🔧 Self-Healing CI

The CI pipeline includes `nx fix-ci` which automatically identifies and suggests fixes for common
issues:

```bash
# In CI, this command provides automated fixes
npx nx fix-ci
```

This feature helps maintain a healthy CI pipeline by automatically detecting and suggesting
solutions for:

- Missing dependencies
- Incorrect task configurations
- Cache invalidation issues
- Common build failures

[Learn more about self-healing CI →](https://nx.dev/ci/features/self-healing-ci)

## 📁 Project Structure

```
glamour/
├── apps/
│   ├── shop/               # React e-commerce storefront
│   │   └── src/
│   │       ├── app/routes/ # Page components
│   │       ├── hooks/      # App-specific hooks
│   │       └── main.tsx    # Application entry
│   ├── shop-e2e/           # Playwright E2E tests
│   └── api/                # Express backend API
├── libs/
│   ├── shop/
│   │   ├── feature-products/       # Product listing feature
│   │   ├── feature-product-detail/ # Product detail feature
│   │   ├── data/                   # Data layer (Redux, Apollo, Router)
│   │   │   └── src/lib/
│   │   │       ├── store/          # Redux store & slices
│   │   │       ├── graphql/        # Apollo Client setup
│   │   │       ├── http/           # REST API & React Query
│   │   │       └── router/         # Type-safe routing
│   │   └── shared-ui/              # UI components & Storybook
│   │       └── src/lib/
│   │           ├── ui/             # shadcn/ui components
│   │           ├── product-card/   # ProductCard component
│   │           ├── product-grid/   # ProductGrid component
│   │           └── ...
│   ├── api/
│   │   └── products/       # Product service library
│   └── shared/
│       ├── models/         # Shared TypeScript models
│       └── test-utils/     # Testing utilities & mocks
├── docs/                   # Documentation
├── nx.json                 # Nx configuration
├── codegen.ts              # GraphQL codegen config
└── package.json
```

## 🏷️ Understanding Tags

This repository uses tags to enforce module boundaries:

| Project                 | Tags                         | Can Import From              |
| ----------------------- | ---------------------------- | ---------------------------- |
| `shop`                  | `scope:shop`                 | `scope:shop`, `scope:shared` |
| `api`                   | `scope:api`                  | `scope:api`, `scope:shared`  |
| `shop-feature-products` | `scope:shop`, `type:feature` | `scope:shop`, `scope:shared` |
| `shop-data`             | `scope:shop`, `type:data`    | `scope:shared`               |
| `models`                | `scope:shared`, `type:data`  | Nothing (base library)       |

## 📚 Useful Commands

```bash
# Project exploration
npx nx graph                                    # Interactive dependency graph
npx nx list                                     # List installed plugins
npx nx show project shop --web                  # View project details

# Development
npx nx serve shop                               # Serve React app with API
npx nx serve api                                # Serve backend API only
npx nx storybook shared-ui                      # Run Storybook
npm run codegen                                 # Generate GraphQL types

# Building
npx nx build shop                               # Build React app
npx nx build-storybook shared-ui                # Build static Storybook

# Testing
npx nx test shop-data                           # Test a specific library
npx nx e2e shop-e2e                             # Run E2E tests
npx nx run-many -t test                         # Test all projects

# Code Quality & Formatting
npm run format                                  # Format all files with Prettier
npm run format:check                            # Check formatting (CI)
npm run format:affected                         # Format only changed files
npx nx lint shop-feature-products               # Lint a specific library
npx nx run-many -t lint                         # Lint all projects
npm run lint:fix                                # Lint and auto-fix all projects

# Running multiple tasks
npx nx run-many -t build                        # Build all projects
npx nx run-many -t test --parallel=3            # Test in parallel
npx nx run-many -t lint test build              # Run multiple targets

# Affected commands (great for CI)
npx nx affected -t build                        # Build only affected projects
npx nx affected -t test                         # Test only affected projects
```

## ✨ Code Quality & Formatting

This workspace uses enterprise-grade code quality tools:

### Prettier

Automatic code formatting ensures consistent style across the entire codebase.

**Configuration**: Industry-standard settings in [.prettierrc](.prettierrc)

**Key Features**:

- 80 character line width
- Single quotes for JS/TS
- Trailing commas (ES5)
- Automatic formatting on save (VS Code)
- Pre-commit hooks via lint-staged

**Documentation**: See [.prettierrc.md](.prettierrc.md) for complete details.

### ESLint

TypeScript and React linting with strict rules.

**Integration**: Works seamlessly with Prettier via `eslint-config-prettier`.

### EditorConfig

Ensures consistent editor settings across different IDEs.

**Supported**: Indentation, line endings, encoding, and more.

## 🎯 Adding New Features

### Generate a new React application:

```bash
npx nx g @nx/react:app my-app
```

### Generate a new React library:

```bash
npx nx g @nx/react:lib my-lib
```

### Generate a new React component:

```bash
npx nx g @nx/react:component my-component --project=my-lib
```

### Generate a new API library:

```bash
npx nx g @nx/node:lib my-api-lib
```

You can use `npx nx list` to see all available plugins and `npx nx list <plugin-name>` to see all
generators for a specific plugin.

## Nx Cloud

Nx Cloud ensures a
[fast and scalable CI](https://nx.dev/ci/intro/why-nx-cloud?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
pipeline. It includes features such as:

- [Remote caching](https://nx.dev/ci/features/remote-cache?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [Task distribution across multiple machines](https://nx.dev/ci/features/distribute-task-execution?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [Automated e2e test splitting](https://nx.dev/ci/features/split-e2e-tasks?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [Task flakiness detection and rerunning](https://nx.dev/ci/features/flaky-tasks?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Install Nx Console

Nx Console is an editor extension that enriches your developer experience. It lets you run tasks,
generate code, and improves code autocompletion in your IDE. It is available for VSCode and
IntelliJ.

[Install Nx Console &raquo;](https://nx.dev/getting-started/editor-setup?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## 🔗 Learn More

- [Nx Documentation](https://nx.dev)
- [React Monorepo Tutorial](https://nx.dev/getting-started/tutorials/react-monorepo-tutorial)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Apollo Client](https://www.apollographql.com/docs/react/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Storybook](https://storybook.js.org/)
- [Playwright Testing](https://nx.dev/technologies/test-tools/playwright/introduction#e2e-testing)
- [Vite with React](https://nx.dev/recipes/vite)

## 📄 License

MIT
