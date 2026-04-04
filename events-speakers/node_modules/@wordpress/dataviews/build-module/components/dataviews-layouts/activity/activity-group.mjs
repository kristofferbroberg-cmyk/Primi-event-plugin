// packages/dataviews/src/components/dataviews-layouts/activity/activity-group.tsx
import { __, sprintf } from "@wordpress/i18n";
import { createInterpolateElement } from "@wordpress/element";
import { Stack } from "@wordpress/ui";
import { jsx, jsxs } from "react/jsx-runtime";
function ActivityGroup({
  groupName,
  groupData,
  groupField,
  showLabel = true,
  children
}) {
  const groupHeader = showLabel ? createInterpolateElement(
    // translators: %s: The label of the field e.g. "Status".
    sprintf(__("%s: <groupName />"), groupField.label).trim(),
    {
      groupName: /* @__PURE__ */ jsx(
        groupField.render,
        {
          item: groupData[0],
          field: groupField
        }
      )
    }
  ) : /* @__PURE__ */ jsx(groupField.render, { item: groupData[0], field: groupField });
  return /* @__PURE__ */ jsxs(
    Stack,
    {
      direction: "column",
      className: "dataviews-view-activity__group",
      children: [
        /* @__PURE__ */ jsx("h3", { className: "dataviews-view-activity__group-header", children: groupHeader }),
        children
      ]
    },
    groupName
  );
}
export {
  ActivityGroup as default
};
//# sourceMappingURL=activity-group.mjs.map
