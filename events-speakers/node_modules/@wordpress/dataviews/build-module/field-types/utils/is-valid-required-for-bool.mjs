// packages/dataviews/src/field-types/utils/is-valid-required-for-bool.ts
function isValidRequiredForBool(item, field) {
  const value = field.getValue({ item });
  return value === true;
}
export {
  isValidRequiredForBool as default
};
//# sourceMappingURL=is-valid-required-for-bool.mjs.map
