// packages/rich-text/src/hook/event-listeners/select-object.js
var select_object_default = () => (element) => {
  function onClick(event) {
    const { target } = event;
    if (target === element || target.textContent && target.isContentEditable) {
      return;
    }
    const { ownerDocument } = target;
    const { defaultView } = ownerDocument;
    const selection = defaultView.getSelection();
    if (selection.containsNode(target)) {
      return;
    }
    const range = ownerDocument.createRange();
    const nodeToSelect = target.isContentEditable ? target : target.closest("[contenteditable]");
    range.selectNode(nodeToSelect);
    selection.removeAllRanges();
    selection.addRange(range);
    event.preventDefault();
  }
  function onFocusIn(event) {
    if (event.relatedTarget && !element.contains(event.relatedTarget) && event.relatedTarget.tagName === "A") {
      onClick(event);
    }
  }
  element.addEventListener("click", onClick);
  element.addEventListener("focusin", onFocusIn);
  return () => {
    element.removeEventListener("click", onClick);
    element.removeEventListener("focusin", onFocusIn);
  };
};
export {
  select_object_default as default
};
//# sourceMappingURL=select-object.mjs.map
