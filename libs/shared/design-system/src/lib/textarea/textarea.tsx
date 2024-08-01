import { useState } from 'react';

import textareaStyles from './textarea.styles'; // Adjust the path as needed

interface ITextareaProps {
  label: string;
  placeholder: string;
  rows?: number;
  maxLength?: number;
}

export const Textarea = ({ label, placeholder, rows = 4, maxLength }: ITextareaProps) => {
  const [text, setText] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  return (
    <div className={textareaStyles.container}>
      <label className={textareaStyles.label} htmlFor='textarea'>
        {label}
      </label>
      <textarea
        className={textareaStyles.textarea}
        id='textarea'
        placeholder={placeholder}
        rows={rows}
        maxLength={maxLength}
        value={text}
        onChange={handleChange}
      />
      {maxLength && (
        <p className={textareaStyles.charCount}>
          {text.length}/{maxLength} characters
        </p>
      )}
    </div>
  );
};
