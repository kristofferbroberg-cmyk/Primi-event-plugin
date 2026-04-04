"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// packages/dataviews/src/components/dataviews-filters/input-widget.tsx
var input_widget_exports = {};
__export(input_widget_exports, {
  default: () => InputWidget
});
module.exports = __toCommonJS(input_widget_exports);
var import_es6 = __toESM(require("fast-deep-equal/es6/index.js"));
var import_compose = require("@wordpress/compose");
var import_element = require("@wordpress/element");
var import_components = require("@wordpress/components");
var import_utils = require("./utils.cjs");
var import_jsx_runtime = require("react/jsx-runtime");
function InputWidget({
  filter,
  view,
  onChangeView,
  fields
}) {
  const currentFilter = view.filters?.find(
    (f) => f.field === filter.field
  );
  const currentValue = (0, import_utils.getCurrentValue)(filter, currentFilter);
  const field = (0, import_element.useMemo)(() => {
    const currentField = fields.find((f) => f.id === filter.field);
    if (currentField) {
      return {
        ...currentField,
        // Deactivate validation for filters.
        isValid: {},
        // Configure getValue/setValue as if Item was a plain object.
        getValue: ({ item }) => item[currentField.id],
        setValue: ({ value }) => ({
          [currentField.id]: value
        })
      };
    }
    return currentField;
  }, [fields, filter.field]);
  const data = (0, import_element.useMemo)(() => {
    return (view.filters ?? []).reduce(
      (acc, activeFilter) => {
        acc[activeFilter.field] = activeFilter.value;
        return acc;
      },
      {}
    );
  }, [view.filters]);
  const handleChange = (0, import_compose.useEvent)((updatedData) => {
    if (!field || !currentFilter) {
      return;
    }
    const nextValue = field.getValue({ item: updatedData });
    if ((0, import_es6.default)(nextValue, currentValue)) {
      return;
    }
    onChangeView({
      ...view,
      filters: (view.filters ?? []).map(
        (_filter) => _filter.field === filter.field ? {
          ..._filter,
          operator: currentFilter.operator || filter.operators[0],
          // Consider empty strings as undefined:
          //
          // - undefined as value means the filter is unset: the filter widget displays no value and the search returns all records
          // - empty string as value means "search empty string": returns only the records that have an empty string as value
          //
          // In practice, this means the filter will not be able to find an empty string as the value.
          value: nextValue === "" ? void 0 : nextValue
        } : _filter
      )
    });
  });
  if (!field || !field.Edit || !currentFilter) {
    return null;
  }
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    import_components.Flex,
    {
      className: "dataviews-filters__user-input-widget",
      gap: 2.5,
      direction: "column",
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        field.Edit,
        {
          hideLabelFromVision: true,
          data,
          field,
          operator: currentFilter.operator,
          onChange: handleChange
        }
      )
    }
  );
}
//# sourceMappingURL=input-widget.cjs.map
