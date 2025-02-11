export const translationPath = 'MAP.ACTION_CREATOR_PANEL.HELP';

interface IQuestion {
  QUESTION_ID: string;
}

interface ISection {
  SECTION_ID: string;
  CONTENT: IQuestion[];
}

interface IHelpContent {
  TITLE: string;
  INTRO: string;
  QUESTIONS: ISection[];
}

const helpContentTranslationKeys: IHelpContent = {
  TITLE: 'TITLE',
  INTRO: 'INTRO',
  QUESTIONS: [
    {
      SECTION_ID: 'GENERAL_FUNCIONALITY',
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
          QUESTION_ID: 'WHAT_IS_THE_DIFFERENCE_BETWEEN_THE_WORKFLOW_AND_HISTORY_TABS',
        },
        {
          QUESTION_ID: 'WHAT_ARE_WORKFLOW_PRESETS_AND_HOW_DO_I_USE_THEM',
        },
        {
          QUESTION_ID: 'WHAT_IS_THE_COLOR_CODING_FOR_LAND_COVER_CHANGE_CLASSES',
        },
      ],
    },
    {
      SECTION_ID: 'MANAGING_DATASETS_AND_FUNCTIONS_IN_AC',
      CONTENT: [
        {
          QUESTION_ID: 'HOW_TO_ADD_COMERCIAL_DATASETS',
        },
        {
          QUESTION_ID: 'HOW_TO_USE_MULTIPLE_FUNCTIONS',
        },
        {
          QUESTION_ID: 'HOW_TO_FILTER_RESULTS_WITH_TIME_SLIDER',
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

const checkForDuplicateQuestionIds = (content: IHelpContent): string[] => {
  const questionIds = new Set<string>();
  const duplicates = new Set<string>();

  function traverseContent(content: IQuestion[] | ISection | IHelpContent) {
    if (Array.isArray(content)) {
      content.forEach((item: IQuestion) => {
        if (item.QUESTION_ID) {
          if (questionIds.has(item.QUESTION_ID)) {
            duplicates.add(item.QUESTION_ID);
          } else {
            questionIds.add(item.QUESTION_ID);
          }
        }
      });
    } else if (content && typeof content === 'object') {
      if ('QUESTION_ID' in content) {
        if (questionIds.has((content as IQuestion).QUESTION_ID)) {
          duplicates.add((content as IQuestion).QUESTION_ID);
        } else {
          questionIds.add(content.QUESTION_ID as string);
        }
      }
      Object.values(content).forEach((value) => traverseContent(value));
    }
  }

  traverseContent(content);
  return Array.from(duplicates);
};

interface IHelpContentWithTranslations {
  TITLE: string;
  INTRO: string;
  QUESTIONS: {
    SECTION_ID: string;
    SECTION_TRANSLATION: string;
    CONTENT: {
      UNIQUE_QUESTION_ID: string;
      UNIQUE_ANSWER_ID: string;
      QUESTION_TRANSLATION: string;
      ANSWER_TRANSLATION: string;
    }[];
  }[];
}

export const helpContentWithTranslations = (): IHelpContentWithTranslations => {
  const helpContentTranslationUniqueKeys = checkForDuplicateQuestionIds(helpContentTranslationKeys);
  if (helpContentTranslationUniqueKeys.length > 0) {
    // eslint-disable-next-line no-console
    console.error(`Duplicate QUESTION_IDs found: ${helpContentTranslationUniqueKeys.join(', ')}`);
  }
  return {
    TITLE: `${translationPath}.${helpContentTranslationKeys.TITLE}`,
    INTRO: `${translationPath}.${helpContentTranslationKeys.INTRO}`,
    QUESTIONS: helpContentTranslationKeys.QUESTIONS.map((category) => ({
      SECTION_ID: category.SECTION_ID,
      SECTION_TRANSLATION: `${translationPath}.QUESTIONS.${category.SECTION_ID}.SUBTITLE`,
      CONTENT: category.CONTENT.map((question) => ({
        UNIQUE_QUESTION_ID: `${category.SECTION_ID}_${question.QUESTION_ID}_question`,
        UNIQUE_ANSWER_ID: `${category.SECTION_ID}_${question.QUESTION_ID}_answer`,
        QUESTION_TRANSLATION: `${translationPath}.QUESTIONS.${category.SECTION_ID}.${question.QUESTION_ID}.QUESTION`,
        ANSWER_TRANSLATION: `${translationPath}.QUESTIONS.${category.SECTION_ID}.${question.QUESTION_ID}.ANSWER`,
      })),
    })),
  };
};
