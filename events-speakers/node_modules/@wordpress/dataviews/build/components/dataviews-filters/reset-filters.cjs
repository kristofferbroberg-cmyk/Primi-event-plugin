"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// packages/dataviews/src/components/dataviews-filters/reset-filters.tsx
var reset_filters_exports = {};
__export(reset_filters_exports, {
  default: () => ResetFilter
});
module.exports = __toCommonJS(reset_filters_exports);
var import_components = require("@wordpress/components");
var import_i18n = require("@wordpress/i18n");
var import_jsx_runtime = require("react/jsx-runtime");
function ResetFilter({
  filters,
  view,
  onChangeView
}) {
  const isPrimary = (field) => filters.some(
    (_filter) => _filter.field === field && _filter.isPrimary
  );
  const isDisabled = !view.search && !view.filters?.some(
    (_filter) => !_filter.isLocked && (_filter.value !== void 0 || !isPrimary(_filter.field))
  );
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    import_components.Button,
    {
      disabled: isDisabled,
      accessibleWhenDisabled: true,
      size: "compact",
      variant: "tertiary",
      className: "dataviews-filters__reset-button",
      onClick: () => {
        onChangeView({
          ...view,
          page: 1,
          search: "",
          filters: view.filters?.filter((f) => !!f.isLocked) || []
        });
      },
      children: (0, import_i18n.__)("Reset")
    }
  );
}
//# sourceMappingURL=reset-filters.cjs.map
