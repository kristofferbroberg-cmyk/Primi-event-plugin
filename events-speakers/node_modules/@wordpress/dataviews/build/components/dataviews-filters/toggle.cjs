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

// packages/dataviews/src/components/dataviews-filters/toggle.tsx
var toggle_exports = {};
__export(toggle_exports, {
  default: () => toggle_default
});
module.exports = __toCommonJS(toggle_exports);
var import_element = require("@wordpress/element");
var import_components = require("@wordpress/components");
var import_icons = require("@wordpress/icons");
var import_i18n = require("@wordpress/i18n");
var import_add_filter = require("./add-filter.cjs");
var import_dataviews_context = __toESM(require("../dataviews-context/index.cjs"));
var import_jsx_runtime = require("react/jsx-runtime");
function FiltersToggle() {
  const {
    filters,
    view,
    onChangeView,
    setOpenedFilter,
    isShowingFilter,
    setIsShowingFilter
  } = (0, import_element.useContext)(import_dataviews_context.default);
  const buttonRef = (0, import_element.useRef)(null);
  const onChangeViewWithFilterVisibility = (0, import_element.useCallback)(
    (_view) => {
      onChangeView(_view);
      setIsShowingFilter(true);
    },
    [onChangeView, setIsShowingFilter]
  );
  if (filters.length === 0) {
    return null;
  }
  const hasVisibleFilters = filters.some((filter) => filter.isVisible);
  const addFilterButtonProps = {
    label: (0, import_i18n.__)("Add filter"),
    "aria-expanded": false,
    isPressed: false
  };
  const toggleFiltersButtonProps = {
    label: (0, import_i18n._x)("Filter", "verb"),
    "aria-expanded": isShowingFilter,
    isPressed: isShowingFilter,
    onClick: () => {
      if (!isShowingFilter) {
        setOpenedFilter(null);
      }
      setIsShowingFilter(!isShowingFilter);
    }
  };
  const hasPrimaryOrLockedFilters = filters.some(
    (filter) => filter.isPrimary || filter.isLocked
  );
  const buttonComponent = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    import_components.Button,
    {
      ref: buttonRef,
      className: "dataviews-filters__visibility-toggle",
      size: "compact",
      icon: import_icons.funnel,
      disabled: hasPrimaryOrLockedFilters,
      accessibleWhenDisabled: true,
      ...hasVisibleFilters ? toggleFiltersButtonProps : addFilterButtonProps
    }
  );
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "dataviews-filters__container-visibility-toggle", children: !hasVisibleFilters ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    import_add_filter.AddFilterMenu,
    {
      filters,
      view,
      onChangeView: onChangeViewWithFilterVisibility,
      setOpenedFilter,
      triggerProps: { render: buttonComponent }
    }
  ) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    FilterVisibilityToggle,
    {
      buttonRef,
      filtersCount: view.filters?.length,
      children: buttonComponent
    }
  ) });
}
function FilterVisibilityToggle({
  buttonRef,
  filtersCount,
  children
}) {
  (0, import_element.useEffect)(
    () => () => {
      buttonRef.current?.focus();
    },
    [buttonRef]
  );
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
    children,
    !!filtersCount && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "dataviews-filters-toggle__count", children: filtersCount })
  ] });
}
var toggle_default = FiltersToggle;
//# sourceMappingURL=toggle.cjs.map
