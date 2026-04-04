// packages/rich-text/src/hook/event-listeners/selection-change-compat.js
import { isRangeEqual } from "../../is-range-equal.mjs";
var selection_change_compat_default = () => (element) => {
  const { ownerDocument } = element;
  const { defaultView } = ownerDocument;
  const selection = defaultView?.getSelection();
  let range;
  function getRange() {
    return selection.rangeCount ? selection.getRangeAt(0) : null;
  }
  function onDown(event) {
    const type = event.type === "keydown" ? "keyup" : "pointerup";
    function onCancel() {
      ownerDocument.removeEventListener(type, onUp);
      ownerDocument.removeEventListener("selectionchange", onCancel);
      ownerDocument.removeEventListener("input", onCancel);
    }
    function onUp() {
      onCancel();
      if (isRangeEqual(range, getRange())) {
        return;
      }
      ownerDocument.dispatchEvent(new Event("selectionchange"));
    }
    ownerDocument.addEventListener(type, onUp);
    ownerDocument.addEventListener("selectionchange", onCancel);
    ownerDocument.addEventListener("input", onCancel);
    range = getRange();
  }
  element.addEventListener("pointerdown", onDown);
  element.addEventListener("keydown", onDown);
  return () => {
    element.removeEventListener("pointerdown", onDown);
    element.removeEventListener("keydown", onDown);
  };
};
export {
  selection_change_compat_default as default
};
//# sourceMappingURL=selection-change-compat.mjs.map
