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

// packages/dataviews/src/components/dataform-layouts/panel/utils/get-label-content.tsx
var get_label_content_exports = {};
__export(get_label_content_exports, {
  default: () => get_label_content_default
});
module.exports = __toCommonJS(get_label_content_exports);
var import_components = require("@wordpress/components");
var import_icons = require("@wordpress/icons");
var import_jsx_runtime = require("react/jsx-runtime");
function getLabelContent(showError, errorMessage, fieldLabel) {
  return showError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_components.Tooltip, { text: errorMessage, placement: "top", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "dataforms-layouts-panel__field-label-error-content", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_components.Icon, { icon: import_icons.error, size: 16 }),
    fieldLabel
  ] }) }) : fieldLabel;
}
var get_label_content_default = getLabelContent;
//# sourceMappingURL=get-label-content.cjs.map
