// packages/dataviews/src/field-types/utils/get-filter-by.ts
function getFilterBy(field, defaultOperators, validOperators) {
  if (field.filterBy === false) {
    return false;
  }
  const operators = field.filterBy?.operators?.filter(
    (op) => validOperators.includes(op)
  ) ?? defaultOperators;
  if (operators.length === 0) {
    return false;
  }
  return {
    isPrimary: !!field.filterBy?.isPrimary,
    operators
  };
}
var get_filter_by_default = getFilterBy;
export {
  get_filter_by_default as default
};
//# sourceMappingURL=get-filter-by.mjs.map
