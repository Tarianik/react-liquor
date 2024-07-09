import React, { useEffect } from 'react';
import { useLocalStorage } from '@uidotdev/usehooks';

export default function useWindowScrollPosition(
  localStorageKey: string,
  setCondition: boolean
): void {
  const [scrollYStorage, setScrollYStorage] = useLocalStorage(
    localStorageKey,
    0
  );
  useEffect(() => {
    if (setCondition) {
      window.scrollTo(0, scrollYStorage);
    }
  }, [setCondition, scrollYStorage]);

  useEffect(() => {
    return () => {
      if (window.scrollY > 0) setScrollYStorage(window.scrollY);
    };
  }, []);
}
