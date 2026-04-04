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

// packages/dataviews/src/components/dataform-layouts/panel/utils/use-field-from-form-field.ts
var use_field_from_form_field_exports = {};
__export(use_field_from_form_field_exports, {
  default: () => use_field_from_form_field_default
});
module.exports = __toCommonJS(use_field_from_form_field_exports);
var import_element = require("@wordpress/element");
var import_get_summary_fields = require("../../get-summary-fields.cjs");
var import_dataform_context = __toESM(require("../../../dataform-context/index.cjs"));
var getFieldDefinition = (field, fields) => {
  const fieldDefinition = fields.find((_field) => _field.id === field.id);
  if (!fieldDefinition) {
    return fields.find((_field) => {
      if (!!field.children) {
        const simpleChildren = field.children.filter(
          (child) => !child.children
        );
        if (simpleChildren.length === 0) {
          return false;
        }
        return _field.id === simpleChildren[0].id;
      }
      return _field.id === field.id;
    });
  }
  return fieldDefinition;
};
function useFieldFromFormField(field) {
  const { fields } = (0, import_element.useContext)(import_dataform_context.default);
  const layout = field.layout;
  const summaryFields = (0, import_get_summary_fields.getSummaryFields)(layout.summary, fields);
  const fieldDefinition = getFieldDefinition(field, fields);
  const fieldLabel = !!field.children ? field.label : fieldDefinition?.label;
  if (summaryFields.length === 0) {
    return {
      summaryFields: fieldDefinition ? [fieldDefinition] : [],
      fieldDefinition,
      fieldLabel
    };
  }
  return {
    summaryFields,
    fieldDefinition,
    fieldLabel
  };
}
var use_field_from_form_field_default = useFieldFromFormField;
//# sourceMappingURL=use-field-from-form-field.cjs.map
