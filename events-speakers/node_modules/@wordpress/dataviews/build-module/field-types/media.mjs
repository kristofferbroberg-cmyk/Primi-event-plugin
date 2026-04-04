// packages/dataviews/src/field-types/media.tsx
import getValueFormatted from "./utils/get-value-formatted-default.mjs";
var media_default = {
  type: "media",
  render: () => null,
  Edit: null,
  sort: () => 0,
  enableSorting: false,
  enableGlobalSearch: false,
  defaultOperators: [],
  validOperators: [],
  format: {},
  getValueFormatted,
  // cannot validate any constraint, so
  // the only available validation for the field author
  // would be providing a custom validator.
  validate: {}
};
export {
  media_default as default
};
//# sourceMappingURL=media.mjs.map
