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

// packages/rich-text/src/hook/event-listeners/copy-handler.js
var copy_handler_exports = {};
__export(copy_handler_exports, {
  default: () => copy_handler_default
});
module.exports = __toCommonJS(copy_handler_exports);
var import_to_html_string = require("../../to-html-string.cjs");
var import_is_collapsed = require("../../is-collapsed.cjs");
var import_slice = require("../../slice.cjs");
var import_get_text_content = require("../../get-text-content.cjs");
var copy_handler_default = (props) => (element) => {
  function onCopy(event) {
    const { record } = props.current;
    const { ownerDocument } = element;
    if ((0, import_is_collapsed.isCollapsed)(record.current) || !element.contains(ownerDocument.activeElement)) {
      return;
    }
    const selectedRecord = (0, import_slice.slice)(record.current);
    const plainText = (0, import_get_text_content.getTextContent)(selectedRecord);
    const html = (0, import_to_html_string.toHTMLString)({ value: selectedRecord });
    event.clipboardData.setData("text/plain", plainText);
    event.clipboardData.setData("text/html", html);
    event.clipboardData.setData("rich-text", "true");
    event.preventDefault();
    if (event.type === "cut") {
      ownerDocument.execCommand("delete");
    }
  }
  const { defaultView } = element.ownerDocument;
  defaultView.addEventListener("copy", onCopy);
  defaultView.addEventListener("cut", onCopy);
  return () => {
    defaultView.removeEventListener("copy", onCopy);
    defaultView.removeEventListener("cut", onCopy);
  };
};
//# sourceMappingURL=copy-handler.cjs.map
