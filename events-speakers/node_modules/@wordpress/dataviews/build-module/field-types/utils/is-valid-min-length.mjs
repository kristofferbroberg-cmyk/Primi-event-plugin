// packages/dataviews/src/field-types/utils/is-valid-min-length.ts
function isValidMinLength(item, field) {
  if (typeof field.isValid.minLength?.constraint !== "number") {
    return false;
  }
  const value = field.getValue({ item });
  if ([void 0, "", null].includes(value)) {
    return true;
  }
  return String(value).length >= field.isValid.minLength.constraint;
}
export {
  isValidMinLength as default
};
//# sourceMappingURL=is-valid-min-length.mjs.map
