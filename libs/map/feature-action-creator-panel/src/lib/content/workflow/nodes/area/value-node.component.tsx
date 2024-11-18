import { createGeometry, TAreaNode, useActionCreator } from '@ukri/map/data-access-map';
import { useSettings } from '@ukri/shared/utils/settings';
import { getArea as getOlArea } from 'ol/extent';
import { useMemo } from 'react';
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

const getArea = (value: TAreaNode['value']): number => {
  const shape = createGeometry(value);
  if (!shape) {
    return 0;
  }
  const extent = shape.getExtent();
  return extent ? getOlArea(extent as [number, number, number, number]) : 0;
};

const formatArea = function (text: string, value: TAreaNode['value'], unit: 'km' | 'miles') {
  const area = getArea(value);
  const output = convertUnits(area, unit);

  return `${text.trim()} ${output}`;
};

type TValueNodeProps = {
  node: TAreaNode;
  onClearButtonClick: () => void;
};

export const ValueNode = ({ node, onClearButtonClick }: TValueNodeProps) => {
  const { t } = useTranslation();
  const { canActivateNode, isLast } = useActionCreator();
  const { measurmentUnit, aoiLimit } = useSettings();
  const aoiLimitInfo = useMemo(
    () =>
      t('MAP.ACTION_CREATOR_PANEL.WORKFLOW.NODE.AREA.ALLOWED_SIZE', {
        maxSize: convertUnits(aoiLimit, measurmentUnit),
      }),
    [t, aoiLimit, measurmentUnit]
  );

  const getErrorMessage = useMemo(() => {
    if (!node.value) {
      return;
    }

    if (getArea(node.value) > aoiLimit) {
      return aoiLimitInfo;
    }

    return undefined;
  }, [aoiLimit, aoiLimitInfo, node.value]);

  return (
    <Node
      type={node.type}
      active={true}
      text={formatArea(t('MAP.ACTION_CREATOR_PANEL.WORKFLOW.NODE.AREA.DESCRIPTION'), node.value, measurmentUnit)}
      clickable={canActivateNode(node)}
      selected={node.state === 'active'}
      hasNextNode={!isLast(node)}
      error={getErrorMessage}
    >
      <NodeInput
        iconName={getIconFromShape(node.value)}
        value={t('MAP.ACTION_CREATOR_PANEL.WORKFLOW.NODE.AREA.DEFAULT_VALUE')}
        onClearButtonClick={onClearButtonClick}
      />
    </Node>
  );
};
