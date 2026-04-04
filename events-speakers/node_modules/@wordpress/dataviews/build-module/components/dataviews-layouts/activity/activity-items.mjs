// packages/dataviews/src/components/dataviews-layouts/activity/activity-items.tsx
import ActivityItem from "./activity-item.mjs";
import { createElement } from "react";
function isDefined(item) {
  return !!item;
}
function ActivityItems(props) {
  const { data, fields, getItemId, view } = props;
  const titleField = fields.find((field) => field.id === view.titleField);
  const mediaField = fields.find((field) => field.id === view.mediaField);
  const descriptionField = fields.find(
    (field) => field.id === view.descriptionField
  );
  const otherFields = (view?.fields ?? []).map((fieldId) => fields.find((f) => fieldId === f.id)).filter(isDefined);
  return data.map((item, index) => {
    return /* @__PURE__ */ createElement(
      ActivityItem,
      {
        ...props,
        key: getItemId(item),
        item,
        mediaField,
        titleField,
        descriptionField,
        otherFields,
        posinset: view.infiniteScrollEnabled ? index + 1 : void 0
      }
    );
  });
}
export {
  ActivityItems as default
};
//# sourceMappingURL=activity-items.mjs.map
