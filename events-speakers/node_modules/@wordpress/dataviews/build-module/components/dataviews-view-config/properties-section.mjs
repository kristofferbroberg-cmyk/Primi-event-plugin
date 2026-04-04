// packages/dataviews/src/components/dataviews-view-config/properties-section.tsx
import {
  __experimentalItemGroup as ItemGroup,
  __experimentalItem as Item,
  BaseControl,
  Icon
} from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import { useContext } from "@wordpress/element";
import { check } from "@wordpress/icons";
import { Stack } from "@wordpress/ui";
import DataViewsContext from "../dataviews-context/index.mjs";
import getHideableFields from "../../utils/get-hideable-fields.mjs";
import { jsx, jsxs } from "react/jsx-runtime";
function FieldItem({
  field,
  isVisible,
  onToggleVisibility
}) {
  return /* @__PURE__ */ jsx(Item, { onClick: field.enableHiding ? onToggleVisibility : void 0, children: /* @__PURE__ */ jsxs(Stack, { direction: "row", gap: "sm", justify: "flex-start", align: "center", children: [
    /* @__PURE__ */ jsx("div", { style: { height: 24, width: 24 }, children: isVisible && /* @__PURE__ */ jsx(Icon, { icon: check }) }),
    /* @__PURE__ */ jsx("span", { className: "dataviews-view-config__label", children: field.label })
  ] }) });
}
function isDefined(item) {
  return !!item;
}
function PropertiesSection({
  showLabel = true
}) {
  const { view, fields, onChangeView } = useContext(DataViewsContext);
  const regularFields = getHideableFields(view, fields);
  if (!regularFields?.length) {
    return null;
  }
  const titleField = fields.find((f) => f.id === view.titleField);
  const previewField = fields.find((f) => f.id === view.mediaField);
  const descriptionField = fields.find(
    (f) => f.id === view.descriptionField
  );
  const lockedFields = [
    {
      field: titleField,
      isVisibleFlag: "showTitle"
    },
    {
      field: previewField,
      isVisibleFlag: "showMedia"
    },
    {
      field: descriptionField,
      isVisibleFlag: "showDescription"
    }
  ].filter(({ field }) => isDefined(field));
  const visibleFieldIds = view.fields ?? [];
  const visibleRegularFieldsCount = regularFields.filter(
    (f) => visibleFieldIds.includes(f.id)
  ).length;
  const visibleLockedFields = lockedFields.filter(
    ({ isVisibleFlag }) => (
      // @ts-expect-error
      view[isVisibleFlag] ?? true
    )
  );
  const totalVisibleFields = visibleLockedFields.length + visibleRegularFieldsCount;
  const isSingleVisibleLockedField = totalVisibleFields === 1 && visibleLockedFields.length === 1;
  return /* @__PURE__ */ jsxs(Stack, { direction: "column", className: "dataviews-field-control", children: [
    showLabel && /* @__PURE__ */ jsx(BaseControl.VisualLabel, { children: __("Properties") }),
    /* @__PURE__ */ jsx(
      Stack,
      {
        direction: "column",
        className: "dataviews-view-config__properties",
        children: /* @__PURE__ */ jsxs(ItemGroup, { isBordered: true, isSeparated: true, size: "medium", children: [
          lockedFields.map(({ field, isVisibleFlag }) => {
            const isVisible = view[isVisibleFlag] ?? true;
            const fieldToRender = isSingleVisibleLockedField && isVisible ? { ...field, enableHiding: false } : field;
            return /* @__PURE__ */ jsx(
              FieldItem,
              {
                field: fieldToRender,
                isVisible,
                onToggleVisibility: () => {
                  onChangeView({
                    ...view,
                    [isVisibleFlag]: !isVisible
                  });
                }
              },
              field.id
            );
          }),
          regularFields.map((field) => {
            const isVisible = visibleFieldIds.includes(field.id);
            const fieldToRender = totalVisibleFields === 1 && isVisible ? { ...field, enableHiding: false } : field;
            return /* @__PURE__ */ jsx(
              FieldItem,
              {
                field: fieldToRender,
                isVisible,
                onToggleVisibility: () => {
                  onChangeView({
                    ...view,
                    fields: isVisible ? visibleFieldIds.filter(
                      (fieldId) => fieldId !== field.id
                    ) : [...visibleFieldIds, field.id]
                  });
                }
              },
              field.id
            );
          })
        ] })
      }
    )
  ] });
}
export {
  PropertiesSection
};
//# sourceMappingURL=properties-section.mjs.map
