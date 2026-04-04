// packages/dataviews/src/field-types/utils/get-is-valid.ts
function getIsValid(field, fieldType) {
  let required;
  if (field.isValid?.required === true && fieldType.validate.required !== void 0) {
    required = {
      constraint: true,
      validate: fieldType.validate.required
    };
  }
  let elements;
  if ((field.isValid?.elements === true || // elements is enabled unless the field opts-out
  field.isValid?.elements === void 0 && (!!field.elements || !!field.getElements)) && fieldType.validate.elements !== void 0) {
    elements = {
      constraint: true,
      validate: fieldType.validate.elements
    };
  }
  let min;
  if (typeof field.isValid?.min === "number" && fieldType.validate.min !== void 0) {
    min = {
      constraint: field.isValid.min,
      validate: fieldType.validate.min
    };
  }
  let max;
  if (typeof field.isValid?.max === "number" && fieldType.validate.max !== void 0) {
    max = {
      constraint: field.isValid.max,
      validate: fieldType.validate.max
    };
  }
  let minLength;
  if (typeof field.isValid?.minLength === "number" && fieldType.validate.minLength !== void 0) {
    minLength = {
      constraint: field.isValid.minLength,
      validate: fieldType.validate.minLength
    };
  }
  let maxLength;
  if (typeof field.isValid?.maxLength === "number" && fieldType.validate.maxLength !== void 0) {
    maxLength = {
      constraint: field.isValid.maxLength,
      validate: fieldType.validate.maxLength
    };
  }
  let pattern;
  if (field.isValid?.pattern !== void 0 && fieldType.validate.pattern !== void 0) {
    pattern = {
      constraint: field.isValid?.pattern,
      validate: fieldType.validate.pattern
    };
  }
  const custom = field.isValid?.custom ?? fieldType.validate.custom;
  return {
    required,
    elements,
    min,
    max,
    minLength,
    maxLength,
    pattern,
    custom
  };
}
export {
  getIsValid as default
};
//# sourceMappingURL=get-is-valid.mjs.map
