import { createPolygon, TAreaNode } from '@ukri/map/data-access-map';
import { getArea } from 'ol/extent';
import { useTranslation } from 'react-i18next';

import { Node } from '../../node.component';
import { NodeInput } from '../node-input.component';

const getIconFromShape = (value: TAreaNode['value']): 'Polygon' | 'Circle' | 'Square' | undefined => {
  switch (value?.type) {
    case 'polygon': {
      return 'Polygon';
    }

    case 'circle': {
      return 'Circle';
    }

    case 'rectangle': {
      return 'Square';
    }
  }
};

const formatArea = function (text: string, value: TAreaNode['value']) {
  const shape = createPolygon(value);
  if (!shape) {
    return '';
  }

  const area = getArea(shape.getExtent());
  let output;
  if (area > 10000) {
    const value = Math.round((area / 1000000) * 100) / 100;
    output = `${value} km<sup>2</sup>`;
  } else {
    const value = Math.round(area * 100) / 100;
    output = `${value} m<sup>2</sup>`;
  }
  return `${text.trim()} ${output}`;
};

type TValueNodeProps = {
  node: TAreaNode;
  enabled: boolean;
  onClearButtonClick: () => void;
};

export const ValueNode = ({ enabled, node, onClearButtonClick }: TValueNodeProps) => {
  const { t } = useTranslation();

  return (
    <Node
      type={node.type}
      text={formatArea(t('MAP.ACTION_CREATOR_PANEL.NODE.AREA.DESCRIPTION'), node.value)}
      enabled={enabled}
      selected={node.selected}
    >
      <NodeInput
        iconName={getIconFromShape(node.value)}
        value={t('MAP.ACTION_CREATOR_PANEL.NODE.AREA.DEFAULT_VALUE')}
        onClearButtonClick={onClearButtonClick}
      />
    </Node>
  );
};
