import { Checkbox, TreeItem } from '@ukri/shared/design-system';
import { ParseKeys } from 'i18next';
import { FieldPath, useFormContext } from 'react-hook-form';

import { TForm } from '../form.model';

type TSettingsItem = { title: ParseKeys; name: FieldPath<TForm> };

export const SettingsItem = ({ title, name }: TSettingsItem) => {
  const { register } = useFormContext<TForm>();

  return (
    <TreeItem
      title={title}
      slots={[{ position: 'title:after', element: <Checkbox {...register(name)} />, key: 'checkbox' }]}
    />
  );
};
