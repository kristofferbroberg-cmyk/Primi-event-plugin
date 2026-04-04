// packages/dataviews/src/field-types/utils/get-format.ts
function getFormat(field, fieldType) {
  return {
    ...fieldType.format,
    ...field.format
  };
}
var get_format_default = getFormat;
export {
  get_format_default as default
};
//# sourceMappingURL=get-format.mjs.map
