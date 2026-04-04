// packages/dataviews/src/field-types/utils/is-valid-elements.ts
function isValidElements(item, field) {
  const elements = field.elements ?? [];
  const validValues = elements.map((el) => el.value);
  if (validValues.length === 0) {
    return true;
  }
  const value = field.getValue({ item });
  return [].concat(value).every((v) => validValues.includes(v));
}
export {
  isValidElements as default
};
//# sourceMappingURL=is-valid-elements.mjs.map
