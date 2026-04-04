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

// packages/components/src/search-control/index.tsx
var search_control_exports = {};
__export(search_control_exports, {
  SearchControl: () => SearchControl,
  default: () => search_control_default
});
module.exports = __toCommonJS(search_control_exports);
var import_clsx = __toESM(require("clsx"));
var import_compose = require("@wordpress/compose");
var import_i18n = require("@wordpress/i18n");
var import_icons = require("@wordpress/icons");
var import_element = require("@wordpress/element");
var import_deprecated = __toESM(require("@wordpress/deprecated"));
var import_button = __toESM(require("../button/index.cjs"));
var import_input_prefix_wrapper = require("../input-control/input-prefix-wrapper.cjs");
var import_input_suffix_wrapper = require("../input-control/input-suffix-wrapper.cjs");
var import_styles = require("./styles.cjs");
var import_jsx_runtime = require("react/jsx-runtime");
function SuffixItem({
  searchRef,
  value,
  onChange,
  onClose
}) {
  if (!onClose && !value) {
    return null;
  }
  if (onClose) {
    (0, import_deprecated.default)("`onClose` prop in wp.components.SearchControl", {
      since: "6.8"
    });
  }
  const onReset = () => {
    onChange("");
    searchRef.current?.focus();
  };
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_input_suffix_wrapper.InputControlSuffixWrapper, {
    variant: "control",
    children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_button.default, {
      size: "small",
      icon: import_icons.closeSmall,
      label: onClose ? (0, import_i18n.__)("Close search") : (0, import_i18n.__)("Reset search"),
      onClick: onClose ?? onReset
    })
  });
}
function UnforwardedSearchControl({
  __nextHasNoMarginBottom: _,
  // Prevent passing to internal component
  className,
  onChange,
  value,
  label = (0, import_i18n.__)("Search"),
  placeholder = (0, import_i18n.__)("Search"),
  hideLabelFromVision = true,
  onClose,
  size = "default",
  ...restProps
}, forwardedRef) {
  const {
    disabled,
    ...filteredRestProps
  } = restProps;
  const searchRef = (0, import_element.useRef)(null);
  const instanceId = (0, import_compose.useInstanceId)(SearchControl, "components-search-control");
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_styles.StyledInputControl, {
    __next40pxDefaultSize: true,
    id: instanceId,
    hideLabelFromVision,
    label,
    ref: (0, import_compose.useMergeRefs)([searchRef, forwardedRef]),
    type: "search",
    size,
    className: (0, import_clsx.default)("components-search-control", className),
    onChange: (nextValue) => onChange(nextValue ?? ""),
    autoComplete: "off",
    placeholder,
    value: value ?? "",
    prefix: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_input_prefix_wrapper.InputControlPrefixWrapper, {
      variant: "icon",
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_styles.StyledIcon, {
        icon: import_icons.search,
        fill: "currentColor"
      })
    }),
    suffix: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SuffixItem, {
      searchRef,
      value,
      onChange,
      onClose
    }),
    ...filteredRestProps
  });
}
var SearchControl = (0, import_element.forwardRef)(UnforwardedSearchControl);
SearchControl.displayName = "SearchControl";
var search_control_default = SearchControl;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SearchControl
});
//# sourceMappingURL=index.cjs.map
