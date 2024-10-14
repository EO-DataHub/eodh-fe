import { useGetPresets } from '@ukri/map/data-access-map';
import { Error, LoadingSpinner } from '@ukri/shared/design-system';

import { Preset } from './preset.component';

interface IErrorMessageProps {
  refetch: () => void;
}

const ErrorMessage = ({ refetch }: IErrorMessageProps) => (
  <div className='flex flex-col items-center p-4'>
    <Error
      title='GLOBAL.ERRORS.PRESETS.TITLE'
      message='GLOBAL.ERRORS.PRESETS.MESSAGE'
      ctaText='GLOBAL.ERRORS.PRESETS.CTA'
      ctaOnClick={refetch}
    />
  </div>
);

export const Presets = () => {
  const { data, error, isLoading, isFetching, refetch } = useGetPresets();

  const handleLoadPreset = (preset: unknown) => {
    // eslint-disable-next-line no-console
    console.log('Load preset', preset);
    return;
  };

  if (isLoading || isFetching) {
    return (
      <div className='flex justify-center p-4'>
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <ErrorMessage refetch={refetch} />;
  }

  return (
    <section className='text-text-primary h-full overflow-scroll p-4 pb-0'>
      {data?.functions.map((preset) => (
        <Preset
          key={preset.identifier}
          base64String={preset.thumbnail_b64}
          title={preset.name}
          description={preset.description}
          onLoadPresetClick={() => handleLoadPreset(preset)}
          className='mb-4'
        />
      ))}
    </section>
  );
};
