// packages/components/src/autocomplete/index.tsx
import removeAccents from "remove-accents";
import { renderToString, useEffect, useState, useRef, useMemo } from "@wordpress/element";
import { useInstanceId, useMergeRefs, useRefEffect } from "@wordpress/compose";
import { create, slice, insert, isCollapsed, getTextContent } from "@wordpress/rich-text";
import { speak } from "@wordpress/a11y";
import { isAppleOS } from "@wordpress/keycodes";
import { getAutoCompleterUI } from "./autocompleter-ui.mjs";
import { escapeRegExp } from "../utils/strings.mjs";
import { withIgnoreIMEEvents } from "../utils/with-ignore-ime-events.mjs";
import getNodeText from "../utils/get-node-text.mjs";
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
var EMPTY_FILTERED_OPTIONS = [];
var AUTOCOMPLETE_HOOK_REFERENCE = {};
function useAutocomplete({
  record,
  onChange,
  onReplace,
  completers,
  contentRef
}) {
  const instanceId = useInstanceId(AUTOCOMPLETE_HOOK_REFERENCE);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [filteredOptions, setFilteredOptions] = useState(EMPTY_FILTERED_OPTIONS);
  const [filterValue, setFilterValue] = useState("");
  const [autocompleter, setAutocompleter] = useState(null);
  const [AutocompleterUI, setAutocompleterUI] = useState(null);
  const backspacingRef = useRef(false);
  function insertCompletion(replacement) {
    if (autocompleter === null) {
      return;
    }
    const end = record.start;
    const start = end - autocompleter.triggerPrefix.length - filterValue.length;
    const toInsert = create({
      html: renderToString(replacement)
    });
    onChange(insert(record, toInsert, start, end));
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
        if (isAppleOS()) {
          speak(getNodeText(filteredOptions[newIndex].label), "assertive");
        }
        break;
      }
      case "ArrowDown": {
        const newIndex = (selectedIndex + 1) % filteredOptions.length;
        setSelectedIndex(newIndex);
        if (isAppleOS()) {
          speak(getNodeText(filteredOptions[newIndex].label), "assertive");
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
  const textContent = useMemo(() => {
    if (isCollapsed(record)) {
      return getTextContent(slice(record, 0));
    }
    return "";
  }, [record]);
  useEffect(() => {
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
    const textAfterSelection = getTextContent(slice(record, void 0, getTextContent(record).length));
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
    const safeTrigger = escapeRegExp(completer.triggerPrefix);
    const text = removeAccents(textContent);
    const match = text.slice(text.lastIndexOf(completer.triggerPrefix)).match(new RegExp(`${safeTrigger}([\0-\uFFFF]*)$`));
    const query = match && match[1];
    setAutocompleter(completer);
    setAutocompleterUI(() => completer !== autocompleter ? getAutoCompleterUI(completer) : AutocompleterUI);
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
    onKeyDown: withIgnoreIMEEvents(handleKeyDown),
    popover: showPopover && /* @__PURE__ */ _jsx(AutocompleterUI, {
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
  const history = useRef(/* @__PURE__ */ new Set());
  history.current.add(value);
  if (history.current.size > 2) {
    history.current.delete(Array.from(history.current)[0]);
  }
  return Array.from(history.current)[0];
}
function useAutocompleteProps(options) {
  const ref = useRef(null);
  const onKeyDownRef = useRef(void 0);
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
  const mergedRefs = useMergeRefs([ref, useRefEffect((element) => {
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
  return /* @__PURE__ */ _jsxs(_Fragment, {
    children: [children(props), isSelected && popover]
  });
}
export {
  Autocomplete as default,
  useAutocomplete,
  useAutocompleteProps
};
//# sourceMappingURL=index.mjs.map
