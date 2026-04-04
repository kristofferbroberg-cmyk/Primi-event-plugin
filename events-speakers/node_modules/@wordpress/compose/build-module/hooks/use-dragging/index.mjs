// packages/compose/src/hooks/use-dragging/index.js
import { useCallback, useEffect, useRef, useState } from "@wordpress/element";
import useIsomorphicLayoutEffect from "../use-isomorphic-layout-effect/index.mjs";
function useDragging({ onDragStart, onDragMove, onDragEnd }) {
  const [isDragging, setIsDragging] = useState(false);
  const eventsRef = useRef({
    onDragStart,
    onDragMove,
    onDragEnd
  });
  useIsomorphicLayoutEffect(() => {
    eventsRef.current.onDragStart = onDragStart;
    eventsRef.current.onDragMove = onDragMove;
    eventsRef.current.onDragEnd = onDragEnd;
  }, [onDragStart, onDragMove, onDragEnd]);
  const onMouseMove = useCallback(
    (event) => eventsRef.current.onDragMove && eventsRef.current.onDragMove(event),
    []
  );
  const endDrag = useCallback((event) => {
    if (eventsRef.current.onDragEnd) {
      eventsRef.current.onDragEnd(event);
    }
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", endDrag);
    setIsDragging(false);
  }, []);
  const startDrag = useCallback((event) => {
    if (eventsRef.current.onDragStart) {
      eventsRef.current.onDragStart(event);
    }
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", endDrag);
    setIsDragging(true);
  }, []);
  useEffect(() => {
    return () => {
      if (isDragging) {
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", endDrag);
      }
    };
  }, [isDragging]);
  return {
    startDrag,
    endDrag,
    isDragging
  };
}
export {
  useDragging as default
};
//# sourceMappingURL=index.mjs.map
