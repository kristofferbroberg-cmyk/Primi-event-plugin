// packages/dataviews/src/field-types/utils/get-value-from-id.ts
var getValueFromId = (id) => ({ item }) => {
  const path = id.split(".");
  let value = item;
  for (const segment of path) {
    if (value.hasOwnProperty(segment)) {
      value = value[segment];
    } else {
      value = void 0;
    }
  }
  return value;
};
var get_value_from_id_default = getValueFromId;
export {
  get_value_from_id_default as default
};
//# sourceMappingURL=get-value-from-id.mjs.map
