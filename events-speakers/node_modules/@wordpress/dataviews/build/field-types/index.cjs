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

// packages/dataviews/src/field-types/index.tsx
var field_types_exports = {};
__export(field_types_exports, {
  default: () => normalizeFields
});
module.exports = __toCommonJS(field_types_exports);
var import_dataform_controls = require("../components/dataform-controls/index.cjs");
var import_get_filter_by = __toESM(require("./utils/get-filter-by.cjs"));
var import_get_value_from_id = __toESM(require("./utils/get-value-from-id.cjs"));
var import_has_elements = __toESM(require("./utils/has-elements.cjs"));
var import_set_value_from_id = __toESM(require("./utils/set-value-from-id.cjs"));
var import_email = __toESM(require("./email.cjs"));
var import_integer = __toESM(require("./integer.cjs"));
var import_number = __toESM(require("./number.cjs"));
var import_text = __toESM(require("./text.cjs"));
var import_datetime = __toESM(require("./datetime.cjs"));
var import_date = __toESM(require("./date.cjs"));
var import_boolean = __toESM(require("./boolean.cjs"));
var import_media = __toESM(require("./media.cjs"));
var import_array = __toESM(require("./array.cjs"));
var import_password = __toESM(require("./password.cjs"));
var import_telephone = __toESM(require("./telephone.cjs"));
var import_color = __toESM(require("./color.cjs"));
var import_url = __toESM(require("./url.cjs"));
var import_no_type = __toESM(require("./no-type.cjs"));
var import_get_is_valid = __toESM(require("./utils/get-is-valid.cjs"));
var import_get_filter = __toESM(require("./utils/get-filter.cjs"));
var import_get_format = __toESM(require("./utils/get-format.cjs"));
function getFieldTypeByName(type) {
  const found = [
    import_email.default,
    import_integer.default,
    import_number.default,
    import_text.default,
    import_datetime.default,
    import_date.default,
    import_boolean.default,
    import_media.default,
    import_array.default,
    import_password.default,
    import_telephone.default,
    import_color.default,
    import_url.default
  ].find((fieldType) => fieldType?.type === type);
  if (!!found) {
    return found;
  }
  return import_no_type.default;
}
function normalizeFields(fields) {
  return fields.map((field) => {
    const fieldType = getFieldTypeByName(field.type);
    const getValue = field.getValue || (0, import_get_value_from_id.default)(field.id);
    const sort = function(a, b, direction) {
      const aValue = getValue({ item: a });
      const bValue = getValue({ item: b });
      return field.sort ? field.sort(aValue, bValue, direction) : fieldType.sort(aValue, bValue, direction);
    };
    return {
      id: field.id,
      label: field.label || field.id,
      header: field.header || field.label || field.id,
      description: field.description,
      placeholder: field.placeholder,
      getValue,
      setValue: field.setValue || (0, import_set_value_from_id.default)(field.id),
      elements: field.elements,
      getElements: field.getElements,
      hasElements: (0, import_has_elements.default)(field),
      isVisible: field.isVisible,
      enableHiding: field.enableHiding ?? true,
      readOnly: field.readOnly ?? false,
      // The type provides defaults for the following props
      type: fieldType.type,
      render: field.render ?? fieldType.render,
      Edit: (0, import_dataform_controls.getControl)(field, fieldType.Edit),
      sort,
      enableSorting: field.enableSorting ?? fieldType.enableSorting,
      enableGlobalSearch: field.enableGlobalSearch ?? fieldType.enableGlobalSearch,
      isValid: (0, import_get_is_valid.default)(field, fieldType),
      filterBy: (0, import_get_filter_by.default)(
        field,
        fieldType.defaultOperators,
        fieldType.validOperators
      ),
      filter: (0, import_get_filter.default)(fieldType),
      format: (0, import_get_format.default)(field, fieldType),
      getValueFormatted: field.getValueFormatted ?? fieldType.getValueFormatted
    };
  });
}
//# sourceMappingURL=index.cjs.map
