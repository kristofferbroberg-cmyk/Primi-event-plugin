// packages/rich-text/src/hook/event-listeners/input-and-selection.js
import { getActiveFormats } from "../../get-active-formats.mjs";
import { isCollapsed } from "../../is-collapsed.mjs";
import { updateFormats } from "../../update-formats.mjs";
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
    const clearFormats = !isCollapsed(record.current) && currentValue.start <= start;
    const change = updateFormats({
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
    const newActiveFormats = getActiveFormats(
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
export {
  input_and_selection_default as default
};
//# sourceMappingURL=input-and-selection.mjs.map
