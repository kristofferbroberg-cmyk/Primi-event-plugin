// packages/compose/src/hooks/use-focus-return/index.js
import { useRef, useEffect, useCallback } from "@wordpress/element";
var origin = null;
function useFocusReturn(onFocusReturn) {
  const ref = useRef(null);
  const focusedBeforeMount = useRef(null);
  const onFocusReturnRef = useRef(onFocusReturn);
  useEffect(() => {
    onFocusReturnRef.current = onFocusReturn;
  }, [onFocusReturn]);
  return useCallback((node) => {
    if (node) {
      ref.current = node;
      if (focusedBeforeMount.current) {
        return;
      }
      const activeDocument = node.ownerDocument.activeElement instanceof window.HTMLIFrameElement ? node.ownerDocument.activeElement.contentDocument : node.ownerDocument;
      focusedBeforeMount.current = activeDocument?.activeElement ?? null;
    } else if (focusedBeforeMount.current) {
      const isFocused = ref.current?.contains(
        ref.current?.ownerDocument.activeElement
      );
      if (ref.current?.isConnected && !isFocused) {
        origin ??= focusedBeforeMount.current;
        return;
      }
      if (onFocusReturnRef.current) {
        onFocusReturnRef.current();
      } else {
        (!focusedBeforeMount.current.isConnected ? origin : focusedBeforeMount.current)?.focus();
      }
      origin = null;
    }
  }, []);
}
var use_focus_return_default = useFocusReturn;
export {
  use_focus_return_default as default
};
//# sourceMappingURL=index.mjs.map
