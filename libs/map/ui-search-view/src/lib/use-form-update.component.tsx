import debounce from 'lodash/debounce';
import { useEffect, useMemo, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';

import { getSchema, TInitialForm, TSchema, TUpdateForm } from './schema/form.schema';

const useFormValues = ({ watch, getValues }: UseFormReturn<TInitialForm, unknown, TUpdateForm>) => {
  return {
    ...watch(),
    ...getValues(),
  };
};

export const useFormUpdate = (
  form: UseFormReturn<TInitialForm, unknown, TUpdateForm>,
  schemaName: TSchema,
  onChange?: (data: TInitialForm) => unknown | Promise<unknown>
) => {
  const [currentSchema, setCurrentSchema] = useState<TSchema>(schemaName);
  const values = useFormValues(form);

  const handleChange = useMemo(() => {
    const callback: (schemaA: TSchema, values?: TInitialForm) => void = (schemaA: TSchema) => {
      if (onChange) {
        const values = { ...form.watch(), ...form.getValues() };
        const schema = getSchema(schemaA).initial;
        const parsedValues = schema.safeParse(values);

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
