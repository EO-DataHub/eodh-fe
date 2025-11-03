import { useComparisonMode } from '@ukri/map/data-access-map';
import { DateInput, Icon, Text } from '@ukri/shared/design-system';
import { OnboardingTooltip, useOnboarding } from '@ukri/shared/ui/ac-workflow-onboarding';
import { createDate } from '@ukri/shared/utils/date';
import get from 'lodash/get';
import { useCallback, useMemo, useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { TInitialForm, TUpdateForm } from '../schema/form.schema';
import { useSearchView } from '../search-view.context';
import { styles } from './date-range-picker.styles';

const dateFromFieldName = 'date.from';
const dateToFieldName = 'date.to';
const dateMinFieldName = 'date.min';
const dateMaxFieldName = 'date.max';

interface IDateRangePickerProps {
  dateRangeState: {
    state: 'pending' | 'error' | 'success';
    error:
      | {
          collectionIds: string[];
          message?: string;
        }
      | undefined;
  };
}

export const DateRangePicker = ({ dateRangeState }: IDateRangePickerProps) => {
  const {
    formState: { errors },
    register,
    getValues,
    trigger,
  } = useFormContext<TInitialForm, unknown, TUpdateForm>();
  const {
    context: { onboardingSteps },
  } = useOnboarding();
  const datePickerRef = useRef<HTMLDivElement>(null);
  const { isDisabled } = useSearchView();
  const [isOpen, setIsOpen] = useState(true);
  const dateFrom = getValues('date.from');
  const dateTo = getValues('date.to');
  const dateMin = getValues('date.min');
  const dateMax = getValues('date.max');
  const dateFromError = get(errors, 'date.from');
  const dateToError = get(errors, 'date.to');
  const dateRangePickerDisabled = isDisabled(false, 'date-range');
  const { comparisonModeEnabled } = useComparisonMode();

  const disabled = useMemo(
    () => dateRangePickerDisabled || comparisonModeEnabled,
    [dateRangePickerDisabled, comparisonModeEnabled]
  );

  const toggleOpen = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  const triggerDateFromValidation = useCallback(() => {
    trigger(dateFromFieldName);

    if (dateToError) {
      trigger(dateToFieldName);
    }
  }, [trigger, dateToError]);

  const triggerDateToValidation = useCallback(() => {
    trigger(dateToFieldName);

    if (dateFromError) {
      trigger(dateFromFieldName);
    }
  }, [dateFromError, trigger]);

  return (
    <OnboardingTooltip
      tipLocation='left'
      stepName={onboardingSteps.DATE_RANGE_PICKER.step_name}
      content={onboardingSteps.DATE_RANGE_PICKER.tooltip_content}
      elementRef={datePickerRef}
    >
      <input type='hidden' {...register(dateMinFieldName)} />
      <input type='hidden' {...register(dateMaxFieldName)} />

      <div className={styles.container} ref={datePickerRef}>
        <div className={styles.header} onClick={toggleOpen}>
          <Text
            content='MAP.SEARCH_VIEW.DATE_RANGE_PICKER.TITLE'
            type='h2'
            fontSize='large'
            fontWeight='bold'
            className={styles.textTitle}
          />
          <Icon name='ArrowDown' width={24} height={24} className={styles.icon(isOpen)} />
        </div>
        {isOpen && (
          <>
            {dateRangeState.state === 'error' && dateRangeState.error && (
              <div className='mt-2 p-2 bg-error-light text-error-dark rounded text-sm'>
                <Text
                  content='MAP.SEARCH_VIEW.DATE_RANGE_PICKER.ERROR.FAILED_TO_LOAD'
                  type='p'
                  fontSize='small'
                  fontWeight='regular'
                />
              </div>
            )}
            <div className={styles.content}>
              <div className={`${styles.row} ${styles.rowMarginFrom}`}>
                <Text
                  content='MAP.SEARCH_VIEW.DATE_RANGE_PICKER.SEARCH_FROM'
                  type='h3'
                  fontSize='medium'
                  fontWeight='regular'
                  className={styles.textLabel}
                />
                <DateInput
                  className={styles.dateInput}
                  minDate={dateMin ? createDate(dateMin) : undefined}
                  maxDate={createDate(dateTo) || (dateMax ? createDate(dateMax) : undefined)}
                  {...register(dateFromFieldName, {
                    onChange: triggerDateFromValidation,
                  })}
                  error={dateFromError?.message}
                  disabled={disabled || dateRangeState.state === 'pending'}
                />
              </div>
              <div className={styles.row}>
                <Text
                  content='MAP.SEARCH_VIEW.DATE_RANGE_PICKER.SEARCH_TO'
                  type='h3'
                  fontSize='medium'
                  fontWeight='regular'
                  className={styles.textLabel}
                />
                <DateInput
                  className={styles.dateInput}
                  minDate={createDate(dateFrom) || (dateMin ? createDate(dateMin) : undefined)}
                  maxDate={dateMax ? createDate(dateMax) : undefined}
                  {...register(dateToFieldName, {
                    onChange: triggerDateToValidation,
                  })}
                  error={dateToError?.message}
                  disabled={disabled || dateRangeState.state === 'pending'}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </OnboardingTooltip>
  );
};
