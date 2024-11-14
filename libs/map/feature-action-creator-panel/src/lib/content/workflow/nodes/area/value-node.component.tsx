import { createGeometry, TAreaNode, useActionCreator } from '@ukri/map/data-access-map';
import { getArea } from 'ol/extent';
import { useTranslation } from 'react-i18next';

import { Node } from '../node.component';
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

export const convertUnits = (area: number, unit: 'km' | 'miles') => {
  let output;

  switch (unit) {
    case 'miles': {
      area = area * 0.621371;
      const value = Math.round((area / 1000000) * 100) / 100;

      output = `${value} miles<sup>2</sup>`;
      break;
    }

    case 'km': {
      if (area > 10000) {
        const value = Math.round((area / 1000000) * 100) / 100;

        output = `${value} km<sup>2</sup>`;
      } else {
        const value = Math.round(area * 100) / 100;
        output = `${value} m<sup>2</sup>`;
      }
      break;
    }
  }

  return output;
};

const formatArea = function (text: string, value: TAreaNode['value'], unit: 'km' | 'miles') {
  const shape = createGeometry(value);
  if (!shape) {
    return '';
  }
  const area = getArea(shape.getExtent());

  const output = convertUnits(area, unit);

  return `${text.trim()} ${output}`;
};

type TValueNodeProps = {
  node: TAreaNode;
  error?: string;
  onClearButtonClick: () => void;
};

export const ValueNode = ({ node, onClearButtonClick, error }: TValueNodeProps) => {
  const { t } = useTranslation();
  const { canActivateNode, isLast } = useActionCreator();

  return (
    <Node
      type={node.type}
      active={true}
      text={formatArea(t('MAP.ACTION_CREATOR_PANEL.WORKFLOW.NODE.AREA.DESCRIPTION'), node.value, 'km')}
      clickable={canActivateNode(node)}
      selected={node.state === 'active'}
      hasNextNode={!isLast(node)}
      error={error}
    >
      <NodeInput
        iconName={getIconFromShape(node.value)}
        value={t('MAP.ACTION_CREATOR_PANEL.WORKFLOW.NODE.AREA.DEFAULT_VALUE')}
        onClearButtonClick={onClearButtonClick}
      />
    </Node>
  );
};
