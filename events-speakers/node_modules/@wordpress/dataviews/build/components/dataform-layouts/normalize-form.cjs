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

// packages/dataviews/src/components/dataform-layouts/normalize-form.ts
var normalize_form_exports = {};
__export(normalize_form_exports, {
  DEFAULT_LAYOUT: () => DEFAULT_LAYOUT,
  default: () => normalize_form_default
});
module.exports = __toCommonJS(normalize_form_exports);
var import_i18n = require("@wordpress/i18n");
var DEFAULT_LAYOUT = {
  type: "regular",
  labelPosition: "top"
};
var normalizeCardSummaryField = (sum) => {
  if (typeof sum === "string") {
    return [{ id: sum, visibility: "when-collapsed" }];
  }
  return sum.map((item) => {
    if (typeof item === "string") {
      return { id: item, visibility: "when-collapsed" };
    }
    return { id: item.id, visibility: item.visibility };
  });
};
function normalizeLayout(layout) {
  let normalizedLayout = DEFAULT_LAYOUT;
  if (layout?.type === "regular") {
    normalizedLayout = {
      type: "regular",
      labelPosition: layout?.labelPosition ?? "top"
    };
  } else if (layout?.type === "panel") {
    const summary = layout.summary ?? [];
    const normalizedSummary = Array.isArray(summary) ? summary : [summary];
    const openAs = layout?.openAs;
    let normalizedOpenAs;
    if (typeof openAs === "object" && openAs.type === "modal") {
      normalizedOpenAs = {
        type: "modal",
        applyLabel: openAs.applyLabel?.trim() || (0, import_i18n.__)("Apply"),
        cancelLabel: openAs.cancelLabel?.trim() || (0, import_i18n.__)("Cancel")
      };
    } else if (openAs === "modal") {
      normalizedOpenAs = {
        type: "modal",
        applyLabel: (0, import_i18n.__)("Apply"),
        cancelLabel: (0, import_i18n.__)("Cancel")
      };
    } else {
      normalizedOpenAs = { type: "dropdown" };
    }
    normalizedLayout = {
      type: "panel",
      labelPosition: layout?.labelPosition ?? "side",
      openAs: normalizedOpenAs,
      summary: normalizedSummary,
      editVisibility: layout?.editVisibility ?? "on-hover"
    };
  } else if (layout?.type === "card") {
    if (layout.withHeader === false) {
      normalizedLayout = {
        type: "card",
        withHeader: false,
        isOpened: true,
        summary: [],
        isCollapsible: false
      };
    } else {
      const summary = layout.summary ?? [];
      normalizedLayout = {
        type: "card",
        withHeader: true,
        isOpened: typeof layout.isOpened === "boolean" ? layout.isOpened : true,
        summary: normalizeCardSummaryField(summary),
        isCollapsible: layout.isCollapsible === void 0 ? true : layout.isCollapsible
      };
    }
  } else if (layout?.type === "row") {
    normalizedLayout = {
      type: "row",
      alignment: layout?.alignment ?? "center",
      styles: layout?.styles ?? {}
    };
  } else if (layout?.type === "details") {
    normalizedLayout = {
      type: "details",
      summary: layout?.summary ?? ""
    };
  }
  return normalizedLayout;
}
function normalizeForm(form) {
  const normalizedFormLayout = normalizeLayout(form?.layout);
  const normalizedFields = (form.fields ?? []).map(
    (field) => {
      if (typeof field === "string") {
        return {
          id: field,
          layout: normalizedFormLayout
        };
      }
      const fieldLayout = field.layout ? normalizeLayout(field.layout) : normalizedFormLayout;
      return {
        id: field.id,
        layout: fieldLayout,
        ...!!field.label && { label: field.label },
        ...!!field.description && {
          description: field.description
        },
        ..."children" in field && Array.isArray(field.children) && {
          children: normalizeForm({
            fields: field.children,
            layout: DEFAULT_LAYOUT
          }).fields
        }
      };
    }
  );
  return {
    layout: normalizedFormLayout,
    fields: normalizedFields
  };
}
var normalize_form_default = normalizeForm;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DEFAULT_LAYOUT
});
//# sourceMappingURL=normalize-form.cjs.map
