# General rules

Monorepo approach is used. Main code lives in `libs` directory as a `project`.
Currently, there is one `application`, but multiple `applications` are supported.

Rules:

- all `applications` should be placed in `apps` directory,
- most of the code should be placed in `libs` directory,
- `app` should be a tinny wrapper and should use code from `libs` directory,
- `libraries` can use another `libraries`,
- `applications` can not use another `applications`,

### Enforce module boundaries

Eslint plugin `@nrwl/nx/enforce-module-boundaries` is used to enforce module boundaries.
Check `.eslintrc.json` file for detailed configuration,

# Architecture

Project follows DDD (Domain Driven Design) pattern and extends [NX approach](https://nx.dev/more-concepts/library-types) to enforce module boundaries.
There are eight types of libraries:

- `shared/desing-system` - shared domain only
- `shared/theme` - shared domain only
- `shared/utils` - shared domain only
- `shared/ui` - shared domain only
- `utils`
- `data-access`
- `ui`
- `feature`

## Diagram

![architecture diagram](./schemas/architecture-diagram.png)

## Types of libraries

### Shared Design System

#### What is it?

UI components and utility functions for Design System.

#### Naming Convention

There should be only one library design-system, it should be placed under `shared` directory.

#### Dependency Constraints

A `design-system` library can't use other libraries.

### Shared Theme

#### What is it?

Theme configuration and utility functions.

#### Naming Convention

theme (if nested), or `theme-*` (e.g., `theme-eodh`)

#### Dependency Constraints

A `theme` library can't use other libraries.

### Shared Utils

#### What is it?

A utility library contains low level code used by many libraries.
Often there is no framework-specific code and the library is simply a collection of utilities or pure functions.

#### Dependency Constraints

A `shared-utils` library can't use other libraries.

### Shared UI

#### What is it?

Sharable UI components used across one or multiple applications.

#### Naming Convention

util (if nested), or `ui-*` (e.g., `ui-button`)

#### Dependency Constraints

A `shared-ui` library can depend `shared-design-system` and `shared-utils` libraries.

### Utils

#### What is it?

A utility library contains low level code used by many libraries. Often there is no framework-specific code and the library is simply a collection of utilities or pure functions.

#### Naming Convention

util (if nested), or `util-*` (e.g., `util-testing`)

#### Dependency Constraints

A `utils` library can depend on `shared-utils` libraries.

#### Utils vs Shared Utils

Code in `utils` should be domain specific where in `shared-utils` it should be generic (used by other domains/applications).

### Data-access

#### What is it?

Data-access libraries contain code that function as client-side delegate layers to server tier APIs.

All files related to state management also reside in a data-access folder (by convention, they can be grouped under a +state folder under src/lib).

#### Naming Convention

data-access (if nested) or `data-access-*` (e.g. `data-access-seatmap`)

#### Dependency Constraints

A `data-access` library can depend `shared-utils` and `utils` libraries.

### UI

#### What is it?

A UI library is a collection of related presentational components.
UI is an independent component which can be a part of the page (it may have its own logic related to BE communication).

#### Naming Convention

ui (if nested) or `ui-*` (e.g., `ui-buttons`)

#### Dependency Constraints

A `ui` library can depend on `shared-design-system`, `shared-utils`, `shared-ui`, `utils` or `data-access` libraries.

#### UI vs Shared UI

Code in `ui` should be domain specific where in `shared-ui` it should be generic (used by other domains/applications).

### Feature

#### What is it?

A feature library contains a set of files that configure a business use case or a page in an application.
Feature is a whole page, where UI is a small subset of such page. Feature may contain multiple pages.

#### Naming Convention

feature (if nested) or feature-\* (e.g., feature-home).

#### Dependency Constraints

A feature library can depend on `shared-design-system`, `shared-utils`, `shared-ui`, `utils`, `data-access` or `ui` libraries.

## Multiple dimensions

There are multiple dimensions used to enforce `project` dependencies.

> Each project should have two dimensions.

### First dimension - type

Distinction between library type:

- `type:shared/design-system`
- `type:shared/theme`
- `type:shared/utils`
- `type:shared/ui`
- `type:utils`
- `type:data-access`
- `type:ui`
- `type:feature`

### Second dimension - scope vs scope shared

Distinction between `shared` (across all domains) and `scope` (domain specific code)

- `scope:shared` - tag which allows to share across all domains
- `scope:*`, where `*` should be changed to specific domain name

Currently, there is 1 domain:

- `map`

# Project vocabulary

- `project`- project is a `NX` term. `Project` may be either an `application` or `library`.
- `tag` - Tags are generic mechanism for expressing constraints on project dependencies. Check [docs/nx.md#tags](./docs/tags.md#tags) file for more detailed information about tags.
