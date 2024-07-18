import React from 'react';

interface ITextProps {
  content: React.ReactNode | string;
  className?: string;
  type?: 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

const Text = ({ className, content, type = 'p' }: ITextProps): JSX.Element => {
  const Tag = type as keyof JSX.IntrinsicElements;
  return <Tag className={` ${className}`}>{content}</Tag>;
};

export default Text;
