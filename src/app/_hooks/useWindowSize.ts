import { useEffect, useState } from 'react';

export type StandardWindowSize = 'lg' | 'md' | 'sm';

export const useWindowSize = (): StandardWindowSize | undefined => {
  const [standardSize, setStandardSize] = useState<
    StandardWindowSize | undefined
  >();

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 768) {
        setStandardSize('sm');
      } else if (window.innerWidth < 1024) {
        setStandardSize('md');
      } else {
        setStandardSize('lg');
      }
    }
    window.addEventListener('resize', handleResize);

    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return standardSize;
};
