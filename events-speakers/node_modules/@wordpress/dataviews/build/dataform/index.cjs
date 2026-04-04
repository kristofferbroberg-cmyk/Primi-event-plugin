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

// packages/dataviews/src/dataform/index.tsx
var dataform_exports = {};
__export(dataform_exports, {
  default: () => DataForm
});
module.exports = __toCommonJS(dataform_exports);
var import_element = require("@wordpress/element");
var import_field_types = __toESM(require("../field-types/index.cjs"));
var import_dataform_context = require("../components/dataform-context/index.cjs");
var import_data_form_layout = require("../components/dataform-layouts/data-form-layout.cjs");
var import_normalize_form = __toESM(require("../components/dataform-layouts/normalize-form.cjs"));
var import_jsx_runtime = require("react/jsx-runtime");
function DataForm({
  data,
  form,
  fields,
  onChange,
  validity
}) {
  const normalizedForm = (0, import_element.useMemo)(() => (0, import_normalize_form.default)(form), [form]);
  const normalizedFields = (0, import_element.useMemo)(
    () => (0, import_field_types.default)(fields),
    [fields]
  );
  if (!form.fields) {
    return null;
  }
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_dataform_context.DataFormProvider, { fields: normalizedFields, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    import_data_form_layout.DataFormLayout,
    {
      data,
      form: normalizedForm,
      onChange,
      validity
    }
  ) });
}
//# sourceMappingURL=index.cjs.map
