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

// packages/dataviews/src/components/dataform-layouts/data-form-layout.tsx
var data_form_layout_exports = {};
__export(data_form_layout_exports, {
  DataFormLayout: () => DataFormLayout
});
module.exports = __toCommonJS(data_form_layout_exports);
var import_element = require("@wordpress/element");
var import_ui = require("@wordpress/ui");
var import_index = require("./index.cjs");
var import_dataform_context = __toESM(require("../dataform-context/index.cjs"));
var import_jsx_runtime = require("react/jsx-runtime");
var DEFAULT_WRAPPER = ({ children }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_ui.Stack, { direction: "column", className: "dataforms-layouts__wrapper", gap: "lg", children });
function DataFormLayout({
  data,
  form,
  onChange,
  validity,
  children,
  as
}) {
  const { fields: fieldDefinitions } = (0, import_element.useContext)(import_dataform_context.default);
  const markWhenOptional = (0, import_element.useMemo)(() => {
    const requiredCount = fieldDefinitions.filter(
      (f) => !!f.isValid?.required
    ).length;
    const optionalCount = fieldDefinitions.length - requiredCount;
    return requiredCount > optionalCount;
  }, [fieldDefinitions]);
  function getFieldDefinition(field) {
    return fieldDefinitions.find(
      (fieldDefinition) => fieldDefinition.id === field.id
    );
  }
  const Wrapper = as ?? (0, import_index.getFormFieldLayout)(form.layout.type)?.wrapper ?? DEFAULT_WRAPPER;
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wrapper, { layout: form.layout, children: form.fields.map((formField) => {
    const FieldLayout = (0, import_index.getFormFieldLayout)(formField.layout.type)?.component;
    if (!FieldLayout) {
      return null;
    }
    const fieldDefinition = !formField.children ? getFieldDefinition(formField) : void 0;
    if (fieldDefinition && fieldDefinition.isVisible && !fieldDefinition.isVisible(data)) {
      return null;
    }
    if (children) {
      return children(
        FieldLayout,
        formField,
        validity?.[formField.id],
        markWhenOptional
      );
    }
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      FieldLayout,
      {
        data,
        field: formField,
        onChange,
        markWhenOptional,
        validity: validity?.[formField.id]
      },
      formField.id
    );
  }) });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DataFormLayout
});
//# sourceMappingURL=data-form-layout.cjs.map
