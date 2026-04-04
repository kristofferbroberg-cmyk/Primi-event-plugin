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

// packages/dataviews/src/components/dataform-layouts/index.tsx
var dataform_layouts_exports = {};
__export(dataform_layouts_exports, {
  getFormFieldLayout: () => getFormFieldLayout
});
module.exports = __toCommonJS(dataform_layouts_exports);
var import_ui = require("@wordpress/ui");
var import_regular = __toESM(require("./regular/index.cjs"));
var import_panel = __toESM(require("./panel/index.cjs"));
var import_card = __toESM(require("./card/index.cjs"));
var import_row = __toESM(require("./row/index.cjs"));
var import_details = __toESM(require("./details/index.cjs"));
var import_jsx_runtime = require("react/jsx-runtime");
var FORM_FIELD_LAYOUTS = [
  {
    type: "regular",
    component: import_regular.default,
    wrapper: ({ children }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      import_ui.Stack,
      {
        direction: "column",
        className: "dataforms-layouts__wrapper",
        gap: "lg",
        children
      }
    )
  },
  {
    type: "panel",
    component: import_panel.default,
    wrapper: ({ children }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      import_ui.Stack,
      {
        direction: "column",
        className: "dataforms-layouts__wrapper",
        gap: "md",
        children
      }
    )
  },
  {
    type: "card",
    component: import_card.default,
    wrapper: ({ children }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      import_ui.Stack,
      {
        direction: "column",
        className: "dataforms-layouts__wrapper",
        gap: "xl",
        children
      }
    )
  },
  {
    type: "row",
    component: import_row.default,
    wrapper: ({
      children,
      layout
    }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      import_ui.Stack,
      {
        direction: "column",
        className: "dataforms-layouts__wrapper",
        gap: "lg",
        children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "dataforms-layouts-row__field", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          import_ui.Stack,
          {
            direction: "row",
            gap: "lg",
            align: layout.alignment,
            children
          }
        ) })
      }
    )
  },
  {
    type: "details",
    component: import_details.default
  }
];
function getFormFieldLayout(type) {
  return FORM_FIELD_LAYOUTS.find((layout) => layout.type === type);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getFormFieldLayout
});
//# sourceMappingURL=index.cjs.map
