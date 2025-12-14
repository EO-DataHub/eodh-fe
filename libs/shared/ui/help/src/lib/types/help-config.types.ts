export interface ITextElement {
  type: 'text';
  content: string;
}

export interface IListElement {
  type: 'list';
  variant?: 'bullet' | 'numbered';
  items: string[];
}

export interface INestedListElement {
  type: 'nested-list';
  variant?: 'bullet' | 'numbered';
  items: Array<{
    content: string;
    subItems?: string[];
  }>;
}

export interface IImageElement {
  type: 'image';
  src: string;
  alt: string;
  descriptionAbove?: string;
  caption?: string;
}

export interface IImageGroupElement {
  type: 'image-group';
  layout?: 'horizontal' | 'vertical';
  images: Array<Omit<IImageElement, 'type'>>;
}

export interface ITableElement {
  type: 'table';
  title?: string;
  rows: Array<{
    label: string;
    color: string;
  }>;
}

export interface ILinkElement {
  type: 'link';
  href: string;
  text: string;
}

export interface ILinksGroupElement {
  type: 'links-group';
  title?: string;
  links: Array<Omit<ILinkElement, 'type'>>;
}

export interface IStyledTextElement {
  type: 'styled-text';
  segments: Array<{
    text: string;
    style?: 'bold' | 'italic' | 'underline';
  }>;
}

export type THelpElement =
  | ITextElement
  | IListElement
  | INestedListElement
  | IImageElement
  | IImageGroupElement
  | ITableElement
  | ILinkElement
  | ILinksGroupElement
  | IStyledTextElement;

export interface IHelpQuestion {
  id: string;
  question: string;
  answer: THelpElement[];
}

export interface IHelpSection {
  id: string;
  title: string;
  questions: IHelpQuestion[];
}

export interface IHelpConfig {
  id: string;
  title?: string;
  intro: string;
  backButtonText?: string;
  pathToImages?: string;
  sections: IHelpSection[];
}
