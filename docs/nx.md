**Nx is a set of Extensible Dev Tools.**

# Table of Contents

- [Folder structure](#Folder-structure)
  - [Mental model](#Mental-model)
    - [Main directories](#Main-directories)
    - [Misconception](#Misconception)
    - [More information](#More-information)
  - [Folder structure in EODH](#Folder-structure-in-EODH)
- [Tags](#Tags)
  - [Additional information](#Additional-information)
- [Important files](#Important-files)
- [Commands](#Commands)
  - [Generate a library](#Generate-a-library)
  - [Development server](#Development-server)
  - [Build](#Build)
  - [Running unit tests](#Running-unit-tests)
  - [Understand your workspace](#Understand-your-workspace)
- [Further help](#Further-help)

# Folder structure

NX is using `project` as a base unit. Project can be either library or application.
Each project has its own `project.json` configuration file.

## Mental model

A common mental model is to see the application as "containers" that link, bundle and compile functionality implemented in libraries for being deployed.

### Main directories

- `apps` - container for applications
- `libs` - container for libraries

Application should be build using multiple libraries.

### Misconception

> Developers new to Nx are initially often hesitant to move their logic into libraries, because they assume it implies that those libraries need to be general purpose and shareable across applications.

**This is a common misconception, moving code into libraries can be done from a pure code organization perspective.**

In fact when organizing libraries you should think about your business domains.

### More information

Visit the [documentation](https://nx.dev/more-concepts/applications-and-libraries) to learn more.

## Folder structure in EODH

Folder structure in EODH is described in [docs/architecture.md](./architecture.md)

# Tags

If you partition your code into well-defined cohesive units, even a small organization will end up with a dozen apps and dozens or hundreds of libs. If all of them can depend on each other freely, chaos will ensue, and the workspace will become unmanageable.

To help with that Nx uses code analysis to make sure projects can only depend on each other's well-defined public API. It also allows you to declaratively impose constraints on how projects can depend on each other.

Tags are generic mechanism for expressing constraints on project dependencies.

Tags are configured in project.json file under `tags` property.

Tags relationship are configured in eslintrc.json file in project root folder using `@nrwl/nx/enforce-module-boundaries` eslint rule.

### Additional information

Check those links if you want to learn more:

- [tags basics](https://nx.dev/core-features/enforce-project-boundaries)
- [tags in multiple dimensions documentation](https://nx.dev/recipes/enforce-module-boundaries/tag-multiple-dimensions)
- [ban dependencies](https://nx.dev/recipes/enforce-module-boundaries/ban-dependencies-with-tags)
- [ban external imports](https://nx.dev/recipes/enforce-module-boundaries/ban-external-imports)
- [allow list](https://nx.dev/recipes/enforce-module-boundaries/tags-allow-list)

# Important files

- `project.json` - project configuration
- `nx.json` - global NX configuration
- `jest.config.ts` - jest configuration
- `tsconfig.json` - typescript project configuration
- `tsconfig.lib.json` - typescript library configuration
- `tsconfig.spec.json` - typescript test configuration

# Commands

### Generate a library

Run `nx g @nrwl/react:lib my-lib` to generate a React library.

Run `nx g @nrwl/web:lib my-lib` to generate a web component library.

Libraries are sharable and can be imported using `@eodh/my-lib`.

### Development server

Run `nx serve eodh-fe` for a dev server. Navigate to http://localhost:4200/. The app will automatically reload if you change any of the source files.

### Build

Run `nx build eodh-fe` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

### Running unit tests

Run `nx test eodh-fe` to execute the unit tests via [Jest](https://jestjs.io).

Run `nx affected:test` to execute the unit tests affected by a change.

### Understand your workspace

Run `nx dep-graph` to see a diagram of the dependencies of your projects.

# Further help

Visit the [Nx Documentation](https://nx.dev) to learn more.
