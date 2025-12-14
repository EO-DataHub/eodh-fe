import { IHelpConfig } from '@ukri/shared/ui/help';

const T = 'MAP.ACTION_CREATOR_PANEL.HELP';

const CORINE_LAND_COVER_ROWS = [
  { label: 'Continuous urban fabric', color: '#e6004d' },
  { label: 'Discontinuous urban fabric', color: '#ff0000' },
  { label: 'Industrial or commercial units', color: '#cc4df2' },
  { label: 'Road and rail networks and associated land', color: '#cc0000' },
  { label: 'Port areas', color: '#e6cccc' },
  { label: 'Airports', color: '#e6cce6' },
  { label: 'Mineral extraction sites', color: '#600ccc' },
  { label: 'Dump sites', color: '#a64d00' },
  { label: 'Construction sites', color: '#ff4dff' },
  { label: 'Green urban areas', color: '#ffa6ff' },
  { label: 'Sport and leisure facilities', color: '#ffe6ff' },
  { label: 'Non-irrigated arable land', color: '#ffffa8' },
  { label: 'Permanently irrigated land', color: '#ffff00' },
  { label: 'Rice fields', color: '#e6e600' },
  { label: 'Vineyards', color: '#e68000' },
  { label: 'Fruit trees and berry plantations', color: '#f2a64d' },
  { label: 'Olive groves', color: '#e6a600' },
  { label: 'Pastures', color: '#e6e64d' },
  { label: 'Annual crops associated with permanent crops', color: '#ffe6a6' },
  { label: 'Complex cultivation patterns', color: '#ffe64d' },
  { label: 'Agro-forestry areas', color: '#f2cca6' },
  { label: 'Broad-leaved forest', color: '#80ff00' },
  { label: 'Coniferous forest', color: '#00a600' },
  { label: 'Mixed forest', color: '#4dff00' },
  { label: 'Natural grasslands', color: '#ccf24d' },
  { label: 'Moors and heathland', color: '#a6ff80' },
  { label: 'Sclerophyllous vegetation', color: '#a6e64d' },
  { label: 'Transitional woodland-shrub', color: '#a6f200' },
  { label: 'Beaches - dunes - sands', color: '#e6e6e6' },
  { label: 'Bare rocks', color: '#cccccc' },
  { label: 'Sparsely vegetated areas', color: '#ccffcc' },
  { label: 'Burnt areas', color: '#000000' },
  { label: 'Glaciers and perpetual snow', color: '#a6e6cc' },
  { label: 'Inland marshes', color: '#a6a6ff' },
  { label: 'Peat bogs', color: '#4d4dff' },
  { label: 'Salt marshes', color: '#ccccff' },
  { label: 'Salines', color: '#e6e6ff' },
  { label: 'Intertidal flats', color: '#a6a6e6' },
  { label: 'Water courses', color: '#00ccf2' },
  { label: 'Water bodies', color: '#80f2e6' },
  { label: 'Coastal lagoons', color: '#00ffa6' },
  { label: 'Estuaries', color: '#a6ffe6' },
  { label: 'Sea and ocean', color: '#e6f2ff' },
  { label: 'NODATA', color: '#ffffff' },
];

const WATERBODIES_ROWS = [
  { label: 'Water body', color: '#0000ff' },
  { label: 'Not water body', color: '#ffffff' },
];

const GLOBAL_LAND_COVER_ROWS = [
  { label: 'No data', color: '#000000' },
  { label: 'Cropland, rainfed', color: '#ffff64' },
  { label: 'Herbaceous cover', color: '#ffff64' },
  { label: 'Tree or shrub cover', color: '#ffff00' },
  { label: 'Cropland, irrigated or post-flooding', color: '#aaf0f0' },
  { label: 'Mosaic cropland (>50%) / natural vegetation (tree, shrub, herbaceous cover) (<50%)', color: '#dbf064' },
  { label: 'Mosaic natural vegetation (tree, shrub, herbaceous cover) (>50%) / cropland (<50%)', color: '#c8c864' },
  { label: 'Tree cover, broadleaved, evergreen, closed to open (>15%)', color: '#006400' },
  { label: 'Tree cover, broadleaved, deciduous, closed to open (>15%)', color: '#00a000' },
  { label: 'Tree cover, broadleaved, deciduous, closed (>40%)', color: '#00a000' },
  { label: 'Tree cover, broadleaved, deciduous, open (15-40%)', color: '#aac800' },
  { label: 'Tree cover, needleleaved, evergreen, closed to open (>15%)', color: '#003c00' },
  { label: 'Tree cover, needleleaved, evergreen, closed (>40%)', color: '#003c00' },
  { label: 'Tree cover, needleleaved, evergreen, open (15-40%)', color: '#005000' },
  { label: 'Tree cover, needleleaved, deciduous, closed to open (>15%)', color: '#400500' },
  { label: 'Tree cover, needleleaved, deciduous, closed (>40%)', color: '#400500' },
  { label: 'Tree cover, needleleaved, deciduous, open (15-40%)', color: '#400640' },
  { label: 'Tree cover, mixed leaf type (broadleaved and needleleaved)', color: '#788200' },
  { label: 'Mosaic tree and shrub (>50%) / herbaceous cover (<50%)', color: '#1400a0' },
  { label: 'Mosaic herbaceous cover (>50%) / tree and shrub (<50%)', color: '#be9500' },
  { label: 'Shrubland', color: '#150064' },
  { label: 'Shrubland evergreen', color: '#784c00' },
  { label: 'Shrubland deciduous', color: '#150064' },
  { label: 'Grassland', color: '#ffb432' },
  { label: 'Lichens and mosses', color: '#ffdcd2' },
  { label: 'Sparse vegetation (tree, shrub, herbaceous cover) (<15%)', color: '#ffebaf' },
  { label: 'Sparse tree (<15%)', color: '#ffc964' },
  { label: 'Sparse shrub (<15%)', color: '#ffd278' },
  { label: 'Sparse herbaceous cover (<15%)', color: '#ffebaf' },
  { label: 'Tree cover, flooded, fresh or brakish water', color: '#00785a' },
  { label: 'Tree cover, flooded, saline water', color: '#009678' },
  { label: 'Shrub or herbaceous cover, flooded, fresh/saline/brakish water', color: '#00dc80' },
  { label: 'Urban areas', color: '#c31300' },
  { label: 'Bare areas', color: '#fff5d7' },
  { label: 'Consolidated bare areas', color: '#dcdcdc' },
  { label: 'Unconsolidated bare areas', color: '#fff5d7' },
  { label: 'Water bodies', color: '#0046c8' },
  { label: 'Permanent snow and ice', color: '#ffffff' },
];

export const actionCreatorHelpConfig: IHelpConfig = {
  id: 'action-creator-help',
  title: `${T}.TITLE`,
  intro: `${T}.INTRO`,
  backButtonText: `${T}.BACK_BTN`,
  pathToImages: '/assets/images',
  sections: [
    {
      id: 'GETTING_STARTED_WITH_AC',
      title: `${T}.QUESTIONS.GETTING_STARTED_WITH_AC.SUBTITLE`,
      questions: [
        {
          id: 'WHAT_IS_THE_AC',
          question: `${T}.QUESTIONS.GETTING_STARTED_WITH_AC.WHAT_IS_THE_AC.QUESTION`,
          answer: [{ type: 'text', content: `${T}.QUESTIONS.GETTING_STARTED_WITH_AC.WHAT_IS_THE_AC.ANSWER_TEXT` }],
        },
        {
          id: 'WHAT_IS_USER_WORKSPACE',
          question: `${T}.QUESTIONS.GETTING_STARTED_WITH_AC.WHAT_IS_USER_WORKSPACE.QUESTION`,
          answer: [
            { type: 'text', content: `${T}.QUESTIONS.GETTING_STARTED_WITH_AC.WHAT_IS_USER_WORKSPACE.ANSWER_TEXT` },
          ],
        },
        {
          id: 'HOW_TO_SWITCH_BETWEEN_WORKSPACES',
          question: `${T}.QUESTIONS.GETTING_STARTED_WITH_AC.HOW_TO_SWITCH_BETWEEN_WORKSPACES.QUESTION`,
          answer: [
            {
              type: 'list',
              items: [
                `${T}.QUESTIONS.GETTING_STARTED_WITH_AC.HOW_TO_SWITCH_BETWEEN_WORKSPACES.ANSWER_ITEM_1`,
                `${T}.QUESTIONS.GETTING_STARTED_WITH_AC.HOW_TO_SWITCH_BETWEEN_WORKSPACES.ANSWER_ITEM_2`,
              ],
            },
          ],
        },
        {
          id: 'HOW_TO_CREATE_WORKFLOW_IN_THE_AC',
          question: `${T}.QUESTIONS.GETTING_STARTED_WITH_AC.HOW_TO_CREATE_WORKFLOW_IN_THE_AC.QUESTION`,
          answer: [
            {
              type: 'nested-list',
              items: [
                { content: `${T}.QUESTIONS.GETTING_STARTED_WITH_AC.HOW_TO_CREATE_WORKFLOW_IN_THE_AC.ANSWER_ITEM_1` },
                { content: `${T}.QUESTIONS.GETTING_STARTED_WITH_AC.HOW_TO_CREATE_WORKFLOW_IN_THE_AC.ANSWER_ITEM_2` },
                {
                  content: `${T}.QUESTIONS.GETTING_STARTED_WITH_AC.HOW_TO_CREATE_WORKFLOW_IN_THE_AC.ANSWER_ITEM_3`,
                  subItems: [
                    `${T}.QUESTIONS.GETTING_STARTED_WITH_AC.HOW_TO_CREATE_WORKFLOW_IN_THE_AC.ANSWER_ITEM_3_NOTE`,
                  ],
                },
              ],
            },
          ],
        },
        {
          id: 'WHAT_ARE_THE_DIFFERENT_WORKFLOW_BLOCKS',
          question: `${T}.QUESTIONS.GETTING_STARTED_WITH_AC.WHAT_ARE_THE_DIFFERENT_WORKFLOW_BLOCKS.QUESTION`,
          answer: [
            {
              type: 'text',
              content: `${T}.QUESTIONS.GETTING_STARTED_WITH_AC.WHAT_ARE_THE_DIFFERENT_WORKFLOW_BLOCKS.ANSWER_TEXT_1`,
            },
            {
              type: 'list',
              items: [
                `${T}.QUESTIONS.GETTING_STARTED_WITH_AC.WHAT_ARE_THE_DIFFERENT_WORKFLOW_BLOCKS.ANSWER_ITEM_1`,
                `${T}.QUESTIONS.GETTING_STARTED_WITH_AC.WHAT_ARE_THE_DIFFERENT_WORKFLOW_BLOCKS.ANSWER_ITEM_2`,
                `${T}.QUESTIONS.GETTING_STARTED_WITH_AC.WHAT_ARE_THE_DIFFERENT_WORKFLOW_BLOCKS.ANSWER_ITEM_3`,
                `${T}.QUESTIONS.GETTING_STARTED_WITH_AC.WHAT_ARE_THE_DIFFERENT_WORKFLOW_BLOCKS.ANSWER_ITEM_4`,
                `${T}.QUESTIONS.GETTING_STARTED_WITH_AC.WHAT_ARE_THE_DIFFERENT_WORKFLOW_BLOCKS.ANSWER_ITEM_5`,
              ],
            },
            {
              type: 'text',
              content: `${T}.QUESTIONS.GETTING_STARTED_WITH_AC.WHAT_ARE_THE_DIFFERENT_WORKFLOW_BLOCKS.ANSWER_TEXT_2`,
            },
          ],
        },
        {
          id: 'HOW_DO_I_SELECT_A_DATASET_FOR_MY_WORKFLOW',
          question: `${T}.QUESTIONS.GETTING_STARTED_WITH_AC.HOW_DO_I_SELECT_A_DATASET_FOR_MY_WORKFLOW.QUESTION`,
          answer: [
            {
              type: 'nested-list',
              items: [
                {
                  content: `${T}.QUESTIONS.GETTING_STARTED_WITH_AC.HOW_DO_I_SELECT_A_DATASET_FOR_MY_WORKFLOW.ANSWER_ITEM_1`,
                },
                {
                  content: `${T}.QUESTIONS.GETTING_STARTED_WITH_AC.HOW_DO_I_SELECT_A_DATASET_FOR_MY_WORKFLOW.ANSWER_ITEM_2`,
                  subItems: [
                    `${T}.QUESTIONS.GETTING_STARTED_WITH_AC.HOW_DO_I_SELECT_A_DATASET_FOR_MY_WORKFLOW.ANSWER_ITEM_2_NOTE`,
                  ],
                },
                {
                  content: `${T}.QUESTIONS.GETTING_STARTED_WITH_AC.HOW_DO_I_SELECT_A_DATASET_FOR_MY_WORKFLOW.ANSWER_ITEM_3`,
                },
                {
                  content: `${T}.QUESTIONS.GETTING_STARTED_WITH_AC.HOW_DO_I_SELECT_A_DATASET_FOR_MY_WORKFLOW.ANSWER_ITEM_4`,
                },
                {
                  content: `${T}.QUESTIONS.GETTING_STARTED_WITH_AC.HOW_DO_I_SELECT_A_DATASET_FOR_MY_WORKFLOW.ANSWER_ITEM_5`,
                },
              ],
            },
          ],
        },
        {
          id: 'HOW_DO_I_SELECT_WORKFLOW_FUNCTIONS',
          question: `${T}.QUESTIONS.GETTING_STARTED_WITH_AC.HOW_DO_I_SELECT_WORKFLOW_FUNCTIONS.QUESTION`,
          answer: [
            {
              type: 'nested-list',
              items: [
                { content: `${T}.QUESTIONS.GETTING_STARTED_WITH_AC.HOW_DO_I_SELECT_WORKFLOW_FUNCTIONS.ANSWER_ITEM_1` },
                {
                  content: `${T}.QUESTIONS.GETTING_STARTED_WITH_AC.HOW_DO_I_SELECT_WORKFLOW_FUNCTIONS.ANSWER_ITEM_2`,
                  subItems: [
                    `${T}.QUESTIONS.GETTING_STARTED_WITH_AC.HOW_DO_I_SELECT_WORKFLOW_FUNCTIONS.ANSWER_ITEM_2_NOTE`,
                  ],
                },
                { content: `${T}.QUESTIONS.GETTING_STARTED_WITH_AC.HOW_DO_I_SELECT_WORKFLOW_FUNCTIONS.ANSWER_ITEM_3` },
                {
                  content: `${T}.QUESTIONS.GETTING_STARTED_WITH_AC.HOW_DO_I_SELECT_WORKFLOW_FUNCTIONS.ANSWER_ITEM_4`,
                  subItems: [
                    `${T}.QUESTIONS.GETTING_STARTED_WITH_AC.HOW_DO_I_SELECT_WORKFLOW_FUNCTIONS.ANSWER_ITEM_4_NOTE`,
                  ],
                },
                { content: `${T}.QUESTIONS.GETTING_STARTED_WITH_AC.HOW_DO_I_SELECT_WORKFLOW_FUNCTIONS.ANSWER_ITEM_5` },
                { content: `${T}.QUESTIONS.GETTING_STARTED_WITH_AC.HOW_DO_I_SELECT_WORKFLOW_FUNCTIONS.ANSWER_ITEM_6` },
              ],
            },
          ],
        },
        {
          id: 'HOW_AND_WHEN_DO_I_USE_CLIPPING_FUNCTIONS',
          question: `${T}.QUESTIONS.GETTING_STARTED_WITH_AC.HOW_AND_WHEN_DO_I_USE_CLIPPING_FUNCTIONS.QUESTION`,
          answer: [
            {
              type: 'text',
              content: `${T}.QUESTIONS.GETTING_STARTED_WITH_AC.HOW_AND_WHEN_DO_I_USE_CLIPPING_FUNCTIONS.ANSWER_TEXT_1`,
            },
            {
              type: 'text',
              content: `${T}.QUESTIONS.GETTING_STARTED_WITH_AC.HOW_AND_WHEN_DO_I_USE_CLIPPING_FUNCTIONS.ANSWER_TEXT_2`,
            },
          ],
        },
        {
          id: 'WHAT_IS_THE_DIFFERENCE_BETWEEN_THE_WORKFLOW_AND_HISTORY_TABS',
          question: `${T}.QUESTIONS.GETTING_STARTED_WITH_AC.WHAT_IS_THE_DIFFERENCE_BETWEEN_THE_WORKFLOW_AND_HISTORY_TABS.QUESTION`,
          answer: [
            {
              type: 'nested-list',
              items: [
                {
                  content: `${T}.QUESTIONS.GETTING_STARTED_WITH_AC.WHAT_IS_THE_DIFFERENCE_BETWEEN_THE_WORKFLOW_AND_HISTORY_TABS.ANSWER_ITEM_1`,
                },
                {
                  content: `${T}.QUESTIONS.GETTING_STARTED_WITH_AC.WHAT_IS_THE_DIFFERENCE_BETWEEN_THE_WORKFLOW_AND_HISTORY_TABS.ANSWER_ITEM_2`,
                  subItems: [
                    `${T}.QUESTIONS.GETTING_STARTED_WITH_AC.WHAT_IS_THE_DIFFERENCE_BETWEEN_THE_WORKFLOW_AND_HISTORY_TABS.ANSWER_ITEM_2_SUB_1`,
                    `${T}.QUESTIONS.GETTING_STARTED_WITH_AC.WHAT_IS_THE_DIFFERENCE_BETWEEN_THE_WORKFLOW_AND_HISTORY_TABS.ANSWER_ITEM_2_SUB_2`,
                    `${T}.QUESTIONS.GETTING_STARTED_WITH_AC.WHAT_IS_THE_DIFFERENCE_BETWEEN_THE_WORKFLOW_AND_HISTORY_TABS.ANSWER_ITEM_2_SUB_3`,
                  ],
                },
              ],
            },
          ],
        },
        {
          id: 'WHAT_ARE_WORKFLOW_PRESETS_AND_HOW_DO_I_USE_THEM',
          question: `${T}.QUESTIONS.GETTING_STARTED_WITH_AC.WHAT_ARE_WORKFLOW_PRESETS_AND_HOW_DO_I_USE_THEM.QUESTION`,
          answer: [
            {
              type: 'text',
              content: `${T}.QUESTIONS.GETTING_STARTED_WITH_AC.WHAT_ARE_WORKFLOW_PRESETS_AND_HOW_DO_I_USE_THEM.ANSWER_TEXT_1`,
            },
            {
              type: 'list',
              items: [
                `${T}.QUESTIONS.GETTING_STARTED_WITH_AC.WHAT_ARE_WORKFLOW_PRESETS_AND_HOW_DO_I_USE_THEM.PRESET_1`,
                `${T}.QUESTIONS.GETTING_STARTED_WITH_AC.WHAT_ARE_WORKFLOW_PRESETS_AND_HOW_DO_I_USE_THEM.PRESET_2`,
              ],
            },
            {
              type: 'text',
              content: `${T}.QUESTIONS.GETTING_STARTED_WITH_AC.WHAT_ARE_WORKFLOW_PRESETS_AND_HOW_DO_I_USE_THEM.ANSWER_TEXT_2`,
            },
            {
              type: 'list',
              items: [
                `${T}.QUESTIONS.GETTING_STARTED_WITH_AC.WHAT_ARE_WORKFLOW_PRESETS_AND_HOW_DO_I_USE_THEM.STEP_1`,
                `${T}.QUESTIONS.GETTING_STARTED_WITH_AC.WHAT_ARE_WORKFLOW_PRESETS_AND_HOW_DO_I_USE_THEM.STEP_2`,
                `${T}.QUESTIONS.GETTING_STARTED_WITH_AC.WHAT_ARE_WORKFLOW_PRESETS_AND_HOW_DO_I_USE_THEM.STEP_3`,
                `${T}.QUESTIONS.GETTING_STARTED_WITH_AC.WHAT_ARE_WORKFLOW_PRESETS_AND_HOW_DO_I_USE_THEM.STEP_4`,
                `${T}.QUESTIONS.GETTING_STARTED_WITH_AC.WHAT_ARE_WORKFLOW_PRESETS_AND_HOW_DO_I_USE_THEM.STEP_5`,
              ],
            },
            {
              type: 'text',
              content: `${T}.QUESTIONS.GETTING_STARTED_WITH_AC.WHAT_ARE_WORKFLOW_PRESETS_AND_HOW_DO_I_USE_THEM.ANSWER_TEXT_3`,
            },
          ],
        },
        {
          id: 'HOW_DO_I_DOWNLOAD_A_WORKFLOW_OR_SEARCH_RESULTS',
          question: `${T}.QUESTIONS.GETTING_STARTED_WITH_AC.HOW_DO_I_DOWNLOAD_A_WORKFLOW_OR_SEARCH_RESULTS.QUESTION`,
          answer: [
            {
              type: 'text',
              content: `${T}.QUESTIONS.GETTING_STARTED_WITH_AC.HOW_DO_I_DOWNLOAD_A_WORKFLOW_OR_SEARCH_RESULTS.ANSWER_TEXT`,
            },
          ],
        },
      ],
    },
    {
      id: 'MANAGING_DATASETS_AND_FUNCTIONS_IN_AC',
      title: `${T}.QUESTIONS.MANAGING_DATASETS_AND_FUNCTIONS_IN_AC.SUBTITLE`,
      questions: [
        {
          id: 'HOW_TO_USE_MULTIPLE_FUNCTIONS',
          question: `${T}.QUESTIONS.MANAGING_DATASETS_AND_FUNCTIONS_IN_AC.HOW_TO_USE_MULTIPLE_FUNCTIONS.QUESTION`,
          answer: [
            {
              type: 'list',
              items: [
                `${T}.QUESTIONS.MANAGING_DATASETS_AND_FUNCTIONS_IN_AC.HOW_TO_USE_MULTIPLE_FUNCTIONS.ANSWER_ITEM_1`,
                `${T}.QUESTIONS.MANAGING_DATASETS_AND_FUNCTIONS_IN_AC.HOW_TO_USE_MULTIPLE_FUNCTIONS.ANSWER_ITEM_2`,
              ],
            },
            {
              type: 'text',
              content: `${T}.QUESTIONS.MANAGING_DATASETS_AND_FUNCTIONS_IN_AC.HOW_TO_USE_MULTIPLE_FUNCTIONS.ANSWER_TEXT`,
            },
          ],
        },
      ],
    },
    {
      id: 'EXECUTING_AND_TRACKING_WORKFLOWS',
      title: `${T}.QUESTIONS.EXECUTING_AND_TRACKING_WORKFLOWS.SUBTITLE`,
      questions: [
        {
          id: 'HOW_DO_I_VIEW_WORKFLOW_EXECUTION_RESULTS',
          question: `${T}.QUESTIONS.EXECUTING_AND_TRACKING_WORKFLOWS.HOW_DO_I_VIEW_WORKFLOW_EXECUTION_RESULTS.QUESTION`,
          answer: [
            {
              type: 'text',
              content: `${T}.QUESTIONS.EXECUTING_AND_TRACKING_WORKFLOWS.HOW_DO_I_VIEW_WORKFLOW_EXECUTION_RESULTS.ANSWER_TEXT`,
            },
          ],
        },
        {
          id: 'HOW_TO_FILTER_RESULTS_WITH_TIME_SLIDER',
          question: `${T}.QUESTIONS.EXECUTING_AND_TRACKING_WORKFLOWS.HOW_TO_FILTER_RESULTS_WITH_TIME_SLIDER.QUESTION`,
          answer: [
            {
              type: 'text',
              content: `${T}.QUESTIONS.EXECUTING_AND_TRACKING_WORKFLOWS.HOW_TO_FILTER_RESULTS_WITH_TIME_SLIDER.ANSWER_TEXT`,
            },
          ],
        },
        {
          id: 'HOW_DO_I_TRACK_THE_EXECUTION_PROGRESS_OF_MY_WORKFLOW',
          question: `${T}.QUESTIONS.EXECUTING_AND_TRACKING_WORKFLOWS.HOW_DO_I_TRACK_THE_EXECUTION_PROGRESS_OF_MY_WORKFLOW.QUESTION`,
          answer: [
            {
              type: 'text',
              content: `${T}.QUESTIONS.EXECUTING_AND_TRACKING_WORKFLOWS.HOW_DO_I_TRACK_THE_EXECUTION_PROGRESS_OF_MY_WORKFLOW.ANSWER_TEXT`,
            },
            {
              type: 'list',
              items: [
                `${T}.QUESTIONS.EXECUTING_AND_TRACKING_WORKFLOWS.HOW_DO_I_TRACK_THE_EXECUTION_PROGRESS_OF_MY_WORKFLOW.STATUS_1`,
                `${T}.QUESTIONS.EXECUTING_AND_TRACKING_WORKFLOWS.HOW_DO_I_TRACK_THE_EXECUTION_PROGRESS_OF_MY_WORKFLOW.STATUS_2`,
                `${T}.QUESTIONS.EXECUTING_AND_TRACKING_WORKFLOWS.HOW_DO_I_TRACK_THE_EXECUTION_PROGRESS_OF_MY_WORKFLOW.STATUS_3`,
              ],
            },
          ],
        },
        {
          id: 'HOW_DO_I_VIEW_WORKFLOW_EXECUTION_NOTIFICATIONS',
          question: `${T}.QUESTIONS.EXECUTING_AND_TRACKING_WORKFLOWS.HOW_DO_I_VIEW_WORKFLOW_EXECUTION_NOTIFICATIONS.QUESTION`,
          answer: [
            {
              type: 'text',
              content: `${T}.QUESTIONS.EXECUTING_AND_TRACKING_WORKFLOWS.HOW_DO_I_VIEW_WORKFLOW_EXECUTION_NOTIFICATIONS.ANSWER_TEXT`,
            },
          ],
        },
        {
          id: 'WHAT_HAPPENS_IF_I_SWITCH_TO_ACTION_CREATOR_WHILE_HAVING_A_SEARCH_SESSION_ACTIVE',
          question: `${T}.QUESTIONS.EXECUTING_AND_TRACKING_WORKFLOWS.WHAT_HAPPENS_IF_I_SWITCH_TO_ACTION_CREATOR_WHILE_HAVING_A_SEARCH_SESSION_ACTIVE.QUESTION`,
          answer: [
            {
              type: 'text',
              content: `${T}.QUESTIONS.EXECUTING_AND_TRACKING_WORKFLOWS.WHAT_HAPPENS_IF_I_SWITCH_TO_ACTION_CREATOR_WHILE_HAVING_A_SEARCH_SESSION_ACTIVE.ANSWER_TEXT`,
            },
          ],
        },
        {
          id: 'CAN_I_SAVE_MY_WORKFLOW_FOR_FUTURE_USE',
          question: `${T}.QUESTIONS.EXECUTING_AND_TRACKING_WORKFLOWS.CAN_I_SAVE_MY_WORKFLOW_FOR_FUTURE_USE.QUESTION`,
          answer: [
            {
              type: 'text',
              content: `${T}.QUESTIONS.EXECUTING_AND_TRACKING_WORKFLOWS.CAN_I_SAVE_MY_WORKFLOW_FOR_FUTURE_USE.ANSWER_TEXT`,
            },
          ],
        },
        {
          id: 'WHAT_HAPPENS_IF_I_RUN_MULTIPLE_WORKFLOWS_AT_THE_SAME_TIME',
          question: `${T}.QUESTIONS.EXECUTING_AND_TRACKING_WORKFLOWS.WHAT_HAPPENS_IF_I_RUN_MULTIPLE_WORKFLOWS_AT_THE_SAME_TIME.QUESTION`,
          answer: [
            {
              type: 'text',
              content: `${T}.QUESTIONS.EXECUTING_AND_TRACKING_WORKFLOWS.WHAT_HAPPENS_IF_I_RUN_MULTIPLE_WORKFLOWS_AT_THE_SAME_TIME.ANSWER_TEXT`,
            },
          ],
        },
        {
          id: 'HOW_DO_I_CANCEL_A_RUNNING_WORKFLOW',
          question: `${T}.QUESTIONS.EXECUTING_AND_TRACKING_WORKFLOWS.HOW_DO_I_CANCEL_A_RUNNING_WORKFLOW.QUESTION`,
          answer: [
            {
              type: 'text',
              content: `${T}.QUESTIONS.EXECUTING_AND_TRACKING_WORKFLOWS.HOW_DO_I_CANCEL_A_RUNNING_WORKFLOW.ANSWER_TEXT`,
            },
          ],
        },
        {
          id: 'HOW_DO_I_ACCESS_MY_SAVED_WORKFLOW_RESULTS_OR_CONFIGURATION',
          question: `${T}.QUESTIONS.EXECUTING_AND_TRACKING_WORKFLOWS.HOW_DO_I_ACCESS_MY_SAVED_WORKFLOW_RESULTS_OR_CONFIGURATION.QUESTION`,
          answer: [
            {
              type: 'text',
              content: `${T}.QUESTIONS.EXECUTING_AND_TRACKING_WORKFLOWS.HOW_DO_I_ACCESS_MY_SAVED_WORKFLOW_RESULTS_OR_CONFIGURATION.ANSWER_TEXT_1`,
            },
            {
              type: 'text',
              content: `${T}.QUESTIONS.EXECUTING_AND_TRACKING_WORKFLOWS.HOW_DO_I_ACCESS_MY_SAVED_WORKFLOW_RESULTS_OR_CONFIGURATION.ANSWER_TEXT_2`,
            },
          ],
        },
      ],
    },
    {
      id: 'WORKING_WITH_ACTIONS',
      title: `${T}.QUESTIONS.WORKING_WITH_ACTIONS.SUBTITLE`,
      questions: [
        {
          id: 'WHAT_IS_LAND_COVER_CHANGE_SCENARIO',
          question: `${T}.QUESTIONS.WORKING_WITH_ACTIONS.WHAT_IS_LAND_COVER_CHANGE_SCENARIO.QUESTION`,
          answer: [
            {
              type: 'text',
              content: `${T}.QUESTIONS.WORKING_WITH_ACTIONS.WHAT_IS_LAND_COVER_CHANGE_SCENARIO.ANSWER_TEXT_1`,
            },
            {
              type: 'text',
              content: `${T}.QUESTIONS.WORKING_WITH_ACTIONS.WHAT_IS_LAND_COVER_CHANGE_SCENARIO.ANSWER_TEXT_2`,
            },
            {
              type: 'list',
              items: [
                `${T}.QUESTIONS.WORKING_WITH_ACTIONS.WHAT_IS_LAND_COVER_CHANGE_SCENARIO.USE_CASE_1`,
                `${T}.QUESTIONS.WORKING_WITH_ACTIONS.WHAT_IS_LAND_COVER_CHANGE_SCENARIO.USE_CASE_2`,
                `${T}.QUESTIONS.WORKING_WITH_ACTIONS.WHAT_IS_LAND_COVER_CHANGE_SCENARIO.USE_CASE_3`,
                `${T}.QUESTIONS.WORKING_WITH_ACTIONS.WHAT_IS_LAND_COVER_CHANGE_SCENARIO.USE_CASE_4`,
              ],
            },
            {
              type: 'text',
              content: `${T}.QUESTIONS.WORKING_WITH_ACTIONS.WHAT_IS_LAND_COVER_CHANGE_SCENARIO.ANSWER_TEXT_3`,
            },
            {
              type: 'list',
              items: [
                `${T}.QUESTIONS.WORKING_WITH_ACTIONS.WHAT_IS_LAND_COVER_CHANGE_SCENARIO.WORKFLOW_STEP_1`,
                `${T}.QUESTIONS.WORKING_WITH_ACTIONS.WHAT_IS_LAND_COVER_CHANGE_SCENARIO.WORKFLOW_STEP_2`,
                `${T}.QUESTIONS.WORKING_WITH_ACTIONS.WHAT_IS_LAND_COVER_CHANGE_SCENARIO.WORKFLOW_STEP_3`,
                `${T}.QUESTIONS.WORKING_WITH_ACTIONS.WHAT_IS_LAND_COVER_CHANGE_SCENARIO.WORKFLOW_STEP_4`,
              ],
            },
            {
              type: 'image',
              src: 'WHAT_IS_LAND_COVER_CHANGES_SCENARIO.png',
              alt: `${T}.QUESTIONS.WORKING_WITH_ACTIONS.WHAT_IS_LAND_COVER_CHANGE_SCENARIO.IMAGE_ALT`,
            },
          ],
        },
        {
          id: 'WHAT_IS_WATER_QUALITY_SCENARIO',
          question: `${T}.QUESTIONS.WORKING_WITH_ACTIONS.WHAT_IS_WATER_QUALITY_SCENARIO.QUESTION`,
          answer: [
            {
              type: 'text',
              content: `${T}.QUESTIONS.WORKING_WITH_ACTIONS.WHAT_IS_WATER_QUALITY_SCENARIO.ANSWER_TEXT_1`,
            },
            {
              type: 'styled-text',
              segments: [
                {
                  text: `${T}.QUESTIONS.WORKING_WITH_ACTIONS.WHAT_IS_WATER_QUALITY_SCENARIO.WARNING_NOTE`,
                  style: 'bold',
                },
              ],
            },
            {
              type: 'text',
              content: `${T}.QUESTIONS.WORKING_WITH_ACTIONS.WHAT_IS_WATER_QUALITY_SCENARIO.ANSWER_TEXT_2`,
            },
            {
              type: 'list',
              items: [
                `${T}.QUESTIONS.WORKING_WITH_ACTIONS.WHAT_IS_WATER_QUALITY_SCENARIO.USE_CASE_1`,
                `${T}.QUESTIONS.WORKING_WITH_ACTIONS.WHAT_IS_WATER_QUALITY_SCENARIO.USE_CASE_2`,
                `${T}.QUESTIONS.WORKING_WITH_ACTIONS.WHAT_IS_WATER_QUALITY_SCENARIO.USE_CASE_3`,
                `${T}.QUESTIONS.WORKING_WITH_ACTIONS.WHAT_IS_WATER_QUALITY_SCENARIO.USE_CASE_4`,
              ],
            },
            {
              type: 'text',
              content: `${T}.QUESTIONS.WORKING_WITH_ACTIONS.WHAT_IS_WATER_QUALITY_SCENARIO.ANSWER_TEXT_3`,
            },
            {
              type: 'nested-list',
              items: [
                { content: `${T}.QUESTIONS.WORKING_WITH_ACTIONS.WHAT_IS_WATER_QUALITY_SCENARIO.WORKFLOW_STEP_1` },
                {
                  content: `${T}.QUESTIONS.WORKING_WITH_ACTIONS.WHAT_IS_WATER_QUALITY_SCENARIO.WORKFLOW_STEP_2`,
                  subItems: [
                    `${T}.QUESTIONS.WORKING_WITH_ACTIONS.WHAT_IS_WATER_QUALITY_SCENARIO.INDEX_CYA`,
                    `${T}.QUESTIONS.WORKING_WITH_ACTIONS.WHAT_IS_WATER_QUALITY_SCENARIO.INDEX_TURB`,
                    `${T}.QUESTIONS.WORKING_WITH_ACTIONS.WHAT_IS_WATER_QUALITY_SCENARIO.INDEX_DOC`,
                    `${T}.QUESTIONS.WORKING_WITH_ACTIONS.WHAT_IS_WATER_QUALITY_SCENARIO.INDEX_CDOM`,
                    `${T}.QUESTIONS.WORKING_WITH_ACTIONS.WHAT_IS_WATER_QUALITY_SCENARIO.INDEX_NDWI`,
                  ],
                },
                { content: `${T}.QUESTIONS.WORKING_WITH_ACTIONS.WHAT_IS_WATER_QUALITY_SCENARIO.WORKFLOW_STEP_3` },
              ],
            },
            {
              type: 'image',
              src: 'WHAT_IS_WATER_QUALITY_ANALYSIS_SCENARIO.png',
              alt: `${T}.QUESTIONS.WORKING_WITH_ACTIONS.WHAT_IS_WATER_QUALITY_SCENARIO.IMAGE_ALT`,
            },
            {
              type: 'text',
              content: `${T}.QUESTIONS.WORKING_WITH_ACTIONS.WHAT_IS_WATER_QUALITY_SCENARIO.REFERENCES_TITLE`,
            },
            {
              type: 'links-group',
              links: [
                {
                  href: 'https://piahs.copernicus.org/articles/380/73/2018/',
                  text: `${T}.QUESTIONS.WORKING_WITH_ACTIONS.WHAT_IS_WATER_QUALITY_SCENARIO.REFERENCES.POTES_CYA`,
                },
                {
                  href: 'http://www.informacjakryzysowa.pl/en/publikacje1/sentinel-water-mask-(swm)-new-index-for-water-detection-on-sentinel-2-images',
                  text: `${T}.QUESTIONS.WORKING_WITH_ACTIONS.WHAT_IS_WATER_QUALITY_SCENARIO.REFERENCES.SENTINEL_2_WATER_MASK`,
                },
                {
                  href: 'http://dx.doi.org/10.23818/limn.41.18',
                  text: `${T}.QUESTIONS.WORKING_WITH_ACTIONS.WHAT_IS_WATER_QUALITY_SCENARIO.REFERENCES.ZHAN_TURB`,
                },
                {
                  href: 'https://www.mdpi.com/2073-4441/13/5/686',
                  text: `${T}.QUESTIONS.WORKING_WITH_ACTIONS.WHAT_IS_WATER_QUALITY_SCENARIO.REFERENCES.SORIA_PERPINYA_CDOM`,
                },
                {
                  href: 'https://piahs.copernicus.org/articles/380/73/2018/',
                  text: `${T}.QUESTIONS.WORKING_WITH_ACTIONS.WHAT_IS_WATER_QUALITY_SCENARIO.REFERENCES.POTES_DOC`,
                },
                {
                  href: 'https://custom-scripts.sentinel-hub.com/custom-scripts/sentinel-2/ndwi/',
                  text: `${T}.QUESTIONS.WORKING_WITH_ACTIONS.WHAT_IS_WATER_QUALITY_SCENARIO.REFERENCES.SENTINEL_2_NDWI`,
                },
              ],
            },
          ],
        },
        {
          id: 'WHAT_IS_THE_COLOR_CODING_FOR_LAND_COVER_CHANGE_CLASSES',
          question: `${T}.QUESTIONS.WORKING_WITH_ACTIONS.WHAT_IS_THE_COLOR_CODING_FOR_LAND_COVER_CHANGE_CLASSES.QUESTION`,
          answer: [
            {
              type: 'text',
              content: `${T}.QUESTIONS.WORKING_WITH_ACTIONS.WHAT_IS_THE_COLOR_CODING_FOR_LAND_COVER_CHANGE_CLASSES.ANSWER_TEXT`,
            },
            {
              type: 'text',
              content: `${T}.QUESTIONS.WORKING_WITH_ACTIONS.WHAT_IS_THE_COLOR_CODING_FOR_LAND_COVER_CHANGE_CLASSES.CORINE_TITLE`,
            },
            { type: 'table', rows: CORINE_LAND_COVER_ROWS },
            {
              type: 'text',
              content: `${T}.QUESTIONS.WORKING_WITH_ACTIONS.WHAT_IS_THE_COLOR_CODING_FOR_LAND_COVER_CHANGE_CLASSES.WATERBODIES_TITLE`,
            },
            { type: 'table', rows: WATERBODIES_ROWS },
            {
              type: 'text',
              content: `${T}.QUESTIONS.WORKING_WITH_ACTIONS.WHAT_IS_THE_COLOR_CODING_FOR_LAND_COVER_CHANGE_CLASSES.GLOBAL_TITLE`,
            },
            { type: 'table', rows: GLOBAL_LAND_COVER_ROWS },
          ],
        },
        {
          id: 'WHAT_IS_THE_COLOUR_CODING_FOR_WATER_QUALITY_ANALYSIS',
          question: `${T}.QUESTIONS.WORKING_WITH_ACTIONS.WHAT_IS_THE_COLOUR_CODING_FOR_WATER_QUALITY_ANALYSIS.QUESTION`,
          answer: [
            {
              type: 'image-group',
              layout: 'vertical',
              images: [
                {
                  src: 'NDWI.png',
                  alt: `${T}.QUESTIONS.WORKING_WITH_ACTIONS.WHAT_IS_THE_COLOUR_CODING_FOR_WATER_QUALITY_ANALYSIS.NDWI_ALT`,
                  descriptionAbove: `${T}.QUESTIONS.WORKING_WITH_ACTIONS.WHAT_IS_THE_COLOUR_CODING_FOR_WATER_QUALITY_ANALYSIS.NDWI_DESC`,
                },
                {
                  src: 'DOC.png',
                  alt: `${T}.QUESTIONS.WORKING_WITH_ACTIONS.WHAT_IS_THE_COLOUR_CODING_FOR_WATER_QUALITY_ANALYSIS.DOC_ALT`,
                  descriptionAbove: `${T}.QUESTIONS.WORKING_WITH_ACTIONS.WHAT_IS_THE_COLOUR_CODING_FOR_WATER_QUALITY_ANALYSIS.DOC_DESC`,
                },
                {
                  src: 'CDOM.png',
                  alt: `${T}.QUESTIONS.WORKING_WITH_ACTIONS.WHAT_IS_THE_COLOUR_CODING_FOR_WATER_QUALITY_ANALYSIS.CDOM_ALT`,
                  descriptionAbove: `${T}.QUESTIONS.WORKING_WITH_ACTIONS.WHAT_IS_THE_COLOUR_CODING_FOR_WATER_QUALITY_ANALYSIS.CDOM_DESC`,
                },
                {
                  src: 'CYA.png',
                  alt: `${T}.QUESTIONS.WORKING_WITH_ACTIONS.WHAT_IS_THE_COLOUR_CODING_FOR_WATER_QUALITY_ANALYSIS.CYA_ALT`,
                  descriptionAbove: `${T}.QUESTIONS.WORKING_WITH_ACTIONS.WHAT_IS_THE_COLOUR_CODING_FOR_WATER_QUALITY_ANALYSIS.CYA_DESC`,
                },
              ],
            },
          ],
        },
        {
          id: 'WHAT_IS_THE_COLOUR_CODING_FOR_NDVI',
          question: `${T}.QUESTIONS.WORKING_WITH_ACTIONS.WHAT_IS_THE_COLOUR_CODING_FOR_NDVI.QUESTION`,
          answer: [
            {
              type: 'image',
              src: 'NDVI.png',
              alt: `${T}.QUESTIONS.WORKING_WITH_ACTIONS.WHAT_IS_THE_COLOUR_CODING_FOR_NDVI.IMAGE_ALT`,
            },
          ],
        },
        {
          id: 'WHAT_IS_THE_COLOUR_CODING_FOR_EVI',
          question: `${T}.QUESTIONS.WORKING_WITH_ACTIONS.WHAT_IS_THE_COLOUR_CODING_FOR_EVI.QUESTION`,
          answer: [
            {
              type: 'image',
              src: 'EVI.png',
              alt: `${T}.QUESTIONS.WORKING_WITH_ACTIONS.WHAT_IS_THE_COLOUR_CODING_FOR_EVI.IMAGE_ALT`,
            },
          ],
        },
        {
          id: 'WHAT_IS_THE_COLOUR_CODING_FOR_SAVI',
          question: `${T}.QUESTIONS.WORKING_WITH_ACTIONS.WHAT_IS_THE_COLOUR_CODING_FOR_SAVI.QUESTION`,
          answer: [
            {
              type: 'image',
              src: 'SAVI.png',
              alt: `${T}.QUESTIONS.WORKING_WITH_ACTIONS.WHAT_IS_THE_COLOUR_CODING_FOR_SAVI.IMAGE_ALT`,
            },
          ],
        },
      ],
    },
    {
      id: 'WORKING_WITH_GRAPHS',
      title: `${T}.QUESTIONS.WORKING_WITH_GRAPHS.SUBTITLE`,
      questions: [
        {
          id: 'HOW_DO_I_VIEW_GRAPHS_FOR_MY_DATA',
          question: `${T}.QUESTIONS.WORKING_WITH_GRAPHS.HOW_DO_I_VIEW_GRAPHS_FOR_MY_DATA.QUESTION`,
          answer: [
            {
              type: 'text',
              content: `${T}.QUESTIONS.WORKING_WITH_GRAPHS.HOW_DO_I_VIEW_GRAPHS_FOR_MY_DATA.ANSWER_TEXT`,
            },
          ],
        },
        {
          id: 'WHAT_TYPES_OF_GRAPHS_ARE_AVAILABLE_AND_WHAT_DO_THEY_REPRESENT',
          question: `${T}.QUESTIONS.WORKING_WITH_GRAPHS.WHAT_TYPES_OF_GRAPHS_ARE_AVAILABLE_AND_WHAT_DO_THEY_REPRESENT.QUESTION`,
          answer: [
            {
              type: 'nested-list',
              items: [
                {
                  content: `${T}.QUESTIONS.WORKING_WITH_GRAPHS.WHAT_TYPES_OF_GRAPHS_ARE_AVAILABLE_AND_WHAT_DO_THEY_REPRESENT.LINE_CHART`,
                  subItems: [
                    `${T}.QUESTIONS.WORKING_WITH_GRAPHS.WHAT_TYPES_OF_GRAPHS_ARE_AVAILABLE_AND_WHAT_DO_THEY_REPRESENT.LINE_CHART_SUB_1`,
                    `${T}.QUESTIONS.WORKING_WITH_GRAPHS.WHAT_TYPES_OF_GRAPHS_ARE_AVAILABLE_AND_WHAT_DO_THEY_REPRESENT.LINE_CHART_SUB_2`,
                  ],
                },
                {
                  content: `${T}.QUESTIONS.WORKING_WITH_GRAPHS.WHAT_TYPES_OF_GRAPHS_ARE_AVAILABLE_AND_WHAT_DO_THEY_REPRESENT.STACKED_BAR`,
                  subItems: [
                    `${T}.QUESTIONS.WORKING_WITH_GRAPHS.WHAT_TYPES_OF_GRAPHS_ARE_AVAILABLE_AND_WHAT_DO_THEY_REPRESENT.STACKED_BAR_SUB_1`,
                    `${T}.QUESTIONS.WORKING_WITH_GRAPHS.WHAT_TYPES_OF_GRAPHS_ARE_AVAILABLE_AND_WHAT_DO_THEY_REPRESENT.STACKED_BAR_SUB_2`,
                  ],
                },
                {
                  content: `${T}.QUESTIONS.WORKING_WITH_GRAPHS.WHAT_TYPES_OF_GRAPHS_ARE_AVAILABLE_AND_WHAT_DO_THEY_REPRESENT.GRAPH_NOTE`,
                },
              ],
            },
          ],
        },
        {
          id: 'HOW_DO_I_ADJUST_THE_TIME_RANGE_DISPLAYED_ON_GRAPHS',
          question: `${T}.QUESTIONS.WORKING_WITH_GRAPHS.HOW_DO_I_ADJUST_THE_TIME_RANGE_DISPLAYED_ON_GRAPHS.QUESTION`,
          answer: [
            {
              type: 'text',
              content: `${T}.QUESTIONS.WORKING_WITH_GRAPHS.HOW_DO_I_ADJUST_THE_TIME_RANGE_DISPLAYED_ON_GRAPHS.ANSWER_TEXT`,
            },
          ],
        },
      ],
    },
    {
      id: 'MEASUREMENT_AOI_MANAGEMENT',
      title: `${T}.QUESTIONS.MEASUREMENT_AOI_MANAGEMENT.SUBTITLE`,
      questions: [
        {
          id: 'HOW_DO_I_MEASURE_DISTANCES_AND_AREAS_ON_THE_MAP',
          question: `${T}.QUESTIONS.MEASUREMENT_AOI_MANAGEMENT.HOW_DO_I_MEASURE_DISTANCES_AND_AREAS_ON_THE_MAP.QUESTION`,
          answer: [
            {
              type: 'text',
              content: `${T}.QUESTIONS.MEASUREMENT_AOI_MANAGEMENT.HOW_DO_I_MEASURE_DISTANCES_AND_AREAS_ON_THE_MAP.ANSWER_TEXT`,
            },
          ],
        },
      ],
    },
    {
      id: 'COMPARISON_AND_LAYER_MANAGEMENT',
      title: `${T}.QUESTIONS.COMPARISON_AND_LAYER_MANAGEMENT.SUBTITLE`,
      questions: [
        {
          id: 'HOW_DO_I_USE_THE_COMPARISON_TOOL',
          question: `${T}.QUESTIONS.COMPARISON_AND_LAYER_MANAGEMENT.HOW_DO_I_USE_THE_COMPARISON_TOOL.QUESTION`,
          answer: [
            {
              type: 'text',
              content: `${T}.QUESTIONS.COMPARISON_AND_LAYER_MANAGEMENT.HOW_DO_I_USE_THE_COMPARISON_TOOL.ANSWER_TEXT`,
            },
          ],
        },
      ],
    },
  ],
};
