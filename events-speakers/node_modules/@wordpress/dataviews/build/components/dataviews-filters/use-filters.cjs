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

// packages/dataviews/src/components/dataviews-filters/use-filters.ts
var use_filters_exports = {};
__export(use_filters_exports, {
  default: () => use_filters_default
});
module.exports = __toCommonJS(use_filters_exports);
var import_element = require("@wordpress/element");
var import_operators = require("../../utils/operators.cjs");
function useFilters(fields, view) {
  return (0, import_element.useMemo)(() => {
    const filters = [];
    fields.forEach((field) => {
      if (field.filterBy === false || !field.hasElements && !field.Edit) {
        return;
      }
      const operators = field.filterBy.operators;
      const isPrimary = !!field.filterBy?.isPrimary;
      const isLocked = view.filters?.some(
        (f) => f.field === field.id && !!f.isLocked
      ) ?? false;
      filters.push({
        field: field.id,
        name: field.label,
        elements: field.elements,
        getElements: field.getElements,
        hasElements: field.hasElements,
        singleSelection: operators.some(
          (op) => (0, import_operators.isSingleSelectionOperator)(op)
        ),
        operators,
        isVisible: isLocked || isPrimary || !!view.filters?.some(
          (f) => f.field === field.id && (0, import_operators.isRegisteredOperator)(f.operator)
        ),
        isPrimary,
        isLocked
      });
    });
    filters.sort((a, b) => {
      if (a.isLocked && !b.isLocked) {
        return -1;
      }
      if (!a.isLocked && b.isLocked) {
        return 1;
      }
      if (a.isPrimary && !b.isPrimary) {
        return -1;
      }
      if (!a.isPrimary && b.isPrimary) {
        return 1;
      }
      return a.name.localeCompare(b.name);
    });
    return filters;
  }, [fields, view]);
}
var use_filters_default = useFilters;
//# sourceMappingURL=use-filters.cjs.map
