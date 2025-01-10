import { Text } from '@ukri/shared/design-system';

export interface IParsedSeriesData {
  color: string;
  displayedValue: string;
  name: string;
}

interface ITooltipProps {
  items: IParsedSeriesData[];
  name: string;
}

export const Tooltip = ({ items, name }: ITooltipProps) => {
  return (
    <div className='flex flex-row rounded'>
      <div className='flex items-center justify-center bg-background-main p-3'>{name}</div>
      <div className='flex flex-col mx-2 my-3'>
        {items.map((item) => (
          <div key={item.name} className='flex flex-row items-center justify-start gap-1'>
            <div className='flex rounded-full w-2 h-2' style={{ background: item.color }}></div>
            <Text content={item.name} type='span' fontSize='medium' fontWeight='semibold' fontType='body' />
            <Text content={item.displayedValue} type='span' fontSize='medium' fontWeight='bold' fontType='body' />
          </div>
        ))}
      </div>
    </div>
  );
};

export const renderTooltip = ({ items, name }: ITooltipProps) => {
  return <Tooltip items={items} name={name} />;
};

// export const Tooltip = () => {
//   return <div className="apexcharts-tooltip apexcharts-theme-light" style="left: 111.321px; top: -1px;">
//     <div className="apexcharts-tooltip-title" style="font-family: Helvetica, Arial, sans-serif; font-size: 12px;">01
//       Jan
//     </div>
//     <div className="apexcharts-tooltip-series-group apexcharts-tooltip-series-group-0" style="order: 1; display: none;">
//       <span className="apexcharts-tooltip-marker" style="background-color: rgb(230, 230, 77);"></span>
//       <div className="apexcharts-tooltip-text" style="font-family: Helvetica, Arial, sans-serif; font-size: 12px;">
//         <div className="apexcharts-tooltip-y-group"><span
//           className="apexcharts-tooltip-text-y-label">Pastures: </span><span
//           className="apexcharts-tooltip-text-y-value">6.92%</span></div>
//         <div className="apexcharts-tooltip-goals-group"><span
//           className="apexcharts-tooltip-text-goals-label"></span><span
//           className="apexcharts-tooltip-text-goals-value"></span></div>
//         <div className="apexcharts-tooltip-z-group"><span className="apexcharts-tooltip-text-z-label"></span><span
//           className="apexcharts-tooltip-text-z-value"></span></div>
//       </div>
//     </div>
//     <div className="apexcharts-tooltip-series-group apexcharts-tooltip-series-group-1" style="order: 2; display: none;">
//       <span className="apexcharts-tooltip-marker" style="background-color: rgb(230, 230, 77);"></span>
//       <div className="apexcharts-tooltip-text" style="font-family: Helvetica, Arial, sans-serif; font-size: 12px;">
//         <div className="apexcharts-tooltip-y-group"><span
//           className="apexcharts-tooltip-text-y-label">Pastures: </span><span
//           className="apexcharts-tooltip-text-y-value">6.92%</span></div>
//         <div className="apexcharts-tooltip-goals-group"><span
//           className="apexcharts-tooltip-text-goals-label"></span><span
//           className="apexcharts-tooltip-text-goals-value"></span></div>
//         <div className="apexcharts-tooltip-z-group"><span className="apexcharts-tooltip-text-z-label"></span><span
//           className="apexcharts-tooltip-text-z-value"></span></div>
//       </div>
//     </div>
//     <div className="apexcharts-tooltip-series-group apexcharts-tooltip-series-group-2" style="order: 3; display: none;">
//       <span className="apexcharts-tooltip-marker" style="background-color: rgb(230, 230, 77);"></span>
//       <div className="apexcharts-tooltip-text" style="font-family: Helvetica, Arial, sans-serif; font-size: 12px;">
//         <div className="apexcharts-tooltip-y-group"><span
//           className="apexcharts-tooltip-text-y-label">Pastures: </span><span
//           className="apexcharts-tooltip-text-y-value">6.92%</span></div>
//         <div className="apexcharts-tooltip-goals-group"><span
//           className="apexcharts-tooltip-text-goals-label"></span><span
//           className="apexcharts-tooltip-text-goals-value"></span></div>
//         <div className="apexcharts-tooltip-z-group"><span className="apexcharts-tooltip-text-z-label"></span><span
//           className="apexcharts-tooltip-text-z-value"></span></div>
//       </div>
//     </div>
//     <div className="apexcharts-tooltip-series-group apexcharts-tooltip-series-group-3" style="order: 4; display: none;">
//       <span className="apexcharts-tooltip-marker" style="background-color: rgb(230, 230, 77);"></span>
//       <div className="apexcharts-tooltip-text" style="font-family: Helvetica, Arial, sans-serif; font-size: 12px;">
//         <div className="apexcharts-tooltip-y-group"><span
//           className="apexcharts-tooltip-text-y-label">Pastures: </span><span
//           className="apexcharts-tooltip-text-y-value">6.92%</span></div>
//         <div className="apexcharts-tooltip-goals-group"><span
//           className="apexcharts-tooltip-text-goals-label"></span><span
//           className="apexcharts-tooltip-text-goals-value"></span></div>
//         <div className="apexcharts-tooltip-z-group"><span className="apexcharts-tooltip-text-z-label"></span><span
//           className="apexcharts-tooltip-text-z-value"></span></div>
//       </div>
//     </div>
//     <div className="apexcharts-tooltip-series-group apexcharts-tooltip-series-group-4" style="order: 5; display: none;">
//       <span className="apexcharts-tooltip-marker" style="background-color: rgb(230, 230, 77);"></span>
//       <div className="apexcharts-tooltip-text" style="font-family: Helvetica, Arial, sans-serif; font-size: 12px;">
//         <div className="apexcharts-tooltip-y-group"><span
//           className="apexcharts-tooltip-text-y-label">Pastures: </span><span
//           className="apexcharts-tooltip-text-y-value">6.92%</span></div>
//         <div className="apexcharts-tooltip-goals-group"><span
//           className="apexcharts-tooltip-text-goals-label"></span><span
//           className="apexcharts-tooltip-text-goals-value"></span></div>
//         <div className="apexcharts-tooltip-z-group"><span className="apexcharts-tooltip-text-z-label"></span><span
//           className="apexcharts-tooltip-text-z-value"></span></div>
//       </div>
//     </div>
//     <div className="apexcharts-tooltip-series-group apexcharts-tooltip-series-group-5" style="order: 6; display: none;">
//       <span className="apexcharts-tooltip-marker" style="background-color: rgb(230, 230, 77);"></span>
//       <div className="apexcharts-tooltip-text" style="font-family: Helvetica, Arial, sans-serif; font-size: 12px;">
//         <div className="apexcharts-tooltip-y-group"><span
//           className="apexcharts-tooltip-text-y-label">Pastures: </span><span
//           className="apexcharts-tooltip-text-y-value">6.92%</span></div>
//         <div className="apexcharts-tooltip-goals-group"><span
//           className="apexcharts-tooltip-text-goals-label"></span><span
//           className="apexcharts-tooltip-text-goals-value"></span></div>
//         <div className="apexcharts-tooltip-z-group"><span className="apexcharts-tooltip-text-z-label"></span><span
//           className="apexcharts-tooltip-text-z-value"></span></div>
//       </div>
//     </div>
//     <div className="apexcharts-tooltip-series-group apexcharts-tooltip-series-group-6" style="order: 7; display: none;">
//       <span className="apexcharts-tooltip-marker" style="background-color: rgb(230, 230, 77);"></span>
//       <div className="apexcharts-tooltip-text" style="font-family: Helvetica, Arial, sans-serif; font-size: 12px;">
//         <div className="apexcharts-tooltip-y-group"><span
//           className="apexcharts-tooltip-text-y-label">Pastures: </span><span
//           className="apexcharts-tooltip-text-y-value">6.92%</span></div>
//         <div className="apexcharts-tooltip-goals-group"><span
//           className="apexcharts-tooltip-text-goals-label"></span><span
//           className="apexcharts-tooltip-text-goals-value"></span></div>
//         <div className="apexcharts-tooltip-z-group"><span className="apexcharts-tooltip-text-z-label"></span><span
//           className="apexcharts-tooltip-text-z-value"></span></div>
//       </div>
//     </div>
//     <div className="apexcharts-tooltip-series-group apexcharts-tooltip-series-group-7" style="order: 8; display: none;">
//       <span className="apexcharts-tooltip-marker" style="background-color: rgb(230, 230, 77);"></span>
//       <div className="apexcharts-tooltip-text" style="font-family: Helvetica, Arial, sans-serif; font-size: 12px;">
//         <div className="apexcharts-tooltip-y-group"><span
//           className="apexcharts-tooltip-text-y-label">Pastures: </span><span
//           className="apexcharts-tooltip-text-y-value">6.92%</span></div>
//         <div className="apexcharts-tooltip-goals-group"><span
//           className="apexcharts-tooltip-text-goals-label"></span><span
//           className="apexcharts-tooltip-text-goals-value"></span></div>
//         <div className="apexcharts-tooltip-z-group"><span className="apexcharts-tooltip-text-z-label"></span><span
//           className="apexcharts-tooltip-text-z-value"></span></div>
//       </div>
//     </div>
//     <div className="apexcharts-tooltip-series-group apexcharts-tooltip-series-group-8" style="order: 9; display: none;">
//       <span className="apexcharts-tooltip-marker" style="background-color: rgb(230, 230, 77);"></span>
//       <div className="apexcharts-tooltip-text" style="font-family: Helvetica, Arial, sans-serif; font-size: 12px;">
//         <div className="apexcharts-tooltip-y-group"><span
//           className="apexcharts-tooltip-text-y-label">Pastures: </span><span
//           className="apexcharts-tooltip-text-y-value">6.92%</span></div>
//         <div className="apexcharts-tooltip-goals-group"><span
//           className="apexcharts-tooltip-text-goals-label"></span><span
//           className="apexcharts-tooltip-text-goals-value"></span></div>
//         <div className="apexcharts-tooltip-z-group"><span className="apexcharts-tooltip-text-z-label"></span><span
//           className="apexcharts-tooltip-text-z-value"></span></div>
//       </div>
//     </div>
//     <div className="apexcharts-tooltip-series-group apexcharts-tooltip-series-group-9"
//          style="order: 10; display: none;"><span className="apexcharts-tooltip-marker"
//                                                  style="background-color: rgb(230, 230, 77);"></span>
//       <div className="apexcharts-tooltip-text" style="font-family: Helvetica, Arial, sans-serif; font-size: 12px;">
//         <div className="apexcharts-tooltip-y-group"><span
//           className="apexcharts-tooltip-text-y-label">Pastures: </span><span
//           className="apexcharts-tooltip-text-y-value">6.92%</span></div>
//         <div className="apexcharts-tooltip-goals-group"><span
//           className="apexcharts-tooltip-text-goals-label"></span><span
//           className="apexcharts-tooltip-text-goals-value"></span></div>
//         <div className="apexcharts-tooltip-z-group"><span className="apexcharts-tooltip-text-z-label"></span><span
//           className="apexcharts-tooltip-text-z-value"></span></div>
//       </div>
//     </div>
//     <div className="apexcharts-tooltip-series-group apexcharts-tooltip-series-group-10"
//          style="order: 11; display: none;"><span className="apexcharts-tooltip-marker"
//                                                  style="background-color: rgb(230, 230, 77);"></span>
//       <div className="apexcharts-tooltip-text" style="font-family: Helvetica, Arial, sans-serif; font-size: 12px;">
//         <div className="apexcharts-tooltip-y-group"><span
//           className="apexcharts-tooltip-text-y-label">Pastures: </span><span
//           className="apexcharts-tooltip-text-y-value">6.92%</span></div>
//         <div className="apexcharts-tooltip-goals-group"><span
//           className="apexcharts-tooltip-text-goals-label"></span><span
//           className="apexcharts-tooltip-text-goals-value"></span></div>
//         <div className="apexcharts-tooltip-z-group"><span className="apexcharts-tooltip-text-z-label"></span><span
//           className="apexcharts-tooltip-text-z-value"></span></div>
//       </div>
//     </div>
//     <div className="apexcharts-tooltip-series-group apexcharts-tooltip-series-group-11"
//          style="order: 12; display: none;"><span className="apexcharts-tooltip-marker"
//                                                  style="background-color: rgb(230, 230, 77);"></span>
//       <div className="apexcharts-tooltip-text" style="font-family: Helvetica, Arial, sans-serif; font-size: 12px;">
//         <div className="apexcharts-tooltip-y-group"><span
//           className="apexcharts-tooltip-text-y-label">Pastures: </span><span
//           className="apexcharts-tooltip-text-y-value">6.92%</span></div>
//         <div className="apexcharts-tooltip-goals-group"><span
//           className="apexcharts-tooltip-text-goals-label"></span><span
//           className="apexcharts-tooltip-text-goals-value"></span></div>
//         <div className="apexcharts-tooltip-z-group"><span className="apexcharts-tooltip-text-z-label"></span><span
//           className="apexcharts-tooltip-text-z-value"></span></div>
//       </div>
//     </div>
//     <div className="apexcharts-tooltip-series-group apexcharts-tooltip-series-group-12"
//          style="order: 13; display: none;"><span className="apexcharts-tooltip-marker"
//                                                  style="background-color: rgb(230, 230, 77);"></span>
//       <div className="apexcharts-tooltip-text" style="font-family: Helvetica, Arial, sans-serif; font-size: 12px;">
//         <div className="apexcharts-tooltip-y-group"><span
//           className="apexcharts-tooltip-text-y-label">Pastures: </span><span
//           className="apexcharts-tooltip-text-y-value">6.92%</span></div>
//         <div className="apexcharts-tooltip-goals-group"><span
//           className="apexcharts-tooltip-text-goals-label"></span><span
//           className="apexcharts-tooltip-text-goals-value"></span></div>
//         <div className="apexcharts-tooltip-z-group"><span className="apexcharts-tooltip-text-z-label"></span><span
//           className="apexcharts-tooltip-text-z-value"></span></div>
//       </div>
//     </div>
//     <div className="apexcharts-tooltip-series-group apexcharts-tooltip-series-group-13"
//          style="order: 14; display: none;"><span className="apexcharts-tooltip-marker"
//                                                  style="background-color: rgb(230, 230, 77);"></span>
//       <div className="apexcharts-tooltip-text" style="font-family: Helvetica, Arial, sans-serif; font-size: 12px;">
//         <div className="apexcharts-tooltip-y-group"><span
//           className="apexcharts-tooltip-text-y-label">Pastures: </span><span
//           className="apexcharts-tooltip-text-y-value">6.92%</span></div>
//         <div className="apexcharts-tooltip-goals-group"><span
//           className="apexcharts-tooltip-text-goals-label"></span><span
//           className="apexcharts-tooltip-text-goals-value"></span></div>
//         <div className="apexcharts-tooltip-z-group"><span className="apexcharts-tooltip-text-z-label"></span><span
//           className="apexcharts-tooltip-text-z-value"></span></div>
//       </div>
//     </div>
//     <div className="apexcharts-tooltip-series-group apexcharts-tooltip-series-group-14"
//          style="order: 15; display: none;"><span className="apexcharts-tooltip-marker"
//                                                  style="background-color: rgb(230, 230, 77);"></span>
//       <div className="apexcharts-tooltip-text" style="font-family: Helvetica, Arial, sans-serif; font-size: 12px;">
//         <div className="apexcharts-tooltip-y-group"><span
//           className="apexcharts-tooltip-text-y-label">Pastures: </span><span
//           className="apexcharts-tooltip-text-y-value">6.92%</span></div>
//         <div className="apexcharts-tooltip-goals-group"><span
//           className="apexcharts-tooltip-text-goals-label"></span><span
//           className="apexcharts-tooltip-text-goals-value"></span></div>
//         <div className="apexcharts-tooltip-z-group"><span className="apexcharts-tooltip-text-z-label"></span><span
//           className="apexcharts-tooltip-text-z-value"></span></div>
//       </div>
//     </div>
//     <div className="apexcharts-tooltip-series-group apexcharts-tooltip-series-group-15"
//          style="order: 16; display: none;"><span className="apexcharts-tooltip-marker"
//                                                  style="background-color: rgb(230, 230, 77);"></span>
//       <div className="apexcharts-tooltip-text" style="font-family: Helvetica, Arial, sans-serif; font-size: 12px;">
//         <div className="apexcharts-tooltip-y-group"><span
//           className="apexcharts-tooltip-text-y-label">Pastures: </span><span
//           className="apexcharts-tooltip-text-y-value">6.92%</span></div>
//         <div className="apexcharts-tooltip-goals-group"><span
//           className="apexcharts-tooltip-text-goals-label"></span><span
//           className="apexcharts-tooltip-text-goals-value"></span></div>
//         <div className="apexcharts-tooltip-z-group"><span className="apexcharts-tooltip-text-z-label"></span><span
//           className="apexcharts-tooltip-text-z-value"></span></div>
//       </div>
//     </div>
//     <div className="apexcharts-tooltip-series-group apexcharts-tooltip-series-group-16"
//          style="order: 17; display: none;"><span className="apexcharts-tooltip-marker"
//                                                  style="background-color: rgb(230, 230, 77);"></span>
//       <div className="apexcharts-tooltip-text" style="font-family: Helvetica, Arial, sans-serif; font-size: 12px;">
//         <div className="apexcharts-tooltip-y-group"><span
//           className="apexcharts-tooltip-text-y-label">Pastures: </span><span
//           className="apexcharts-tooltip-text-y-value">6.92%</span></div>
//         <div className="apexcharts-tooltip-goals-group"><span
//           className="apexcharts-tooltip-text-goals-label"></span><span
//           className="apexcharts-tooltip-text-goals-value"></span></div>
//         <div className="apexcharts-tooltip-z-group"><span className="apexcharts-tooltip-text-z-label"></span><span
//           className="apexcharts-tooltip-text-z-value"></span></div>
//       </div>
//     </div>
//     <div className="apexcharts-tooltip-series-group apexcharts-tooltip-series-group-17 apexcharts-active"
//          style="order: 18; display: flex;"><span className="apexcharts-tooltip-marker"
//                                                  style="background-color: rgb(230, 230, 77);"></span>
//       <div className="apexcharts-tooltip-text" style="font-family: Helvetica, Arial, sans-serif; font-size: 12px;">
//         <div className="apexcharts-tooltip-y-group"><span
//           className="apexcharts-tooltip-text-y-label">Pastures: </span><span
//           className="apexcharts-tooltip-text-y-value">6.92%</span></div>
//         <div className="apexcharts-tooltip-goals-group"><span
//           className="apexcharts-tooltip-text-goals-label"></span><span
//           className="apexcharts-tooltip-text-goals-value"></span></div>
//         <div className="apexcharts-tooltip-z-group"><span className="apexcharts-tooltip-text-z-label"></span><span
//           className="apexcharts-tooltip-text-z-value"></span></div>
//       </div>
//     </div>
//     <div className="apexcharts-tooltip-series-group apexcharts-tooltip-series-group-18"
//          style="order: 19; display: none;"><span className="apexcharts-tooltip-marker"
//                                                  style="background-color: rgb(230, 230, 77);"></span>
//       <div className="apexcharts-tooltip-text" style="font-family: Helvetica, Arial, sans-serif; font-size: 12px;">
//         <div className="apexcharts-tooltip-y-group"><span
//           className="apexcharts-tooltip-text-y-label">Pastures: </span><span
//           className="apexcharts-tooltip-text-y-value">6.92%</span></div>
//         <div className="apexcharts-tooltip-goals-group"><span
//           className="apexcharts-tooltip-text-goals-label"></span><span
//           className="apexcharts-tooltip-text-goals-value"></span></div>
//         <div className="apexcharts-tooltip-z-group"><span className="apexcharts-tooltip-text-z-label"></span><span
//           className="apexcharts-tooltip-text-z-value"></span></div>
//       </div>
//     </div>
//     <div className="apexcharts-tooltip-series-group apexcharts-tooltip-series-group-19"
//          style="order: 20; display: none;"><span className="apexcharts-tooltip-marker"
//                                                  style="background-color: rgb(230, 230, 77);"></span>
//       <div className="apexcharts-tooltip-text" style="font-family: Helvetica, Arial, sans-serif; font-size: 12px;">
//         <div className="apexcharts-tooltip-y-group"><span
//           className="apexcharts-tooltip-text-y-label">Pastures: </span><span
//           className="apexcharts-tooltip-text-y-value">6.92%</span></div>
//         <div className="apexcharts-tooltip-goals-group"><span
//           className="apexcharts-tooltip-text-goals-label"></span><span
//           className="apexcharts-tooltip-text-goals-value"></span></div>
//         <div className="apexcharts-tooltip-z-group"><span className="apexcharts-tooltip-text-z-label"></span><span
//           className="apexcharts-tooltip-text-z-value"></span></div>
//       </div>
//     </div>
//     <div className="apexcharts-tooltip-series-group apexcharts-tooltip-series-group-20"
//          style="order: 21; display: none;"><span className="apexcharts-tooltip-marker"
//                                                  style="background-color: rgb(230, 230, 77);"></span>
//       <div className="apexcharts-tooltip-text" style="font-family: Helvetica, Arial, sans-serif; font-size: 12px;">
//         <div className="apexcharts-tooltip-y-group"><span
//           className="apexcharts-tooltip-text-y-label">Pastures: </span><span
//           className="apexcharts-tooltip-text-y-value">6.92%</span></div>
//         <div className="apexcharts-tooltip-goals-group"><span
//           className="apexcharts-tooltip-text-goals-label"></span><span
//           className="apexcharts-tooltip-text-goals-value"></span></div>
//         <div className="apexcharts-tooltip-z-group"><span className="apexcharts-tooltip-text-z-label"></span><span
//           className="apexcharts-tooltip-text-z-value"></span></div>
//       </div>
//     </div>
//     <div className="apexcharts-tooltip-series-group apexcharts-tooltip-series-group-21"
//          style="order: 22; display: none;"><span className="apexcharts-tooltip-marker"
//                                                  style="background-color: rgb(230, 230, 77);"></span>
//       <div className="apexcharts-tooltip-text" style="font-family: Helvetica, Arial, sans-serif; font-size: 12px;">
//         <div className="apexcharts-tooltip-y-group"><span
//           className="apexcharts-tooltip-text-y-label">Pastures: </span><span
//           className="apexcharts-tooltip-text-y-value">6.92%</span></div>
//         <div className="apexcharts-tooltip-goals-group"><span
//           className="apexcharts-tooltip-text-goals-label"></span><span
//           className="apexcharts-tooltip-text-goals-value"></span></div>
//         <div className="apexcharts-tooltip-z-group"><span className="apexcharts-tooltip-text-z-label"></span><span
//           className="apexcharts-tooltip-text-z-value"></span></div>
//       </div>
//     </div>
//     <div className="apexcharts-tooltip-series-group apexcharts-tooltip-series-group-22"
//          style="order: 23; display: none;"><span className="apexcharts-tooltip-marker"
//                                                  style="background-color: rgb(230, 230, 77);"></span>
//       <div className="apexcharts-tooltip-text" style="font-family: Helvetica, Arial, sans-serif; font-size: 12px;">
//         <div className="apexcharts-tooltip-y-group"><span
//           className="apexcharts-tooltip-text-y-label">Pastures: </span><span
//           className="apexcharts-tooltip-text-y-value">6.92%</span></div>
//         <div className="apexcharts-tooltip-goals-group"><span
//           className="apexcharts-tooltip-text-goals-label"></span><span
//           className="apexcharts-tooltip-text-goals-value"></span></div>
//         <div className="apexcharts-tooltip-z-group"><span className="apexcharts-tooltip-text-z-label"></span><span
//           className="apexcharts-tooltip-text-z-value"></span></div>
//       </div>
//     </div>
//     <div className="apexcharts-tooltip-series-group apexcharts-tooltip-series-group-23"
//          style="order: 24; display: none;"><span className="apexcharts-tooltip-marker"
//                                                  style="background-color: rgb(230, 230, 77);"></span>
//       <div className="apexcharts-tooltip-text" style="font-family: Helvetica, Arial, sans-serif; font-size: 12px;">
//         <div className="apexcharts-tooltip-y-group"><span
//           className="apexcharts-tooltip-text-y-label">Pastures: </span><span
//           className="apexcharts-tooltip-text-y-value">6.92%</span></div>
//         <div className="apexcharts-tooltip-goals-group"><span
//           className="apexcharts-tooltip-text-goals-label"></span><span
//           className="apexcharts-tooltip-text-goals-value"></span></div>
//         <div className="apexcharts-tooltip-z-group"><span className="apexcharts-tooltip-text-z-label"></span><span
//           className="apexcharts-tooltip-text-z-value"></span></div>
//       </div>
//     </div>
//     <div className="apexcharts-tooltip-series-group apexcharts-tooltip-series-group-24"
//          style="order: 25; display: none;"><span className="apexcharts-tooltip-marker"
//                                                  style="background-color: rgb(230, 230, 77);"></span>
//       <div className="apexcharts-tooltip-text" style="font-family: Helvetica, Arial, sans-serif; font-size: 12px;">
//         <div className="apexcharts-tooltip-y-group"><span
//           className="apexcharts-tooltip-text-y-label">Pastures: </span><span
//           className="apexcharts-tooltip-text-y-value">6.92%</span></div>
//         <div className="apexcharts-tooltip-goals-group"><span
//           className="apexcharts-tooltip-text-goals-label"></span><span
//           className="apexcharts-tooltip-text-goals-value"></span></div>
//         <div className="apexcharts-tooltip-z-group"><span className="apexcharts-tooltip-text-z-label"></span><span
//           className="apexcharts-tooltip-text-z-value"></span></div>
//       </div>
//     </div>
//     <div className="apexcharts-tooltip-series-group apexcharts-tooltip-series-group-25"
//          style="order: 26; display: none;"><span className="apexcharts-tooltip-marker"
//                                                  style="background-color: rgb(230, 230, 77);"></span>
//       <div className="apexcharts-tooltip-text" style="font-family: Helvetica, Arial, sans-serif; font-size: 12px;">
//         <div className="apexcharts-tooltip-y-group"><span
//           className="apexcharts-tooltip-text-y-label">Pastures: </span><span
//           className="apexcharts-tooltip-text-y-value">6.92%</span></div>
//         <div className="apexcharts-tooltip-goals-group"><span
//           className="apexcharts-tooltip-text-goals-label"></span><span
//           className="apexcharts-tooltip-text-goals-value"></span></div>
//         <div className="apexcharts-tooltip-z-group"><span className="apexcharts-tooltip-text-z-label"></span><span
//           className="apexcharts-tooltip-text-z-value"></span></div>
//       </div>
//     </div>
//     <div className="apexcharts-tooltip-series-group apexcharts-tooltip-series-group-26"
//          style="order: 27; display: none;"><span className="apexcharts-tooltip-marker"
//                                                  style="background-color: rgb(230, 230, 77);"></span>
//       <div className="apexcharts-tooltip-text" style="font-family: Helvetica, Arial, sans-serif; font-size: 12px;">
//         <div className="apexcharts-tooltip-y-group"><span
//           className="apexcharts-tooltip-text-y-label">Pastures: </span><span
//           className="apexcharts-tooltip-text-y-value">6.92%</span></div>
//         <div className="apexcharts-tooltip-goals-group"><span
//           className="apexcharts-tooltip-text-goals-label"></span><span
//           className="apexcharts-tooltip-text-goals-value"></span></div>
//         <div className="apexcharts-tooltip-z-group"><span className="apexcharts-tooltip-text-z-label"></span><span
//           className="apexcharts-tooltip-text-z-value"></span></div>
//       </div>
//     </div>
//     <div className="apexcharts-tooltip-series-group apexcharts-tooltip-series-group-27"
//          style="order: 28; display: none;"><span className="apexcharts-tooltip-marker"
//                                                  style="background-color: rgb(230, 230, 77);"></span>
//       <div className="apexcharts-tooltip-text" style="font-family: Helvetica, Arial, sans-serif; font-size: 12px;">
//         <div className="apexcharts-tooltip-y-group"><span
//           className="apexcharts-tooltip-text-y-label">Pastures: </span><span
//           className="apexcharts-tooltip-text-y-value">6.92%</span></div>
//         <div className="apexcharts-tooltip-goals-group"><span
//           className="apexcharts-tooltip-text-goals-label"></span><span
//           className="apexcharts-tooltip-text-goals-value"></span></div>
//         <div className="apexcharts-tooltip-z-group"><span className="apexcharts-tooltip-text-z-label"></span><span
//           className="apexcharts-tooltip-text-z-value"></span></div>
//       </div>
//     </div>
//     <div className="apexcharts-tooltip-series-group apexcharts-tooltip-series-group-28"
//          style="order: 29; display: none;"><span className="apexcharts-tooltip-marker"
//                                                  style="background-color: rgb(230, 230, 77);"></span>
//       <div className="apexcharts-tooltip-text" style="font-family: Helvetica, Arial, sans-serif; font-size: 12px;">
//         <div className="apexcharts-tooltip-y-group"><span
//           className="apexcharts-tooltip-text-y-label">Pastures: </span><span
//           className="apexcharts-tooltip-text-y-value">6.92%</span></div>
//         <div className="apexcharts-tooltip-goals-group"><span
//           className="apexcharts-tooltip-text-goals-label"></span><span
//           className="apexcharts-tooltip-text-goals-value"></span></div>
//         <div className="apexcharts-tooltip-z-group"><span className="apexcharts-tooltip-text-z-label"></span><span
//           className="apexcharts-tooltip-text-z-value"></span></div>
//       </div>
//     </div>
//     <div className="apexcharts-tooltip-series-group apexcharts-tooltip-series-group-29"
//          style="order: 30; display: none;"><span className="apexcharts-tooltip-marker"
//                                                  style="background-color: rgb(230, 230, 77);"></span>
//       <div className="apexcharts-tooltip-text" style="font-family: Helvetica, Arial, sans-serif; font-size: 12px;">
//         <div className="apexcharts-tooltip-y-group"><span
//           className="apexcharts-tooltip-text-y-label">Pastures: </span><span
//           className="apexcharts-tooltip-text-y-value">6.92%</span></div>
//         <div className="apexcharts-tooltip-goals-group"><span
//           className="apexcharts-tooltip-text-goals-label"></span><span
//           className="apexcharts-tooltip-text-goals-value"></span></div>
//         <div className="apexcharts-tooltip-z-group"><span className="apexcharts-tooltip-text-z-label"></span><span
//           className="apexcharts-tooltip-text-z-value"></span></div>
//       </div>
//     </div>
//     <div className="apexcharts-tooltip-series-group apexcharts-tooltip-series-group-30"
//          style="order: 31; display: none;"><span className="apexcharts-tooltip-marker"
//                                                  style="background-color: rgb(230, 230, 77);"></span>
//       <div className="apexcharts-tooltip-text" style="font-family: Helvetica, Arial, sans-serif; font-size: 12px;">
//         <div className="apexcharts-tooltip-y-group"><span
//           className="apexcharts-tooltip-text-y-label">Pastures: </span><span
//           className="apexcharts-tooltip-text-y-value">6.92%</span></div>
//         <div className="apexcharts-tooltip-goals-group"><span
//           className="apexcharts-tooltip-text-goals-label"></span><span
//           className="apexcharts-tooltip-text-goals-value"></span></div>
//         <div className="apexcharts-tooltip-z-group"><span className="apexcharts-tooltip-text-z-label"></span><span
//           className="apexcharts-tooltip-text-z-value"></span></div>
//       </div>
//     </div>
//     <div className="apexcharts-tooltip-series-group apexcharts-tooltip-series-group-31"
//          style="order: 32; display: none;"><span className="apexcharts-tooltip-marker"
//                                                  style="background-color: rgb(230, 230, 77);"></span>
//       <div className="apexcharts-tooltip-text" style="font-family: Helvetica, Arial, sans-serif; font-size: 12px;">
//         <div className="apexcharts-tooltip-y-group"><span
//           className="apexcharts-tooltip-text-y-label">Pastures: </span><span
//           className="apexcharts-tooltip-text-y-value">6.92%</span></div>
//         <div className="apexcharts-tooltip-goals-group"><span
//           className="apexcharts-tooltip-text-goals-label"></span><span
//           className="apexcharts-tooltip-text-goals-value"></span></div>
//         <div className="apexcharts-tooltip-z-group"><span className="apexcharts-tooltip-text-z-label"></span><span
//           className="apexcharts-tooltip-text-z-value"></span></div>
//       </div>
//     </div>
//     <div className="apexcharts-tooltip-series-group apexcharts-tooltip-series-group-32"
//          style="order: 33; display: none;"><span className="apexcharts-tooltip-marker"
//                                                  style="background-color: rgb(230, 230, 77);"></span>
//       <div className="apexcharts-tooltip-text" style="font-family: Helvetica, Arial, sans-serif; font-size: 12px;">
//         <div className="apexcharts-tooltip-y-group"><span
//           className="apexcharts-tooltip-text-y-label">Pastures: </span><span
//           className="apexcharts-tooltip-text-y-value">6.92%</span></div>
//         <div className="apexcharts-tooltip-goals-group"><span
//           className="apexcharts-tooltip-text-goals-label"></span><span
//           className="apexcharts-tooltip-text-goals-value"></span></div>
//         <div className="apexcharts-tooltip-z-group"><span className="apexcharts-tooltip-text-z-label"></span><span
//           className="apexcharts-tooltip-text-z-value"></span></div>
//       </div>
//     </div>
//     <div className="apexcharts-tooltip-series-group apexcharts-tooltip-series-group-33"
//          style="order: 34; display: none;"><span className="apexcharts-tooltip-marker"
//                                                  style="background-color: rgb(230, 230, 77);"></span>
//       <div className="apexcharts-tooltip-text" style="font-family: Helvetica, Arial, sans-serif; font-size: 12px;">
//         <div className="apexcharts-tooltip-y-group"><span
//           className="apexcharts-tooltip-text-y-label">Pastures: </span><span
//           className="apexcharts-tooltip-text-y-value">6.92%</span></div>
//         <div className="apexcharts-tooltip-goals-group"><span
//           className="apexcharts-tooltip-text-goals-label"></span><span
//           className="apexcharts-tooltip-text-goals-value"></span></div>
//         <div className="apexcharts-tooltip-z-group"><span className="apexcharts-tooltip-text-z-label"></span><span
//           className="apexcharts-tooltip-text-z-value"></span></div>
//       </div>
//     </div>
//     <div className="apexcharts-tooltip-series-group apexcharts-tooltip-series-group-34"
//          style="order: 35; display: none;"><span className="apexcharts-tooltip-marker"
//                                                  style="background-color: rgb(230, 230, 77);"></span>
//       <div className="apexcharts-tooltip-text" style="font-family: Helvetica, Arial, sans-serif; font-size: 12px;">
//         <div className="apexcharts-tooltip-y-group"><span
//           className="apexcharts-tooltip-text-y-label">Pastures: </span><span
//           className="apexcharts-tooltip-text-y-value">6.92%</span></div>
//         <div className="apexcharts-tooltip-goals-group"><span
//           className="apexcharts-tooltip-text-goals-label"></span><span
//           className="apexcharts-tooltip-text-goals-value"></span></div>
//         <div className="apexcharts-tooltip-z-group"><span className="apexcharts-tooltip-text-z-label"></span><span
//           className="apexcharts-tooltip-text-z-value"></span></div>
//       </div>
//     </div>
//     <div className="apexcharts-tooltip-series-group apexcharts-tooltip-series-group-35"
//          style="order: 36; display: none;"><span className="apexcharts-tooltip-marker"
//                                                  style="background-color: rgb(230, 230, 77);"></span>
//       <div className="apexcharts-tooltip-text" style="font-family: Helvetica, Arial, sans-serif; font-size: 12px;">
//         <div className="apexcharts-tooltip-y-group"><span
//           className="apexcharts-tooltip-text-y-label">Pastures: </span><span
//           className="apexcharts-tooltip-text-y-value">6.92%</span></div>
//         <div className="apexcharts-tooltip-goals-group"><span
//           className="apexcharts-tooltip-text-goals-label"></span><span
//           className="apexcharts-tooltip-text-goals-value"></span></div>
//         <div className="apexcharts-tooltip-z-group"><span className="apexcharts-tooltip-text-z-label"></span><span
//           className="apexcharts-tooltip-text-z-value"></span></div>
//       </div>
//     </div>
//     <div className="apexcharts-tooltip-series-group apexcharts-tooltip-series-group-36"
//          style="order: 37; display: none;"><span className="apexcharts-tooltip-marker"
//                                                  style="background-color: rgb(230, 230, 77);"></span>
//       <div className="apexcharts-tooltip-text" style="font-family: Helvetica, Arial, sans-serif; font-size: 12px;">
//         <div className="apexcharts-tooltip-y-group"><span
//           className="apexcharts-tooltip-text-y-label">Pastures: </span><span
//           className="apexcharts-tooltip-text-y-value">6.92%</span></div>
//         <div className="apexcharts-tooltip-goals-group"><span
//           className="apexcharts-tooltip-text-goals-label"></span><span
//           className="apexcharts-tooltip-text-goals-value"></span></div>
//         <div className="apexcharts-tooltip-z-group"><span className="apexcharts-tooltip-text-z-label"></span><span
//           className="apexcharts-tooltip-text-z-value"></span></div>
//       </div>
//     </div>
//     <div className="apexcharts-tooltip-series-group apexcharts-tooltip-series-group-37"
//          style="order: 38; display: none;"><span className="apexcharts-tooltip-marker"
//                                                  style="background-color: rgb(230, 230, 77);"></span>
//       <div className="apexcharts-tooltip-text" style="font-family: Helvetica, Arial, sans-serif; font-size: 12px;">
//         <div className="apexcharts-tooltip-y-group"><span
//           className="apexcharts-tooltip-text-y-label">Pastures: </span><span
//           className="apexcharts-tooltip-text-y-value">6.92%</span></div>
//         <div className="apexcharts-tooltip-goals-group"><span
//           className="apexcharts-tooltip-text-goals-label"></span><span
//           className="apexcharts-tooltip-text-goals-value"></span></div>
//         <div className="apexcharts-tooltip-z-group"><span className="apexcharts-tooltip-text-z-label"></span><span
//           className="apexcharts-tooltip-text-z-value"></span></div>
//       </div>
//     </div>
//     <div className="apexcharts-tooltip-series-group apexcharts-tooltip-series-group-38"
//          style="order: 39; display: none;"><span className="apexcharts-tooltip-marker"
//                                                  style="background-color: rgb(230, 230, 77);"></span>
//       <div className="apexcharts-tooltip-text" style="font-family: Helvetica, Arial, sans-serif; font-size: 12px;">
//         <div className="apexcharts-tooltip-y-group"><span
//           className="apexcharts-tooltip-text-y-label">Pastures: </span><span
//           className="apexcharts-tooltip-text-y-value">6.92%</span></div>
//         <div className="apexcharts-tooltip-goals-group"><span
//           className="apexcharts-tooltip-text-goals-label"></span><span
//           className="apexcharts-tooltip-text-goals-value"></span></div>
//         <div className="apexcharts-tooltip-z-group"><span className="apexcharts-tooltip-text-z-label"></span><span
//           className="apexcharts-tooltip-text-z-value"></span></div>
//       </div>
//     </div>
//     <div className="apexcharts-tooltip-series-group apexcharts-tooltip-series-group-39"
//          style="order: 40; display: none;"><span className="apexcharts-tooltip-marker"
//                                                  style="background-color: rgb(230, 230, 77);"></span>
//       <div className="apexcharts-tooltip-text" style="font-family: Helvetica, Arial, sans-serif; font-size: 12px;">
//         <div className="apexcharts-tooltip-y-group"><span
//           className="apexcharts-tooltip-text-y-label">Pastures: </span><span
//           className="apexcharts-tooltip-text-y-value">6.92%</span></div>
//         <div className="apexcharts-tooltip-goals-group"><span
//           className="apexcharts-tooltip-text-goals-label"></span><span
//           className="apexcharts-tooltip-text-goals-value"></span></div>
//         <div className="apexcharts-tooltip-z-group"><span className="apexcharts-tooltip-text-z-label"></span><span
//           className="apexcharts-tooltip-text-z-value"></span></div>
//       </div>
//     </div>
//     <div className="apexcharts-tooltip-series-group apexcharts-tooltip-series-group-40"
//          style="order: 41; display: none;"><span className="apexcharts-tooltip-marker"
//                                                  style="background-color: rgb(230, 230, 77);"></span>
//       <div className="apexcharts-tooltip-text" style="font-family: Helvetica, Arial, sans-serif; font-size: 12px;">
//         <div className="apexcharts-tooltip-y-group"><span
//           className="apexcharts-tooltip-text-y-label">Pastures: </span><span
//           className="apexcharts-tooltip-text-y-value">6.92%</span></div>
//         <div className="apexcharts-tooltip-goals-group"><span
//           className="apexcharts-tooltip-text-goals-label"></span><span
//           className="apexcharts-tooltip-text-goals-value"></span></div>
//         <div className="apexcharts-tooltip-z-group"><span className="apexcharts-tooltip-text-z-label"></span><span
//           className="apexcharts-tooltip-text-z-value"></span></div>
//       </div>
//     </div>
//     <div className="apexcharts-tooltip-series-group apexcharts-tooltip-series-group-41"
//          style="order: 42; display: none;"><span className="apexcharts-tooltip-marker"
//                                                  style="background-color: rgb(230, 230, 77);"></span>
//       <div className="apexcharts-tooltip-text" style="font-family: Helvetica, Arial, sans-serif; font-size: 12px;">
//         <div className="apexcharts-tooltip-y-group"><span
//           className="apexcharts-tooltip-text-y-label">Pastures: </span><span
//           className="apexcharts-tooltip-text-y-value">6.92%</span></div>
//         <div className="apexcharts-tooltip-goals-group"><span
//           className="apexcharts-tooltip-text-goals-label"></span><span
//           className="apexcharts-tooltip-text-goals-value"></span></div>
//         <div className="apexcharts-tooltip-z-group"><span className="apexcharts-tooltip-text-z-label"></span><span
//           className="apexcharts-tooltip-text-z-value"></span></div>
//       </div>
//     </div>
//     <div className="apexcharts-tooltip-series-group apexcharts-tooltip-series-group-42"
//          style="order: 43; display: none;"><span className="apexcharts-tooltip-marker"
//                                                  style="background-color: rgb(230, 230, 77);"></span>
//       <div className="apexcharts-tooltip-text" style="font-family: Helvetica, Arial, sans-serif; font-size: 12px;">
//         <div className="apexcharts-tooltip-y-group"><span
//           className="apexcharts-tooltip-text-y-label">Pastures: </span><span
//           className="apexcharts-tooltip-text-y-value">6.92%</span></div>
//         <div className="apexcharts-tooltip-goals-group"><span
//           className="apexcharts-tooltip-text-goals-label"></span><span
//           className="apexcharts-tooltip-text-goals-value"></span></div>
//         <div className="apexcharts-tooltip-z-group"><span className="apexcharts-tooltip-text-z-label"></span><span
//           className="apexcharts-tooltip-text-z-value"></span></div>
//       </div>
//     </div>
//     <div className="apexcharts-tooltip-series-group apexcharts-tooltip-series-group-43"
//          style="order: 44; display: none;"><span className="apexcharts-tooltip-marker"
//                                                  style="background-color: rgb(230, 230, 77);"></span>
//       <div className="apexcharts-tooltip-text" style="font-family: Helvetica, Arial, sans-serif; font-size: 12px;">
//         <div className="apexcharts-tooltip-y-group"><span
//           className="apexcharts-tooltip-text-y-label">Pastures: </span><span
//           className="apexcharts-tooltip-text-y-value">6.92%</span></div>
//         <div className="apexcharts-tooltip-goals-group"><span
//           className="apexcharts-tooltip-text-goals-label"></span><span
//           className="apexcharts-tooltip-text-goals-value"></span></div>
//         <div className="apexcharts-tooltip-z-group"><span className="apexcharts-tooltip-text-z-label"></span><span
//           className="apexcharts-tooltip-text-z-value"></span></div>
//       </div>
//     </div>
//     <div className="apexcharts-tooltip-series-group apexcharts-tooltip-series-group-44"
//          style="order: 45; display: none;"><span className="apexcharts-tooltip-marker"
//                                                  style="background-color: rgb(230, 230, 77);"></span>
//       <div className="apexcharts-tooltip-text" style="font-family: Helvetica, Arial, sans-serif; font-size: 12px;">
//         <div className="apexcharts-tooltip-y-group"><span
//           className="apexcharts-tooltip-text-y-label">Pastures: </span><span
//           className="apexcharts-tooltip-text-y-value">6.92%</span></div>
//         <div className="apexcharts-tooltip-goals-group"><span
//           className="apexcharts-tooltip-text-goals-label"></span><span
//           className="apexcharts-tooltip-text-goals-value"></span></div>
//         <div className="apexcharts-tooltip-z-group"><span className="apexcharts-tooltip-text-z-label"></span><span
//           className="apexcharts-tooltip-text-z-value"></span></div>
//       </div>
//     </div>
//   </div>
// }
