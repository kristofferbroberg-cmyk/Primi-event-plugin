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

// packages/dataviews/src/components/dataviews-view-config/properties-section.tsx
var properties_section_exports = {};
__export(properties_section_exports, {
  PropertiesSection: () => PropertiesSection
});
module.exports = __toCommonJS(properties_section_exports);
var import_components = require("@wordpress/components");
var import_i18n = require("@wordpress/i18n");
var import_element = require("@wordpress/element");
var import_icons = require("@wordpress/icons");
var import_ui = require("@wordpress/ui");
var import_dataviews_context = __toESM(require("../dataviews-context/index.cjs"));
var import_get_hideable_fields = __toESM(require("../../utils/get-hideable-fields.cjs"));
var import_jsx_runtime = require("react/jsx-runtime");
function FieldItem({
  field,
  isVisible,
  onToggleVisibility
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_components.__experimentalItem, { onClick: field.enableHiding ? onToggleVisibility : void 0, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_ui.Stack, { direction: "row", gap: "sm", justify: "flex-start", align: "center", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { height: 24, width: 24 }, children: isVisible && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_components.Icon, { icon: import_icons.check }) }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "dataviews-view-config__label", children: field.label })
  ] }) });
}
function isDefined(item) {
  return !!item;
}
function PropertiesSection({
  showLabel = true
}) {
  const { view, fields, onChangeView } = (0, import_element.useContext)(import_dataviews_context.default);
  const regularFields = (0, import_get_hideable_fields.default)(view, fields);
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
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_ui.Stack, { direction: "column", className: "dataviews-field-control", children: [
    showLabel && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_components.BaseControl.VisualLabel, { children: (0, import_i18n.__)("Properties") }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      import_ui.Stack,
      {
        direction: "column",
        className: "dataviews-view-config__properties",
        children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_components.__experimentalItemGroup, { isBordered: true, isSeparated: true, size: "medium", children: [
          lockedFields.map(({ field, isVisibleFlag }) => {
            const isVisible = view[isVisibleFlag] ?? true;
            const fieldToRender = isSingleVisibleLockedField && isVisible ? { ...field, enableHiding: false } : field;
            return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
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
            return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  PropertiesSection
});
//# sourceMappingURL=properties-section.cjs.map
