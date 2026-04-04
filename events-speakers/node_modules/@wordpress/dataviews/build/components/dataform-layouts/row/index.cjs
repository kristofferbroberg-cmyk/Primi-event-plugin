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

// packages/dataviews/src/components/dataform-layouts/row/index.tsx
var row_exports = {};
__export(row_exports, {
  default: () => FormRowField
});
module.exports = __toCommonJS(row_exports);
var import_components = require("@wordpress/components");
var import_ui = require("@wordpress/ui");
var import_data_form_layout = require("../data-form-layout.cjs");
var import_normalize_form = require("../normalize-form.cjs");
var import__ = require("../index.cjs");
var import_jsx_runtime = require("react/jsx-runtime");
function Header({ title }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    import_ui.Stack,
    {
      direction: "column",
      className: "dataforms-layouts-row__header",
      gap: "lg",
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ui.Stack, { direction: "row", align: "center", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_components.__experimentalHeading, { level: 2, size: 13, children: title }) })
    }
  );
}
var EMPTY_WRAPPER = ({ children }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
function FormRowField({
  data,
  field,
  onChange,
  hideLabelFromVision,
  markWhenOptional,
  validity
}) {
  const layout = field.layout;
  if (!!field.children) {
    const form = {
      layout: import_normalize_form.DEFAULT_LAYOUT,
      fields: field.children
    };
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "dataforms-layouts-row__field", children: [
      !hideLabelFromVision && field.label && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, { title: field.label }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ui.Stack, { direction: "row", align: layout.alignment, gap: "lg", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        import_data_form_layout.DataFormLayout,
        {
          data,
          form,
          onChange,
          validity: validity?.children,
          as: EMPTY_WRAPPER,
          children: (FieldLayout, childField, childFieldValidity) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "div",
            {
              className: "dataforms-layouts-row__field-control",
              style: layout.styles[childField.id],
              children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                FieldLayout,
                {
                  data,
                  field: childField,
                  onChange,
                  hideLabelFromVision,
                  markWhenOptional,
                  validity: childFieldValidity
                }
              )
            },
            childField.id
          )
        }
      ) })
    ] });
  }
  const RegularLayout = (0, import__.getFormFieldLayout)("regular")?.component;
  if (!RegularLayout) {
    return null;
  }
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "dataforms-layouts-row__field-control", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    RegularLayout,
    {
      data,
      field,
      onChange,
      markWhenOptional,
      validity
    }
  ) }) });
}
//# sourceMappingURL=index.cjs.map
