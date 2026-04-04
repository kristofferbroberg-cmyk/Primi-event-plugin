// packages/dataviews/src/field-types/utils/is-valid-max-length.ts
function isValidMaxLength(item, field) {
  if (typeof field.isValid.maxLength?.constraint !== "number") {
    return false;
  }
  const value = field.getValue({ item });
  if ([void 0, "", null].includes(value)) {
    return true;
  }
  return String(value).length <= field.isValid.maxLength.constraint;
}
export {
  isValidMaxLength as default
};
//# sourceMappingURL=is-valid-max-length.mjs.map
