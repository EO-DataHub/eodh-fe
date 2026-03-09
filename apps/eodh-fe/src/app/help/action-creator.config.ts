import { IHelpConfig } from '@ukri/shared/ui/help';

import landCoverImage from './shared/images/WHAT_IS_LAND_COVER_CHANGES_SCENARIO.png';
import waterQualityImage from './shared/images/WHAT_IS_WATER_QUALITY_ANALYSIS_SCENARIO.png';
import { landCoverConfigs } from './shared/land-cover.config';
import { vegetationIndexImages, waterQualityImages } from './shared/water-quality.config';

const T = 'APP.HELP.ACTION_CREATOR';
const T_Q = `${T}.QUESTIONS`;

export const actionCreatorConfig: IHelpConfig = {
  id: 'action-creator-help',
  title: `${T}.TITLE`,
  intro: `${T}.INTRO`,
  backButtonText: `${T}.BACK_BTN`,
  sections: [
    {
      id: 'GETTING_STARTED_WITH_AC',
      title: `${T_Q}.GETTING_STARTED_WITH_AC.SUBTITLE`,
      questions: [
        {
          id: 'WHAT_IS_THE_AC',
          question: `${T_Q}.GETTING_STARTED_WITH_AC.WHAT_IS_THE_AC.QUESTION`,
          answer: [{ type: 'text', content: `${T_Q}.GETTING_STARTED_WITH_AC.WHAT_IS_THE_AC.ANSWER_TEXT` }],
        },
        {
          id: 'WHAT_IS_USER_WORKSPACE',
          question: `${T_Q}.GETTING_STARTED_WITH_AC.WHAT_IS_USER_WORKSPACE.QUESTION`,
          answer: [{ type: 'text', content: `${T_Q}.GETTING_STARTED_WITH_AC.WHAT_IS_USER_WORKSPACE.ANSWER_TEXT` }],
        },
        {
          id: 'HOW_TO_SWITCH_BETWEEN_WORKSPACES',
          question: `${T_Q}.GETTING_STARTED_WITH_AC.HOW_TO_SWITCH_BETWEEN_WORKSPACES.QUESTION`,
          answer: [
            {
              type: 'list',
              items: [
                `${T_Q}.GETTING_STARTED_WITH_AC.HOW_TO_SWITCH_BETWEEN_WORKSPACES.ANSWER_ITEM_1`,
                `${T_Q}.GETTING_STARTED_WITH_AC.HOW_TO_SWITCH_BETWEEN_WORKSPACES.ANSWER_ITEM_2`,
              ],
            },
          ],
        },
        {
          id: 'HOW_TO_CREATE_WORKFLOW_IN_THE_AC',
          question: `${T_Q}.GETTING_STARTED_WITH_AC.HOW_TO_CREATE_WORKFLOW_IN_THE_AC.QUESTION`,
          answer: [
            {
              type: 'nested-list',
              items: [
                { content: `${T_Q}.GETTING_STARTED_WITH_AC.HOW_TO_CREATE_WORKFLOW_IN_THE_AC.ANSWER_ITEM_1` },
                { content: `${T_Q}.GETTING_STARTED_WITH_AC.HOW_TO_CREATE_WORKFLOW_IN_THE_AC.ANSWER_ITEM_2` },
                {
                  content: `${T_Q}.GETTING_STARTED_WITH_AC.HOW_TO_CREATE_WORKFLOW_IN_THE_AC.ANSWER_ITEM_3`,
                  subItems: [`${T_Q}.GETTING_STARTED_WITH_AC.HOW_TO_CREATE_WORKFLOW_IN_THE_AC.ANSWER_ITEM_3_NOTE`],
                },
              ],
            },
          ],
        },
        {
          id: 'WHAT_ARE_THE_DIFFERENT_WORKFLOW_BLOCKS',
          question: `${T_Q}.GETTING_STARTED_WITH_AC.WHAT_ARE_THE_DIFFERENT_WORKFLOW_BLOCKS.QUESTION`,
          answer: [
            {
              type: 'text',
              content: `${T_Q}.GETTING_STARTED_WITH_AC.WHAT_ARE_THE_DIFFERENT_WORKFLOW_BLOCKS.ANSWER_TEXT_1`,
            },
            {
              type: 'list',
              items: [
                `${T_Q}.GETTING_STARTED_WITH_AC.WHAT_ARE_THE_DIFFERENT_WORKFLOW_BLOCKS.ANSWER_ITEM_1`,
                `${T_Q}.GETTING_STARTED_WITH_AC.WHAT_ARE_THE_DIFFERENT_WORKFLOW_BLOCKS.ANSWER_ITEM_2`,
                `${T_Q}.GETTING_STARTED_WITH_AC.WHAT_ARE_THE_DIFFERENT_WORKFLOW_BLOCKS.ANSWER_ITEM_3`,
                `${T_Q}.GETTING_STARTED_WITH_AC.WHAT_ARE_THE_DIFFERENT_WORKFLOW_BLOCKS.ANSWER_ITEM_4`,
                `${T_Q}.GETTING_STARTED_WITH_AC.WHAT_ARE_THE_DIFFERENT_WORKFLOW_BLOCKS.ANSWER_ITEM_5`,
              ],
            },
            {
              type: 'text',
              content: `${T_Q}.GETTING_STARTED_WITH_AC.WHAT_ARE_THE_DIFFERENT_WORKFLOW_BLOCKS.ANSWER_TEXT_2`,
            },
          ],
        },
        {
          id: 'HOW_DO_I_DEFINE_AN_AREA_OF_INTEREST_AOI',
          question: `${T_Q}.GETTING_STARTED_WITH_AC.HOW_DO_I_DEFINE_AN_AREA_OF_INTEREST_AOI.QUESTION`,
          answer: [
            {
              type: 'text',
              content: `${T_Q}.GETTING_STARTED_WITH_AC.HOW_DO_I_DEFINE_AN_AREA_OF_INTEREST_AOI.ANSWER_TEXT`,
            },
          ],
        },
        {
          id: 'HOW_DO_I_SELECT_A_DATASET_FOR_MY_WORKFLOW',
          question: `${T_Q}.GETTING_STARTED_WITH_AC.HOW_DO_I_SELECT_A_DATASET_FOR_MY_WORKFLOW.QUESTION`,
          answer: [
            {
              type: 'nested-list',
              items: [
                {
                  content: `${T_Q}.GETTING_STARTED_WITH_AC.HOW_DO_I_SELECT_A_DATASET_FOR_MY_WORKFLOW.ANSWER_ITEM_1`,
                  subItems: [
                    `${T_Q}.GETTING_STARTED_WITH_AC.HOW_DO_I_SELECT_A_DATASET_FOR_MY_WORKFLOW.ANSWER_ITEM_1_NOTE`,
                  ],
                },
                { content: `${T_Q}.GETTING_STARTED_WITH_AC.HOW_DO_I_SELECT_A_DATASET_FOR_MY_WORKFLOW.ANSWER_ITEM_2` },
                { content: `${T_Q}.GETTING_STARTED_WITH_AC.HOW_DO_I_SELECT_A_DATASET_FOR_MY_WORKFLOW.ANSWER_ITEM_3` },
                { content: `${T_Q}.GETTING_STARTED_WITH_AC.HOW_DO_I_SELECT_A_DATASET_FOR_MY_WORKFLOW.ANSWER_ITEM_4` },
                { content: `${T_Q}.GETTING_STARTED_WITH_AC.HOW_DO_I_SELECT_A_DATASET_FOR_MY_WORKFLOW.ANSWER_ITEM_5` },
              ],
            },
          ],
        },
        {
          id: 'HOW_DO_I_SELECT_WORKFLOW_FUNCTIONS',
          question: `${T_Q}.GETTING_STARTED_WITH_AC.HOW_DO_I_SELECT_WORKFLOW_FUNCTIONS.QUESTION`,
          answer: [
            {
              type: 'nested-list',
              items: [
                {
                  content: `${T_Q}.GETTING_STARTED_WITH_AC.HOW_DO_I_SELECT_WORKFLOW_FUNCTIONS.ANSWER_ITEM_1`,
                  subItems: [`${T_Q}.GETTING_STARTED_WITH_AC.HOW_DO_I_SELECT_WORKFLOW_FUNCTIONS.ANSWER_ITEM_1_NOTE`],
                },
                { content: `${T_Q}.GETTING_STARTED_WITH_AC.HOW_DO_I_SELECT_WORKFLOW_FUNCTIONS.ANSWER_ITEM_2` },
                {
                  content: `${T_Q}.GETTING_STARTED_WITH_AC.HOW_DO_I_SELECT_WORKFLOW_FUNCTIONS.ANSWER_ITEM_3`,
                  subItems: [`${T_Q}.GETTING_STARTED_WITH_AC.HOW_DO_I_SELECT_WORKFLOW_FUNCTIONS.ANSWER_ITEM_3_NOTE`],
                },
                { content: `${T_Q}.GETTING_STARTED_WITH_AC.HOW_DO_I_SELECT_WORKFLOW_FUNCTIONS.ANSWER_ITEM_4` },
                { content: `${T_Q}.GETTING_STARTED_WITH_AC.HOW_DO_I_SELECT_WORKFLOW_FUNCTIONS.ANSWER_ITEM_5` },
              ],
            },
          ],
        },
        {
          id: 'HOW_AND_WHEN_DO_I_USE_CLIPPING_FUNCTIONS',
          question: `${T_Q}.GETTING_STARTED_WITH_AC.HOW_AND_WHEN_DO_I_USE_CLIPPING_FUNCTIONS.QUESTION`,
          answer: [
            {
              type: 'text',
              content: `${T_Q}.GETTING_STARTED_WITH_AC.HOW_AND_WHEN_DO_I_USE_CLIPPING_FUNCTIONS.ANSWER_TEXT_1`,
            },
            {
              type: 'text',
              content: `${T_Q}.GETTING_STARTED_WITH_AC.HOW_AND_WHEN_DO_I_USE_CLIPPING_FUNCTIONS.ANSWER_TEXT_2`,
            },
          ],
        },
        {
          id: 'WHAT_IS_THE_DIFFERENCE_BETWEEN_THE_WORKFLOW_AND_HISTORY_TABS',
          question: `${T_Q}.GETTING_STARTED_WITH_AC.WHAT_IS_THE_DIFFERENCE_BETWEEN_THE_WORKFLOW_AND_HISTORY_TABS.QUESTION`,
          answer: [
            {
              type: 'nested-list',
              items: [
                {
                  content: `${T_Q}.GETTING_STARTED_WITH_AC.WHAT_IS_THE_DIFFERENCE_BETWEEN_THE_WORKFLOW_AND_HISTORY_TABS.ANSWER_ITEM_1`,
                },
                {
                  content: `${T_Q}.GETTING_STARTED_WITH_AC.WHAT_IS_THE_DIFFERENCE_BETWEEN_THE_WORKFLOW_AND_HISTORY_TABS.ANSWER_ITEM_2`,
                  subItems: [
                    `${T_Q}.GETTING_STARTED_WITH_AC.WHAT_IS_THE_DIFFERENCE_BETWEEN_THE_WORKFLOW_AND_HISTORY_TABS.ANSWER_ITEM_2_SUB_1`,
                    `${T_Q}.GETTING_STARTED_WITH_AC.WHAT_IS_THE_DIFFERENCE_BETWEEN_THE_WORKFLOW_AND_HISTORY_TABS.ANSWER_ITEM_2_SUB_2`,
                    `${T_Q}.GETTING_STARTED_WITH_AC.WHAT_IS_THE_DIFFERENCE_BETWEEN_THE_WORKFLOW_AND_HISTORY_TABS.ANSWER_ITEM_2_SUB_3`,
                  ],
                },
              ],
            },
          ],
        },
        {
          id: 'WHAT_ARE_WORKFLOW_PRESETS_AND_HOW_DO_I_USE_THEM',
          question: `${T_Q}.GETTING_STARTED_WITH_AC.WHAT_ARE_WORKFLOW_PRESETS_AND_HOW_DO_I_USE_THEM.QUESTION`,
          answer: [
            {
              type: 'text',
              content: `${T_Q}.GETTING_STARTED_WITH_AC.WHAT_ARE_WORKFLOW_PRESETS_AND_HOW_DO_I_USE_THEM.ANSWER_TEXT_1`,
            },
            {
              type: 'list',
              items: [
                `${T_Q}.GETTING_STARTED_WITH_AC.WHAT_ARE_WORKFLOW_PRESETS_AND_HOW_DO_I_USE_THEM.PRESET_1`,
                `${T_Q}.GETTING_STARTED_WITH_AC.WHAT_ARE_WORKFLOW_PRESETS_AND_HOW_DO_I_USE_THEM.PRESET_2`,
              ],
            },
            {
              type: 'text',
              content: `${T_Q}.GETTING_STARTED_WITH_AC.WHAT_ARE_WORKFLOW_PRESETS_AND_HOW_DO_I_USE_THEM.ANSWER_TEXT_2`,
            },
            {
              type: 'list',
              items: [
                `${T_Q}.GETTING_STARTED_WITH_AC.WHAT_ARE_WORKFLOW_PRESETS_AND_HOW_DO_I_USE_THEM.STEP_1`,
                `${T_Q}.GETTING_STARTED_WITH_AC.WHAT_ARE_WORKFLOW_PRESETS_AND_HOW_DO_I_USE_THEM.STEP_2`,
                `${T_Q}.GETTING_STARTED_WITH_AC.WHAT_ARE_WORKFLOW_PRESETS_AND_HOW_DO_I_USE_THEM.STEP_3`,
                `${T_Q}.GETTING_STARTED_WITH_AC.WHAT_ARE_WORKFLOW_PRESETS_AND_HOW_DO_I_USE_THEM.STEP_4`,
                `${T_Q}.GETTING_STARTED_WITH_AC.WHAT_ARE_WORKFLOW_PRESETS_AND_HOW_DO_I_USE_THEM.STEP_5`,
              ],
            },
            {
              type: 'text',
              content: `${T_Q}.GETTING_STARTED_WITH_AC.WHAT_ARE_WORKFLOW_PRESETS_AND_HOW_DO_I_USE_THEM.ANSWER_TEXT_3`,
            },
          ],
        },
        {
          id: 'HOW_DO_I_DOWNLOAD_A_WORKFLOW_OR_SEARCH_RESULTS',
          question: `${T_Q}.GETTING_STARTED_WITH_AC.HOW_DO_I_DOWNLOAD_A_WORKFLOW_OR_SEARCH_RESULTS.QUESTION`,
          answer: [
            {
              type: 'text',
              content: `${T_Q}.GETTING_STARTED_WITH_AC.HOW_DO_I_DOWNLOAD_A_WORKFLOW_OR_SEARCH_RESULTS.ANSWER_TEXT`,
            },
          ],
        },
      ],
    },
    {
      id: 'MANAGING_DATASETS_AND_FUNCTIONS_IN_AC',
      title: `${T_Q}.MANAGING_DATASETS_AND_FUNCTIONS_IN_AC.SUBTITLE`,
      questions: [
        {
          id: 'HOW_TO_USE_MULTIPLE_FUNCTIONS',
          question: `${T_Q}.MANAGING_DATASETS_AND_FUNCTIONS_IN_AC.HOW_TO_USE_MULTIPLE_FUNCTIONS.QUESTION`,
          answer: [
            {
              type: 'list',
              items: [
                `${T_Q}.MANAGING_DATASETS_AND_FUNCTIONS_IN_AC.HOW_TO_USE_MULTIPLE_FUNCTIONS.ANSWER_ITEM_1`,
                `${T_Q}.MANAGING_DATASETS_AND_FUNCTIONS_IN_AC.HOW_TO_USE_MULTIPLE_FUNCTIONS.ANSWER_ITEM_2`,
              ],
            },
            {
              type: 'text',
              content: `${T_Q}.MANAGING_DATASETS_AND_FUNCTIONS_IN_AC.HOW_TO_USE_MULTIPLE_FUNCTIONS.ANSWER_TEXT`,
            },
          ],
        },
      ],
    },
    {
      id: 'EXECUTING_AND_TRACKING_WORKFLOWS',
      title: `${T_Q}.EXECUTING_AND_TRACKING_WORKFLOWS.SUBTITLE`,
      questions: [
        {
          id: 'HOW_DO_I_VIEW_WORKFLOW_EXECUTION_RESULTS',
          question: `${T_Q}.EXECUTING_AND_TRACKING_WORKFLOWS.HOW_DO_I_VIEW_WORKFLOW_EXECUTION_RESULTS.QUESTION`,
          answer: [
            {
              type: 'text',
              content: `${T_Q}.EXECUTING_AND_TRACKING_WORKFLOWS.HOW_DO_I_VIEW_WORKFLOW_EXECUTION_RESULTS.ANSWER_TEXT`,
            },
          ],
        },
        {
          id: 'HOW_TO_FILTER_RESULTS_WITH_TIME_SLIDER',
          question: `${T_Q}.EXECUTING_AND_TRACKING_WORKFLOWS.HOW_TO_FILTER_RESULTS_WITH_TIME_SLIDER.QUESTION`,
          answer: [
            {
              type: 'text',
              content: `${T_Q}.EXECUTING_AND_TRACKING_WORKFLOWS.HOW_TO_FILTER_RESULTS_WITH_TIME_SLIDER.ANSWER_TEXT`,
            },
          ],
        },
        {
          id: 'HOW_DO_I_TRACK_THE_EXECUTION_PROGRESS_OF_MY_WORKFLOW',
          question: `${T_Q}.EXECUTING_AND_TRACKING_WORKFLOWS.HOW_DO_I_TRACK_THE_EXECUTION_PROGRESS_OF_MY_WORKFLOW.QUESTION`,
          answer: [
            {
              type: 'text',
              content: `${T_Q}.EXECUTING_AND_TRACKING_WORKFLOWS.HOW_DO_I_TRACK_THE_EXECUTION_PROGRESS_OF_MY_WORKFLOW.ANSWER_TEXT`,
            },
            {
              type: 'list',
              items: [
                `${T_Q}.EXECUTING_AND_TRACKING_WORKFLOWS.HOW_DO_I_TRACK_THE_EXECUTION_PROGRESS_OF_MY_WORKFLOW.STATUS_1`,
                `${T_Q}.EXECUTING_AND_TRACKING_WORKFLOWS.HOW_DO_I_TRACK_THE_EXECUTION_PROGRESS_OF_MY_WORKFLOW.STATUS_2`,
                `${T_Q}.EXECUTING_AND_TRACKING_WORKFLOWS.HOW_DO_I_TRACK_THE_EXECUTION_PROGRESS_OF_MY_WORKFLOW.STATUS_3`,
              ],
            },
          ],
        },
        {
          id: 'HOW_DO_I_VIEW_WORKFLOW_EXECUTION_NOTIFICATIONS',
          question: `${T_Q}.EXECUTING_AND_TRACKING_WORKFLOWS.HOW_DO_I_VIEW_WORKFLOW_EXECUTION_NOTIFICATIONS.QUESTION`,
          answer: [
            {
              type: 'text',
              content: `${T_Q}.EXECUTING_AND_TRACKING_WORKFLOWS.HOW_DO_I_VIEW_WORKFLOW_EXECUTION_NOTIFICATIONS.ANSWER_TEXT`,
            },
          ],
        },
        {
          id: 'WHAT_HAPPENS_IF_I_SWITCH_TO_ACTION_CREATOR_WHILE_HAVING_A_SEARCH_SESSION_ACTIVE',
          question: `${T_Q}.EXECUTING_AND_TRACKING_WORKFLOWS.WHAT_HAPPENS_IF_I_SWITCH_TO_ACTION_CREATOR_WHILE_HAVING_A_SEARCH_SESSION_ACTIVE.QUESTION`,
          answer: [
            {
              type: 'text',
              content: `${T_Q}.EXECUTING_AND_TRACKING_WORKFLOWS.WHAT_HAPPENS_IF_I_SWITCH_TO_ACTION_CREATOR_WHILE_HAVING_A_SEARCH_SESSION_ACTIVE.ANSWER_TEXT`,
            },
          ],
        },
        {
          id: 'CAN_I_SAVE_MY_WORKFLOW_FOR_FUTURE_USE',
          question: `${T_Q}.EXECUTING_AND_TRACKING_WORKFLOWS.CAN_I_SAVE_MY_WORKFLOW_FOR_FUTURE_USE.QUESTION`,
          answer: [
            {
              type: 'text',
              content: `${T_Q}.EXECUTING_AND_TRACKING_WORKFLOWS.CAN_I_SAVE_MY_WORKFLOW_FOR_FUTURE_USE.ANSWER_TEXT`,
            },
          ],
        },
        {
          id: 'WHAT_HAPPENS_IF_I_RUN_MULTIPLE_WORKFLOWS_AT_THE_SAME_TIME',
          question: `${T_Q}.EXECUTING_AND_TRACKING_WORKFLOWS.WHAT_HAPPENS_IF_I_RUN_MULTIPLE_WORKFLOWS_AT_THE_SAME_TIME.QUESTION`,
          answer: [
            {
              type: 'text',
              content: `${T_Q}.EXECUTING_AND_TRACKING_WORKFLOWS.WHAT_HAPPENS_IF_I_RUN_MULTIPLE_WORKFLOWS_AT_THE_SAME_TIME.ANSWER_TEXT`,
            },
          ],
        },
        {
          id: 'HOW_DO_I_CANCEL_A_RUNNING_WORKFLOW',
          question: `${T_Q}.EXECUTING_AND_TRACKING_WORKFLOWS.HOW_DO_I_CANCEL_A_RUNNING_WORKFLOW.QUESTION`,
          answer: [
            {
              type: 'text',
              content: `${T_Q}.EXECUTING_AND_TRACKING_WORKFLOWS.HOW_DO_I_CANCEL_A_RUNNING_WORKFLOW.ANSWER_TEXT`,
            },
          ],
        },
        {
          id: 'HOW_DO_I_ACCESS_MY_SAVED_WORKFLOW_RESULTS_OR_CONFIGURATION',
          question: `${T_Q}.EXECUTING_AND_TRACKING_WORKFLOWS.HOW_DO_I_ACCESS_MY_SAVED_WORKFLOW_RESULTS_OR_CONFIGURATION.QUESTION`,
          answer: [
            {
              type: 'text',
              content: `${T_Q}.EXECUTING_AND_TRACKING_WORKFLOWS.HOW_DO_I_ACCESS_MY_SAVED_WORKFLOW_RESULTS_OR_CONFIGURATION.ANSWER_TEXT_1`,
            },
            {
              type: 'text',
              content: `${T_Q}.EXECUTING_AND_TRACKING_WORKFLOWS.HOW_DO_I_ACCESS_MY_SAVED_WORKFLOW_RESULTS_OR_CONFIGURATION.ANSWER_TEXT_2`,
            },
          ],
        },
      ],
    },
    {
      id: 'WORKING_WITH_ACTIONS',
      title: `${T_Q}.WORKING_WITH_ACTIONS.SUBTITLE`,
      questions: [
        {
          id: 'WHAT_IS_LAND_COVER_CHANGE_SCENARIO',
          question: `${T_Q}.WORKING_WITH_ACTIONS.WHAT_IS_LAND_COVER_CHANGE_SCENARIO.QUESTION`,
          answer: [
            { type: 'text', content: `${T_Q}.WORKING_WITH_ACTIONS.WHAT_IS_LAND_COVER_CHANGE_SCENARIO.ANSWER_TEXT_1` },
            { type: 'text', content: `${T_Q}.WORKING_WITH_ACTIONS.WHAT_IS_LAND_COVER_CHANGE_SCENARIO.ANSWER_TEXT_2` },
            {
              type: 'list',
              items: [
                `${T_Q}.WORKING_WITH_ACTIONS.WHAT_IS_LAND_COVER_CHANGE_SCENARIO.USE_CASE_1`,
                `${T_Q}.WORKING_WITH_ACTIONS.WHAT_IS_LAND_COVER_CHANGE_SCENARIO.USE_CASE_2`,
                `${T_Q}.WORKING_WITH_ACTIONS.WHAT_IS_LAND_COVER_CHANGE_SCENARIO.USE_CASE_3`,
                `${T_Q}.WORKING_WITH_ACTIONS.WHAT_IS_LAND_COVER_CHANGE_SCENARIO.USE_CASE_4`,
              ],
            },
            { type: 'text', content: `${T_Q}.WORKING_WITH_ACTIONS.WHAT_IS_LAND_COVER_CHANGE_SCENARIO.ANSWER_TEXT_3` },
            {
              type: 'list',
              items: [
                `${T_Q}.WORKING_WITH_ACTIONS.WHAT_IS_LAND_COVER_CHANGE_SCENARIO.WORKFLOW_STEP_1`,
                `${T_Q}.WORKING_WITH_ACTIONS.WHAT_IS_LAND_COVER_CHANGE_SCENARIO.WORKFLOW_STEP_2`,
                `${T_Q}.WORKING_WITH_ACTIONS.WHAT_IS_LAND_COVER_CHANGE_SCENARIO.WORKFLOW_STEP_3`,
                `${T_Q}.WORKING_WITH_ACTIONS.WHAT_IS_LAND_COVER_CHANGE_SCENARIO.WORKFLOW_STEP_4`,
              ],
            },
            {
              type: 'image',
              src: landCoverImage,
              alt: `${T_Q}.WORKING_WITH_ACTIONS.WHAT_IS_LAND_COVER_CHANGE_SCENARIO.IMAGE_ALT`,
            },
          ],
        },
        {
          id: 'WHAT_IS_WATER_QUALITY_SCENARIO',
          question: `${T_Q}.WORKING_WITH_ACTIONS.WHAT_IS_WATER_QUALITY_SCENARIO.QUESTION`,
          answer: [
            { type: 'text', content: `${T_Q}.WORKING_WITH_ACTIONS.WHAT_IS_WATER_QUALITY_SCENARIO.ANSWER_TEXT_1` },
            {
              type: 'styled-text',
              segments: [
                { text: `${T_Q}.WORKING_WITH_ACTIONS.WHAT_IS_WATER_QUALITY_SCENARIO.WARNING_NOTE`, style: 'bold' },
              ],
            },
            { type: 'text', content: `${T_Q}.WORKING_WITH_ACTIONS.WHAT_IS_WATER_QUALITY_SCENARIO.ANSWER_TEXT_2` },
            {
              type: 'list',
              items: [
                `${T_Q}.WORKING_WITH_ACTIONS.WHAT_IS_WATER_QUALITY_SCENARIO.USE_CASE_1`,
                `${T_Q}.WORKING_WITH_ACTIONS.WHAT_IS_WATER_QUALITY_SCENARIO.USE_CASE_2`,
                `${T_Q}.WORKING_WITH_ACTIONS.WHAT_IS_WATER_QUALITY_SCENARIO.USE_CASE_3`,
                `${T_Q}.WORKING_WITH_ACTIONS.WHAT_IS_WATER_QUALITY_SCENARIO.USE_CASE_4`,
              ],
            },
            { type: 'text', content: `${T_Q}.WORKING_WITH_ACTIONS.WHAT_IS_WATER_QUALITY_SCENARIO.ANSWER_TEXT_3` },
            {
              type: 'nested-list',
              items: [
                { content: `${T_Q}.WORKING_WITH_ACTIONS.WHAT_IS_WATER_QUALITY_SCENARIO.WORKFLOW_STEP_1` },
                {
                  content: `${T_Q}.WORKING_WITH_ACTIONS.WHAT_IS_WATER_QUALITY_SCENARIO.WORKFLOW_STEP_2`,
                  subItems: [
                    `${T_Q}.WORKING_WITH_ACTIONS.WHAT_IS_WATER_QUALITY_SCENARIO.INDEX_CYA`,
                    `${T_Q}.WORKING_WITH_ACTIONS.WHAT_IS_WATER_QUALITY_SCENARIO.INDEX_TURB`,
                    `${T_Q}.WORKING_WITH_ACTIONS.WHAT_IS_WATER_QUALITY_SCENARIO.INDEX_DOC`,
                    `${T_Q}.WORKING_WITH_ACTIONS.WHAT_IS_WATER_QUALITY_SCENARIO.INDEX_CDOM`,
                    `${T_Q}.WORKING_WITH_ACTIONS.WHAT_IS_WATER_QUALITY_SCENARIO.INDEX_NDWI`,
                  ],
                },
                { content: `${T_Q}.WORKING_WITH_ACTIONS.WHAT_IS_WATER_QUALITY_SCENARIO.WORKFLOW_STEP_3` },
              ],
            },
            {
              type: 'image',
              src: waterQualityImage,
              alt: `${T_Q}.WORKING_WITH_ACTIONS.WHAT_IS_WATER_QUALITY_SCENARIO.IMAGE_ALT`,
            },
            { type: 'text', content: `${T_Q}.WORKING_WITH_ACTIONS.WHAT_IS_WATER_QUALITY_SCENARIO.REFERENCES_TITLE` },
            {
              type: 'links-group',
              links: [
                {
                  href: 'https://piahs.copernicus.org/articles/380/73/2018/',
                  text: `${T_Q}.WORKING_WITH_ACTIONS.WHAT_IS_WATER_QUALITY_SCENARIO.REFERENCES.POTES_CYA`,
                },
                {
                  href: 'http://www.informacjakryzysowa.pl/en/publikacje1/sentinel-water-mask-(swm)-new-index-for-water-detection-on-sentinel-2-images',
                  text: `${T_Q}.WORKING_WITH_ACTIONS.WHAT_IS_WATER_QUALITY_SCENARIO.REFERENCES.SENTINEL_2_WATER_MASK`,
                },
                {
                  href: 'http://dx.doi.org/10.23818/limn.41.18',
                  text: `${T_Q}.WORKING_WITH_ACTIONS.WHAT_IS_WATER_QUALITY_SCENARIO.REFERENCES.ZHAN_TURB`,
                },
                {
                  href: 'https://www.mdpi.com/2073-4441/13/5/686',
                  text: `${T_Q}.WORKING_WITH_ACTIONS.WHAT_IS_WATER_QUALITY_SCENARIO.REFERENCES.SORIA_PERPINYA_CDOM`,
                },
                {
                  href: 'https://piahs.copernicus.org/articles/380/73/2018/',
                  text: `${T_Q}.WORKING_WITH_ACTIONS.WHAT_IS_WATER_QUALITY_SCENARIO.REFERENCES.POTES_DOC`,
                },
                {
                  href: 'https://custom-scripts.sentinel-hub.com/custom-scripts/sentinel-2/ndwi/',
                  text: `${T_Q}.WORKING_WITH_ACTIONS.WHAT_IS_WATER_QUALITY_SCENARIO.REFERENCES.NDWI`,
                },
              ],
            },
          ],
        },
        {
          id: 'WHAT_IS_THE_COLOR_CODING_FOR_LAND_COVER_CHANGE_CLASSES',
          question: `${T_Q}.WORKING_WITH_ACTIONS.WHAT_IS_THE_COLOR_CODING_FOR_LAND_COVER_CHANGE_CLASSES.QUESTION`,
          answer: [
            {
              type: 'text',
              content: `${T_Q}.WORKING_WITH_ACTIONS.WHAT_IS_THE_COLOR_CODING_FOR_LAND_COVER_CHANGE_CLASSES.ANSWER_TEXT`,
            },
            {
              type: 'text',
              content: `${T_Q}.WORKING_WITH_ACTIONS.WHAT_IS_THE_COLOR_CODING_FOR_LAND_COVER_CHANGE_CLASSES.CORINE_INTRO`,
              display: 'list-item',
            },
            landCoverConfigs.corine.element,
            {
              type: 'text',
              content: `${T_Q}.WORKING_WITH_ACTIONS.WHAT_IS_THE_COLOR_CODING_FOR_LAND_COVER_CHANGE_CLASSES.WATERBODIES_INTRO`,
              display: 'list-item',
            },
            landCoverConfigs.waterbodies.element,
            {
              type: 'text',
              content: `${T_Q}.WORKING_WITH_ACTIONS.WHAT_IS_THE_COLOR_CODING_FOR_LAND_COVER_CHANGE_CLASSES.GLOBAL_INTRO`,
              display: 'list-item',
            },
            landCoverConfigs.global.element,
          ],
        },
        {
          id: 'WHAT_IS_THE_COLOUR_CODING_FOR_WATER_QUALITY_ANALYSIS',
          question: `${T_Q}.WORKING_WITH_ACTIONS.WHAT_IS_THE_COLOUR_CODING_FOR_WATER_QUALITY_ANALYSIS.QUESTION`,
          answer: [
            {
              type: 'image-group',
              images: [
                {
                  src: waterQualityImages.ndwi.src,
                  alt: waterQualityImages.ndwi.alt,
                  descriptionAbove: waterQualityImages.ndwi.title,
                  display: 'list-item',
                },
                {
                  src: waterQualityImages.doc.src,
                  alt: waterQualityImages.doc.alt,
                  descriptionAbove: waterQualityImages.doc.title,
                  display: 'list-item',
                },
                {
                  src: waterQualityImages.cdom.src,
                  alt: waterQualityImages.cdom.alt,
                  descriptionAbove: waterQualityImages.cdom.title,
                  display: 'list-item',
                },
                {
                  src: waterQualityImages.cya_cells.src,
                  alt: waterQualityImages.cya_cells.alt,
                  descriptionAbove: waterQualityImages.cya_cells.title,
                  display: 'list-item',
                },
              ],
            },
          ],
        },
        {
          id: 'WHAT_IS_THE_COLOUR_CODING_FOR_NDVI',
          question: `${T_Q}.WORKING_WITH_ACTIONS.WHAT_IS_THE_COLOUR_CODING_FOR_NDVI.QUESTION`,
          answer: [
            {
              type: 'image',
              src: vegetationIndexImages.ndvi.src,
              alt: vegetationIndexImages.ndvi.alt,
              display: 'list-item',
            },
          ],
        },
        {
          id: 'WHAT_IS_THE_COLOUR_CODING_FOR_EVI',
          question: `${T_Q}.WORKING_WITH_ACTIONS.WHAT_IS_THE_COLOUR_CODING_FOR_EVI.QUESTION`,
          answer: [
            {
              type: 'image',
              src: vegetationIndexImages.evi.src,
              alt: vegetationIndexImages.evi.alt,
              display: 'list-item',
            },
          ],
        },
        {
          id: 'WHAT_IS_THE_COLOUR_CODING_FOR_SAVI',
          question: `${T_Q}.WORKING_WITH_ACTIONS.WHAT_IS_THE_COLOUR_CODING_FOR_SAVI.QUESTION`,
          answer: [
            {
              type: 'image',
              src: vegetationIndexImages.savi.src,
              alt: vegetationIndexImages.savi.alt,
              display: 'list-item',
            },
          ],
        },
      ],
    },
    {
      id: 'WORKING_WITH_GRAPHS',
      title: `${T_Q}.WORKING_WITH_GRAPHS.SUBTITLE`,
      questions: [
        {
          id: 'HOW_DO_I_VIEW_GRAPHS_FOR_MY_DATA',
          question: `${T_Q}.WORKING_WITH_GRAPHS.HOW_DO_I_VIEW_GRAPHS_FOR_MY_DATA.QUESTION`,
          answer: [
            { type: 'text', content: `${T_Q}.WORKING_WITH_GRAPHS.HOW_DO_I_VIEW_GRAPHS_FOR_MY_DATA.ANSWER_TEXT` },
          ],
        },
        {
          id: 'WHAT_TYPES_OF_GRAPHS_ARE_AVAILABLE_AND_WHAT_DO_THEY_REPRESENT',
          question: `${T_Q}.WORKING_WITH_GRAPHS.WHAT_TYPES_OF_GRAPHS_ARE_AVAILABLE_AND_WHAT_DO_THEY_REPRESENT.QUESTION`,
          answer: [
            {
              type: 'nested-list',
              items: [
                {
                  content: `${T_Q}.WORKING_WITH_GRAPHS.WHAT_TYPES_OF_GRAPHS_ARE_AVAILABLE_AND_WHAT_DO_THEY_REPRESENT.LINE_CHART`,
                  subItems: [
                    `${T_Q}.WORKING_WITH_GRAPHS.WHAT_TYPES_OF_GRAPHS_ARE_AVAILABLE_AND_WHAT_DO_THEY_REPRESENT.LINE_CHART_SUB_1`,
                    `${T_Q}.WORKING_WITH_GRAPHS.WHAT_TYPES_OF_GRAPHS_ARE_AVAILABLE_AND_WHAT_DO_THEY_REPRESENT.LINE_CHART_SUB_2`,
                  ],
                },
                {
                  content: `${T_Q}.WORKING_WITH_GRAPHS.WHAT_TYPES_OF_GRAPHS_ARE_AVAILABLE_AND_WHAT_DO_THEY_REPRESENT.STACKED_BAR`,
                  subItems: [
                    `${T_Q}.WORKING_WITH_GRAPHS.WHAT_TYPES_OF_GRAPHS_ARE_AVAILABLE_AND_WHAT_DO_THEY_REPRESENT.STACKED_BAR_SUB_1`,
                    `${T_Q}.WORKING_WITH_GRAPHS.WHAT_TYPES_OF_GRAPHS_ARE_AVAILABLE_AND_WHAT_DO_THEY_REPRESENT.STACKED_BAR_SUB_2`,
                  ],
                },
              ],
            },
            {
              type: 'text',
              content: `${T_Q}.WORKING_WITH_GRAPHS.WHAT_TYPES_OF_GRAPHS_ARE_AVAILABLE_AND_WHAT_DO_THEY_REPRESENT.GRAPH_NOTE`,
              display: 'list-item',
            },
          ],
        },
        {
          id: 'HOW_DO_I_ADJUST_THE_TIME_RANGE_DISPLAYED_ON_GRAPHS',
          question: `${T_Q}.WORKING_WITH_GRAPHS.HOW_DO_I_ADJUST_THE_TIME_RANGE_DISPLAYED_ON_GRAPHS.QUESTION`,
          answer: [
            {
              type: 'text',
              content: `${T_Q}.WORKING_WITH_GRAPHS.HOW_DO_I_ADJUST_THE_TIME_RANGE_DISPLAYED_ON_GRAPHS.ANSWER_TEXT`,
            },
          ],
        },
      ],
    },
    {
      id: 'MEASUREMENT_AOI_MANAGEMENT',
      title: `${T_Q}.MEASUREMENT_AOI_MANAGEMENT.SUBTITLE`,
      questions: [
        {
          id: 'HOW_DO_I_MEASURE_DISTANCES_AND_AREAS_ON_THE_MAP',
          question: `${T_Q}.MEASUREMENT_AOI_MANAGEMENT.HOW_DO_I_MEASURE_DISTANCES_AND_AREAS_ON_THE_MAP.QUESTION`,
          answer: [
            {
              type: 'text',
              content: `${T_Q}.MEASUREMENT_AOI_MANAGEMENT.HOW_DO_I_MEASURE_DISTANCES_AND_AREAS_ON_THE_MAP.ANSWER_TEXT`,
            },
          ],
        },
      ],
    },
    {
      id: 'COMPARISON_AND_LAYER_MANAGEMENT',
      title: `${T_Q}.COMPARISON_AND_LAYER_MANAGEMENT.SUBTITLE`,
      questions: [
        {
          id: 'HOW_DO_I_USE_THE_COMPARISON_TOOL',
          question: `${T_Q}.COMPARISON_AND_LAYER_MANAGEMENT.HOW_DO_I_USE_THE_COMPARISON_TOOL.QUESTION`,
          answer: [
            {
              type: 'text',
              content: `${T_Q}.COMPARISON_AND_LAYER_MANAGEMENT.HOW_DO_I_USE_THE_COMPARISON_TOOL.ANSWER_TEXT`,
            },
          ],
        },
      ],
    },
  ],
};
