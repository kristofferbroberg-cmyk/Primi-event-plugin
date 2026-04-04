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

// packages/components/src/form-token-field/index.tsx
var form_token_field_exports = {};
__export(form_token_field_exports, {
  FormTokenField: () => FormTokenField,
  default: () => form_token_field_default
});
module.exports = __toCommonJS(form_token_field_exports);
var import_clsx = __toESM(require("clsx"));
var import_element = require("@wordpress/element");
var import_i18n = require("@wordpress/i18n");
var import_compose = require("@wordpress/compose");
var import_a11y = require("@wordpress/a11y");
var import_is_shallow_equal = require("@wordpress/is-shallow-equal");
var import_token = __toESM(require("./token.cjs"));
var import_token_input = __toESM(require("./token-input.cjs"));
var import_styles = require("./styles.cjs");
var import_suggestions_list = __toESM(require("./suggestions-list.cjs"));
var import_flex = require("../flex/index.cjs");
var import_base_control_styles = require("../base-control/styles/base-control-styles.cjs");
var import_use_deprecated_props = require("../utils/use-deprecated-props.cjs");
var import_with_ignore_ime_events = require("../utils/with-ignore-ime-events.cjs");
var import_deprecated_36px_size = require("../utils/deprecated-36px-size.cjs");
var import_jsx_runtime = require("react/jsx-runtime");
var identity = (value) => value;
function FormTokenField(props) {
  const {
    autoCapitalize,
    autoComplete,
    maxLength,
    placeholder,
    label = (0, import_i18n.__)("Add item"),
    className,
    suggestions = [],
    maxSuggestions = 100,
    value = [],
    displayTransform = identity,
    saveTransform = (token) => token.trim(),
    onChange = () => {
    },
    onInputChange = () => {
    },
    onFocus = void 0,
    isBorderless = false,
    disabled = false,
    tokenizeOnSpace = false,
    messages = {
      added: (0, import_i18n.__)("Item added."),
      removed: (0, import_i18n.__)("Item removed."),
      remove: (0, import_i18n.__)("Remove item"),
      __experimentalInvalid: (0, import_i18n.__)("Invalid item")
    },
    __experimentalRenderItem,
    __experimentalExpandOnFocus = false,
    __experimentalValidateInput = () => true,
    __experimentalShowHowTo = true,
    __next40pxDefaultSize = false,
    __experimentalAutoSelectFirstMatch = false,
    tokenizeOnBlur = false
  } = (0, import_use_deprecated_props.useDeprecated36pxDefaultSizeProp)(props);
  (0, import_deprecated_36px_size.maybeWarnDeprecated36pxSize)({
    componentName: "FormTokenField",
    size: void 0,
    __next40pxDefaultSize
  });
  const instanceId = (0, import_compose.useInstanceId)(FormTokenField);
  const [incompleteTokenValue, setIncompleteTokenValue] = (0, import_element.useState)("");
  const [inputOffsetFromEnd, setInputOffsetFromEnd] = (0, import_element.useState)(0);
  const [isActive, setIsActive] = (0, import_element.useState)(false);
  const [isExpanded, setIsExpanded] = (0, import_element.useState)(false);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = (0, import_element.useState)(-1);
  const [selectedSuggestionScroll, setSelectedSuggestionScroll] = (0, import_element.useState)(false);
  const prevSuggestions = (0, import_compose.usePrevious)(suggestions);
  const prevValue = (0, import_compose.usePrevious)(value);
  const input = (0, import_element.useRef)(null);
  const tokensAndInput = (0, import_element.useRef)(null);
  const debouncedSpeak = (0, import_compose.useDebounce)(import_a11y.speak, 500);
  (0, import_element.useEffect)(() => {
    if (isActive && !hasFocus()) {
      focus();
    }
  }, [isActive]);
  (0, import_element.useEffect)(() => {
    const suggestionsDidUpdate = !(0, import_is_shallow_equal.isShallowEqual)(suggestions, prevSuggestions || []);
    if (suggestionsDidUpdate || value !== prevValue) {
      updateSuggestions(suggestionsDidUpdate);
    }
  }, [suggestions, prevSuggestions, value, prevValue]);
  (0, import_element.useEffect)(() => {
    updateSuggestions();
  }, [incompleteTokenValue]);
  (0, import_element.useEffect)(() => {
    updateSuggestions();
  }, [__experimentalAutoSelectFirstMatch]);
  if (disabled && isActive) {
    setIsActive(false);
    setIncompleteTokenValue("");
  }
  function focus() {
    input.current?.focus();
  }
  function hasFocus() {
    return input.current === input.current?.ownerDocument.activeElement;
  }
  function onFocusHandler(event) {
    if (hasFocus() || event.target === tokensAndInput.current) {
      setIsActive(true);
      setIsExpanded(__experimentalExpandOnFocus || isExpanded);
    } else {
      setIsActive(false);
    }
    if ("function" === typeof onFocus) {
      onFocus(event);
    }
  }
  function onBlur(event) {
    if (inputHasValidValue() && __experimentalValidateInput(incompleteTokenValue)) {
      setIsActive(false);
      if (tokenizeOnBlur && inputHasValidValue()) {
        addNewToken(incompleteTokenValue);
      }
    } else {
      setIncompleteTokenValue("");
      setInputOffsetFromEnd(0);
      setIsActive(false);
      if (__experimentalExpandOnFocus) {
        const hasFocusWithin = event.relatedTarget === tokensAndInput.current;
        setIsExpanded(hasFocusWithin);
      } else {
        setIsExpanded(false);
      }
      setSelectedSuggestionIndex(-1);
      setSelectedSuggestionScroll(false);
    }
  }
  function onKeyDown(event) {
    let preventDefault = false;
    if (event.defaultPrevented) {
      return;
    }
    switch (event.key) {
      case "Backspace":
        preventDefault = handleDeleteKey(deleteTokenBeforeInput);
        break;
      case "Enter":
        preventDefault = addCurrentToken();
        break;
      case "ArrowLeft":
        preventDefault = handleLeftArrowKey();
        break;
      case "ArrowUp":
        preventDefault = handleUpArrowKey();
        break;
      case "ArrowRight":
        preventDefault = handleRightArrowKey();
        break;
      case "ArrowDown":
        preventDefault = handleDownArrowKey();
        break;
      case "Delete":
        preventDefault = handleDeleteKey(deleteTokenAfterInput);
        break;
      case "Space":
        if (tokenizeOnSpace) {
          preventDefault = addCurrentToken();
        }
        break;
      case "Escape":
        preventDefault = handleEscapeKey(event);
        break;
      case "Tab":
        preventDefault = handleTabKey(event);
        break;
      default:
        break;
    }
    if (preventDefault) {
      event.preventDefault();
    }
  }
  function onKeyPress(event) {
    let preventDefault = false;
    switch (event.key) {
      case ",":
        preventDefault = handleCommaKey();
        break;
      default:
        break;
    }
    if (preventDefault) {
      event.preventDefault();
    }
  }
  function onContainerTouched(event) {
    if (event.target === tokensAndInput.current && isActive) {
      event.preventDefault();
    }
  }
  function onTokenClickRemove(event) {
    deleteToken(event.value);
    focus();
  }
  function onSuggestionHovered(suggestion) {
    const index = getMatchingSuggestions().indexOf(suggestion);
    if (index >= 0) {
      setSelectedSuggestionIndex(index);
      setSelectedSuggestionScroll(false);
    }
  }
  function onSuggestionSelected(suggestion) {
    addNewToken(suggestion);
  }
  function onInputChangeHandler(event) {
    const text = event.value;
    const separator = tokenizeOnSpace ? /[ ,\t]+/ : /[,\t]+/;
    const items = text.split(separator);
    const tokenValue = items[items.length - 1] || "";
    if (items.length > 1) {
      addNewTokens(items.slice(0, -1));
    }
    setIncompleteTokenValue(tokenValue);
    onInputChange(tokenValue);
  }
  function handleDeleteKey(_deleteToken) {
    let preventDefault = false;
    if (hasFocus() && isInputEmpty()) {
      _deleteToken();
      preventDefault = true;
    }
    return preventDefault;
  }
  function handleLeftArrowKey() {
    let preventDefault = false;
    if (isInputEmpty()) {
      moveInputBeforePreviousToken();
      preventDefault = true;
    }
    return preventDefault;
  }
  function handleRightArrowKey() {
    let preventDefault = false;
    if (isInputEmpty()) {
      moveInputAfterNextToken();
      preventDefault = true;
    }
    return preventDefault;
  }
  function handleUpArrowKey() {
    setSelectedSuggestionIndex((index) => {
      return (index === 0 ? getMatchingSuggestions(incompleteTokenValue, suggestions, value, maxSuggestions, saveTransform).length : index) - 1;
    });
    setSelectedSuggestionScroll(true);
    return true;
  }
  function handleDownArrowKey() {
    setSelectedSuggestionIndex((index) => {
      return (index + 1) % getMatchingSuggestions(incompleteTokenValue, suggestions, value, maxSuggestions, saveTransform).length;
    });
    setSelectedSuggestionScroll(true);
    return true;
  }
  function collapseSuggestionsList(event) {
    if (event.target instanceof HTMLInputElement) {
      setIncompleteTokenValue(event.target.value);
      setIsExpanded(false);
      setSelectedSuggestionIndex(-1);
      setSelectedSuggestionScroll(false);
    }
  }
  function handleEscapeKey(event) {
    collapseSuggestionsList(event);
    return true;
  }
  function handleTabKey(event) {
    collapseSuggestionsList(event);
    return false;
  }
  function handleCommaKey() {
    if (inputHasValidValue()) {
      addNewToken(incompleteTokenValue);
    }
    return true;
  }
  function moveInputToIndex(index) {
    setInputOffsetFromEnd(value.length - Math.max(index, -1) - 1);
  }
  function moveInputBeforePreviousToken() {
    setInputOffsetFromEnd((prevInputOffsetFromEnd) => {
      return Math.min(prevInputOffsetFromEnd + 1, value.length);
    });
  }
  function moveInputAfterNextToken() {
    setInputOffsetFromEnd((prevInputOffsetFromEnd) => {
      return Math.max(prevInputOffsetFromEnd - 1, 0);
    });
  }
  function deleteTokenBeforeInput() {
    const index = getIndexOfInput() - 1;
    if (index > -1) {
      deleteToken(value[index]);
    }
  }
  function deleteTokenAfterInput() {
    const index = getIndexOfInput();
    if (index < value.length) {
      deleteToken(value[index]);
      moveInputToIndex(index);
    }
  }
  function addCurrentToken() {
    let preventDefault = false;
    const selectedSuggestion = getSelectedSuggestion();
    if (selectedSuggestion) {
      addNewToken(selectedSuggestion);
      preventDefault = true;
    } else if (inputHasValidValue()) {
      addNewToken(incompleteTokenValue);
      preventDefault = true;
    }
    return preventDefault;
  }
  function addNewTokens(tokens) {
    const tokensToAdd = [...new Set(tokens.map(saveTransform).filter(Boolean).filter((token) => !valueContainsToken(token)))];
    if (tokensToAdd.length > 0) {
      const newValue = [...value];
      newValue.splice(getIndexOfInput(), 0, ...tokensToAdd);
      onChange(newValue);
    }
  }
  function addNewToken(token) {
    if (!__experimentalValidateInput(token)) {
      (0, import_a11y.speak)(messages.__experimentalInvalid, "assertive");
      return;
    }
    addNewTokens([token]);
    (0, import_a11y.speak)(messages.added, "assertive");
    setIncompleteTokenValue("");
    setSelectedSuggestionIndex(-1);
    setSelectedSuggestionScroll(false);
    setIsExpanded(!__experimentalExpandOnFocus);
    if (isActive && !tokenizeOnBlur) {
      focus();
    }
  }
  function deleteToken(token) {
    const newTokens = value.filter((item) => {
      return getTokenValue(item) !== getTokenValue(token);
    });
    onChange(newTokens);
    (0, import_a11y.speak)(messages.removed, "assertive");
  }
  function getTokenValue(token) {
    if ("object" === typeof token) {
      return token.value;
    }
    return token;
  }
  function getMatchingSuggestions(searchValue = incompleteTokenValue, _suggestions = suggestions, _value = value, _maxSuggestions = maxSuggestions, _saveTransform = saveTransform) {
    let match = _saveTransform(searchValue);
    const startsWithMatch = [];
    const containsMatch = [];
    const normalizedValue = _value.map((item) => {
      if (typeof item === "string") {
        return item;
      }
      return item.value;
    });
    if (match.length === 0) {
      _suggestions = _suggestions.filter((suggestion) => !normalizedValue.includes(suggestion));
    } else {
      match = match.normalize("NFKC").toLocaleLowerCase();
      _suggestions.forEach((suggestion) => {
        const index = suggestion.normalize("NFKC").toLocaleLowerCase().indexOf(match);
        if (normalizedValue.indexOf(suggestion) === -1) {
          if (index === 0) {
            startsWithMatch.push(suggestion);
          } else if (index > 0) {
            containsMatch.push(suggestion);
          }
        }
      });
      _suggestions = startsWithMatch.concat(containsMatch);
    }
    return _suggestions.slice(0, _maxSuggestions);
  }
  function getSelectedSuggestion() {
    if (selectedSuggestionIndex !== -1) {
      return getMatchingSuggestions()[selectedSuggestionIndex];
    }
    return void 0;
  }
  function valueContainsToken(token) {
    return value.some((item) => {
      return getTokenValue(token) === getTokenValue(item);
    });
  }
  function getIndexOfInput() {
    return value.length - inputOffsetFromEnd;
  }
  function isInputEmpty() {
    return incompleteTokenValue.length === 0;
  }
  function inputHasValidValue() {
    return saveTransform(incompleteTokenValue).length > 0;
  }
  function updateSuggestions(resetSelectedSuggestion = true) {
    const inputHasMinimumChars = incompleteTokenValue.trim().length > 1;
    const matchingSuggestions2 = getMatchingSuggestions(incompleteTokenValue);
    const hasMatchingSuggestions = matchingSuggestions2.length > 0;
    const shouldExpandIfFocuses = hasFocus() && __experimentalExpandOnFocus;
    setIsExpanded(shouldExpandIfFocuses || inputHasMinimumChars && hasMatchingSuggestions);
    if (resetSelectedSuggestion) {
      if (__experimentalAutoSelectFirstMatch && inputHasMinimumChars && hasMatchingSuggestions) {
        setSelectedSuggestionIndex(0);
        setSelectedSuggestionScroll(true);
      } else {
        setSelectedSuggestionIndex(-1);
        setSelectedSuggestionScroll(false);
      }
    }
    if (inputHasMinimumChars) {
      const message = hasMatchingSuggestions ? (0, import_i18n.sprintf)(
        /* translators: %d: number of results. */
        (0, import_i18n._n)("%d result found, use up and down arrow keys to navigate.", "%d results found, use up and down arrow keys to navigate.", matchingSuggestions2.length),
        matchingSuggestions2.length
      ) : (0, import_i18n.__)("No results.");
      debouncedSpeak(message, "assertive");
    }
  }
  function renderTokensAndInput() {
    const components = value.map(renderToken);
    components.splice(getIndexOfInput(), 0, renderInput());
    return components;
  }
  function renderToken(token, index, tokens) {
    const _value = getTokenValue(token);
    const status = typeof token !== "string" ? token.status : void 0;
    const termPosition = index + 1;
    const termsCount = tokens.length;
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_flex.FlexItem, {
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_token.default, {
        value: _value,
        status,
        title: typeof token !== "string" ? token.title : void 0,
        displayTransform,
        onClickRemove: onTokenClickRemove,
        isBorderless: typeof token !== "string" && token.isBorderless || isBorderless,
        onMouseEnter: typeof token !== "string" ? token.onMouseEnter : void 0,
        onMouseLeave: typeof token !== "string" ? token.onMouseLeave : void 0,
        disabled: "error" !== status && disabled,
        messages,
        termsCount,
        termPosition
      })
    }, "token-" + _value);
  }
  function renderInput() {
    const inputProps = {
      instanceId,
      autoCapitalize,
      autoComplete,
      placeholder: value.length === 0 ? placeholder : "",
      disabled,
      value: incompleteTokenValue,
      onBlur,
      isExpanded,
      selectedSuggestionIndex
    };
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_token_input.default, {
      ...inputProps,
      onChange: !(maxLength && value.length >= maxLength) ? onInputChangeHandler : void 0,
      ref: input
    }, "input");
  }
  const classes = (0, import_clsx.default)(className, "components-form-token-field__input-container", {
    "is-active": isActive,
    "is-disabled": disabled
  });
  let tokenFieldProps = {
    className: "components-form-token-field",
    tabIndex: -1
  };
  const matchingSuggestions = getMatchingSuggestions();
  if (!disabled) {
    tokenFieldProps = Object.assign({}, tokenFieldProps, {
      onKeyDown: (0, import_with_ignore_ime_events.withIgnoreIMEEvents)(onKeyDown),
      onKeyPress,
      onFocus: onFocusHandler
    });
  }
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
    ...tokenFieldProps,
    children: [label && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_base_control_styles.StyledLabel, {
      htmlFor: `components-form-token-input-${instanceId}`,
      className: "components-form-token-field__label",
      children: label
    }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
      ref: tokensAndInput,
      className: classes,
      tabIndex: -1,
      onMouseDown: onContainerTouched,
      onTouchStart: onContainerTouched,
      children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_styles.TokensAndInputWrapperFlex, {
        justify: "flex-start",
        align: "center",
        gap: 1,
        wrap: true,
        __next40pxDefaultSize,
        hasTokens: !!value.length,
        children: renderTokensAndInput()
      }), isExpanded && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_suggestions_list.default, {
        instanceId,
        match: saveTransform(incompleteTokenValue),
        displayTransform,
        suggestions: matchingSuggestions,
        selectedIndex: selectedSuggestionIndex,
        scrollIntoView: selectedSuggestionScroll,
        onHover: onSuggestionHovered,
        onSelect: onSuggestionSelected,
        __experimentalRenderItem
      })]
    }), __experimentalShowHowTo && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_base_control_styles.StyledHelp, {
      id: `components-form-token-suggestions-howto-${instanceId}`,
      className: "components-form-token-field__help",
      children: tokenizeOnSpace ? (0, import_i18n.__)("Separate with commas, spaces, or the Enter key.") : (0, import_i18n.__)("Separate with commas or the Enter key.")
    })]
  });
}
var form_token_field_default = FormTokenField;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  FormTokenField
});
//# sourceMappingURL=index.cjs.map
