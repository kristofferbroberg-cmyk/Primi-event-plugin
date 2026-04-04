// packages/dataviews/src/hooks/use-delayed-loading.ts
import { useEffect, useState } from "@wordpress/element";
function useDelayedLoading(isLoading, options = { delay: 400 }) {
  const [showLoader, setShowLoader] = useState(false);
  useEffect(() => {
    if (!isLoading) {
      return;
    }
    const timeout = setTimeout(() => {
      setShowLoader(true);
    }, options.delay);
    return () => {
      clearTimeout(timeout);
      setShowLoader(false);
    };
  }, [isLoading, options.delay]);
  return showLoader;
}
export {
  useDelayedLoading
};
//# sourceMappingURL=use-delayed-loading.mjs.map
