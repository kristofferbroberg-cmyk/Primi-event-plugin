// packages/rich-text/src/hook/event-listeners/prevent-focus-capture.js
function preventFocusCapture() {
  return (element) => {
    const { ownerDocument } = element;
    const { defaultView } = ownerDocument;
    let value = null;
    function onPointerDown(event) {
      if (event.defaultPrevented) {
        return;
      }
      if (event.target === element) {
        return;
      }
      if (!event.target.contains(element)) {
        return;
      }
      value = element.getAttribute("contenteditable");
      element.setAttribute("contenteditable", "false");
      defaultView.getSelection().removeAllRanges();
    }
    function onPointerUp() {
      if (value !== null) {
        element.setAttribute("contenteditable", value);
        value = null;
      }
    }
    defaultView.addEventListener("pointerdown", onPointerDown);
    defaultView.addEventListener("pointerup", onPointerUp);
    return () => {
      defaultView.removeEventListener("pointerdown", onPointerDown);
      defaultView.removeEventListener("pointerup", onPointerUp);
    };
  };
}
export {
  preventFocusCapture
};
//# sourceMappingURL=prevent-focus-capture.mjs.map
