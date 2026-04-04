// packages/dataviews/src/field-types/utils/is-valid-min.ts
function isValidMin(item, field) {
  if (typeof field.isValid.min?.constraint !== "number") {
    return false;
  }
  const value = field.getValue({ item });
  if ([void 0, "", null].includes(value)) {
    return true;
  }
  return Number(value) >= field.isValid.min.constraint;
}
export {
  isValidMin as default
};
//# sourceMappingURL=is-valid-min.mjs.map
