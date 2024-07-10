# Storybook host

It hosts all storybooks from all apps and all libraries. 

## Running storybook

Run `npm run storybook` (or `nx storybook storybook-host`)

## Building storybook

Run `nx build-storybook storybook-host`

## Running storybook unit tests

Make sure storybook is running -> `npm run storybook`

Run `npm run test:storybook` (or `nx test-storybook storybook-host`) to execute the unit tests via [Jest](https://jestjs.io).

## Storybook structure

In order to maintain correct structure of storybook, we need to give proper title to each story, eg. we want to add to storybook component from folder `libs/shared/ui/button` then the title of this story would be:

```
const meta: Meta<typeof TButton> = {
  component: TButton,
  title: 'libs/shared/ui/Button',
};
```

Same goes for stories from `apps/eodh-fe` folder.
