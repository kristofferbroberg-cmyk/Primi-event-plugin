// packages/dataviews/src/field-types/utils/is-valid-required.ts
function isValidRequired(item, field) {
  const value = field.getValue({ item });
  return ![void 0, "", null].includes(value);
}
export {
  isValidRequired as default
};
//# sourceMappingURL=is-valid-required.mjs.map
