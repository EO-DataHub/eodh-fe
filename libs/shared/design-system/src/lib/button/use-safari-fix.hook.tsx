import { useEffect, useMemo, useState } from 'react';

interface IUseSafariFixProps {
  buttonRef: {
    current: HTMLButtonElement | null;
  };
}
export const useSafariFix = ({ buttonRef }: IUseSafariFixProps) => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: { target: unknown }) => {
      if (buttonRef.current && !buttonRef.current.contains(event.target as Node)) {
        setIsActive(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [buttonRef]);

  return useMemo(() => ({ isActive, setIsActive }), [isActive, setIsActive]);
};
