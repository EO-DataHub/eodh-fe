import { DateInput, Icon, Text } from '@ukri/shared/design-system';
import { OnboardingTooltip, useOnboarding } from '@ukri/shared/ui/ac-workflow-onboarding';
import get from 'lodash/get';
import { useCallback, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { TInitialForm, TUpdateForm } from '../schema/form.schema';
import { useSearchView } from '../search-view.context';
import { styles } from './date-range-picker.styles';

const dateFromFieldName = 'date.from';
const dateToFieldName = 'date.to';

interface IDateRangePickerProps {
  dateMin: Date;
  dateMax: Date;
}

export const DateRangePicker = ({ dateMin, dateMax }: IDateRangePickerProps) => {
  const {
    formState: { errors },
    register,
    getValues,
    trigger,
  } = useFormContext<TInitialForm, unknown, TUpdateForm>();
  const {
    context: { goToNextOnboardingStep, onboardingSteps },
  } = useOnboarding();
  const { isDisabled } = useSearchView();
  const [isOpen, setIsOpen] = useState(true);
  const dateFrom = getValues('date.from');
  const dateTo = getValues('date.to');
  const dateFromError = get(errors, 'date.from');
  const dateToError = get(errors, 'date.to');
  const disabled = isDisabled(false, 'date-range');

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
    <div className={styles.container}>
      <div className={styles.header} onClick={toggleOpen}>
        <Text
          content='MAP.SEARCH_VIEW.DATE_RANGE_PICKER.TITLE'
          type='h2'
          fontSize='large'
          fontWeight='bold'
          className={styles.textTitle}
        />
        <Icon name='ArrowDown' width={24} height={24} className={`${styles.icon} ${isOpen ? '' : 'rotate-180'}`} />
      </div>
      {isOpen && (
        <OnboardingTooltip
          tipLocation='left'
          stepName={onboardingSteps.DATE_RANGE_PICKER.step_name}
          content={onboardingSteps.DATE_RANGE_PICKER.tooltip_text}
          onClick={goToNextOnboardingStep}
          className='bottom-0 left-[470px] !fixed'
        >
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
                minDate={dateMin}
                maxDate={dateTo || dateMax}
                {...register(dateFromFieldName, {
                  onChange: triggerDateFromValidation,
                })}
                error={dateFromError?.message}
                disabled={disabled}
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
                minDate={dateFrom || dateMin}
                maxDate={dateMax}
                {...register(dateToFieldName, {
                  onChange: triggerDateToValidation,
                })}
                error={dateToError?.message}
                disabled={disabled}
              />
            </div>
          </div>
        </OnboardingTooltip>
      )}
    </div>
  );
};
