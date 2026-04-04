// packages/dataviews/src/field-types/utils/is-valid-required-for-array.ts
function isValidRequiredForArray(item, field) {
  const value = field.getValue({ item });
  return Array.isArray(value) && value.length > 0 && value.every(
    (element) => ![void 0, "", null].includes(element)
  );
}
export {
  isValidRequiredForArray as default
};
//# sourceMappingURL=is-valid-required-for-array.mjs.map
