import { Link, Text } from '@ukri/shared/design-system';

import { helpStyles } from './help.styles';
import { translationPath } from './help-content';

type TAnswerType = string | [string] | [string][];

interface IAnswerProps {
  answer: TAnswerType[];
  answerKey: string;
  question: string;
}

export const Answer = ({ answer, answerKey, question }: IAnswerProps) => {
  return (
    <div className={helpStyles.answer} id={`${answerKey}_answer`}>
      <Text type='h4' content={question} fontSize='medium' fontWeight='semibold' className={helpStyles.answerTitle} />
      {answer.map((item, arrayIndex) => {
        if (typeof item === 'string') {
          return <Text content={item} fontSize='medium' fontWeight='regular' key={`${answerKey}_${arrayIndex}`} />;
        } else if (Array.isArray(item)) {
          return (
            <ul key={`${answerKey}_${arrayIndex}`}>
              {item.map((subItem, index) => {
                if (typeof subItem === 'string') {
                  return (
                    <Text
                      key={`${answerKey}_${index}_string`}
                      content={subItem}
                      fontSize='medium'
                      fontWeight='regular'
                      className={helpStyles.listItem}
                    />
                  );
                } else if (Array.isArray(subItem)) {
                  return (
                    <ul key={`${answerKey}_${index}_array`}>
                      {subItem.map((subSubItem, subindex) => {
                        return (
                          <Text
                            key={`${answerKey}_${index}_${subindex}`}
                            content={subSubItem}
                            fontSize='medium'
                            fontWeight='regular'
                            className={helpStyles.nestedListItem}
                          />
                        );
                      })}
                    </ul>
                  );
                }
                return null;
              })}
            </ul>
          );
        }
        return null;
      })}
      <Link
        type='button'
        href={`#${answerKey}_question`}
        size='medium'
        iconHeight={20}
        iconWidth={20}
        text={`${translationPath}.BACK_BTN`}
        className={helpStyles.backButton}
        iconName='ArrowUpward'
      />
    </div>
  );
};
