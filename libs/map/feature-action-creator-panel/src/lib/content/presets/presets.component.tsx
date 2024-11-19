import { TPreset, useActionCreator, useFunctions, useGetPresets, useMode } from '@ukri/map/data-access-map';
import { Error, LoadingSpinner } from '@ukri/shared/design-system';
import { PropsWithChildren, useCallback, useContext } from 'react';

import { ActionCreator } from '../../action-creator-panel.context';
import { Container, Content, Footer } from '../container.component';
import { TabsFlowModal } from '../tabs-flow-modal/tabs-flow-modal.component';
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
      <Content>
        {children}
        <TabsFlowModal
          header='MAP.ACTION_CREATOR_PANEL.TABS_FLOW_MODAL.PRESETS.HEADER'
          content='MAP.ACTION_CREATOR_PANEL.TABS_FLOW_MODAL.PRESETS.CONTENT'
          ctaText='MAP.ACTION_CREATOR_PANEL.TABS_FLOW_MODAL.PRESETS.CTA_BUTTON'
        />
      </Content>
      <Footer></Footer>
    </Container>
  );
};

export const Presets = () => {
  const { setActiveTab } = useContext(ActionCreator);
  const { data, error, isLoading, refetch } = useGetPresets();
  const { data: functionData } = useFunctions();
  const { loadPreset } = useActionCreator();
  const { changeView } = useMode();

  const handleLoadPreset = useCallback(
    (preset: TPreset) => {
      loadPreset({
        dataSet: preset.defaultValues.dataSet,
        functions: preset.defaultValues.functions.map((item) => ({
          ...item,
          inputs: {
            stacCollection: functionData?.find((fn) => fn.identifier === item.identifier)?.inputs.stacCollection,
          },
        })),
        aoi: preset.defaultValues.aoi,
        dateRange: preset.defaultValues.dateRange,
      });
      changeView('search');
      setActiveTab('workflow');
      return;
    },
    [functionData, changeView, loadPreset, setActiveTab]
  );

  if (isLoading) {
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
            disabled={preset.disabled}
            onLoadPresetClick={() => handleLoadPreset(preset)}
            className='mb-4'
          />
        ))}
      </section>
    </PresetsContainer>
  );
};
