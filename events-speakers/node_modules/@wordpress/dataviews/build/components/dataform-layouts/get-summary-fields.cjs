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

// packages/dataviews/src/components/dataform-layouts/get-summary-fields.ts
var get_summary_fields_exports = {};
__export(get_summary_fields_exports, {
  getSummaryFields: () => getSummaryFields
});
module.exports = __toCommonJS(get_summary_fields_exports);
function extractSummaryIds(summary) {
  if (Array.isArray(summary)) {
    return summary.map(
      (item) => typeof item === "string" ? item : item.id
    );
  }
  return [];
}
var getSummaryFields = (summaryField, fields) => {
  if (Array.isArray(summaryField) && summaryField.length > 0) {
    const summaryIds = extractSummaryIds(summaryField);
    return summaryIds.map(
      (summaryId) => fields.find((_field) => _field.id === summaryId)
    ).filter((_field) => _field !== void 0);
  }
  return [];
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getSummaryFields
});
//# sourceMappingURL=get-summary-fields.cjs.map
