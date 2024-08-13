import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

import textareaStyles from './textarea.styles';

interface ITextareaProps {
  placeholder: string;
  rows?: number;
  maxLength?: number;
  error?: string;
}

export const Textarea = ({ placeholder, rows = 4, maxLength, error }: ITextareaProps) => {
  const [text, setText] = useState('');
  const { t } = useTranslation();

  const handleChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  }, []);

  return (
    <div>
      {error && <span className={textareaStyles.error}>{error}</span>}
      <div className={textareaStyles.container}>
        <textarea
          className={textareaStyles.textarea(error)}
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
    </div>
  );
};
