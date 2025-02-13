import { Button, Text } from '@ukri/shared/design-system';
import { useCallback } from 'react';

import { helpStyles } from './help.styles';

type TTableItem = {
  TABLE: { LABEL: string; COLOR: string }[];
};

type TImageItem = {
  IMAGE: { [key: string]: { ALT: string; DESCRIPTION_ABOVE?: string } };
};

type TLinkItem = {
  LINK: { [key: string]: { DESCRIPTION: string } };
};

type TAnswerType = string | string[] | [string] | [string][] | TTableItem | TImageItem | TLinkItem;

interface ITextRendererProps {
  content: string;
  uniqueId: string;
}

const TextRenderer = ({ content, uniqueId }: ITextRendererProps) => (
  <Text content={content} fontSize='medium' fontWeight='regular' key={uniqueId} className='mb-4' />
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
    <div className='my-3' key={answerKey}>
      {imageData[imageDataKey]?.DESCRIPTION_ABOVE && (
        <TextRenderer content={imageData[imageDataKey].DESCRIPTION_ABOVE || ''} uniqueId={imageDataKey} />
      )}
      <img src={`${imagePath}/${imageDataKey}.png`} alt={imageData[imageDataKey].ALT} className={helpStyles.image} />
    </div>
  ));
};

interface ILinkRendererProps {
  linkData: TLinkItem['LINK'];
  answerKey: string;
  links?: { [key: string]: string };
}

const LinkRenderer = ({ linkData, answerKey, links }: ILinkRendererProps) => {
  if (!links) {
    return null;
  }
  return Object.keys(linkData).map((linkDataKey) => (
    <div className='' key={answerKey}>
      <a className={helpStyles.link} href={links[linkDataKey]} target='_blank' rel='noreferrer'>
        <Text content={linkData[linkDataKey].DESCRIPTION} fontSize='medium' fontWeight='regular' />
      </a>
    </div>
  ));
};

interface IContentRendererProps {
  item: TAnswerType;
  answerKey: string;
  arrayIndex: number;
  imagePath?: string;
  links?: { [key: string]: string };
}

const ContentRenderer = ({ item, answerKey, arrayIndex, imagePath, links }: IContentRendererProps) => {
  if (typeof item === 'string') {
    return <TextRenderer content={item} uniqueId={`${answerKey}_${arrayIndex}`} />;
  } else if (typeof item === 'object' && item !== null && 'TABLE' in item) {
    return <TableRenderer tableData={item.TABLE} answerKey={`${answerKey}_${arrayIndex}`} />;
  } else if (typeof item === 'object' && item !== null && 'IMAGE' in item && imagePath) {
    return <ImageRenderer imageData={item.IMAGE} answerKey={`${answerKey}_${arrayIndex}`} imagePath={imagePath} />;
  } else if (typeof item === 'object' && item !== null && 'LINK' in item) {
    return <LinkRenderer linkData={item.LINK} answerKey={`${answerKey}_${arrayIndex}`} links={links} />;
  }
  return null;
};

interface ISubItemRendererProps {
  subItem: TAnswerType;
  answerKey: string;
  index: number;
  imagePath?: string;
  links?: { [key: string]: string };
}

const SubItemRenderer = ({ subItem, answerKey, index, imagePath, links }: ISubItemRendererProps) => {
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
                links={links}
              />
            </div>
          );
        })}
      </ul>
    );
  }
  return (
    <div className={helpStyles.listItem} key={`${answerKey}_${index}`}>
      <ContentRenderer item={subItem} answerKey={answerKey} arrayIndex={index} imagePath={imagePath} links={links} />
    </div>
  );
};

interface IListRendererProps {
  items: TAnswerType[];
  answerKey: string;
  imagePath?: string;
  links?: { [key: string]: string };
}

const ListRenderer = ({ items, answerKey, imagePath, links }: IListRendererProps) => (
  <ul key={answerKey}>
    {items.map((subItem, index) => (
      <div key={`${answerKey}_${index}`}>
        <SubItemRenderer imagePath={imagePath} subItem={subItem} answerKey={answerKey} index={index} links={links} />
      </div>
    ))}
  </ul>
);

interface IAnswerRendererProps {
  item: TAnswerType;
  answerKey: string;
  arrayIndex: number;
  imagePath?: string;
  links?: { [key: string]: string };
}

const AnswerRenderer = ({ item, answerKey, arrayIndex, imagePath, links }: IAnswerRendererProps) => {
  if (Array.isArray(item) && item.length > 0) {
    return <ListRenderer items={item} answerKey={`${answerKey}_${arrayIndex}`} imagePath={imagePath} links={links} />;
  }
  return (
    <ContentRenderer item={item} answerKey={answerKey} arrayIndex={arrayIndex} imagePath={imagePath} links={links} />
  );
};

interface IAnswerProps {
  answer: TAnswerType[];
  answerKey: string;
  questionKey: string;
  question: string;
  pathToImages?: string;
  translationPath: string;
  links?: { [key: string]: string };
}

export const Answer = ({
  answer,
  answerKey,
  question,
  questionKey,
  pathToImages,
  translationPath,
  links,
}: IAnswerProps) => {
  const handleClick = useCallback(() => {
    const element = document.getElementById(questionKey);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, [questionKey]);

  return (
    <div id={answerKey}>
      <Text type='h4' content={question} fontSize='medium' fontWeight='semibold' className={helpStyles.answerTitle} />
      {answer.map((item, arrayIndex) => {
        return (
          <AnswerRenderer
            key={`${answerKey}_${arrayIndex}`}
            item={item}
            answerKey={answerKey}
            arrayIndex={arrayIndex}
            imagePath={pathToImages}
            links={links}
          />
        );
      })}
      <Button
        size='medium'
        iconHeight={20}
        iconWidth={20}
        text={`${translationPath}.BACK_BTN`}
        className={helpStyles.backButton}
        iconName='ArrowUpward'
        onClick={handleClick}
      />
    </div>
  );
};
