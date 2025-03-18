import { IHelpContent } from '@ukri/shared/ui/help';
const translationPath = 'MAP.ACTION_CREATOR_PANEL.HELP';

export const helpContentConfig: IHelpContent = {
  TITLE: 'TITLE',
  INTRO: 'INTRO',
  TRANSLATION_PATH: translationPath,
  QUESTIONS: [
    {
      SECTION_ID: 'GETTING_STARTED_WITH_AC',
      CONTENT: [
        {
          QUESTION_ID: 'WHAT_IS_THE_AC',
        },
        {
          QUESTION_ID: 'HOW_TO_CREATE_WORKFLOW_IN_THE_AC',
        },
        {
          QUESTION_ID: 'WHAT_ARE_THE_DIFFERENT_WORKFLOW_BLOCKS',
        },
        {
          QUESTION_ID: 'HOW_DO_I_SELECT_A_DATASET_FOR_MY_WORKFLOW',
        },
        {
          QUESTION_ID: 'HOW_DO_I_SELECT_WORKFLOW_FUNCTIONS',
        },
        {
          QUESTION_ID: 'HOW_DO_I_SELECT_AOI_AND_DATE_RANGE',
        },
        {
          QUESTION_ID: 'WHAT_IS_THE_DIFFERENCE_BETWEEN_THE_WORKFLOW_AND_HISTORY_TABS',
        },
        {
          QUESTION_ID: 'WHAT_ARE_WORKFLOW_PRESETS_AND_HOW_DO_I_USE_THEM',
        },
        {
          QUESTION_ID: 'HOW_DO_I_DOWNLOAD_A_WORKFLOW_OR_SEARCH_RESULTS',
        },
      ],
    },
    {
      SECTION_ID: 'MANAGING_DATASETS_AND_FUNCTIONS_IN_AC',
      CONTENT: [
        // to be hidden for now
        // {
        //   QUESTION_ID: 'HOW_TO_ADD_COMERCIAL_DATASETS',
        // },
        {
          QUESTION_ID: 'HOW_TO_USE_MULTIPLE_FUNCTIONS',
        },
      ],
    },
    {
      SECTION_ID: 'EXECUTING_AND_TRACKING_WORKFLOWS',
      CONTENT: [
        {
          QUESTION_ID: 'HOW_DO_I_VIEW_WORKFLOW_EXECUTION_RESULTS',
        },
        {
          QUESTION_ID: 'HOW_TO_FILTER_RESULTS_WITH_TIME_SLIDER',
        },
        {
          QUESTION_ID: 'HOW_DO_I_TRACK_THE_EXECUTION_PROGRESS_OF_MY_WORKFLOW',
        },
        {
          QUESTION_ID: 'HOW_DO_I_VIEW_WORKFLOW_EXECUTION_NOTIFICATIONS',
        },
        {
          QUESTION_ID: 'WHAT_HAPPENS_IF_I_SWITCH_TO_ACTION_CREATOR_WHILE_HAVING_A_SEARCH_SESSION_ACTIVE',
        },
        {
          QUESTION_ID: 'CAN_I_SAVE_MY_WORKFLOW_FOR_FUTURE_USE',
        },
        {
          QUESTION_ID: 'WHAT_HAPPENS_IF_I_RUN_MULTIPLE_WORKFLOWS_AT_THE_SAME_TIME',
        },
        {
          QUESTION_ID: 'HOW_DO_I_CANCEL_A_RUNNING_WORKFLOW',
        },
        {
          QUESTION_ID: 'HOW_DO_I_ACCESS_MY_SAVED_WORKFLOW_RESULTS_OR_CONFIGURATION',
        },
      ],
    },
    {
      SECTION_ID: 'WORKING_WITH_ACTIONS',
      CONTENT: [
        {
          QUESTION_ID: 'WHAT_IS_LAND_COVER_CHANGE_SCENARIO',
        },
        {
          QUESTION_ID: 'WHAT_IS_WATER_QUALITY_SCENARIO',
          LINKS: {
            POTES_CYA: 'https://piahs.copernicus.org/articles/380/73/2018/',
            SENTINEL_2_WATER_MASK:
              'http://www.informacjakryzysowa.pl/en/publikacje1/sentinel-water-mask-(swm)-new-index-for-water-detection-on-sentinel-2-images',
            ZHAN_TURB: 'http://dx.doi.org/10.23818/limn.41.18',
            SORIA_PERPINYA_CDOM: 'https://www.mdpi.com/2073-4441/13/5/686',
            POTES_DOC: 'https://piahs.copernicus.org/articles/380/73/2018/',
            SENTINEL_2_NDWI: 'https://custom-scripts.sentinel-hub.com/custom-scripts/sentinel-2/ndwi/',
          },
        },
        {
          QUESTION_ID: 'WHAT_IS_THE_COLOR_CODING_FOR_LAND_COVER_CHANGE_CLASSES',
        },
        {
          QUESTION_ID: 'WHAT_IS_THE_COLOUR_CODING_FOR_WATER_QUALITY_ANALYSIS',
        },
        {
          QUESTION_ID: 'WHAT_IS_THE_COLOUR_CODING_FOR_NDVI',
        },
        {
          QUESTION_ID: 'WHAT_IS_THE_COLOUR_CODING_FOR_EVI',
        },
        {
          QUESTION_ID: 'WHAT_IS_THE_COLOUR_CODING_FOR_SAVI',
        },
      ],
    },
    {
      SECTION_ID: 'WORKING_WITH_GRAPHS',
      CONTENT: [
        {
          QUESTION_ID: 'HOW_DO_I_VIEW_GRAPHS_FOR_MY_DATA',
        },
        {
          QUESTION_ID: 'WHAT_TYPES_OF_GRAPHS_ARE_AVAILABLE_AND_WHAT_DO_THEY_REPRESENT',
        },
        {
          QUESTION_ID: 'HOW_DO_I_ADJUST_THE_TIME_RANGE_DISPLAYED_ON_GRAPHS',
        },
      ],
    },
    {
      SECTION_ID: 'MEASUREMENT_AOI_MANAGEMENT',
      CONTENT: [
        {
          QUESTION_ID: 'HOW_DO_I_MEASURE_DISTANCES_AND_AREAS_ON_THE_MAP',
        },
      ],
    },
    {
      SECTION_ID: 'COMPARISON_AND_LAYER_MANAGEMENT',
      CONTENT: [
        {
          QUESTION_ID: 'HOW_DO_I_USE_THE_COMPARISON_TOOL',
        },
      ],
    },
  ],
};

export const getHelpContent = (skipQuestionIds: string[] = []): IHelpContent => {
  return {
    ...helpContentConfig,
    QUESTIONS: helpContentConfig.QUESTIONS.map((question) => ({
      ...question,
      CONTENT: question.CONTENT.filter((content) => !skipQuestionIds.includes(content.QUESTION_ID)),
    })),
  };
};
