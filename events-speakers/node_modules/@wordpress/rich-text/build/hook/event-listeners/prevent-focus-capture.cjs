"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// packages/rich-text/src/hook/event-listeners/prevent-focus-capture.js
var prevent_focus_capture_exports = {};
__export(prevent_focus_capture_exports, {
  preventFocusCapture: () => preventFocusCapture
});
module.exports = __toCommonJS(prevent_focus_capture_exports);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  preventFocusCapture
});
//# sourceMappingURL=prevent-focus-capture.cjs.map
