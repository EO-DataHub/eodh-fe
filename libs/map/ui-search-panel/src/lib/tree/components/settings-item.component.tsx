import { Checkbox, TreeItem } from '@ukri/shared/design-system';
import { ParseKeys } from 'i18next';

type TSettingsItem = { title: ParseKeys; name?: string };

export const SettingsItem = ({ title, name }: TSettingsItem) => {
  return (
    <TreeItem
      title={title}
      slots={[{ position: 'title:after', element: <Checkbox name={name ? name : title} />, key: 'checkbox' }]}
    />
  );
};
