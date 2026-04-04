// packages/dataviews/src/field-types/utils/sort-text.ts
var sort_text_default = (a, b, direction) => {
  return direction === "asc" ? a.localeCompare(b) : b.localeCompare(a);
};
export {
  sort_text_default as default
};
//# sourceMappingURL=sort-text.mjs.map
