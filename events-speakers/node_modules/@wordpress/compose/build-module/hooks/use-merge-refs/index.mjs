// packages/compose/src/hooks/use-merge-refs/index.ts
import { useRef, useCallback, useLayoutEffect } from "@wordpress/element";
function assignRef(ref, value) {
  if (typeof ref === "function") {
    ref(value);
  } else if (ref && ref.hasOwnProperty("current")) {
    ref.current = value;
  }
}
function useMergeRefs(refs) {
  const element = useRef(null);
  const isAttachedRef = useRef(false);
  const didElementChangeRef = useRef(false);
  const previousRefsRef = useRef([]);
  const currentRefsRef = useRef(refs);
  currentRefsRef.current = refs;
  useLayoutEffect(() => {
    if (didElementChangeRef.current === false && isAttachedRef.current === true) {
      refs.forEach((ref, index) => {
        const previousRef = previousRefsRef.current[index];
        if (ref !== previousRef) {
          assignRef(previousRef, null);
          assignRef(ref, element.current);
        }
      });
    }
    previousRefsRef.current = refs;
  }, refs);
  useLayoutEffect(() => {
    didElementChangeRef.current = false;
  });
  return useCallback((value) => {
    assignRef(element, value);
    didElementChangeRef.current = true;
    isAttachedRef.current = value !== null;
    const refsToAssign = value ? currentRefsRef.current : previousRefsRef.current;
    for (const ref of refsToAssign) {
      assignRef(ref, value);
    }
  }, []);
}
export {
  useMergeRefs as default
};
//# sourceMappingURL=index.mjs.map
