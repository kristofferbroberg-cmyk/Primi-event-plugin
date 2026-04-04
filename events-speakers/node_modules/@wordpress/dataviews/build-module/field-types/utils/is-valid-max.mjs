// packages/dataviews/src/field-types/utils/is-valid-max.ts
function isValidMax(item, field) {
  if (typeof field.isValid.max?.constraint !== "number") {
    return false;
  }
  const value = field.getValue({ item });
  if ([void 0, "", null].includes(value)) {
    return true;
  }
  return Number(value) <= field.isValid.max.constraint;
}
export {
  isValidMax as default
};
//# sourceMappingURL=is-valid-max.mjs.map
