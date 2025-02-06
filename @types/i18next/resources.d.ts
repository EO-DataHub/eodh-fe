interface Resources {
  en: {
    GLOBAL: {
      UNITS: {
        KM: 'km';
        MILES: 'm';
      };
      DESIGN_SYSTEM: {
        SELECT: {
          PLACEHOLDER: 'Select a function...';
        };
        TEXTINPUT: {
          PLACEHOLDER: 'Start typing...';
        };
        TEXTAREA: {
          COUNTER: '{{currentLength}}/{{maxLength}} characters';
        };
        RESULT_ITEM: {
          NO_IMAGE: 'No image';
          BUTTON_SHOW: 'View';
          BUTTON_HIDE: 'Hide';
          ADD_TO_COMPARE: 'Add to compare';
          REMOVE_COMPARE: 'Remove compare';
          BUTTON: {
            DOWNLOAD: 'Download files';
          };
        };
        LOADER: {
          RESULTS_VIEW_LOADER: 'Please wait, searching Data Sets';
        };
        TIME_SLIDER: {
          MONTHS: {
            JAN: 'Jan';
            FEB: 'Feb';
            MAR: 'Mar';
            APR: 'Apr';
            MAY: 'May';
            JUN: 'Jun';
            JUL: 'Jul';
            AUG: 'Aug';
            SEP: 'Sep';
            OCT: 'Oct';
            NOV: 'Nov';
            DEC: 'Dec';
          };
        };
      };
      LOGIN: {
        LOGIN_BUTTON: 'Log in';
        LOGOUT_BUTTON: 'Log out';
      };
      ERRORS: {
        VALIDATION: {
          MIN: 'Field value should be higher than {{min}}';
          MIN_LENGTH: 'Field value should have at least {{requiredLength}} character(s)';
          MAX: 'Field value should be lower than {{max}}';
          MAX_LENGTH: 'Field value cannot exceed {{requiredLength}} characters';
          REQUIRED: 'Field is required';
          AFTER_THEN: 'The From date must be before the To date';
          BEFORE_THEN: 'The To date must be after the From date';
          INVALID_EMAIL: 'Field value should be a valid email address';
          ONLY_NUMBER: 'Field value should be a number';
          INVALID_PATTERN: 'Field value should has a valid pattern: {{requiredPattern}}';
          ZIP_CODE_INVALID: 'ZIP/Postal code is invalid for chosen country';
          INVALID_DATE: 'Invalid date format';
        };
        API_ERROR: {
          COMMON: 'Something went wrong, please try again';
        };
        SERVER_ERROR: {
          TITLE: 'Server error';
          MESSAGE: 'There was a problem retrieving your search results from the server. Please update your search parameters and try again.';
        };
        NO_RESULTS: {
          TITLE: 'Sorry, your search returned no results.';
          MESSAGE: 'Please refine your search criteria. Try a broader date range, adjust Data Set settings or consider choosing multiple Data Sets.';
        };
        PRESETS: {
          TITLE: 'Server error';
          MESSAGE: 'There was a problem retrieving workflow presets from the server. Please try again later.';
          CTA: 'Refresh workflow preset list';
        };
        WORKFLOW_IMPORT: {
          WRONG_FILE: 'Wrong file format. Only JSON files with valid schemas can be imported.';
        };
      };
      NAVIGATION: {
        RETURN_TO_SEARCH: 'Return to the search menu';
      };
    };
    MAP: {
      ACTION_CREATOR_PANEL: {
        HEADER: {
          ACTION_CREATOR: 'Action Creator';
          TABS: {
            WORKFLOW: 'Workflow';
            HISTORY: 'History';
            PRESETS: 'Presets';
            HELP: 'Help';
          };
        };
        FOOTER: {
          BUTTON: {
            IMPORT: 'Import';
            EXPORT: 'Export';
            SAVE_WORKFLOW: 'Save Workflow';
            RUN_ACTION_CREATOR: 'Run Action Creator';
          };
        };
        ONBOARDING: {
          STEPS: {
            AREA_NODE: 'Click here to begin using the Action Creator.';
            DONT_SHOW_IT_AGAIN: 'Don’t show again';
            DRAWING_TOOLS: 'Select a drawing tool.';
            DATA_SET_NODE: 'Now click to select the next node and choose a Data Set.';
            DATA_SET_PANEL: 'Select a Data Set from the list. Configure settings using the cog icon.';
            DATE_RANGE_PICKER: 'Select a start and end date range. You can narrow your selection after the Action Creator has run.';
            FUNCTION_DROPDOWN: 'Click here to select a Function.';
            ADD_FUNCTION_NODE: 'You can add multiple Function nodes using the “+” button.';
          };
        };
        MODALS: {
          COMPARISON_MODE_MODAL: {
            HEADER: 'You are currently in Compare mode';
            CONTENT: 'While comparing results, you cannot use the Action Creator. Please end Compare mode to continue using the Action Creator or using the left search menu.';
            CTA_BUTTON: 'End Compare';
          };
          TABS_FLOW_MODAL: {
            DONT_SHOW_IT_AGAIN: 'Don’t show again';
            CTA_NO: 'No, cancel';
            WORKFLOW: {
              HEADER: 'You are about to navigate away from your loaded Workflow results.';
              CONTENT: 'Creating and running a new Workflow will replace any data you’re currently viewing. You can still access this data from the History tab at the top of the Action Creator. Are you sure you want to do this?';
              CTA_BUTTON: 'Yes, create new Workflow';
            };
            PRESETS: {
              HEADER: 'You are about to navigate away from your loaded Workflow results.';
              CONTENT: 'Loading a preset will replace any data you’re currently viewing. You can still access this data from the History tab at the top of the Action Creator. Are you sure you want to do this?';
              CTA_BUTTON: 'Yes, view Presets';
            };
          };
          UNACTIVE_AC_MODE_MODAL: {
            HEADER: 'Welcome to the Action Creator';
            CONTENT: 'There are many useful Earth observation features in EOPro, but the Action Creator unlocks additional search tools. These are separate from the Data Sets on the left of the screen, and need to be activated and configured independently.';
            CTA_BUTTON: 'Activate the Action Creator';
          };
          UNLOGGED_USER_MODAL: {
            HEADER: 'Please log in to use the Action Creator';
            CONTENT: 'There are many useful Earth observation features in EOPro, but the Action Creator unlocks additional search tools. To unlock these you will first need to log in using a <MyLink>GitHub account</MyLink>. It’s free and gives you the following features:';
            BENEFITS: [
              'Customisable workflows',
              'Access to land cover change features',
              'Powerful EO functions',
              'Import/Export workflows',
              'Another feature'
            ];
            CTA_BUTTON: 'Log in';
          };
          WORKFLOW_PROCESSING_MODAL: {
            SUCCESS: {
              HEADER: 'The Action Creator is currently processing your workflow.';
              CONTENT: {
                INFORMATION: 'Depending on the complexity of the workflow, this step can take some time to complete. Please don’t close this browser window. We will notify you once your data is ready to view.';
                BROWSE_DATA: 'In the meantime you can browse map data or start a new workflow.';
              };
              BUTTON: {
                EXPORT_CONFIGURATION: 'Export configuration';
                VIEW_HISTORY: 'View history';
              };
            };
            IN_PROGRESS: {
              HEADER: 'Processing Workflow, please wait...';
              CONTENT: 'Depending on the complexity of the workflow, this step can take some time to complete. Please don’t close this browser window.';
            };
          };
        };
        PRESETS: {
          BUTTON: 'Load preset';
          COMING_SOON: 'Coming soon!';
        };
        HISTORY: {
          VIEW_RESULTS: 'View results';
          HIDE_RESULTS: 'Hide results';
          SAVED_ON: 'Saved on';
          SAVED_AT: 'at';
          ID: 'ID';
          STATUS: {
            READY: 'Ready';
            PROCESSING: 'Processing';
            FAILED: 'Failed';
          };
          SORT_FILTER: {
            SORT: 'Sort';
            NEWEST: 'Newest first';
            OLDEST: 'Oldest first';
          };
          LOAD_MORE: 'Load more';
          ERROR: {
            TITLE: 'Server error';
            MESSAGE: 'There was a problem retrieving workflow history from the server. Please try again later.';
            CTA: 'Refresh workflow history list';
          };
        };
        WORKFLOW: {
          ERROR: {
            AOI_TOO_BIG: 'Area exceeds {{maxSize}} square kilometers.';
            AOI_MISSING: 'Area of Interest is missing.';
            INVALID_DATE_RANGE: 'End date cannot be before start date.';
            COLLECTION_NOT_SUPPORTED: 'Collection {{collection}} cannot be used with {{function}} function! Valid options are: {{options}}.';
          };
          NODE: {
            AREA: {
              TITLE: 'Area';
              DEFAULT_VALUE: 'Drawing 1';
              INSTRUCTIONS: 'Use the drawing tools to define an area of interest. Please note we cannot return results for areas greater than {{maxSize}}';
              DESCRIPTION: 'Total area:';
              ALLOWED_SIZE: 'Please select an area less than {{maxSize}}';
            };
            DATA_SET: {
              TITLE: 'Data Set';
              INSTRUCTIONS: 'Select a data set';
              SENTINEL_1: 'Sentinel-1';
              SENTINEL_2: 'Sentinel-2';
              SENTINEL_3: 'Sentinel-3';
              SENTINEL_5P: 'Sentinel-5P';
              AUXILIARY: {
                GLOBAL_LAND_COVER: 'Global Land Cover';
                CORINE_LAND_COVER: 'CORINE Land Cover';
                WATER_BODIES: 'Water Bodies';
              };
            };
            DATE_RANGE: {
              TITLE: 'Date Range';
              INSTRUCTIONS: 'Select a start and end date range';
            };
            FUNCTION: {
              TITLE: 'Function';
              OPTIONS: {
                RASTER_CALCULATOR: 'Raster Calculator';
                LAND_COVER_CHANGES: 'Land Cover Change Detection';
                WATER_QUALITY: 'Water Quality Analysis';
                CLIP: 'Clip';
              };
            };
          };
        };
        HELP: {
          TITLE: 'Action Creator Help Topics';
          INTRO: 'Click on one of the questions below to see more detailed explanations.';
          BACK_BTN: 'Back to Top';
          QUESTIONS: {
            GENERAL_FUNCIONALITY: {
              SUBTITLE: 'General functionality';
              WHAT_IS_THE_AC: {
                QUESTION: 'What is the Action Creator?';
                ANSWER: [
                  'The Action Creator is a workflow builder that allows users to define workflow processing steps using datasets, AOI, date ranges, and functions.'
                ];
              };
              HOW_TO_CREATE_WORKFLOW_IN_THE_AC: {
                QUESTION: 'How do I create a workflow in Action Creator?';
                ANSWER: [
                  [
                    'Click on the toggle button in the top left of the Action Creator panel.',
                    'Add an AOI, Dataset, Date Range, and Function(s).',
                    'Click Run to execute the workflow.'
                  ]
                ];
              };
              WHAT_ARE_THE_DIFFERENT_WORKFLOW_BLOCKS: {
                QUESTION: 'What are the different workflow blocks (nodes) and how do they work?';
                ANSWER: [
                  'Workflow blocks (also called nodes) represent different stages in the Action Creator workflow. Each block must be filled before running the workflow. These blocks are:',
                  [
                    'Area (AOI) – Defines the geographic region for analysis.',
                    'Dataset – Selects the dataset(s) to be used in the workflow.',
                    'Date Range – Specifies the time period for data selection.',
                    'Function – Applies a data processing function (e.g., NDVI calculation, water quality analysis).',
                    'Additional Function Blocks – Users can add consecutive functions to process data in multiple steps.'
                  ],
                  'Each block must be filled in order, and the workflow cannot run until all required blocks are set.'
                ];
              };
              HOW_DO_I_SELECT_A_DATASET_FOR_MY_WORKFLOW: {
                QUESTION: 'How do I select a data set for my workflow?';
                ANSWER: [
                  [
                    "Click on the 'Data set' block in the Action Creator panel.",
                    'The left-side menu will display available data sets.',
                    'Choose a dataset (e.g., Sentinel-1).',
                    'If the data set has advanced settings (e.g., cloud coverage), configure them if needed.',
                    'The selected data set name will appear inside the Dataset block.'
                  ]
                ];
              };
              HOW_DO_I_SELECT_WORKFLOW_FUNCTIONS: {
                QUESTION: 'How do I select workflow functions?';
                ANSWER: [
                  [
                    "Click on the 'Function' block in Action Creator.",
                    'A dropdown menu appears with available functions (e.g., NDVI, Land Cover Change, Water Quality Analysis).',
                    'Select a function that is compatible with your dataset.',
                    'The Function block will now display the selected function.',
                    "You can click '+' below the function block to add additional compatible functions."
                  ]
                ];
              };
              WHAT_IS_THE_DIFFERENCE_BETWEEN_THE_WORKFLOW_AND_HISTORY_TABS: {
                QUESTION: 'What is the difference between the Workflow and History tabs?';
                ANSWER: [
                  [
                    'Workflow Tab – Allows users to design and run new workflows by selecting AOI, dataset, date range, and function(s). This is the active workflow builder.',
                    'History Tab – Shows previously run workflows along with their status:',
                    [
                      'Processing – Workflow is still running.',
                      'Ready – Workflow has completed and results can be viewed.',
                      'Failed – Workflow encountered an error.'
                    ]
                  ]
                ];
              };
              WHAT_ARE_WORKFLOW_PRESETS_AND_HOW_DO_I_USE_THEM: {
                QUESTION: 'What are workflow presets, and how do I use them?';
                ANSWER: [
                  'Workflow presets are predefined workflows that users can load instead of manually configuring every step. They are useful for common analyses like:',
                  ['Land Cover Change', 'Water Quality Analysis'],
                  'To use a preset:',
                  [
                    "Click on the 'Presets' tab in Action Creator.",
                    'A list of available presets will appear with descriptions.',
                    "Click 'Load Preset' on the desired workflow.",
                    'The Dataset and Function blocks will be pre-filled, and the user can define the AOI and Date Range.',
                    'Click Run to execute the preset workflow.'
                  ]
                ];
              };
            };
            MANAGING_DATASETS_AND_FUNCTIONS_IN_AC: {
              SUBTITLE: 'Managing Datasets & Functions in Action Creator';
              HOW_TO_ADD_COMERCIAL_DATASETS: {
                QUESTION: 'How do I add commercial datasets (e.g., Planet items) to Action Creator workflows?';
                ANSWER: [
                  'To use commercial datasets in the Action Creator, the dataset’s item must first be purchased and available in My Items:',
                  [
                    'Purchase the dataset:',
                    [
                      'Run a search with a commercial dataset.',
                      "Click 'Purchase' next to an item.",
                      'Complete the transaction on the TPZ portal.',
                      'After purchase, the item appears in My Items (left panel).'
                    ],
                    'Use the dataset’s item in Action Creator:',
                    [
                      "Open Action Creator and click on the 'Dataset' block.",
                      "In the left-side menu, go to 'My Items'.",
                      'Select the purchased item.',
                      'The dataset item’s name appears in the Dataset block.'
                    ],
                    'Proceed with workflow configuration:',
                    [
                      'Select a Date Range and Function(s).',
                      'Click Run to execute the workflow using the commercial dataset’s item.'
                    ]
                  ]
                ];
              };
              HOW_TO_USE_MULTIPLE_FUNCTIONS: {
                QUESTION: 'How do I use multiple functions in a single workflow?';
                ANSWER: [
                  [
                    "Click on the 'Function' block in the Action Creator panel.",
                    "Click the '+' button below the block to add another function."
                  ],
                  'Functions execute sequentially from top to bottom. You cannot remove or modify a function in the middle—only the last function can be deleted first. Parallel functions are not yet supported'
                ];
              };
              HOW_TO_FILTER_RESULTS_WITH_TIME_SLIDER: {
                QUESTION: 'How do I filter workflow results by time using the time slider?';
                ANSWER: [
                  'After running a workflow, the time slider appears below the search/workflow panel. Drag the slider handles to adjust the displayed time range without re-running the workflow. Narrowing the range filters results to selected timestamps. Expanding the range shows more results but cannot exceed the original workflow date range. The workflow execution remains unchanged—only the displayed results update dynamically.'
                ];
              };
            };
            EXECUTING_AND_TRACKING_WORKFLOWS: {
              SUBTITLE: 'Executing & Tracking Workflows';
              HOW_DO_I_VIEW_WORKFLOW_EXECUTION_RESULTS: {
                QUESTION: 'How do I view workflow execution results?';
                ANSWER: [
                  "Open the History tab in Action Creator to see past workflows. Click 'View Results' to open a completed workflow’s results. Results appear in the left panel. Click a thumbnail to view its details. The corresponding footprint is displayed on the map. Click 'View' to load the result as a map layer."
                ];
              };
              HOW_DO_I_TRACK_THE_EXECUTION_PROGRESS_OF_MY_WORKFLOW: {
                QUESTION: 'How do I track the execution progress of my workflow?';
                ANSWER: [
                  'Open the History tab in Action Creator. Workflow status indicators:',
                  [
                    'Processing – Workflow is still running.',
                    'Ready – Workflow is completed and results are available.',
                    'Failed – Workflow encountered an error.'
                  ]
                ];
              };
              HOW_DO_I_VIEW_WORKFLOW_EXECUTION_NOTIFICATIONS: {
                QUESTION: 'How do I view workflow execution notifications?';
                ANSWER: [
                  'A green dot appears next to the History tab when a workflow finishes. Click History to view execution details.'
                ];
              };
              WHAT_HAPPENS_IF_I_SWITCH_TO_ACTION_CREATOR_WHILE_HAVING_A_SEARCH_SESSION_ACTIVE: {
                QUESTION: 'What happens if I switch to Action Creator while having a search session active?';
                ANSWER: [
                  'Your search selections (AOI, date range, dataset) are not transferred to Action Creator. You must redefine your AOI, dataset, and date range in Action Creator. Switching does not delete previous search results—they remain in the Search tab.'
                ];
              };
              CAN_I_SAVE_MY_WORKFLOW_FOR_FUTURE_USE: {
                QUESTION: 'Can I save my workflow for future use?';
                ANSWER: [
                  "Yes – Workflows can be exported and reloaded later. Click 'Export' to save the workflow as a JSON file. To reuse, go to 'Import' and upload the saved workflow."
                ];
              };
              WHAT_HAPPENS_IF_I_RUN_MULTIPLE_WORKFLOWS_AT_THE_SAME_TIME: {
                QUESTION: 'What happens if I run multiple workflows at the same time?';
                ANSWER: [
                  'You can run multiple workflows simultaneously. Each workflow runs independently and appears in the History tab. Results are processed in parallel, and you can start a new workflow while others are still running.'
                ];
              };
              HOW_DO_I_CANCEL_A_RUNNING_WORKFLOW: {
                QUESTION: 'How do I cancel a running workflow?';
                ANSWER: ['Currently, running workflows cannot be cancelled.'];
              };
              HOW_DO_I_ACCESS_MY_SAVED_WORKFLOW_RESULTS_OR_CONFIGURATION: {
                QUESTION: 'How do I access my saved workflow results or configuration?';
                ANSWER: [
                  'In order to access saved workflow results, go to History tab and click on View Results button next to a desired workflow.',
                  'Past workflow configurations have to be exported first and then imported in order to resume them. They are not saved automatically.'
                ];
              };
            };
            WORKING_WITH_GRAPHS: {
              SUBTITLE: 'Working with Graphs';
              HOW_DO_I_VIEW_GRAPHS_FOR_MY_DATA: {
                QUESTION: 'How do I view graphs for my data?';
                ANSWER: [
                  'Graphs are displayed automatically for applicable workflows. They show results as per used functions, for example NDVI values or Land Cover classes.'
                ];
              };
              WHAT_TYPES_OF_GRAPHS_ARE_AVAILABLE_AND_WHAT_DO_THEY_REPRESENT: {
                QUESTION: 'What types of graphs are available, and what do they represent?';
                ANSWER: [
                  [
                    'Line Chart: Used for NDVI, SAVI, EVI, and Water Quality Analysis.',
                    [
                      'Min, max, and median values are plotted for each timestamp.',
                      'Min and max create a shaded range, with the median inside.'
                    ],
                    'Stacked Bar Chart: Used for Land Cover Change analysis.',
                    [
                      'Each bar represents land cover percentages for different classes (e.g., wetlands, grasslands).',
                      'Clicking a legend item allows filtering to a single land cover class.'
                    ],
                    'Graph types are predefined by metadata and cannot be changed manually.'
                  ]
                ];
              };
              HOW_DO_I_ADJUST_THE_TIME_RANGE_DISPLAYED_ON_GRAPHS: {
                QUESTION: 'How do I adjust the time range displayed on graphs?';
                ANSWER: [
                  'Use the time slider to filter the displayed data range. Drag the start and end handles to narrow or expand the time window. Narrowing the range hides data outside the selected period. Expanding the range restores hidden timestamps (within the workflow’s original date range). This data manipulation is reflected automatically on a respective graph.'
                ];
              };
              WHAT_IS_THE_COLOR_CODING_FOR_LAND_COVER_CHANGE_CLASSES: {
                QUESTION: 'What is the color coding for Land Cover Change classes?';
                ANSWER: [
                  'Land cover classes displayed on the Land Cover Changes graph use the following color coding:',
                  {
                    TABLE: [
                      {
                        LABEL: 'Continuous urban fabric';
                        COLOR: '#e6004d';
                      },
                      {
                        LABEL: 'Discontinuous urban fabric';
                        COLOR: '#ff0000';
                      },
                      {
                        LABEL: 'Industrial or commercial units';
                        COLOR: '#cc4df2';
                      },
                      {
                        LABEL: 'Road and rail networks and associated land';
                        COLOR: '#cc0000';
                      },
                      {
                        LABEL: 'Port areas';
                        COLOR: '#e6cccc';
                      },
                      {
                        LABEL: 'Airports';
                        COLOR: '#e6cce6';
                      },
                      {
                        LABEL: 'Mineral extraction sites';
                        COLOR: '#600ccc';
                      },
                      {
                        LABEL: 'Dump sites';
                        COLOR: '#a64d00';
                      },
                      {
                        LABEL: 'Construction sites';
                        COLOR: '#ff4dff';
                      },
                      {
                        LABEL: 'Green urban areas';
                        COLOR: '#ffa6ff';
                      },
                      {
                        LABEL: 'Sport and leisure facilities';
                        COLOR: '#ffe6ff';
                      },
                      {
                        LABEL: 'Non-irrigated arable land';
                        COLOR: '#ffffa8';
                      },
                      {
                        LABEL: 'Permanently irrigated land';
                        COLOR: '#ffff00';
                      },
                      {
                        LABEL: 'Rice fields';
                        COLOR: '#e6e600';
                      },
                      {
                        LABEL: 'Vineyards';
                        COLOR: '#e68000';
                      },
                      {
                        LABEL: 'Fruit trees and berry plantations';
                        COLOR: '#f2a64d';
                      },
                      {
                        LABEL: 'Olive groves';
                        COLOR: '#e6a600';
                      },
                      {
                        LABEL: 'Pastures';
                        COLOR: '#e6e64d';
                      },
                      {
                        LABEL: 'Annual crops associated with permanent crops';
                        COLOR: '#ffe6a6';
                      },
                      {
                        LABEL: 'Complex cultivation patterns';
                        COLOR: '#ffe64d';
                      },
                      {
                        LABEL: 'Agro-forestry areas';
                        COLOR: '#f2cca6';
                      },
                      {
                        LABEL: 'Broad-leaved forest';
                        COLOR: '#80ff00';
                      },
                      {
                        LABEL: 'Coniferous forest';
                        COLOR: '#00a600';
                      },
                      {
                        LABEL: 'Mixed forest';
                        COLOR: '#4dff00';
                      },
                      {
                        LABEL: 'Natural grasslands';
                        COLOR: '#ccf24d';
                      },
                      {
                        LABEL: 'Moors and heathland';
                        COLOR: '#a6ff80';
                      },
                      {
                        LABEL: 'Sclerophyllous vegetation';
                        COLOR: '#a6e64d';
                      },
                      {
                        LABEL: 'Transitional woodland-shrub';
                        COLOR: '#a6f200';
                      },
                      {
                        LABEL: 'Beaches - dunes - sands';
                        COLOR: '#e6e6e6';
                      },
                      {
                        LABEL: 'Bare rocks';
                        COLOR: '#cccccc';
                      },
                      {
                        LABEL: 'Sparsely vegetated areas';
                        COLOR: '#ccffcc';
                      },
                      {
                        LABEL: 'Burnt areas';
                        COLOR: '#000000';
                      },
                      {
                        LABEL: 'Glaciers and perpetual snow';
                        COLOR: '#a6e6cc';
                      },
                      {
                        LABEL: 'Inland marshes';
                        COLOR: '#a6a6ff';
                      },
                      {
                        LABEL: 'Peat bogs';
                        COLOR: '#4d4dff';
                      },
                      {
                        LABEL: 'Salt marshes';
                        COLOR: '#ccccff';
                      },
                      {
                        LABEL: 'Salines';
                        COLOR: '#e6e6ff';
                      },
                      {
                        LABEL: 'Intertidal flats';
                        COLOR: '#a6a6e6';
                      },
                      {
                        LABEL: 'Water courses';
                        COLOR: '#00ccf2';
                      },
                      {
                        LABEL: 'Water bodies';
                        COLOR: '#80f2e6';
                      },
                      {
                        LABEL: 'Coastal lagoons';
                        COLOR: '#00ffa6';
                      },
                      {
                        LABEL: 'Estuaries';
                        COLOR: '#a6ffe6';
                      },
                      {
                        LABEL: 'Sea and ocean';
                        COLOR: '#e6f2ff';
                      },
                      {
                        LABEL: 'NODATA';
                        COLOR: '#ffffff';
                      }
                    ];
                  }
                ];
              };
            };
            MEASUREMENT_AOI_MANAGEMENT: {
              SUBTITLE: 'Measurement & AOI Management';
              HOW_DO_I_MEASURE_DISTANCES_AND_AREAS_ON_THE_MAP: {
                QUESTION: 'How do I measure distances and areas on the map?';
                ANSWER: [
                  'Click the Measurement Tool in the top menu. Click on the map to place points and measure distances. For areas, add at least three points to enclose a shape. You can also change measurement units.'
                ];
              };
            };
            COMPARISON_AND_LAYER_MANAGEMENT: {
              SUBTITLE: 'Comparison & Layer Management';
              HOW_DO_I_USE_THE_COMPARISON_TOOL: {
                QUESTION: 'How do I use the comparison tool?';
                ANSWER: [
                  "Click 'Add to Compare' for an item from Search or Action Creator. Select a second item to enable the comparison tool. The comparison tool provides a swipe bar to compare images. You cannot run Search or Action Creator while actively using the comparison tool—exit the comparison mode to resume other tasks."
                ];
              };
            };
          };
        };
      };
      ACTION_CREATOR_MODE_RESULTS: {
        HEADER: {
          AC_WORKFLOW_RESULTS: 'Action Creator workflow results';
        };
      };
      COMPARISON_TOOL: {
        COMPARING: 'Comparing:';
        WITH: 'with:';
        INPUT_PLACEHIOLDER: 'Awaiting product';
        CTA_BUTTON: {
          COMPARE: 'Compare';
          END_COMPARE: 'End compare';
        };
        NO_INTERSECTION: 'Selected data have no intersection';
      };
      SEARCH_MODE_PANEL: {
        HEADER: {
          BROWSE_DATA_SETS: 'Browsing data sets';
          BACK_TO_DATA_SETS: 'Back to data sets';
        };
      };
      SEARCH_VIEW: {
        VALIDATION: {
          ONE_OF_FIELDS_REQUIRED: 'You must select at least one of the following options';
          ONLY_ONE_FIELD_IS_REQUIRED: 'You must select only one of the following options';
          DATE_FROM_SHOULD_BE_EARLIER_THAN_DATE_TO: 'Invalid date. Date from should be earlier';
          DATE_TO_SHOULD_BE_LATER_THAN_DATE_TO: 'Invalid date. Date to should be later';
        };
        DATA_SETS: {
          INFO_BOX: {
            SOME_OPTIONS_ARE_INCOMPATIBLE: 'Some menu options may be incompatible with your selections in the Action Creator';
            BUTTON: {
              DISMISS: 'Dismiss';
            };
          };
          DATA_SETS_CONFIGURATION: {
            PRIVATE: 'Private';
            PUBLIC: 'Public';
            PLANET: {
              NAME: 'Planet';
              PLANET_SCOPE: {
                NAME: 'Planet Scope';
              };
              SKY_SAT: {
                NAME: 'SkySat';
              };
              RAPID_EYE: {
                NAME: 'RapidEye';
              };
            };
            AIR_BUS: {
              NAME: 'AirBus';
            };
            AUXILIARY: {
              NAME: 'Auxiliary';
              GLOBAL_LAND_COVER: 'Global Land Cover';
              CORINE_LAND_COVER: 'CORINE Land Cover';
              WATER_BODIES: 'Water Bodies';
            };
            COPERNICUS: {
              NAME: 'Copernicus';
              SENTINEL_1: {
                NAME: 'Sentinel-1';
                SETTINGS: {
                  ACQUISITION_MODE: 'Acquisition mode:';
                  EW: 'EW - Extra-Wide Swath 40m x 40m';
                  POLARIZATION: 'Polarization';
                  HH: 'HH';
                  HH_HV: 'HH+HV';
                  IW: 'IW - Interferometric Wide Swath 10m x 10m';
                  VV: 'VV';
                  VV_VH: 'VV+VH';
                  ORBIT_DIRECTION: 'Orbit direction:';
                  ASCENDING: 'Ascending';
                  DESCENDING: 'Descending';
                };
              };
              SENTINEL_2: {
                NAME: 'Sentinel-2';
                SETTINGS: {
                  L1C: 'L1C';
                  L2A: 'L2A (atmospherically corrected)';
                  MAX_CLOUD_COVERAGE: 'Max cloud coverage:';
                };
              };
              SENTINEL_3: {
                NAME: 'Sentinel-3';
                SETTINGS: {
                  SLSTR: 'SLSTR';
                  MAX_CLOUD_COVERAGE: 'Max cloud coverage:';
                  OLCI: 'OLCI';
                };
              };
              SENTINEL_5P: {
                NAME: 'Sentinel-5P';
                SETTINGS: {
                  AER_AI: 'AER AI (Aerosol Index)';
                  CH4: 'CH4 (Methane)';
                  CLOUD: 'Cloud';
                  CO: 'CO (Carbon monoxide)';
                  HCHO: 'HCHO (Formaldehyde)';
                  NO2: 'NO2 (Nitrogen dioxide)';
                  O3: 'O3 (Ozone)';
                  SO2: 'SO2 (Sulfur dioxide)';
                };
              };
            };
          };
        };
        DATE_RANGE_PICKER: {
          TITLE: 'Date range';
          SEARCH_FROM: 'Search from:';
          SEARCH_TO: 'Search to:';
          SEARCH: 'Search';
        };
        CHECKLIST: {
          HEADING: 'Getting started checklist';
          AREA_OF_INTERESTS: 'Use the drawing tools to define an area of interest.';
          DATA_SETS: 'Select one or more Data Sets.';
          DATE_RANGE: 'Update date range.';
          DONT_SHOW_IT_AGAIN: 'Don’t show again';
        };
      };
      TIMELINE_ANALYTICS_DASHBOARD: {
        CHARTS: {
          ERRORS: {
            NO_RESULTS: {
              TITLE: 'No graph data available';
              MESSAGE: 'Please refine your search criteria. Try a broader date range, adjust Data Set settings or consider choosing multiple Data Sets.';
            };
          };
          RANGE_AREA: {
            TOOLTIP: {
              MEDIAN: 'Median';
              MIN: 'Minimum';
              MAX: 'Maximum';
              DATE: 'Date';
            };
          };
          STACK_BAR: {
            TOOLTIP: {
              VALUE: 'Value';
              PERCENTAGE: 'Percentage';
              DATE: 'Date';
            };
          };
          BAR: {
            TOOLTIP: {
              VALUE: 'Value';
              DATE: 'Date';
            };
          };
        };
      };
    };
  };
}

export default Resources;
