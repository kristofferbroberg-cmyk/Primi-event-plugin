// packages/dataviews/src/hooks/use-elements.ts
import { useEffect, useState } from "@wordpress/element";
var EMPTY_ARRAY = [];
function useElements({
  elements,
  getElements
}) {
  const staticElements = Array.isArray(elements) && elements.length > 0 ? elements : EMPTY_ARRAY;
  const [records, setRecords] = useState(staticElements);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (!getElements) {
      setRecords(staticElements);
      return;
    }
    let cancelled = false;
    setIsLoading(true);
    getElements().then((fetchedElements) => {
      if (!cancelled) {
        const dynamicElements = Array.isArray(fetchedElements) && fetchedElements.length > 0 ? fetchedElements : staticElements;
        setRecords(dynamicElements);
      }
    }).catch(() => {
      if (!cancelled) {
        setRecords(staticElements);
      }
    }).finally(() => {
      if (!cancelled) {
        setIsLoading(false);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [getElements, staticElements]);
  return {
    elements: records,
    isLoading
  };
}
export {
  useElements as default
};
//# sourceMappingURL=use-elements.mjs.map
