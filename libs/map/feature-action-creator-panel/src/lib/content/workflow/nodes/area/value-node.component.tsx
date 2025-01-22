import { convertUnits, getArea, TAreaNode, useActionCreator } from '@ukri/map/data-access-map';
import { convertBaseUnitToAreaUnit, TBaseUnit, useSettings } from '@ukri/shared/utils/settings';
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

export const formatUnit = (area: number, unit: TBaseUnit) => {
  const value = convertUnits(area, convertBaseUnitToAreaUnit(unit));
  switch (value.unit.type) {
    case 'km2':
    case 'miles2': {
      return `${value.value} ${value.unit.displayedValue}<sup>2</sup>`;
    }

    case 'km':
    case 'miles': {
      return `${value.value} ${value.unit.displayedValue}`;
    }
  }
};

const formatArea = function (text: string, value: TAreaNode['value'], unit: TBaseUnit) {
  const area = getArea(value);
  const output = formatUnit(area, unit);

  return `${text.trim()} ${output}`;
};

type TValueNodeProps = {
  node: TAreaNode;
  onClearButtonClick: () => void;
};

export const ValueNode = ({ node, onClearButtonClick }: TValueNodeProps) => {
  const { t } = useTranslation();
  const { canActivateNode, isLast } = useActionCreator();
  const { aoiLimit, measurementUnit } = useSettings();
  const aoiLimitInfo = useMemo(
    () =>
      t('MAP.ACTION_CREATOR_PANEL.WORKFLOW.NODE.AREA.ALLOWED_SIZE', {
        maxSize: formatUnit(aoiLimit, measurementUnit),
      }),
    [t, aoiLimit, measurementUnit]
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
      text={formatArea(t('MAP.ACTION_CREATOR_PANEL.WORKFLOW.NODE.AREA.DESCRIPTION'), node.value, measurementUnit)}
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
