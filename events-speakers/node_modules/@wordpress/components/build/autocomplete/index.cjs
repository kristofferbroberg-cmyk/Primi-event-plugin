"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// packages/components/src/autocomplete/index.tsx
var autocomplete_exports = {};
__export(autocomplete_exports, {
  default: () => Autocomplete,
  useAutocomplete: () => useAutocomplete,
  useAutocompleteProps: () => useAutocompleteProps
});
module.exports = __toCommonJS(autocomplete_exports);
var import_remove_accents = __toESM(require("remove-accents"));
var import_element = require("@wordpress/element");
var import_compose = require("@wordpress/compose");
var import_rich_text = require("@wordpress/rich-text");
var import_a11y = require("@wordpress/a11y");
var import_keycodes = require("@wordpress/keycodes");
var import_autocompleter_ui = require("./autocompleter-ui.cjs");
var import_strings = require("../utils/strings.cjs");
var import_with_ignore_ime_events = require("../utils/with-ignore-ime-events.cjs");
var import_get_node_text = __toESM(require("../utils/get-node-text.cjs"));
var import_jsx_runtime = require("react/jsx-runtime");
var EMPTY_FILTERED_OPTIONS = [];
var AUTOCOMPLETE_HOOK_REFERENCE = {};
function useAutocomplete({
  record,
  onChange,
  onReplace,
  completers,
  contentRef
}) {
  const instanceId = (0, import_compose.useInstanceId)(AUTOCOMPLETE_HOOK_REFERENCE);
  const [selectedIndex, setSelectedIndex] = (0, import_element.useState)(0);
  const [filteredOptions, setFilteredOptions] = (0, import_element.useState)(EMPTY_FILTERED_OPTIONS);
  const [filterValue, setFilterValue] = (0, import_element.useState)("");
  const [autocompleter, setAutocompleter] = (0, import_element.useState)(null);
  const [AutocompleterUI, setAutocompleterUI] = (0, import_element.useState)(null);
  const backspacingRef = (0, import_element.useRef)(false);
  function insertCompletion(replacement) {
    if (autocompleter === null) {
      return;
    }
    const end = record.start;
    const start = end - autocompleter.triggerPrefix.length - filterValue.length;
    const toInsert = (0, import_rich_text.create)({
      html: (0, import_element.renderToString)(replacement)
    });
    onChange((0, import_rich_text.insert)(record, toInsert, start, end));
  }
  function select(option) {
    const {
      getOptionCompletion
    } = autocompleter || {};
    if (option.isDisabled) {
      return;
    }
    if (getOptionCompletion) {
      const completion = getOptionCompletion(option.value, filterValue);
      const isCompletionObject = (obj) => {
        return obj !== null && typeof obj === "object" && "action" in obj && obj.action !== void 0 && "value" in obj && obj.value !== void 0;
      };
      const completionObject = isCompletionObject(completion) ? completion : {
        action: "insert-at-caret",
        value: completion
      };
      if ("replace" === completionObject.action) {
        onReplace([completionObject.value]);
        return;
      } else if ("insert-at-caret" === completionObject.action) {
        insertCompletion(completionObject.value);
      }
    }
    reset();
    contentRef.current?.focus();
  }
  function reset() {
    setSelectedIndex(0);
    setFilteredOptions(EMPTY_FILTERED_OPTIONS);
    setFilterValue("");
    setAutocompleter(null);
    setAutocompleterUI(null);
  }
  function onChangeOptions(options) {
    setSelectedIndex(options.length === filteredOptions.length ? selectedIndex : 0);
    setFilteredOptions(options);
  }
  function handleKeyDown(event) {
    backspacingRef.current = event.key === "Backspace";
    if (!autocompleter) {
      return;
    }
    if (filteredOptions.length === 0) {
      return;
    }
    if (event.defaultPrevented) {
      return;
    }
    switch (event.key) {
      case "ArrowUp": {
        const newIndex = (selectedIndex === 0 ? filteredOptions.length : selectedIndex) - 1;
        setSelectedIndex(newIndex);
        if ((0, import_keycodes.isAppleOS)()) {
          (0, import_a11y.speak)((0, import_get_node_text.default)(filteredOptions[newIndex].label), "assertive");
        }
        break;
      }
      case "ArrowDown": {
        const newIndex = (selectedIndex + 1) % filteredOptions.length;
        setSelectedIndex(newIndex);
        if ((0, import_keycodes.isAppleOS)()) {
          (0, import_a11y.speak)((0, import_get_node_text.default)(filteredOptions[newIndex].label), "assertive");
        }
        break;
      }
      case "Escape":
        setAutocompleter(null);
        setAutocompleterUI(null);
        event.preventDefault();
        break;
      case "Enter":
        select(filteredOptions[selectedIndex]);
        break;
      case "ArrowLeft":
      case "ArrowRight":
        reset();
        return;
      default:
        return;
    }
    event.preventDefault();
  }
  const textContent = (0, import_element.useMemo)(() => {
    if ((0, import_rich_text.isCollapsed)(record)) {
      return (0, import_rich_text.getTextContent)((0, import_rich_text.slice)(record, 0));
    }
    return "";
  }, [record]);
  (0, import_element.useEffect)(() => {
    if (!textContent) {
      if (autocompleter) {
        reset();
      }
      return;
    }
    const completer = completers.reduce((lastTrigger, currentCompleter) => {
      const triggerIndex2 = textContent.lastIndexOf(currentCompleter.triggerPrefix);
      const lastTriggerIndex = lastTrigger !== null ? textContent.lastIndexOf(lastTrigger.triggerPrefix) : -1;
      return triggerIndex2 > lastTriggerIndex ? currentCompleter : lastTrigger;
    }, null);
    if (!completer) {
      if (autocompleter) {
        reset();
      }
      return;
    }
    const {
      allowContext,
      triggerPrefix
    } = completer;
    const triggerIndex = textContent.lastIndexOf(triggerPrefix);
    const textWithoutTrigger = textContent.slice(triggerIndex + triggerPrefix.length);
    const tooDistantFromTrigger = textWithoutTrigger.length > 50;
    if (tooDistantFromTrigger) {
      return;
    }
    const mismatch = filteredOptions.length === 0;
    const wordsFromTrigger = textWithoutTrigger.split(/\s/);
    const hasOneTriggerWord = wordsFromTrigger.length === 1;
    const matchingWhileBackspacing = backspacingRef.current && wordsFromTrigger.length <= 3;
    if (mismatch && !(matchingWhileBackspacing || hasOneTriggerWord)) {
      if (autocompleter) {
        reset();
      }
      return;
    }
    const textAfterSelection = (0, import_rich_text.getTextContent)((0, import_rich_text.slice)(record, void 0, (0, import_rich_text.getTextContent)(record).length));
    if (allowContext && !allowContext(textContent.slice(0, triggerIndex), textAfterSelection)) {
      if (autocompleter) {
        reset();
      }
      return;
    }
    if (/^\s/.test(textWithoutTrigger) || /\s\s+$/.test(textWithoutTrigger)) {
      if (autocompleter) {
        reset();
      }
      return;
    }
    if (!/[\u0000-\uFFFF]*$/.test(textWithoutTrigger)) {
      if (autocompleter) {
        reset();
      }
      return;
    }
    const safeTrigger = (0, import_strings.escapeRegExp)(completer.triggerPrefix);
    const text = (0, import_remove_accents.default)(textContent);
    const match = text.slice(text.lastIndexOf(completer.triggerPrefix)).match(new RegExp(`${safeTrigger}([\0-\uFFFF]*)$`));
    const query = match && match[1];
    setAutocompleter(completer);
    setAutocompleterUI(() => completer !== autocompleter ? (0, import_autocompleter_ui.getAutoCompleterUI)(completer) : AutocompleterUI);
    setFilterValue(query === null ? "" : query);
  }, [textContent]);
  const {
    key: selectedKey = ""
  } = filteredOptions[selectedIndex] || {};
  const {
    className
  } = autocompleter || {};
  const isExpanded = !!autocompleter && filteredOptions.length > 0;
  const listBoxId = isExpanded ? `components-autocomplete-listbox-${instanceId}` : void 0;
  const activeId = isExpanded ? `components-autocomplete-item-${instanceId}-${selectedKey}` : null;
  const hasSelection = record.start !== void 0;
  const showPopover = !!textContent && hasSelection && !!AutocompleterUI;
  return {
    listBoxId,
    activeId,
    onKeyDown: (0, import_with_ignore_ime_events.withIgnoreIMEEvents)(handleKeyDown),
    popover: showPopover && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AutocompleterUI, {
      className,
      filterValue,
      instanceId,
      listBoxId,
      selectedIndex,
      onChangeOptions,
      onSelect: select,
      value: record,
      contentRef,
      reset
    })
  };
}
function useLastDifferentValue(value) {
  const history = (0, import_element.useRef)(/* @__PURE__ */ new Set());
  history.current.add(value);
  if (history.current.size > 2) {
    history.current.delete(Array.from(history.current)[0]);
  }
  return Array.from(history.current)[0];
}
function useAutocompleteProps(options) {
  const ref = (0, import_element.useRef)(null);
  const onKeyDownRef = (0, import_element.useRef)(void 0);
  const {
    record
  } = options;
  const previousRecord = useLastDifferentValue(record);
  const {
    popover,
    listBoxId,
    activeId,
    onKeyDown
  } = useAutocomplete({
    ...options,
    contentRef: ref
  });
  onKeyDownRef.current = onKeyDown;
  const mergedRefs = (0, import_compose.useMergeRefs)([ref, (0, import_compose.useRefEffect)((element) => {
    function _onKeyDown(event) {
      onKeyDownRef.current?.(event);
    }
    element.addEventListener("keydown", _onKeyDown);
    return () => {
      element.removeEventListener("keydown", _onKeyDown);
    };
  }, [])]);
  const didUserInput = record.text !== previousRecord?.text;
  if (!didUserInput) {
    return {
      ref: mergedRefs
    };
  }
  return {
    ref: mergedRefs,
    children: popover,
    "aria-autocomplete": listBoxId ? "list" : void 0,
    "aria-owns": listBoxId,
    "aria-activedescendant": activeId
  };
}
function Autocomplete({
  children,
  isSelected,
  ...options
}) {
  const {
    popover,
    ...props
  } = useAutocomplete(options);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, {
    children: [children(props), isSelected && popover]
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  useAutocomplete,
  useAutocompleteProps
});
//# sourceMappingURL=index.cjs.map
