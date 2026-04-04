// packages/dataviews/src/field-types/utils/has-elements.ts
function hasElements(field) {
  return Array.isArray(field.elements) && field.elements.length > 0 || typeof field.getElements === "function";
}
export {
  hasElements as default
};
//# sourceMappingURL=has-elements.mjs.map
