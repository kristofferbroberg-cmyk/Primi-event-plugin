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

// packages/dataviews/src/components/dataviews-layouts/grid/index.tsx
var grid_exports = {};
__export(grid_exports, {
  default: () => grid_default
});
module.exports = __toCommonJS(grid_exports);
var import_clsx = __toESM(require("clsx"));
var import_components = require("@wordpress/components");
var import_i18n = require("@wordpress/i18n");
var import_ui = require("@wordpress/ui");
var import_get_data_by_group = __toESM(require("../utils/get-data-by-group.cjs"));
var import_composite_grid = __toESM(require("./composite-grid.cjs"));
var import_use_delayed_loading = require("../../../hooks/use-delayed-loading.cjs");
var import_jsx_runtime = require("react/jsx-runtime");
function ViewGrid({
  actions,
  data,
  fields,
  getItemId,
  isLoading,
  onChangeSelection,
  onClickItem,
  isItemClickable,
  renderItemLink,
  selection,
  view,
  className,
  empty
}) {
  const isDelayedLoading = (0, import_use_delayed_loading.useDelayedLoading)(!!isLoading);
  const hasData = !!data?.length;
  const groupField = view.groupBy?.field ? fields.find((f) => f.id === view.groupBy?.field) : null;
  const dataByGroup = groupField ? (0, import_get_data_by_group.default)(data, groupField) : null;
  const isInfiniteScroll = view.infiniteScrollEnabled && !dataByGroup;
  if (!hasData) {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "div",
      {
        className: (0, import_clsx.default)("dataviews-no-results", {
          "is-refreshing": isDelayedLoading
        }),
        children: empty
      }
    );
  }
  const gridProps = {
    className: (0, import_clsx.default)(className, {
      "is-refreshing": !isInfiniteScroll && isDelayedLoading
    }),
    inert: !isInfiniteScroll && !!isLoading ? "true" : void 0,
    isLoading,
    view,
    fields,
    selection,
    onChangeSelection,
    onClickItem,
    isItemClickable,
    renderItemLink,
    getItemId,
    actions
  };
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, {
    // Render multiple groups.
    children: [
      hasData && groupField && dataByGroup && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ui.Stack, { direction: "column", gap: "lg", children: Array.from(dataByGroup.entries()).map(
        ([groupName, groupItems]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
          import_ui.Stack,
          {
            direction: "column",
            gap: "sm",
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { className: "dataviews-view-grid__group-header", children: view.groupBy?.showLabel === false ? groupName : (0, import_i18n.sprintf)(
                // translators: 1: The label of the field e.g. "Date". 2: The value of the field, e.g.: "May 2022".
                (0, import_i18n.__)("%1$s: %2$s"),
                groupField.label,
                groupName
              ) }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                import_composite_grid.default,
                {
                  ...gridProps,
                  data: groupItems,
                  isInfiniteScroll: false
                }
              )
            ]
          },
          groupName
        )
      ) }),
      // Render a single grid with all data.
      !dataByGroup && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        import_composite_grid.default,
        {
          ...gridProps,
          data,
          isInfiniteScroll: !!isInfiniteScroll
        }
      ),
      isInfiniteScroll && isLoading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "dataviews-loading-more", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_components.Spinner, {}) })
    ]
  });
}
var grid_default = ViewGrid;
//# sourceMappingURL=index.cjs.map
