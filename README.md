# Table of Contents

- [Project setup](#Project-setup)
  - [Configuration file order](#Configuration-file-order)
  - [Husky not working](#Husky-not-working)
- [Available scripts](#Available-scripts)
- [Updating dependencies](#Updating-dependencies)
- [CI/CD](#cicd)
  - [Git hooks](#Git-hooks)
  - [Required steps on pipelines](#Required-steps-on-pipelines)
- [Testing](#Testing)
  - [Unit & integration tests](#Unit--integration-tests)
  - [Snapshot testing](#Snapshot-testing)
- [Authentication](#Authentication)
  - [Authentication library](#Authentication-library)
  - [Authentication flow](#Authentication-flow)
    - [Multi-tenancy (multiple organization support)](#Multi-tenancy-multiple-organization-support)
- [Folder structure](#Folder-structure)
- [Naming convention](#Naming-convention)
  - [File naming convention](#File-naming-convention)
  - [Variable, type and interface naming convention](#Variable-type-and-interface-naming-convention)
  - [Git commit naming convention](#Git-commit-naming-convention)
- [Project vocabulary](#Project-vocabulary)
  - [Domain](#Domain)
  - [Architecture](#Architecture)
- [Tech stack](#Tech-stack)
  - [Problems](#Problems)
    - [NX](#NX)
    - [Tree shaking](#Tree-shaking)

# Project setup

Add `.env` file to the `/apps/eodh-fe` dir. Ask your teammates about its content.

### Husky not working

Run `husky install` manually if you have problems with husky.

# Available scripts

- `npm run start` - starting application in dev mode
- `npm run build` - build production version
- `npm run cache:clear` - clear NX cache
- `npm run test` - run all tests
- `npm run test:e2e` - run e2e tests
- `npm run test:unit` - run unit and integration tests
- `npm run lint:check` / `npm run lint:fix` - running eslint
- `npm run format:check` / `npm run format:fix` - running prettier
- `npm run code:check` / `npm run code:fix` - eslint + prettier

# Updating dependencies

Run `npx nx migrate`. This command will run `nx migrate` underneath. (For more information visit [NX documentation](https://nx.dev/core-features/automate-updating-dependencies)).
Do not update dependencies manually (instead use NX for that) due to different libraries versions problem.

# CI/CD

GitHub's pipelines are used for ci/cd. Check `.github` directory for more detailed information about pipeline configuration.

### Git hooks

`husky` is used for git hooks:

- `pre-push` - test and linters are required to pass
- `pre-commit` - conventional commit naming convention for commit message is required

### Required steps on pipelines

All linters and tests has to pass on pipelines.
Before sending any changes make sure you run those commands:

- `npm run test` - check if all test pass
- `npm run code:fix` - format code

# Testing

Run `npm run test:unit` command to run tests for all project.
`vitest` is used as a test engine

### Unit & integration tests

There is no differentiation between unit and integration tests, all those tests are run by one command.
Unit tests with mocks are used for more technical stuff like utility libraries.
Integration tests are used for business scenarios.

### Snapshot testing

For updating snapshots run `test:snapshot:update` command.

# Folder structure

Folder structure in Marlin is described in [docs/architecture.md](./docs/architecture.md)

# Naming convention

### File naming convention

- kebab case
- each file should have its type as a suffix. Suffix is added after dot (eg: alert-list.component, use-filtering.hook). Simple files (eg model/content) doesn't require to have a suffix.

### Variable, type and interface naming convention

Package `@typescript-eslint/naming-convention` is used for naming convention:

- interfaces should start with `I` letter
- types should start with `T` letter
- variables should be camelCase
- enums should be UPPER_CASE

Check `@typescript-eslint/naming-convention` section in `.eslint.json` file in root directory to see all rules.

### Git commit naming convention

Conventional commits convention is used as commits naming convention. Visit the [conventional commits page](https://www.conventionalcommits.org) to learn more.

# Project vocabulary

### Architecture

1. `Feature layer` - A page with routing
2. `UI layer` - Small feature
3. `Data access layer` - API/data caching part of the application
4. `Utils layer` - utility libraries

**Dependencies and relations between layers** are described in [docs/architecture.md](./docs/architecture.md)

# Tech stack

This project uses nx as its primary build and run tool. **NX** is described in [docs/nx.md](./docs/nx.md)

Other tools used:

- `npm`
- `React.js`
- `Eslint` / `Prettier` - linting tools
- `Vite` - js bundler
- `husky` - library for running git hooks

## Problems

### NX

Run `npm run nx reset` if you have any problems with NX.
