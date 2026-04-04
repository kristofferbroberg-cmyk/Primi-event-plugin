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

// packages/dataviews/src/components/dataviews-layouts/activity/index.tsx
var activity_exports = {};
__export(activity_exports, {
  default: () => ViewActivity
});
module.exports = __toCommonJS(activity_exports);
var import_clsx = __toESM(require("clsx"));
var import_components = require("@wordpress/components");
var import_ui = require("@wordpress/ui");
var import_get_data_by_group = __toESM(require("../utils/get-data-by-group.cjs"));
var import_activity_group = __toESM(require("./activity-group.cjs"));
var import_activity_items = __toESM(require("./activity-items.cjs"));
var import_use_delayed_loading = require("../../../hooks/use-delayed-loading.cjs");
var import_jsx_runtime = require("react/jsx-runtime");
function ViewActivity(props) {
  const { empty, data, fields, isLoading, view, className } = props;
  const isDelayedLoading = (0, import_use_delayed_loading.useDelayedLoading)(!!isLoading);
  const hasData = !!data?.length;
  const groupField = view.groupBy?.field ? fields.find((field) => field.id === view.groupBy?.field) : null;
  const dataByGroup = hasData && groupField ? (0, import_get_data_by_group.default)(data, groupField) : null;
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
  const isInert = !isInfiniteScroll && !!isLoading;
  const wrapperClassName = (0, import_clsx.default)("dataviews-view-activity", className, {
    "is-refreshing": !isInfiniteScroll && isDelayedLoading
  });
  const groupedEntries = dataByGroup ? Array.from(dataByGroup.entries()) : [];
  if (hasData && groupField && dataByGroup) {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      import_ui.Stack,
      {
        direction: "column",
        gap: "sm",
        className: wrapperClassName,
        inert: isInert ? "true" : void 0,
        children: groupedEntries.map(
          ([groupName, groupData]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            import_activity_group.default,
            {
              groupName,
              groupData,
              groupField,
              showLabel: view.groupBy?.showLabel !== false,
              children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                import_activity_items.default,
                {
                  ...props,
                  data: groupData
                }
              )
            },
            groupName
          )
        )
      }
    );
  }
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "div",
      {
        className: wrapperClassName,
        role: view.infiniteScrollEnabled ? "feed" : void 0,
        inert: isInert ? "true" : void 0,
        children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_activity_items.default, { ...props })
      }
    ),
    isInfiniteScroll && isLoading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "dataviews-loading-more", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_components.Spinner, {}) })
  ] });
}
//# sourceMappingURL=index.cjs.map
