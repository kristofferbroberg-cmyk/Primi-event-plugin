// packages/dataviews/src/components/dataviews-filters/utils.ts
var EMPTY_ARRAY = [];
var getCurrentValue = (filterDefinition, currentFilter) => {
  if (filterDefinition.singleSelection) {
    return currentFilter?.value;
  }
  if (Array.isArray(currentFilter?.value)) {
    return currentFilter.value;
  }
  if (!Array.isArray(currentFilter?.value) && !!currentFilter?.value) {
    return [currentFilter.value];
  }
  return EMPTY_ARRAY;
};
export {
  getCurrentValue
};
//# sourceMappingURL=utils.mjs.map
