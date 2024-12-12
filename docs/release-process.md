# Table of Contents

- [Branch naming convention](#Branch-naming-convention)
  - [Feature and hotfix branch name convention](#Feature-and-hotfix-branch-name-convention)
  - [Release branch name convention](#Release-branch-name-convention)
  - [Valid branch names](#Valid-branch-names)
- [Development process](#Development-process)
- [Release process](#Release-process)
  - [Release process steps](#Release-process-steps)
  - [Git hooks](#Git-hooks)
  - [Required steps on pipelines](#Required-steps-on-pipelines)
- [Hotfixes](#Hotfixes)
  - [Bug on production](#Bug-on-production)

# Branch naming convention

There are five types of branches:

- `main` - branch which is up to date with production environment. This branch is used as a reference for current production changes
- `develop` - main development branch. New branches are created from here
- `feature` - feature branch
- `hotfix` - hotfix branch
- `release` - release branch

Branches `main` and `develop` are special. There should be only one `develop` and only one `main` branch.

### Feature and hotfix branch name convention

Each branch name should include:

- prefix
- ticket id
- ticket name/description

### Release branch name convention

Available prefixes:

- release prefix
- `v` + version number

### Valid branch names

- `feature/UKRIW-1-graph-poc`
- `hotfix/UKRIW-1-fix-for-wrong-color-in-top-bar-menu`
- `release/v0.1.0`

# Development process

1. New `feature` branch should be created from `develop` branch.
2. All progress should be made in newly created `feature` branch. When work is finished PR should be created, `feature` branch should be merged to `develop`.
3. If there are changes in develop, branch should be updated (before passing it to code review process).
4. When code review process is finished, branch can be merged, `merge all changes` strategy should be used.

```
Branches should be merged in the same order as features in backlog.
Most crutial features should be merged first. Otherwise there may be a need for usage of feature flag functionality.
```

# Release process

Adjusted `GitFlow` is used - instead of testing from feature branches, we do tests from `develop` branch. Further reading: [Atlassian GitFlow](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow).

## Release process visualization

![Release process flow](./schemas/release-process-flow.png)

## Release process steps

1. Create new `release` branch from `develop` branch. Choose commit which should be released. It doesn't have to be the latest one - it should be the latest which will include tested feature.
2. Create pull request from newly created `release` branch to `main` branch.
3. Deploy newly created `release` into staging. QA team should proceed with regression.
   1. Go to [GitHub Actions page](https://github.com/EO-DataHub/eodh-fe/actions).
   2. Find Workflow you want to deploy.
   3. In deploy section click deploy on QA.
   4. In deploy section click deploy on Staging.
4. If any bugs are found, fix them on release branch as additional commits. Commit message should be the same as after merging branch.
5. Bump version number in `package.json` file. Run `npm install` to bump version in `package-lock.json`.
6. Tag version in git using `git tag` command, eg `git tag vX.X.X` where `X.X.X` is new version number.
7. Merge `release` branch into `main` branch. `Create a merge commit` strategy should be used. Merge message should include all ticket numbers related to this PR in square parentheses, eg: `[UKRIW-XXX] [UKRIW-YYY]`.
8. Create new pull request `main` -> `develop`. It has to be done, otherwise there will be difference in commits between those two branches.
9. Merge newly created pull request from previous step. `Squash and merge` strategy should be used. Merge message should include all ticket numbers related to this PR in square parentheses, eg: `[UKRIW-XXX] [UKRIW-YYY]`.
10. Generate release notes (from branch `main`).
11. Update all jira tickets that went to this release:
    1. Update field `DEPLOYED TO`.
    2. Update field `Fix versions`.
    3. Change field status into `DONE`.

### Git hooks

`husky` is used for git hooks:

- `pre-push` - test and linters are required to pass
- `pre-commit` - conventional commit naming convention for commit message is required

### Required steps on pipelines

All linters and tests has to pass on pipelines.
Before sending any changes make sure you run those commands:

- `npm run test:unit` - check if all test pass
- `npm run code:fix` - format code

## Hotfixes

### Bug on production

Sometimes there is a need to fix a bug which occur on production.

Steps:

1. Create new branch `hotfix` from `main` branch. Branch name should follow naming convention.
2. Fix bug.
3. Create pull request `hotfix` -> `main`.
4. Test bug.
5. On the `hotfix` branch bump the version number in `package.json` file. Run `npm install` to bump version in `package-lock.json`.
6. On the `hotfix` branch tag the version in git using `git tag` command, e.g. `git tag vX.X.X` where `X.X.X` is new version number.
7. Merge bug into `main`. `Squash and merge` strategy should be used. Commit message should include: new version number, ticket number (in square parentheses, eg: `[UKRIW-XXX]`) and description.
8. Merge back hotfix into `develop` branch:
   1. Create pull request from `main` to `develop`.
   2. Merge newly created pull request. `Squash and merge` strategy should be used. Commit message should include: new version number, ticket number (in square parentheses, eg: `[UKRIW-XXX]`) and description.
