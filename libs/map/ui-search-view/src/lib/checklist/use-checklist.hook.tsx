import { useEffect, useMemo } from 'react';
import { FormState } from 'react-hook-form';

import { TFormDefaultValues } from '../form.model';
import { useSetValidation } from './checklist.store';

type TFormStateErrors = Pick<FormState<TFormDefaultValues>, 'errors'>['errors'];
type TFormStateTouchedFields = Pick<FormState<TFormDefaultValues>, 'touchedFields'>['touchedFields'];
type TFormStateDirtyFields = Pick<FormState<TFormDefaultValues>, 'dirtyFields'>['dirtyFields'];

const useAoiValidation = (
  touchedFields: TFormStateTouchedFields,
  dirtyFields: TFormStateDirtyFields,
  errors: TFormStateErrors
) => {
  const { setAoiValid } = useSetValidation();

  useEffect(() => {
    if (!touchedFields.aoi && !dirtyFields.aoi) {
      return;
    }

    setAoiValid(!errors.aoi);
  }, [touchedFields.aoi, dirtyFields.aoi, errors.aoi, setAoiValid]);
};

const useIsCopernicusDataUntouched = (touchedFields: TFormStateTouchedFields, dirtyFields: TFormStateDirtyFields) => {
  return useMemo(
    () =>
      !touchedFields.dataSets?.copernicus?.sentinel1?.enabled &&
      !touchedFields.dataSets?.copernicus?.sentinel2?.enabled &&
      !touchedFields.dataSets?.copernicus?.sentinel3?.enabled &&
      !touchedFields.dataSets?.copernicus?.sentinel5P?.enabled &&
      !dirtyFields.dataSets?.copernicus?.sentinel1?.enabled &&
      !dirtyFields.dataSets?.copernicus?.sentinel2?.enabled &&
      !dirtyFields.dataSets?.copernicus?.sentinel3?.enabled &&
      !dirtyFields.dataSets?.copernicus?.sentinel5P?.enabled,
    [
      dirtyFields.dataSets?.copernicus?.sentinel1?.enabled,
      dirtyFields.dataSets?.copernicus?.sentinel2?.enabled,
      dirtyFields.dataSets?.copernicus?.sentinel3?.enabled,
      dirtyFields.dataSets?.copernicus?.sentinel5P?.enabled,
      touchedFields.dataSets?.copernicus?.sentinel1?.enabled,
      touchedFields.dataSets?.copernicus?.sentinel2?.enabled,
      touchedFields.dataSets?.copernicus?.sentinel3?.enabled,
      touchedFields.dataSets?.copernicus?.sentinel5P?.enabled,
    ]
  );
};

const useIsCopernicusDataValid = (errors: TFormStateErrors) => {
  return useMemo(
    () =>
      !errors.dataSets?.copernicus?.sentinel1 &&
      !errors.dataSets?.copernicus?.sentinel2 &&
      !errors.dataSets?.copernicus?.sentinel3 &&
      !errors.dataSets?.copernicus?.sentinel5P,
    [
      errors.dataSets?.copernicus?.sentinel1,
      errors.dataSets?.copernicus?.sentinel2,
      errors.dataSets?.copernicus?.sentinel3,
      errors.dataSets?.copernicus?.sentinel5P,
    ]
  );
};

const useDataSetsValidation = (
  touchedFields: TFormStateTouchedFields,
  dirtyFields: TFormStateDirtyFields,
  errors: TFormStateErrors
) => {
  const { setDataSetsValid } = useSetValidation();
  const isCopernicusDataUntouched = useIsCopernicusDataUntouched(touchedFields, dirtyFields);
  const isCopernicusDataValid = useIsCopernicusDataValid(errors);

  useEffect(() => {
    if (isCopernicusDataUntouched) {
      return;
    }

    setDataSetsValid(isCopernicusDataValid);
  }, [isCopernicusDataUntouched, isCopernicusDataValid, setDataSetsValid]);
};

const useDateRangeValidation = (
  touchedFields: TFormStateTouchedFields,
  dirtyFields: TFormStateDirtyFields,
  errors: TFormStateErrors
) => {
  const { setDateRangeValid } = useSetValidation();

  useEffect(() => {
    if (!dirtyFields.date?.from && !dirtyFields.date?.to && !touchedFields.date?.from && !touchedFields.date?.to) {
      return;
    }

    setDateRangeValid(!errors.date?.from && !errors.date?.to);
  }, [
    setDateRangeValid,
    touchedFields.date?.from,
    touchedFields.date?.to,
    dirtyFields.date?.from,
    dirtyFields.date?.to,
    errors.date?.from,
    errors.date?.to,
  ]);
};

export const useSyncChecklistState = (
  touchedFields: TFormStateTouchedFields,
  dirtyFields: TFormStateDirtyFields,
  errors: TFormStateErrors
) => {
  useAoiValidation(touchedFields, dirtyFields, errors);
  useDataSetsValidation(touchedFields, dirtyFields, errors);
  useDateRangeValidation(touchedFields, dirtyFields, errors);
};
