import {
  IImageElement,
  IImageGroupElement,
  ILinkElement,
  ILinksGroupElement,
  IListElement,
  INestedListElement,
  IStyledTextElement,
  ITableElement,
  ITextElement,
  THelpElement,
} from '../../types/help-config.types';
import { ImageElement } from './image-element.component';
import { ImageGroupElement } from './image-group-element.component';
import { LinkElement } from './link-element.component';
import { LinksGroupElement } from './links-group-element.component';
import { ListElement } from './list-element.component';
import { NestedListElement } from './nested-list-element.component';
import { StyledTextElement } from './styled-text-element.component';
import { TableElement } from './table-element.component';
import { TextElement } from './text-element.component';

interface IElementRendererProps {
  readonly element: THelpElement;
  readonly pathToImages?: string;
}

const assertNever = (value: never): never => {
  throw new Error(`Unhandled element type: ${JSON.stringify(value)}`);
};

export const ElementRenderer = ({ element, pathToImages }: IElementRendererProps) => {
  switch (element.type) {
    case 'text':
      return <TextElement element={element as ITextElement} />;
    case 'list':
      return <ListElement element={element as IListElement} />;
    case 'nested-list':
      return <NestedListElement element={element as INestedListElement} />;
    case 'image':
      return <ImageElement element={element as IImageElement} pathToImages={pathToImages} />;
    case 'image-group':
      return <ImageGroupElement element={element as IImageGroupElement} pathToImages={pathToImages} />;
    case 'table':
      return <TableElement element={element as ITableElement} />;
    case 'link':
      return <LinkElement element={element as ILinkElement} />;
    case 'links-group':
      return <LinksGroupElement element={element as ILinksGroupElement} />;
    case 'styled-text':
      return <StyledTextElement element={element as IStyledTextElement} />;
    default:
      return assertNever(element);
  }
};
