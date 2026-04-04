// packages/components/src/navigation/utils.tsx
import removeAccents from "remove-accents";
var normalizeInput = (input) => removeAccents(input).replace(/^\//, "").toLowerCase();
var normalizedSearch = (title, search) => -1 !== normalizeInput(title).indexOf(normalizeInput(search));
export {
  normalizeInput,
  normalizedSearch
};
//# sourceMappingURL=utils.mjs.map
