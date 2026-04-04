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

// packages/dataviews/src/components/dataform-layouts/regular/index.tsx
var regular_exports = {};
__export(regular_exports, {
  default: () => FormRegularField
});
module.exports = __toCommonJS(regular_exports);
var import_clsx = __toESM(require("clsx"));
var import_element = require("@wordpress/element");
var import_components = require("@wordpress/components");
var import_ui = require("@wordpress/ui");
var import_dataform_context = __toESM(require("../../dataform-context/index.cjs"));
var import_data_form_layout = require("../data-form-layout.cjs");
var import_normalize_form = require("../normalize-form.cjs");
var import_jsx_runtime = require("react/jsx-runtime");
function Header({ title }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    import_ui.Stack,
    {
      direction: "column",
      className: "dataforms-layouts-regular__header",
      gap: "lg",
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ui.Stack, { direction: "row", align: "center", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_components.__experimentalHeading, { level: 2, size: 13, children: title }) })
    }
  );
}
function FormRegularField({
  data,
  field,
  onChange,
  hideLabelFromVision,
  markWhenOptional,
  validity
}) {
  const { fields } = (0, import_element.useContext)(import_dataform_context.default);
  const layout = field.layout;
  const form = (0, import_element.useMemo)(
    () => ({
      layout: import_normalize_form.DEFAULT_LAYOUT,
      fields: !!field.children ? field.children : []
    }),
    [field]
  );
  if (!!field.children) {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
      !hideLabelFromVision && field.label && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, { title: field.label }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        import_data_form_layout.DataFormLayout,
        {
          data,
          form,
          onChange,
          validity: validity?.children
        }
      )
    ] });
  }
  const labelPosition = layout.labelPosition;
  const fieldDefinition = fields.find(
    (fieldDef) => fieldDef.id === field.id
  );
  if (!fieldDefinition || !fieldDefinition.Edit) {
    return null;
  }
  if (labelPosition === "side") {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
      import_ui.Stack,
      {
        direction: "row",
        className: "dataforms-layouts-regular__field",
        gap: "sm",
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "div",
            {
              className: (0, import_clsx.default)(
                "dataforms-layouts-regular__field-label",
                `dataforms-layouts-regular__field-label--label-position-${labelPosition}`
              ),
              children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_components.BaseControl.VisualLabel, { children: fieldDefinition.label })
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "dataforms-layouts-regular__field-control", children: fieldDefinition.readOnly === true ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            fieldDefinition.render,
            {
              item: data,
              field: fieldDefinition
            }
          ) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            fieldDefinition.Edit,
            {
              data,
              field: fieldDefinition,
              onChange,
              hideLabelFromVision: true,
              markWhenOptional,
              validity
            },
            fieldDefinition.id
          ) })
        ]
      }
    );
  }
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "dataforms-layouts-regular__field", children: fieldDefinition.readOnly === true ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
    !hideLabelFromVision && labelPosition !== "none" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_components.BaseControl.VisualLabel, { children: fieldDefinition.label }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      fieldDefinition.render,
      {
        item: data,
        field: fieldDefinition
      }
    )
  ] }) }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    fieldDefinition.Edit,
    {
      data,
      field: fieldDefinition,
      onChange,
      hideLabelFromVision: labelPosition === "none" ? true : hideLabelFromVision,
      markWhenOptional,
      validity
    }
  ) });
}
//# sourceMappingURL=index.cjs.map
