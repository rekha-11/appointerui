import { RefObject, useEffect } from 'react';

type Handler = (event: Event) => void;

export const useClickOutside = (ref: RefObject<HTMLElement>, handler?: Handler) => {
  useEffect(() => {
    const handleOutsideClick = (event: Event) => {
      if (!ref?.current?.contains(event.target as Node)) {
        handler?.(event);
      }
    };

    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  });
};

export const useLol = () => {};
