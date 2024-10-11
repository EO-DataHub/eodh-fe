import { useGetPresets } from '@ukri/map/data-access-map';
import { Error, LoadingSpinner } from '@ukri/shared/design-system';

import { Preset } from './preset.component';

interface IErrorMessageProps {
  refetch: () => void;
}

const ErrorMessage = ({ refetch }: IErrorMessageProps) => (
  <div className='flex flex-col items-center'>
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

  if (isLoading || isFetching) {
    return (
      <div className='flex justify-center'>
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <ErrorMessage refetch={refetch} />;
  }

  return (
    <>
      <section className='text-text-primary'>
        {data?.functions.map((preset, index) => (
          <Preset
            key={preset.identifier}
            base64String={preset.thumbnail_b64}
            title={preset.name}
            description={preset.description}
            onLoadPresetClick={() => {
              // eslint-disable-next-line no-console
              console.log('onLoadPresetClick', preset.identifier);
            }}
            className={index !== 0 ? 'mt-4' : ''}
          />
        ))}
      </section>
    </>
  );
};
