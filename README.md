# Table of Contents

- [Project setup](#Project-setup)
  - [Configuration file order](#Configuration-file-order)
  - [Husky not working](#Husky-not-working)
- [Available scripts](#Available-scripts)
- [Updating dependencies](#Updating-dependencies)
- [CI/CD](#cicd)
  - [Git hooks](#Git-hooks)
  - [Required steps on pipelines](#Required-steps-on-pipelines)
- [Release process](#Release-process)
  - [Release process steops](#Release-process-steps)
- [Feature Flags](#Feature-Flags)
- [Testing](#Testing)
  - [Unit & integration tests](#Unit--integration-tests)
  - [Storybook tests](#Storybook-tests)
  - [E2E tests](#E2E-tests)
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
- `npm run test` - run all tests
- `npm run test:unit` - run unit and integration tests
- `npm run test:storybook` - run storybook tests
- `npm run test:e2e` - run e2e tests
- `npm run lint:check` / `npm run lint:fix` - running eslint
- `npm run format:check` / `npm run format:fix` - running prettier
- `npm run code:check` / `npm run code:fix` - eslint + prettier
- `npm run translation:extract` - generate translation keys from `eodh-fe` and `libs`
- `npm run translation:type:generate` - generate interfaces for translations from `eodh-fe` and `libs`

# Updating dependencies

Run `npx nx migrate`. This command will run `nx migrate` underneath. (For more information visit [NX documentation](https://nx.dev/core-features/automate-updating-dependencies)).
Do not update dependencies manually (instead use NX for that) due to different libraries versions problem.

# CI/CD

GitHub's pipelines are used for ci/cd. Check `.github` directory for more detailed information about pipeline configuration.

# Release process

We use adjusted `GitFlow` - instead of testing from feature branches, we do tests from `development` branch.

# Feature Flags

Feature flags are described in [docs/feature-flags.md](./docs/feature-flags.md)

## Release process steps:

1. Create `release` branch with release `version`, eg. `v.1.0.0`. `Release` branch should be created from `develop` branch.
2. If any fixes needed merge them into `release` branch.
3. Update `version` in package.json file.
4. Tag `version` in `git`: `git tag v1.0.0`.
5. Merge `release` branch into `master` branch.
6. Merge `master` branch into `release` branch. This is a very important step! It has to be done otherwise history in `master` and `develop` branches will be different!

### Git hooks

`husky` is used for git hooks:

- `pre-push` - test and linters are required to pass
- `pre-commit` - conventional commit naming convention for commit message is required

### Required steps on pipelines

All linters and tests has to pass on pipelines.
Before sending any changes make sure you run those commands:

- `npm run test:unit` - check if all test pass
- `npm run code:fix` - format code

# Testing

- Run `npm run test` command to run tests for all project.
- Run `npm run test:unit` command to run unit tests for all project.
- Run `npm run test:storybook` command to run storybook tests for all project.
- Run `npm run test:e2e` command to run e2e tests for all project.

`vitest` is used as a test engine

### Unit & integration tests

There is no differentiation between unit and integration tests, all those tests are run by one command.
Unit tests with mocks are used for more technical stuff like utility libraries.
Integration tests are used for business scenarios.

### Storybook tests

Storybook tests are somewhere in between integration and e2e tests.
They allow us test full flow of the application in the isolation.

### E2E tests

E2E tests are used to test application end-to-end (using real data).

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

## Domain

1. CWL - Common Workflow Language. Links: 2. [Basics](https://cwl-for-eo.github.io/guide/) 3. [Standard](https://www.commonwl.org/v1.2/CommandLineTool.html) 4. [CWL 1.2](https://github.com/common-workflow-language/cwl-v1.2) 5. [User Guide](https://www.commonwl.org/user_guide)
2. STAC, links: 5. [STAC Index](https://stacindex.org) 6. [EODH STAC BROWSER](https://github.com/UKEODHP/stac-browser) 7. [eodhp-ades-demonstration](https://github.com/UKEODHP/eodhp-ades-demonstration/blob/main/water-bodies.http) 8. [Earth Observation Application Package](https://github.com/eoap) 9. [STAC API - Collection Search](https://github.com/stac-api-extensions/collection-search)

## Architecture

1. `Feature layer` - A page with routing
2. `UI layer` - Small feature
3. `Data access layer` - API/data caching part of the application
4. `Utils layer` - utility libraries
5. `Theme layer` - theme configuration and utility functions
6. `Design System layer` - components related to design system

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
