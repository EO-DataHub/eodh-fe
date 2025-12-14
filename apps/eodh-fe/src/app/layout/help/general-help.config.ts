import { IHelpConfig } from '@ukri/shared/ui/help';

const T = 'MAP.GENERAL_HELP_MODAL';

export const generalHelpConfig: IHelpConfig = {
  id: 'general-help',
  intro: `${T}.INTRO`,
  backButtonText: `${T}.BACK_BTN`,
  sections: [
    {
      id: 'GENERAL_FUNCIONALITY',
      title: `${T}.QUESTIONS.GENERAL_FUNCIONALITY.SUBTITLE`,
      questions: [
        {
          id: 'WHAT_IS_EOPRO',
          question: `${T}.QUESTIONS.GENERAL_FUNCIONALITY.WHAT_IS_EOPRO.QUESTION`,
          answer: [
            { type: 'text', content: `${T}.QUESTIONS.GENERAL_FUNCIONALITY.WHAT_IS_EOPRO.ANSWER_TEXT_1` },
            {
              type: 'styled-text',
              segments: [
                { text: `${T}.QUESTIONS.GENERAL_FUNCIONALITY.WHAT_IS_EOPRO.ANSWER_NOTE_BOLD`, style: 'bold' },
                { text: `${T}.QUESTIONS.GENERAL_FUNCIONALITY.WHAT_IS_EOPRO.ANSWER_NOTE_TEXT` },
              ],
            },
          ],
        },
        {
          id: 'HOW_DO_I_GET_STARTED',
          question: `${T}.QUESTIONS.GENERAL_FUNCIONALITY.HOW_DO_I_GET_STARTED.QUESTION`,
          answer: [
            { type: 'text', content: `${T}.QUESTIONS.GENERAL_FUNCIONALITY.HOW_DO_I_GET_STARTED.ANSWER_TEXT_1` },
            { type: 'text', content: `${T}.QUESTIONS.GENERAL_FUNCIONALITY.HOW_DO_I_GET_STARTED.ANSWER_TEXT_2` },
          ],
        },
        {
          id: 'DO_I_NEED_ACCOUNT',
          question: `${T}.QUESTIONS.GENERAL_FUNCIONALITY.DO_I_NEED_ACCOUNT.QUESTION`,
          answer: [{ type: 'text', content: `${T}.QUESTIONS.GENERAL_FUNCIONALITY.DO_I_NEED_ACCOUNT.ANSWER_TEXT` }],
        },
        {
          id: 'HOW_DO_I_LOG_IN',
          question: `${T}.QUESTIONS.GENERAL_FUNCIONALITY.HOW_DO_I_LOG_IN.QUESTION`,
          answer: [{ type: 'text', content: `${T}.QUESTIONS.GENERAL_FUNCIONALITY.HOW_DO_I_LOG_IN.ANSWER_TEXT` }],
        },
      ],
    },
    {
      id: 'SEARCH_MODULE_FUNCIONALITY',
      title: `${T}.QUESTIONS.SEARCH_MODULE_FUNCIONALITY.SUBTITLE`,
      questions: [
        {
          id: 'WHAT_IS_THE_SEARCH_MODULE',
          question: `${T}.QUESTIONS.SEARCH_MODULE_FUNCIONALITY.WHAT_IS_THE_SEARCH_MODULE.QUESTION`,
          answer: [
            {
              type: 'text',
              content: `${T}.QUESTIONS.SEARCH_MODULE_FUNCIONALITY.WHAT_IS_THE_SEARCH_MODULE.ANSWER_TEXT`,
            },
          ],
        },
        {
          id: 'HOW_DO_I_SELECT_A_DATA_SET_AS_PART_OF_A_SEARCH',
          question: `${T}.QUESTIONS.SEARCH_MODULE_FUNCIONALITY.HOW_DO_I_SELECT_A_DATA_SET_AS_PART_OF_A_SEARCH.QUESTION`,
          answer: [
            {
              type: 'text',
              content: `${T}.QUESTIONS.SEARCH_MODULE_FUNCIONALITY.HOW_DO_I_SELECT_A_DATA_SET_AS_PART_OF_A_SEARCH.ANSWER_TEXT`,
            },
          ],
        },
        {
          id: 'WHAT_IS_SENTINEL_2_ARD',
          question: `${T}.QUESTIONS.SEARCH_MODULE_FUNCIONALITY.WHAT_IS_SENTINEL_2_ARD.QUESTION`,
          answer: [
            { type: 'text', content: `${T}.QUESTIONS.SEARCH_MODULE_FUNCIONALITY.WHAT_IS_SENTINEL_2_ARD.ANSWER_TEXT` },
          ],
        },
        {
          id: 'HOW_DO_I_DEFINE_AN_AREA_OF_INTEREST_AOI',
          question: `${T}.QUESTIONS.SEARCH_MODULE_FUNCIONALITY.HOW_DO_I_DEFINE_AN_AREA_OF_INTEREST_AOI.QUESTION`,
          answer: [
            {
              type: 'text',
              content: `${T}.QUESTIONS.SEARCH_MODULE_FUNCIONALITY.HOW_DO_I_DEFINE_AN_AREA_OF_INTEREST_AOI.ANSWER_TEXT`,
            },
          ],
        },
        {
          id: 'HOW_DO_I_SET_A_DATE_RANGE_FOR_MY_SEARCH',
          question: `${T}.QUESTIONS.SEARCH_MODULE_FUNCIONALITY.HOW_DO_I_SET_A_DATE_RANGE_FOR_MY_SEARCH.QUESTION`,
          answer: [
            {
              type: 'text',
              content: `${T}.QUESTIONS.SEARCH_MODULE_FUNCIONALITY.HOW_DO_I_SET_A_DATE_RANGE_FOR_MY_SEARCH.ANSWER_TEXT`,
            },
          ],
        },
        {
          id: 'WHAT_HAPPENS_WHEN_I_RUN_A_SEARCH',
          question: `${T}.QUESTIONS.SEARCH_MODULE_FUNCIONALITY.WHAT_HAPPENS_WHEN_I_RUN_A_SEARCH.QUESTION`,
          answer: [
            {
              type: 'text',
              content: `${T}.QUESTIONS.SEARCH_MODULE_FUNCIONALITY.WHAT_HAPPENS_WHEN_I_RUN_A_SEARCH.ANSWER_TEXT`,
            },
          ],
        },
        {
          id: 'HOW_DO_I_REFINE_OR_MODIFY_MY_SEARCH_PARAMETERS',
          question: `${T}.QUESTIONS.SEARCH_MODULE_FUNCIONALITY.HOW_DO_I_REFINE_OR_MODIFY_MY_SEARCH_PARAMETERS.QUESTION`,
          answer: [
            {
              type: 'list',
              items: [
                `${T}.QUESTIONS.SEARCH_MODULE_FUNCIONALITY.HOW_DO_I_REFINE_OR_MODIFY_MY_SEARCH_PARAMETERS.ITEM_1`,
                `${T}.QUESTIONS.SEARCH_MODULE_FUNCIONALITY.HOW_DO_I_REFINE_OR_MODIFY_MY_SEARCH_PARAMETERS.ITEM_2`,
                `${T}.QUESTIONS.SEARCH_MODULE_FUNCIONALITY.HOW_DO_I_REFINE_OR_MODIFY_MY_SEARCH_PARAMETERS.ITEM_3`,
                `${T}.QUESTIONS.SEARCH_MODULE_FUNCIONALITY.HOW_DO_I_REFINE_OR_MODIFY_MY_SEARCH_PARAMETERS.ITEM_4`,
              ],
            },
          ],
        },
        {
          id: 'HOW_DO_I_USE_ADVANCED_SEARCH_OPTIONS_FOR_DATASETS',
          question: `${T}.QUESTIONS.SEARCH_MODULE_FUNCIONALITY.HOW_DO_I_USE_ADVANCED_SEARCH_OPTIONS_FOR_DATASETS.QUESTION`,
          answer: [
            {
              type: 'text',
              content: `${T}.QUESTIONS.SEARCH_MODULE_FUNCIONALITY.HOW_DO_I_USE_ADVANCED_SEARCH_OPTIONS_FOR_DATASETS.ANSWER_TEXT`,
            },
          ],
        },
        {
          id: 'WHAT_IS_THE_DIFFERENCE_BETWEEN_PUBLIC_AND_COMMERCIAL_DATASETS',
          question: `${T}.QUESTIONS.SEARCH_MODULE_FUNCIONALITY.WHAT_IS_THE_DIFFERENCE_BETWEEN_PUBLIC_AND_COMMERCIAL_DATASETS.QUESTION`,
          answer: [
            {
              type: 'list',
              items: [
                `${T}.QUESTIONS.SEARCH_MODULE_FUNCIONALITY.WHAT_IS_THE_DIFFERENCE_BETWEEN_PUBLIC_AND_COMMERCIAL_DATASETS.ITEM_1`,
                `${T}.QUESTIONS.SEARCH_MODULE_FUNCIONALITY.WHAT_IS_THE_DIFFERENCE_BETWEEN_PUBLIC_AND_COMMERCIAL_DATASETS.ITEM_2`,
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'INTERPRETING_SEARCH_RESULTS',
      title: `${T}.QUESTIONS.INTERPRETING_SEARCH_RESULTS.SUBTITLE`,
      questions: [
        {
          id: 'WHAT_ARE_FOOTPRINTS_ON_THE_MAP',
          question: `${T}.QUESTIONS.INTERPRETING_SEARCH_RESULTS.WHAT_ARE_FOOTPRINTS_ON_THE_MAP.QUESTION`,
          answer: [
            {
              type: 'text',
              content: `${T}.QUESTIONS.INTERPRETING_SEARCH_RESULTS.WHAT_ARE_FOOTPRINTS_ON_THE_MAP.ANSWER_TEXT`,
            },
          ],
        },
      ],
    },
    {
      id: 'VIEWING_AND_PURCHASING_SEARCH_RESULTS',
      title: `${T}.QUESTIONS.VIEWING_AND_PURCHASING_SEARCH_RESULTS.SUBTITLE`,
      questions: [
        {
          id: 'HOW_DO_I_VIEW_AN_ITEM_FROM_THE_SEARCH_RESULTS',
          question: `${T}.QUESTIONS.VIEWING_AND_PURCHASING_SEARCH_RESULTS.HOW_DO_I_VIEW_AN_ITEM_FROM_THE_SEARCH_RESULTS.QUESTION`,
          answer: [
            {
              type: 'text',
              content: `${T}.QUESTIONS.VIEWING_AND_PURCHASING_SEARCH_RESULTS.HOW_DO_I_VIEW_AN_ITEM_FROM_THE_SEARCH_RESULTS.ANSWER_TEXT`,
            },
          ],
        },
      ],
    },
    {
      id: 'TIME_MANAGEMENT_IN_SEARCH',
      title: `${T}.QUESTIONS.TIME_MANAGEMENT_IN_SEARCH.SUBTITLE`,
      questions: [
        {
          id: 'HOW_DOES_THE_TIME_SLIDER_AFFECT_SEARCH_RESULTS',
          question: `${T}.QUESTIONS.TIME_MANAGEMENT_IN_SEARCH.HOW_DOES_THE_TIME_SLIDER_AFFECT_SEARCH_RESULTS.QUESTION`,
          answer: [
            {
              type: 'text',
              content: `${T}.QUESTIONS.TIME_MANAGEMENT_IN_SEARCH.HOW_DOES_THE_TIME_SLIDER_AFFECT_SEARCH_RESULTS.ANSWER_TEXT`,
            },
          ],
        },
      ],
    },
    {
      id: 'COMPARISON_AND_EXPORTING',
      title: `${T}.QUESTIONS.COMPARISON_AND_EXPORTING.SUBTITLE`,
      questions: [
        {
          id: 'HOW_DO_I_ADD_SEARCH_RESULTS_TO_THE_COMPARISON_TOOL',
          question: `${T}.QUESTIONS.COMPARISON_AND_EXPORTING.HOW_DO_I_ADD_SEARCH_RESULTS_TO_THE_COMPARISON_TOOL.QUESTION`,
          answer: [
            {
              type: 'text',
              content: `${T}.QUESTIONS.COMPARISON_AND_EXPORTING.HOW_DO_I_ADD_SEARCH_RESULTS_TO_THE_COMPARISON_TOOL.ANSWER_TEXT`,
            },
          ],
        },
      ],
    },
    {
      id: 'GENERAL_FEATURES_USER_SETTINGS',
      title: `${T}.QUESTIONS.GENERAL_FEATURES_USER_SETTINGS.SUBTITLE`,
      questions: [
        {
          id: 'HOW_DO_I_HIDE_FOOTPRINTS_OR_AOI_TO_BETTER_SEE_MY_SELECTED_IMAGERY',
          question: `${T}.QUESTIONS.GENERAL_FEATURES_USER_SETTINGS.HOW_DO_I_HIDE_FOOTPRINTS_OR_AOI_TO_BETTER_SEE_MY_SELECTED_IMAGERY.QUESTION`,
          answer: [
            {
              type: 'text',
              content: `${T}.QUESTIONS.GENERAL_FEATURES_USER_SETTINGS.HOW_DO_I_HIDE_FOOTPRINTS_OR_AOI_TO_BETTER_SEE_MY_SELECTED_IMAGERY.ANSWER_TEXT`,
            },
          ],
        },
      ],
    },
  ],
};
