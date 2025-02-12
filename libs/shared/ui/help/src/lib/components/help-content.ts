interface IQuestion {
  QUESTION_ID: string;
}

interface ISection {
  SECTION_ID: string;
  CONTENT: IQuestion[];
}

export interface IHelpContent {
  TITLE?: string;
  INTRO: string;
  QUESTIONS: ISection[];
  TRANSLATION_PATH: string;
}

const checkForDuplicateQuestionIds = (content: IHelpContent): string[] => {
  const questionIds = new Set<string>();
  const duplicates = new Set<string>();

  function traverseContent(content: IQuestion[] | ISection | IHelpContent) {
    if (Array.isArray(content)) {
      content.forEach((item: IQuestion) => {
        if (item.QUESTION_ID) {
          if (questionIds.has(item.QUESTION_ID)) {
            duplicates.add(item.QUESTION_ID);
          } else {
            questionIds.add(item.QUESTION_ID);
          }
        }
      });
    } else if (content && typeof content === 'object') {
      if ('QUESTION_ID' in content) {
        if (questionIds.has((content as IQuestion).QUESTION_ID)) {
          duplicates.add((content as IQuestion).QUESTION_ID);
        } else {
          questionIds.add(content.QUESTION_ID as string);
        }
      }
      Object.values(content).forEach((value) => traverseContent(value));
    }
  }

  traverseContent(content);
  return Array.from(duplicates);
};

interface IHelpContentWithTranslations {
  TITLE: string;
  INTRO: string;
  QUESTIONS: {
    SECTION_ID: string;
    SECTION_TRANSLATION: string;
    CONTENT: {
      UNIQUE_QUESTION_ID: string;
      UNIQUE_ANSWER_ID: string;
      QUESTION_TRANSLATION: string;
      ANSWER_TRANSLATION: string;
    }[];
  }[];
}

export const helpContentWithTranslations = (helpContentConfig: IHelpContent): IHelpContentWithTranslations => {
  const helpContentTranslationUniqueKeys = checkForDuplicateQuestionIds(helpContentConfig);
  if (helpContentTranslationUniqueKeys.length > 0) {
    // eslint-disable-next-line no-console
    console.error(`Duplicate QUESTION_IDs found: ${helpContentTranslationUniqueKeys.join(', ')}`);
  }
  return {
    TITLE: `${helpContentConfig.TRANSLATION_PATH}.${helpContentConfig.TITLE}`,
    INTRO: `${helpContentConfig.TRANSLATION_PATH}.${helpContentConfig.INTRO}`,
    QUESTIONS: helpContentConfig.QUESTIONS.map((category) => ({
      SECTION_ID: category.SECTION_ID,
      SECTION_TRANSLATION: `${helpContentConfig.TRANSLATION_PATH}.QUESTIONS.${category.SECTION_ID}.SUBTITLE`,
      CONTENT: category.CONTENT.map((question) => ({
        UNIQUE_QUESTION_ID: `${category.SECTION_ID}_${question.QUESTION_ID}_question`,
        UNIQUE_ANSWER_ID: `${category.SECTION_ID}_${question.QUESTION_ID}_answer`,
        QUESTION_TRANSLATION: `${helpContentConfig.TRANSLATION_PATH}.QUESTIONS.${category.SECTION_ID}.${question.QUESTION_ID}.QUESTION`,
        ANSWER_TRANSLATION: `${helpContentConfig.TRANSLATION_PATH}.QUESTIONS.${category.SECTION_ID}.${question.QUESTION_ID}.ANSWER`,
      })),
    })),
  };
};
