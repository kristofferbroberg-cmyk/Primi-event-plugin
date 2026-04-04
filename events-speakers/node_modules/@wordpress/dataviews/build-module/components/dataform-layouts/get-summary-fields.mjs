// packages/dataviews/src/components/dataform-layouts/get-summary-fields.ts
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
export {
  getSummaryFields
};
//# sourceMappingURL=get-summary-fields.mjs.map
