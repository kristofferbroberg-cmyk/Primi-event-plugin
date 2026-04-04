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

// packages/dataviews/src/components/dataform-layouts/validation-badge.tsx
var validation_badge_exports = {};
__export(validation_badge_exports, {
  default: () => ValidationBadge
});
module.exports = __toCommonJS(validation_badge_exports);
var import_ui = require("@wordpress/ui");
var import_i18n = require("@wordpress/i18n");
var import_jsx_runtime = require("react/jsx-runtime");
function countInvalidFields(validity) {
  if (!validity) {
    return 0;
  }
  let count = 0;
  const validityRules = Object.keys(validity).filter(
    (key) => key !== "children"
  );
  for (const key of validityRules) {
    const rule = validity[key];
    if (rule?.type === "invalid") {
      count++;
    }
  }
  if (validity.children) {
    for (const childValidity of Object.values(validity.children)) {
      count += countInvalidFields(childValidity);
    }
  }
  return count;
}
function ValidationBadge({
  validity
}) {
  const invalidCount = countInvalidFields(validity);
  if (invalidCount === 0) {
    return null;
  }
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ui.Badge, { intent: "high", children: (0, import_i18n.sprintf)(
    /* translators: %d: Number of fields that need attention */
    (0, import_i18n._n)(
      "%d field needs attention",
      "%d fields need attention",
      invalidCount
    ),
    invalidCount
  ) });
}
//# sourceMappingURL=validation-badge.cjs.map
