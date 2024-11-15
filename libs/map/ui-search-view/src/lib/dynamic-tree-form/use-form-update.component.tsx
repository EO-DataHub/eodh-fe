import debounce from 'lodash/debounce';
import { useEffect, useMemo, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';

import { getSchema2, TInitialForm, TSchema, TUpdateForm } from '../schema/form.schema';

const useFormValues = ({
  watch,
  getValues,
}: UseFormReturn<TInitialForm['dataSets'], unknown, TUpdateForm['dataSets']>) => {
  return {
    ...watch(),
    ...getValues(),
  };
};

export const useFormUpdate = (
  form: UseFormReturn<TInitialForm['dataSets'], unknown, TUpdateForm['dataSets']>,
  schemaName: TSchema,
  onChange?: (data: TInitialForm['dataSets']) => unknown | Promise<unknown>
) => {
  const [currentSchema, setCurrentSchema] = useState<TSchema>(schemaName);
  const values = useFormValues(form);

  const handleChange = useMemo(() => {
    const callback: (schemaA: TSchema, values?: TInitialForm['dataSets']) => void = (schemaA: TSchema) => {
      if (onChange) {
        const values = { ...form.watch(), ...form.getValues() };
        const schema = getSchema2(schemaA).initial;
        const parsedValues = schema.safeParse(values);

        console.log('callback', parsedValues);

        if (parsedValues.success) {
          onChange(values);
        }
      }
    };

    return debounce(callback, 200);
  }, [form, onChange]);

  useEffect(() => {
    if (schemaName !== currentSchema) {
      setCurrentSchema(schemaName);
    } else {
      handleChange(schemaName, values);
    }
  }, [values, handleChange, schemaName, currentSchema]);
};
