import { Text } from '@ukri/shared/design-system';
import { TDateString } from '@ukri/shared/utils/date';

export interface IParsedSeriesData {
  color?: string;
  displayedValue: string | TDateString;
  name: string;
}

interface ITooltipProps {
  items: IParsedSeriesData[];
  name: string;
  color?: string;
}

export const Tooltip = ({ items, name, color }: ITooltipProps) => {
  return (
    <div className='flex flex-col rounded'>
      <div className='flex items-center justify-center gap-1 bg-background-main p-2'>
        {color && <div className='flex rounded-full w-2 h-2' style={{ background: color }}></div>}
        <span>{name}</span>
      </div>
      <div className='flex flex-col mx-2 my-2'>
        {items.map((item) => (
          <div key={item.name} className='flex flex-row items-center justify-start gap-1'>
            {item.color && <div className='flex rounded-full w-2 h-2' style={{ background: item.color }}></div>}
            <Text content={item.name} type='span' fontSize='medium' fontWeight='semibold' fontType='body' />
            <Text content={item.displayedValue} type='span' fontSize='medium' fontWeight='bold' fontType='body' />
          </div>
        ))}
      </div>
    </div>
  );
};

export const renderTooltip = ({ items, name, color }: ITooltipProps) => {
  return <Tooltip items={items} name={name} color={color} />;
};
