import { TDateRangeNode } from '@ukri/map/data-access-map';
import { useTranslation } from 'react-i18next';

import { Node } from '../../node.component';

type TActiveNodeProps = {
  node: TDateRangeNode;
  enabled: boolean;
};

export const ActiveNode = ({ enabled, node }: TActiveNodeProps) => {
  const { t } = useTranslation();

  if (!enabled || !node.selected || node.value?.from || node.value?.to) {
    return;
  }

  return (
    <Node
      type={node.type}
      text={t('MAP.ACTION_CREATOR_PANEL.NODE.DATE_RANGE.INSTRUCTIONS')}
      enabled={enabled}
      selected={node.selected}
    />
  );
};
