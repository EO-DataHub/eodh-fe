import { IHelpContent } from '@ukri/shared/ui/help';
export const translationPath = 'MAP.GENERAL_HELP_MODAL';

export const helpContentConfig: IHelpContent = {
  INTRO: 'INTRO',
  TRANSLATION_PATH: translationPath,
  QUESTIONS: [
    {
      SECTION_ID: 'GENERAL_FUNCIONALITY',
      CONTENT: [
        {
          QUESTION_ID: 'WHAT_IS_EOPRO',
        },
        {
          QUESTION_ID: 'HOW_DO_I_GET_STARTED',
        },
        {
          QUESTION_ID: 'DO_I_NEED_ACCOUNT',
        },
        {
          QUESTION_ID: 'HOW_DO_I_LOG_IN',
          LINKS: {
            ACCOUNT_SETUP: 'https://staging.eodatahub.org.uk/docs/account-setup/',
          },
        },
      ],
    },
    {
      SECTION_ID: 'SEARCH_MODULE_FUNCIONALITY',
      CONTENT: [
        {
          QUESTION_ID: 'WHAT_IS_THE_SEARCH_MODULE',
        },
        {
          QUESTION_ID: 'HOW_DO_I_SELECT_A_DATA_SET_AS_PART_OF_A_SEARCH',
        },
        {
          QUESTION_ID: 'WHAT_IS_SENTINEL_2_ARD',
        },
        {
          QUESTION_ID: 'HOW_DO_I_DEFINE_AN_AREA_OF_INTEREST_AOI',
        },
        {
          QUESTION_ID: 'HOW_DO_I_SET_A_DATE_RANGE_FOR_MY_SEARCH',
        },
        {
          QUESTION_ID: 'WHAT_HAPPENS_WHEN_I_RUN_A_SEARCH',
        },
        {
          QUESTION_ID: 'HOW_DO_I_REFINE_OR_MODIFY_MY_SEARCH_PARAMETERS',
        },
        {
          QUESTION_ID: 'HOW_DO_I_USE_ADVANCED_SEARCH_OPTIONS_FOR_DATASETS',
        },
        {
          QUESTION_ID: 'WHAT_IS_THE_DIFFERENCE_BETWEEN_PUBLIC_AND_COMMERCIAL_DATASETS',
        },
      ],
    },
    {
      SECTION_ID: 'INTERPRETING_SEARCH_RESULTS',
      CONTENT: [
        {
          QUESTION_ID: 'WHAT_ARE_FOOTPRINTS_ON_THE_MAP',
        },
      ],
    },
    {
      SECTION_ID: 'VIEWING_AND_PURCHASING_SEARCH_RESULTS',
      CONTENT: [
        {
          QUESTION_ID: 'HOW_DO_I_VIEW_AN_ITEM_FROM_THE_SEARCH_RESULTS',
        },
        // to be hidden for now
        // {
        //   QUESTION_ID: 'HOW_DO_I_PURCHASE_COMMERCIAL_DATA',
        // },
        // {
        //   QUESTION_ID: 'HOW_DO_I_DISPLAY_PURCHASED_ITEMS_ON_THE_MAP',
        // },
      ],
    },
    {
      SECTION_ID: 'TIME_MANAGEMENT_IN_SEARCH',
      CONTENT: [
        {
          QUESTION_ID: 'HOW_DOES_THE_TIME_SLIDER_AFFECT_SEARCH_RESULTS',
        },
      ],
    },
    {
      SECTION_ID: 'COMPARISON_AND_EXPORTING',
      CONTENT: [
        {
          QUESTION_ID: 'HOW_DO_I_ADD_SEARCH_RESULTS_TO_THE_COMPARISON_TOOL',
        },
      ],
    },
    {
      SECTION_ID: 'GENERAL_FEATURES_USER_SETTINGS',
      CONTENT: [
        {
          QUESTION_ID: 'HOW_DO_I_HIDE_FOOTPRINTS_OR_AOI_TO_BETTER_SEE_MY_SELECTED_IMAGERY',
        },
      ],
    },
  ],
};
