interface Resources {
  en: {
    GLOBAL: {
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
        };
        LOADER: {
          RESULTS_VIEW_LOADER: 'Please wait, searching Data Sets';
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
      };
      NAVIGATION: {
        RETURN_TO_SERCH: 'Return to the search menu';
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
            SAVE_WORKFLOW: 'Save Workflow';
            RUN_ACTION_CREATOR: 'Run Action Creator';
          };
        };
        NODE: {
          AREA: {
            TITLE: 'Area';
            DEFAULT_VALUE: 'Drawing 1';
            INSTRUCTIONS: 'Use the drawing tools to define an area of interest';
            DESCRIPTION: 'Total area:';
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
              NDVI: 'NDVI';
              FALSE_COLOUR: 'False colour (urban)';
              MOISTURE_INDEX: 'Moisture index';
              SWIR: 'SWIR';
              NDWI: 'NDWI';
              NDSI: 'NDSI';
            };
          };
        };
        ONBOARDING: {
          STEPS: {
            AREA_NODE: 'Click here to begin using the Action Creator.';
            DRAWING_TOOLS: 'Select a drawing tool.';
            DATA_SET_NODE: 'Now click to select the next node and choose a Data Set.';
            DATA_SET_PANEL: 'Select a Data Set from the list. Configure settings using the cog icon.';
            DATE_RANGE_PICKER: 'Select a start and end date range. You can narrow your selection after the Action Creator has run.';
            FUNCTION_DROPDOWN: 'Click here to select a Function.';
          };
          MODAL: {
            CONTENT: 'The Action Creator is a complex workflow generation tool. We’ve tried to make it as intuitive as possible to use, but if you prefer, we have included helpful tooltips to guide you through the process. Would you like to work with tooltips?';
            DONT_SHOW_IT_AGAIN: 'Don’t show again';
            BUTTON_YES: 'Yes, show tooltips';
            BUTTON_NO: 'No, let me explore on my own';
          };
        };
        PRESETS: {
          BUTTON: 'Load preset';
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
          DATE_FROM_SHOULD_BE_EARLIER_THAN_DATE_TO: 'Invalid date. Date from should be earlier';
          DATE_TO_SHOULD_BE_LATER_THAN_DATE_TO: 'Invalid date. Date to should be later';
        };
        DATA_SETS: {
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
    };
  };
}

export default Resources;
