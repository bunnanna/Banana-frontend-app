import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

function usePathChangeDetection() {
  const location = useLocation();
  const [hasPathChanged, setHasPathChanged] = useState(false);

  useEffect(() => {
    let prevPathname = location.pathname;
    return () => {
      if (location.pathname !== prevPathname) {
        setHasPathChanged(true);
      }
      prevPathname = location.pathname;
    };
    // eslint-disable-next-line
  }, [location.pathname]);

  return hasPathChanged;
}

export default usePathChangeDetection