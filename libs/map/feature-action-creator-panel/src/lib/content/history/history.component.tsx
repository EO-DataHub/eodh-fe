import { useGetPresets } from '@ukri/map/data-access-map';
import { Error, LoadingSpinner } from '@ukri/shared/design-system';
import { useState } from 'react';

import { SortFilter } from './sort-filter/sort-filter.component';

// interface IErrorMessageProps {
//   refetch: () => void;
// }

// const ErrorMessage = ({ refetch }: IErrorMessageProps) => (
//   <div className='flex flex-col items-center p-4'>
//     <Error
//       title='GLOBAL.ERRORS.PRESETS.TITLE'
//       message='GLOBAL.ERRORS.PRESETS.MESSAGE'
//       ctaText='GLOBAL.ERRORS.PRESETS.CTA'
//       ctaOnClick={refetch}
//     />
//   </div>
// );

export const History = () => {
  const [sortOrder, setSortOrder] = useState<string | null>(null);

  const handleSortChange = (order: string) => {
    setSortOrder(order);
  };
  //   const { data, error, isLoading, isFetching, refetch } = useGetPresets();

  //   const handleLoadPreset = (preset: unknown) => {
  //     // eslint-disable-next-line no-console
  //     console.log('Load preset', preset);
  //     return;
  //   };

  //   if (isLoading || isFetching) {
  //     return (
  //       <div className='flex justify-center p-4'>
  //         <LoadingSpinner />
  //       </div>
  //     );
  //   }

  //   if (error) {
  //     return <ErrorMessage refetch={refetch} />;
  //   }

  return (
    <section className='text-text-primary h-full overflow-scroll p-4 pb-0'>
      <div className='flex justify-end'>
        <SortFilter onSortChange={handleSortChange} />
      </div>

      {/* {data?.functions.map((preset) => (
        <Preset
          key={preset.identifier}
          imageUrl={preset.imageUrl}
          title={preset.name}
          description={preset.description}
          onLoadPresetClick={() => handleLoadPreset(preset)}
          className='mb-4'
        />
      ))} */}
    </section>
  );
};
