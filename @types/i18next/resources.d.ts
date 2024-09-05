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
          BUTTON: 'View';
          ADD_TO_COMPARE: 'Add to compare';
          REMOVE_COMPARE: 'Remove compare';
        };
        LOADER: {
          RESULTS_VIEW_LOADER: 'Please wait, searching Data Sets';
        };
      };
      LOGIN: {
        LOGIN_BUTTON: 'Login';
        LOGOUT_BUTTON: 'Logout';
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
      };
      NAVIGATION: {
        RETURN_TO_SERCH: 'Return to the search menu';
      };
    };
    MAP: {
      SEARCH_PANEL: {
        VALIDATION: {
          ONE_OF_FIELDS_REQUIRED: 'You must select at least one of the following options';
          DATE_FROM_SHOULD_BE_EARLIER_THAN_DATE_TO: 'Invalid date. Date from should be earlier';
          DATE_TO_SHOULD_BE_LATER_THAN_DATE_TO: 'Invalid date. Date to should be later';
        };
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
    };
  };
}

export default Resources;
