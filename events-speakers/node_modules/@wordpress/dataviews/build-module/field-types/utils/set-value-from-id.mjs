// packages/dataviews/src/field-types/utils/set-value-from-id.ts
var setValueFromId = (id) => ({ value }) => {
  const path = id.split(".");
  const result = {};
  let current = result;
  for (const segment of path.slice(0, -1)) {
    current[segment] = {};
    current = current[segment];
  }
  current[path.at(-1)] = value;
  return result;
};
var set_value_from_id_default = setValueFromId;
export {
  set_value_from_id_default as default
};
//# sourceMappingURL=set-value-from-id.mjs.map
