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

// packages/rich-text/src/hook/event-listeners/input-and-selection.js
var input_and_selection_exports = {};
__export(input_and_selection_exports, {
  default: () => input_and_selection_default
});
module.exports = __toCommonJS(input_and_selection_exports);
var import_get_active_formats = require("../../get-active-formats.cjs");
var import_is_collapsed = require("../../is-collapsed.cjs");
var import_update_formats = require("../../update-formats.cjs");
var INSERTION_INPUT_TYPES_TO_IGNORE = /* @__PURE__ */ new Set([
  "insertParagraph",
  "insertOrderedList",
  "insertUnorderedList",
  "insertHorizontalRule",
  "insertLink"
]);
var EMPTY_ACTIVE_FORMATS = [];
var PLACEHOLDER_ATTR_NAME = "data-rich-text-placeholder";
function fixPlaceholderSelection(defaultView) {
  const selection = defaultView.getSelection();
  const { anchorNode, anchorOffset } = selection;
  if (anchorNode.nodeType !== anchorNode.ELEMENT_NODE) {
    return;
  }
  const targetNode = anchorNode.childNodes[anchorOffset];
  if (!targetNode || targetNode.nodeType !== targetNode.ELEMENT_NODE || !targetNode.hasAttribute(PLACEHOLDER_ATTR_NAME)) {
    return;
  }
  selection.collapseToStart();
}
var input_and_selection_default = (props) => (element) => {
  const { ownerDocument } = element;
  const { defaultView } = ownerDocument;
  let isComposing = false;
  function onInput(event) {
    if (isComposing) {
      return;
    }
    let inputType;
    if (event) {
      inputType = event.inputType;
    }
    const { record, applyRecord, createRecord, handleChange } = props.current;
    if (inputType && (inputType.indexOf("format") === 0 || INSERTION_INPUT_TYPES_TO_IGNORE.has(inputType))) {
      applyRecord(record.current);
      return;
    }
    const currentValue = createRecord();
    const { start, activeFormats: oldActiveFormats = [] } = record.current;
    const clearFormats = !(0, import_is_collapsed.isCollapsed)(record.current) && currentValue.start <= start;
    const change = (0, import_update_formats.updateFormats)({
      value: currentValue,
      start,
      end: currentValue.start,
      formats: clearFormats ? [] : oldActiveFormats
    });
    handleChange(change);
  }
  function handleSelectionChange() {
    const { record, applyRecord, createRecord, onSelectionChange } = props.current;
    if (element.contentEditable !== "true") {
      return;
    }
    if (ownerDocument.activeElement !== element) {
      ownerDocument.removeEventListener(
        "selectionchange",
        handleSelectionChange
      );
      return;
    }
    if (isComposing) {
      return;
    }
    const { start, end, text } = createRecord();
    const oldRecord = record.current;
    if (text !== oldRecord.text) {
      onInput();
      return;
    }
    if (start === oldRecord.start && end === oldRecord.end) {
      if (oldRecord.text.length === 0 && start === 0) {
        fixPlaceholderSelection(defaultView);
      }
      return;
    }
    const newValue = {
      ...oldRecord,
      start,
      end,
      // _newActiveFormats may be set on arrow key navigation to control
      // the right boundary position. If undefined, getActiveFormats will
      // give the active formats according to the browser.
      activeFormats: oldRecord._newActiveFormats,
      _newActiveFormats: void 0
    };
    const newActiveFormats = (0, import_get_active_formats.getActiveFormats)(
      newValue,
      EMPTY_ACTIVE_FORMATS
    );
    newValue.activeFormats = newActiveFormats;
    record.current = newValue;
    applyRecord(newValue, { domOnly: true });
    onSelectionChange(start, end);
  }
  function onCompositionStart() {
    isComposing = true;
    ownerDocument.removeEventListener(
      "selectionchange",
      handleSelectionChange
    );
    element.querySelector(`[${PLACEHOLDER_ATTR_NAME}]`)?.remove();
  }
  function onCompositionEnd() {
    isComposing = false;
    onInput({ inputType: "insertText" });
    ownerDocument.addEventListener(
      "selectionchange",
      handleSelectionChange
    );
  }
  function onFocus() {
    const { record, isSelected, onSelectionChange, applyRecord } = props.current;
    if (element.parentElement.closest('[contenteditable="true"]')) {
      return;
    }
    if (!isSelected) {
      const index = void 0;
      record.current = {
        ...record.current,
        start: index,
        end: index,
        activeFormats: EMPTY_ACTIVE_FORMATS
      };
    } else {
      applyRecord(record.current, { domOnly: true });
    }
    onSelectionChange(record.current.start, record.current.end);
    window.queueMicrotask(handleSelectionChange);
    ownerDocument.addEventListener(
      "selectionchange",
      handleSelectionChange
    );
  }
  element.addEventListener("input", onInput);
  element.addEventListener("compositionstart", onCompositionStart);
  element.addEventListener("compositionend", onCompositionEnd);
  element.addEventListener("focus", onFocus);
  return () => {
    element.removeEventListener("input", onInput);
    element.removeEventListener("compositionstart", onCompositionStart);
    element.removeEventListener("compositionend", onCompositionEnd);
    element.removeEventListener("focus", onFocus);
  };
};
//# sourceMappingURL=input-and-selection.cjs.map
