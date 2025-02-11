import { Link, Text } from '@ukri/shared/design-system';

import { helpStyles } from './help.styles';
import { translationPath } from './help-content';

type TTableItem = {
  TABLE: { LABEL: string; COLOR: string }[];
};

type TImageItem = {
  IMAGE: { [key: string]: { ALT: string; DESCRIPTION_ABOVE?: string } };
};

type TLinkItem = {
  LINK: { HREF: string; DESCRIPTION: string };
};

type TAnswerType = string | string[] | [string] | [string][] | TTableItem | TImageItem | TLinkItem;

interface ITextRendererProps {
  content: string;
  uniqueId: string;
}

const TextRenderer = ({ content, uniqueId }: ITextRendererProps) => (
  <Text content={content} fontSize='medium' fontWeight='regular' key={uniqueId} />
);

interface ITableRendererProps {
  tableData: TTableItem['TABLE'];
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

interface IImageRendererProps {
  imageData: TImageItem['IMAGE'];
  answerKey: string;
  imagePath: string;
}

const ImageRenderer = ({ imageData, answerKey, imagePath }: IImageRendererProps) => {
  return Object.keys(imageData).map((imageDataKey) => (
    <div className='mt-3' key={answerKey}>
      {imageData[imageDataKey].DESCRIPTION_ABOVE && (
        <TextRenderer content={imageData[imageDataKey].DESCRIPTION_ABOVE} uniqueId={imageDataKey} />
      )}
      <img src={`${imagePath}/${imageDataKey}.png`} alt={imageData[imageDataKey].ALT} className={helpStyles.image} />
    </div>
  ));
};

interface ILinkRendererProps {
  linkData: TLinkItem['LINK'];
  answerKey: string;
}

const LinkRenderer = ({ linkData, answerKey }: ILinkRendererProps) => {
  return (
    <div className='mt-3' key={answerKey}>
      <a className='ml-4 my-4 no-underline' href={linkData.HREF}>
        {linkData.DESCRIPTION}
      </a>
    </div>
  );
};

interface IContentRendererProps {
  item: TAnswerType;
  answerKey: string;
  arrayIndex: number;
  imagePath?: string;
}

const ContentRenderer = ({ item, answerKey, arrayIndex, imagePath }: IContentRendererProps) => {
  if (typeof item === 'string') {
    return <TextRenderer content={item} uniqueId={`${answerKey}_${arrayIndex}`} />;
  } else if (typeof item === 'object' && item !== null && 'TABLE' in item) {
    return <TableRenderer tableData={item.TABLE} answerKey={`${answerKey}_${arrayIndex}`} />;
  } else if (typeof item === 'object' && item !== null && 'IMAGE' in item && imagePath) {
    return <ImageRenderer imageData={item.IMAGE} answerKey={`${answerKey}_${arrayIndex}`} imagePath={imagePath} />;
  } else if (typeof item === 'object' && item !== null && 'LINK' in item) {
    return <LinkRenderer linkData={item.LINK} answerKey={`${answerKey}_${arrayIndex}`} />;
  }
  return null;
};

interface ISubItemRendererProps {
  subItem: TAnswerType;
  answerKey: string;
  index: number;
  imagePath?: string;
}

const SubItemRenderer = ({ subItem, answerKey, index, imagePath }: ISubItemRendererProps) => {
  if (Array.isArray(subItem) && subItem.length > 0) {
    return (
      <ul key={`${answerKey}_${index}`}>
        {subItem.map((subSubItem, subindex) => {
          return (
            <div className={helpStyles.nestedListItem} key={`${answerKey}_${index}_${subindex}`}>
              <ContentRenderer
                item={subSubItem}
                answerKey={`${answerKey}_${index}_${subindex}`}
                arrayIndex={index}
                imagePath={imagePath}
              />
            </div>
          );
        })}
      </ul>
    );
  }
  return (
    <div className={helpStyles.listItem} key={`${answerKey}_${index}`}>
      <ContentRenderer item={subItem} answerKey={answerKey} arrayIndex={index} imagePath={imagePath} />
    </div>
  );
};

interface IListRendererProps {
  items: TAnswerType[];
  answerKey: string;
  imagePath?: string;
}

const ListRenderer = ({ items, answerKey, imagePath }: IListRendererProps) => (
  <ul key={answerKey}>
    {items.map((subItem, index) => (
      <div key={`${answerKey}_${index}`}>
        <SubItemRenderer imagePath={imagePath} subItem={subItem} answerKey={answerKey} index={index} />
      </div>
    ))}
  </ul>
);

interface IAnswerRendererProps {
  item: TAnswerType;
  answerKey: string;
  arrayIndex: number;
  imagePath?: string;
}

const AnswerRenderer = ({ item, answerKey, arrayIndex, imagePath }: IAnswerRendererProps) => {
  if (Array.isArray(item) && item.length > 0) {
    return <ListRenderer items={item} answerKey={`${answerKey}_${arrayIndex}`} imagePath={imagePath} />;
  }
  return <ContentRenderer item={item} answerKey={answerKey} arrayIndex={arrayIndex} imagePath={imagePath} />;
};

interface IAnswerProps {
  answer: TAnswerType[];
  answerKey: string;
  questionKey: string;
  question: string;
  pathToImages?: string;
}

export const Answer = ({ answer, answerKey, question, questionKey, pathToImages }: IAnswerProps) => {
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
            imagePath={pathToImages}
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
