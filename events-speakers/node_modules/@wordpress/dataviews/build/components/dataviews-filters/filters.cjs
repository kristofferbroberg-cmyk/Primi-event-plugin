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

// packages/dataviews/src/components/dataviews-filters/filters.tsx
var filters_exports = {};
__export(filters_exports, {
  default: () => filters_default
});
module.exports = __toCommonJS(filters_exports);
var import_element = require("@wordpress/element");
var import_ui = require("@wordpress/ui");
var import_filter = __toESM(require("./filter.cjs"));
var import_add_filter = __toESM(require("./add-filter.cjs"));
var import_reset_filters = __toESM(require("./reset-filters.cjs"));
var import_use_filters = __toESM(require("./use-filters.cjs"));
var import_dataviews_context = __toESM(require("../dataviews-context/index.cjs"));
var import_jsx_runtime = require("react/jsx-runtime");
function Filters({ className }) {
  const { fields, view, onChangeView, openedFilter, setOpenedFilter } = (0, import_element.useContext)(import_dataviews_context.default);
  const addFilterRef = (0, import_element.useRef)(null);
  const filters = (0, import_use_filters.default)(fields, view);
  const addFilter = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    import_add_filter.default,
    {
      filters,
      view,
      onChangeView,
      ref: addFilterRef,
      setOpenedFilter
    },
    "add-filter"
  );
  const visibleFilters = filters.filter((filter) => filter.isVisible);
  if (visibleFilters.length === 0) {
    return null;
  }
  const filterComponents = [
    ...visibleFilters.map((filter) => {
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        import_filter.default,
        {
          filter,
          view,
          fields,
          onChangeView,
          addFilterRef,
          openedFilter
        },
        filter.field
      );
    }),
    addFilter
  ];
  filterComponents.push(
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      import_reset_filters.default,
      {
        filters,
        view,
        onChangeView
      },
      "reset-filters"
    )
  );
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    import_ui.Stack,
    {
      direction: "row",
      justify: "flex-start",
      gap: "sm",
      style: { width: "fit-content" },
      wrap: "wrap",
      className,
      children: filterComponents
    }
  );
}
var filters_default = (0, import_element.memo)(Filters);
//# sourceMappingURL=filters.cjs.map
