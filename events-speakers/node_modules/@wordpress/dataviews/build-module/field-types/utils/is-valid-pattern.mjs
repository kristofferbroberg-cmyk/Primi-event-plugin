// packages/dataviews/src/field-types/utils/is-valid-pattern.ts
function isValidPattern(item, field) {
  if (field.isValid.pattern?.constraint === void 0) {
    return true;
  }
  try {
    const regexp = new RegExp(field.isValid.pattern.constraint);
    const value = field.getValue({ item });
    if ([void 0, "", null].includes(value)) {
      return true;
    }
    return regexp.test(String(value));
  } catch {
    return false;
  }
}
export {
  isValidPattern as default
};
//# sourceMappingURL=is-valid-pattern.mjs.map
