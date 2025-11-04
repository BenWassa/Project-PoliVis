import { useEffect } from 'react';

/**
 * Locks the document body's scroll when `shouldLock` is true and restores the previous
 * overflow value when the component unmounts or `shouldLock` becomes false.
 */
export const useBodyScrollLock = (shouldLock: boolean) => {
  useEffect(() => {
    if (typeof document === 'undefined') {
      return undefined;
    }

    const originalOverflow = document.body.style.overflow;

    if (shouldLock) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = originalOverflow || 'auto';
    }

    return () => {
      document.body.style.overflow = originalOverflow || 'auto';
    };
  }, [shouldLock]);
};

export default useBodyScrollLock;
