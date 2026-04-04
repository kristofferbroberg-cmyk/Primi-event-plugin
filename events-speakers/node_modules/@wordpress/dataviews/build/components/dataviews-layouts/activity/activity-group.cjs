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

// packages/dataviews/src/components/dataviews-layouts/activity/activity-group.tsx
var activity_group_exports = {};
__export(activity_group_exports, {
  default: () => ActivityGroup
});
module.exports = __toCommonJS(activity_group_exports);
var import_i18n = require("@wordpress/i18n");
var import_element = require("@wordpress/element");
var import_ui = require("@wordpress/ui");
var import_jsx_runtime = require("react/jsx-runtime");
function ActivityGroup({
  groupName,
  groupData,
  groupField,
  showLabel = true,
  children
}) {
  const groupHeader = showLabel ? (0, import_element.createInterpolateElement)(
    // translators: %s: The label of the field e.g. "Status".
    (0, import_i18n.sprintf)((0, import_i18n.__)("%s: <groupName />"), groupField.label).trim(),
    {
      groupName: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        groupField.render,
        {
          item: groupData[0],
          field: groupField
        }
      )
    }
  ) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(groupField.render, { item: groupData[0], field: groupField });
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    import_ui.Stack,
    {
      direction: "column",
      className: "dataviews-view-activity__group",
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { className: "dataviews-view-activity__group-header", children: groupHeader }),
        children
      ]
    },
    groupName
  );
}
//# sourceMappingURL=activity-group.cjs.map
