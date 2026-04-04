// packages/dataviews/src/components/dataform-layouts/validation-badge.tsx
import { Badge } from "@wordpress/ui";
import { sprintf, _n } from "@wordpress/i18n";
import { jsx } from "react/jsx-runtime";
function countInvalidFields(validity) {
  if (!validity) {
    return 0;
  }
  let count = 0;
  const validityRules = Object.keys(validity).filter(
    (key) => key !== "children"
  );
  for (const key of validityRules) {
    const rule = validity[key];
    if (rule?.type === "invalid") {
      count++;
    }
  }
  if (validity.children) {
    for (const childValidity of Object.values(validity.children)) {
      count += countInvalidFields(childValidity);
    }
  }
  return count;
}
function ValidationBadge({
  validity
}) {
  const invalidCount = countInvalidFields(validity);
  if (invalidCount === 0) {
    return null;
  }
  return /* @__PURE__ */ jsx(Badge, { intent: "high", children: sprintf(
    /* translators: %d: Number of fields that need attention */
    _n(
      "%d field needs attention",
      "%d fields need attention",
      invalidCount
    ),
    invalidCount
  ) });
}
export {
  ValidationBadge as default
};
//# sourceMappingURL=validation-badge.mjs.map
