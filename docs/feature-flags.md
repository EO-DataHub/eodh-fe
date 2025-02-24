# Table of Contents

- [Available Feature Flags](#Available-Feature-Flags)
- [Enabling/disabling Feature Flags](#Enablingdisabling-Feature-Flags)
- [Default behaviour](#Default-behaviour)
- [Add new Feature Flags](#Add-new-Feature-Flags)
  - [Testing on environments](#Testing-on-environments)
- [Remove Feature Flags](#Remove-Feature-Flags)

# Available Feature Flags

- `download asset functionality` - `APP_FEATURE_FLAG_DOWNLOAD_ASSET`

# Enabling/disabling Feature Flags

1. Go to `Settings` tab in GitHub EODH repository.
2. Click `Environments` in left side menu.
3. Click on environment you want to configure.
4. Go to `Environment variables` section.
5. Check if flag is already added, if yes click edit and skip next point.
6. Click `Add environment variable` button.
7. As a name use one of Available Feature Flags, as a value use:

- `true` if flag should be enabled
- `false` if flag should be disabled

# Default behaviour

If flag isn't added or value is different from `true` then feature will be hidden.

# Add new Feature Flags

1. New Feature Flags should be added in the repository:

- `apps/edoh-fe/public/config.js`
- `apps/edoh-fe/src/env/env.config.ts`
- `apps/edoh-fe/.env.example`
- `apps/storybook-host/public/assets/config.js`
- `apps/storybook-host/.storybook/config/env.config.ts`
- `apps/storybook-host/.env.example`
- `libs/shared/utils/feature-flag`

2. You can use new Feature Flag using `useFeatureFlag` hook.

## Testing on environments

Flag should be added for `dev`, `qa`, `staging` and `prod` environments. To do this go through process described in [Enabling/disabling Feature Flags](#Enablingdisabling-Feature-Flags) for each environment.

# Remove Feature Flags

1. Feature Flags should be removed from:

- `apps/edoh-fe/public/config.js`
- `apps/edoh-fe/src/env/env.config.ts`
- `apps/edoh-fe/.env.example`
- `apps/storybook-host/public/assets/config.js`
- `apps/storybook-host/.storybook/config/env.config.ts`
- `apps/storybook-host/.env.example`
- `libs/shared/utils/feature-flag`
- any place that it is using feature flag (each if condition should be removed).

Feature flags should be removed for features that doesn't require them before release to `Staging` environment.
