import { useMode } from '@ukri/map/data-access-map';
import { TimeSlider } from '@ukri/shared/ui/time-slider';
import { createDateString } from '@ukri/shared/utils/date';

interface IBottomPanel {
  className?: string;
}

export const BottomPanel = ({ className }: IBottomPanel) => {
  const { view } = useMode();

  if (view === 'results') {
    return (
      <div
        className={`w-full h-[76px] bg-background-main border-b-[1px] border-bright-dark flex items-center text-text bottom-0 ${className}`}
      >
        <TimeSlider
          min={createDateString('2000-01-01')}
          max={createDateString('2001-01-01T00:00:00+00:00')}
          className='grow'
        />
      </div>
    );
  }
  return null;
};

// import { useResults } from '@ukri/map/data-access-map';
// import { useSearchMode } from '@ukri/map/feature-search-mode-panel';
// import { TimeSlider } from '@ukri/shared/ui/time-slider';
// import { type TDateStringInternal } from '@ukri/shared/utils/date';

// interface IBottomPanel {
//   className: string;
// }

// export const BottomPanel = ({ className }: IBottomPanel) => {
//   const { searchParams, updateSearchParams } = useResults();
// //   const { schema, data, state, status, values, updateState, view, changeToSearchView, search, searchType } =
// //     useSearchMode();
// //   console.log(searchParams);
// //   console.log('values', values);

//   return (
//     <div
//       className={`ml-[360px] w-[calc(100%-360px)] h-[76px] bg-background-main border-b-[1px] border-bright-dark flex items-center text-text bottom-0 ${className}`}
//     >
//       {values?.date?.from && values?.date?.to && (
//         <TimeSlider
//           min={searchParams?.date?.from as TDateStringInternal}
//           max={searchParams?.date?.to as TDateStringInternal}
//           className='grow'
//         />
//       )}
//     </div>
//   );
// };
