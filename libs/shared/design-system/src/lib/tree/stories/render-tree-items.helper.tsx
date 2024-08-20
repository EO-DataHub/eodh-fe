import { memo } from 'react';

import { Icon } from '../../icon/icon';
import { Text } from '../../text/text';
import { TreeItem } from '../tree-item.component';

export type TTreeTemplate = {
  icons: string;
  fontWeight: 'bold' | 'semibold' | 'regular';
  fontColor: 'primary' | 'disabled' | 'error' | 'warning' | 'success' | 'information';
  level?: number;
  collapsable?: boolean;
};

const getIcons = (icons: string) => {
  if (!icons || icons === '0') {
    return null;
  }

  const leftIconNumber = icons.split('+')[0];
  const rightIconNumber = icons.split('+')[1];

  const getIconsForNumber = (iconsCount: string, position: 'before' | 'after') => {
    const count = parseInt(iconsCount);
    if (!iconsCount || iconsCount === '0' || Number.isNaN(count)) {
      return [];
    }

    return Array.from(new Array(count)).map((value, index) => ({
      position,
      icon: <Icon name='Satellite' />,
      key: index,
    }));
  };

  return [...getIconsForNumber(leftIconNumber, 'before'), ...getIconsForNumber(rightIconNumber, 'after')].filter(
    (i) => !!i
  );
};

const renderTitle = ({
  title,
  fontWeight,
  fontColor,
}: Pick<TTreeTemplate, 'fontWeight' | 'fontColor'> & { title: string }) => {
  if (!fontWeight && !fontColor) {
    return title;
  }

  return <Text content={title} type='p' fontSize='medium' fontWeight={fontWeight} />;
};

const getFontColorClassName = ({ fontColor }: Pick<TTreeTemplate, 'fontColor'>) => {
  let className = 'text-neutral-dark';

  switch (fontColor) {
    case 'primary': {
      className = 'text-primary';
      break;
    }

    case 'disabled': {
      className = 'text-text-disabled';
      break;
    }

    case 'success': {
      className = 'text-success';
      break;
    }

    case 'information': {
      className = 'text-information';
      break;
    }

    case 'warning': {
      className = 'text-warning';
      break;
    }

    case 'error': {
      className = 'text-error';
      break;
    }
  }

  return className;
};

export const TreeItems = memo(
  ({
    prefix = '',
    icons,
    fontWeight,
    fontColor,
    level = 0,
    itemsCount = 3,
    collapsable,
  }: TTreeTemplate & { prefix?: string; itemsCount?: number; level?: number }) => {
    const icon = getIcons(icons);
    const elements = Array.from(new Array(itemsCount));
    const className = getFontColorClassName({ fontColor });

    if (level && level > 1) {
      return elements.map((i, index) => (
        <TreeItem
          key={index}
          icon={icon}
          collapsable={collapsable}
          className={className}
          title={renderTitle({ title: `Item ${prefix}${index + 1}`, fontWeight, fontColor })}
        >
          <TreeItems
            prefix={`${prefix}${index + 1}.`}
            icons={icons}
            fontWeight={fontWeight}
            fontColor={fontColor}
            itemsCount={itemsCount}
            level={level - 1}
            collapsable={collapsable}
          />
        </TreeItem>
      ));
    }

    return elements.map((i, index) => (
      <TreeItem
        key={index}
        icon={icon}
        collapsable={collapsable}
        className={className}
        title={renderTitle({ title: `Item ${prefix}${index + 1}`, fontWeight, fontColor })}
      />
    ));
  }
);
