// TODO divide ac-workflow-onboarding into 2 libs: generic onboarding and AC onboarding
// TODO modal by default should call onNext step. And if we need do manual call, then we pass callback and eg we change mode(eg property mode='manual' and onNextStep, ie we do 2 types, in one 2 types should exist, and in other not )
import { createContext, FC, ReactNode, useCallback, useContext, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { boolean } from 'zod';

interface IOnboardingContextType {
  currentStep: TStepName;
  isOnboardingComplete: boolean;
  completeOnboarding: () => void;
  goToNextOnboardingStep: () => void;
  onboardingSteps: TOnboardingSteps;
  updateShouldDisplayOnboardingModal: (acMode: boolean, workflowTab: boolean, permanentHidden: boolean) => boolean;
  displayOnboardingModal: boolean;
  setDisplayOnboardingModal: (value: boolean) => void;
}

export type TStepName =
  | 'AREA_NODE'
  | 'DRAWING_TOOLS'
  | 'DATA_SET_NODE'
  | 'DATA_SET_PANEL'
  | 'DATE_RANGE_PICKER'
  | 'FUNCTION_DROPDOWN'
  | 'FINISH';

interface IOnboardingStep {
  step_name: TStepName;
  next_step: TStepName;
  tooltip_text: string;
}

type TOnboardingSteps = {
  [K in Exclude<TStepName, 'FINISH'>]: IOnboardingStep;
};

const translationsPath = 'MAP.ACTION_CREATOR_PANEL.ONBOARDING.STEPS';

const OnboardingContext = createContext<IOnboardingContextType | undefined>(undefined);

export const OnboardingProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [currentStep, setCurrentStep] = useState<TStepName>('AREA_NODE');
  const [displayOnboardingModal, setDisplayOnboardingModal] = useState(false);
  const [isOnboardingComplete, setIsOnboardingComplete] = useState(false);
  const { t } = useTranslation();

  const onboardingSteps: TOnboardingSteps = useMemo(
    () => ({
      AREA_NODE: {
        step_name: 'AREA_NODE',
        next_step: 'DRAWING_TOOLS',
        tooltip_text: t(`${translationsPath}.AREA_NODE`),
      },
      DRAWING_TOOLS: {
        step_name: 'DRAWING_TOOLS',
        next_step: 'DATA_SET_NODE',
        tooltip_text: t(`${translationsPath}.DRAWING_TOOLS`),
      },
      DATA_SET_NODE: {
        step_name: 'DATA_SET_NODE',
        next_step: 'DATA_SET_PANEL',
        tooltip_text: t(`${translationsPath}.DATA_SET_NODE`),
      },
      DATA_SET_PANEL: {
        step_name: 'DATA_SET_PANEL',
        next_step: 'DATE_RANGE_PICKER',
        tooltip_text: t(`${translationsPath}.DATA_SET_PANEL`),
      },
      DATE_RANGE_PICKER: {
        step_name: 'DATE_RANGE_PICKER',
        next_step: 'FUNCTION_DROPDOWN',
        tooltip_text: t(`${translationsPath}.DATE_RANGE_PICKER`),
      },
      FUNCTION_DROPDOWN: {
        step_name: 'FUNCTION_DROPDOWN',
        next_step: 'FINISH',
        tooltip_text: t(`${translationsPath}.FUNCTION_DROPDOWN`),
      },
    }),
    [t]
  );

  const updateShouldDisplayOnboardingModal = useCallback(
    (acMode = false, workflowTab = false, permanentHidden = false) => {
      return !isOnboardingComplete && currentStep === 'AREA_NODE' && acMode && workflowTab && !permanentHidden;
    },
    [currentStep, isOnboardingComplete]
  );

  const goToNextOnboardingStep = () => {
    if (currentStep === 'FINISH') {
      completeOnboarding();
    } else {
      setCurrentStep(onboardingSteps[currentStep].next_step as TStepName);
    }
  };

  const completeOnboarding = () => {
    setIsOnboardingComplete(true);
  };

  return (
    <OnboardingContext.Provider
      value={{
        currentStep,
        isOnboardingComplete,
        completeOnboarding,
        goToNextOnboardingStep,
        onboardingSteps,
        updateShouldDisplayOnboardingModal,
        displayOnboardingModal,
        setDisplayOnboardingModal,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
};

export const useOnboarding = (collapsed?: boolean, enabled?: boolean) => {
  const context = useContext(OnboardingContext);
  if (context === undefined) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }

  const { updateShouldDisplayOnboardingModal, setDisplayOnboardingModal } = context;

  const displayOnboadingModal = () => {
    setDisplayOnboardingModal(updateShouldDisplayOnboardingModal(collapsed, enabled));
  };
  return { context, displayOnboadingModal };
};
