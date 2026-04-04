// packages/dataviews/src/components/dataform-layouts/panel/utils/get-first-validation-error.ts
function getFirstValidationError(validity) {
  if (!validity) {
    return void 0;
  }
  const validityRules = Object.keys(validity).filter(
    (key) => key !== "children"
  );
  for (const key of validityRules) {
    const rule = validity[key];
    if (rule === void 0) {
      continue;
    }
    if (rule.type === "invalid") {
      if (rule.message) {
        return rule.message;
      }
      if (key === "required") {
        return "A required field is empty";
      }
      return "Unidentified validation error";
    }
  }
  if (validity.children) {
    for (const childValidity of Object.values(validity.children)) {
      const childError = getFirstValidationError(childValidity);
      if (childError) {
        return childError;
      }
    }
  }
  return void 0;
}
var get_first_validation_error_default = getFirstValidationError;
export {
  get_first_validation_error_default as default
};
//# sourceMappingURL=get-first-validation-error.mjs.map
