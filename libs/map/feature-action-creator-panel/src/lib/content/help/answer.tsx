import { Link, Text } from '@ukri/shared/design-system';

import { helpStyles } from './help.styles';
import { translationPath } from './help-content';

type TTableItem = {
  TABLE: { LABEL: string; COLOR: string }[];
};

type TAnswerType = string | [string] | [string][] | TTableItem;

interface ISubItemRendererProps {
  subItem: string | string[];
  answerKey: string;
  index: number;
}
const SubItemRenderer = ({ subItem, answerKey, index }: ISubItemRendererProps) => {
  if (typeof subItem === 'string') {
    return (
      <Text
        key={`${answerKey}_${index}`}
        content={subItem}
        fontSize='medium'
        fontWeight='regular'
        className={helpStyles.listItem}
      />
    );
  } else if (Array.isArray(subItem) && subItem.length > 0) {
    return (
      <ul key={`${answerKey}_${index}`}>
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
};

interface ITextRendererProps {
  content: string;
  key: string;
}

const TextRenderer = ({ content, key }: ITextRendererProps) => (
  <Text content={content} fontSize='medium' fontWeight='regular' key={key} />
);

interface IListRendererProps {
  items: string[] | string[][];
  answerKey: string;
}

const ListRenderer = ({ items, answerKey }: IListRendererProps) => (
  <ul key={answerKey}>
    {items.map((subItem, index) => (
      <SubItemRenderer key={`${answerKey}_${index}`} subItem={subItem} answerKey={answerKey} index={index} />
    ))}
  </ul>
);

interface ITableRendererProps {
  tableData: { LABEL: string; COLOR: string }[];
  answerKey: string;
}

const TableRenderer = ({ tableData, answerKey }: ITableRendererProps) => (
  <table key={answerKey} className={helpStyles.table}>
    <tbody>
      {tableData.map((body, index) => (
        <tr key={`${body.COLOR}_${index}`}>
          <td className={helpStyles.tableCell}>
            <Text content={body.LABEL} fontSize='medium' fontWeight='regular' />
          </td>
          <td
            className={`${helpStyles.tableCell} ${helpStyles.colorCell}`}
            style={{ backgroundColor: body.COLOR }}
          ></td>
        </tr>
      ))}
    </tbody>
  </table>
);

interface IAnswerRendererProps {
  item: TAnswerType;
  answerKey: string;
  arrayIndex: number;
}

const AnswerRenderer = ({ item, answerKey, arrayIndex }: IAnswerRendererProps) => {
  if (typeof item === 'string') {
    return <TextRenderer content={item} key={`${answerKey}_${arrayIndex}`} />;
  } else if (Array.isArray(item) && item.length > 0) {
    return <ListRenderer items={item} answerKey={`${answerKey}_${arrayIndex}`} />;
  } else if (typeof item === 'object' && item !== null && 'TABLE' in item) {
    return <TableRenderer tableData={item.TABLE} answerKey={`${answerKey}_${arrayIndex}`} />;
  }
  return null;
};

interface IAnswerProps {
  answer: TAnswerType[];
  answerKey: string;
  questionKey: string;
  question: string;
}

export const Answer = ({ answer, answerKey, question, questionKey }: IAnswerProps) => {
  return (
    <div className={helpStyles.answer} id={answerKey}>
      <Text type='h4' content={question} fontSize='medium' fontWeight='semibold' className={helpStyles.answerTitle} />
      {answer.map((item, arrayIndex) => {
        return (
          <AnswerRenderer
            key={`${answerKey}_${arrayIndex}`}
            item={item}
            answerKey={answerKey}
            arrayIndex={arrayIndex}
          />
        );
      })}
      <Link
        type='button'
        href={`#${questionKey}`}
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
