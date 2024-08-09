import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

import textareaStyles from './textarea.styles';

interface ITextareaProps {
  label: string;
  placeholder: string;
  rows?: number;
  maxLength?: number;
}

export const Textarea = ({ label, placeholder, rows = 4, maxLength }: ITextareaProps) => {
  const [text, setText] = useState('');
  const { t } = useTranslation();

  const handleChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  }, []);

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
      {maxLength !== undefined && (
        <p className={textareaStyles.charCount}>
          {t('GLOBAL.DESIGN_SYSTEM.TEXTAREA.COUNTER', { currentLength: text.length, maxLength: maxLength })}
        </p>
      )}
    </div>
  );
};
