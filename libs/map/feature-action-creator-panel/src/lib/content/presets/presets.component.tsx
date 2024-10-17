import { useGetPresets } from '@ukri/map/data-access-map';
import { Error, LoadingSpinner } from '@ukri/shared/design-system';
import { PropsWithChildren } from 'react';

import { Container, Content, Footer } from '../container.component';
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

const PresetsContainer = ({ children }: PropsWithChildren) => {
  return (
    <Container>
      <Content>{children}</Content>
      <Footer></Footer>
    </Container>
  );
};

export const Presets = () => {
  const { data, error, isLoading, isFetching, refetch } = useGetPresets();

  const handleLoadPreset = (preset: unknown) => {
    // eslint-disable-next-line no-console
    console.log('Load preset', preset);
    return;
  };

  if (isLoading || isFetching) {
    return (
      <PresetsContainer>
        <div className='flex justify-center p-4'>
          <LoadingSpinner />
        </div>
      </PresetsContainer>
    );
  }

  if (error) {
    return (
      <PresetsContainer>
        <ErrorMessage refetch={refetch} />
      </PresetsContainer>
    );
  }

  return (
    <PresetsContainer>
      <section className='text-text-primary h-full overflow-scroll p-4 pb-0'>
        {data?.map((preset) => (
          <Preset
            key={preset.identifier}
            imageUrl={preset.imageUrl}
            title={preset.name}
            description={preset.description}
            onLoadPresetClick={() => handleLoadPreset(preset)}
            className='mb-4'
          />
        ))}
      </section>
    </PresetsContainer>
  );
};
