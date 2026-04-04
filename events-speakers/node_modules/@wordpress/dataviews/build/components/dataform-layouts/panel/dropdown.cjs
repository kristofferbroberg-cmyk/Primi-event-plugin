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

// packages/dataviews/src/components/dataform-layouts/panel/dropdown.tsx
var dropdown_exports = {};
__export(dropdown_exports, {
  default: () => dropdown_default
});
module.exports = __toCommonJS(dropdown_exports);
var import_components = require("@wordpress/components");
var import_i18n = require("@wordpress/i18n");
var import_element = require("@wordpress/element");
var import_icons = require("@wordpress/icons");
var import_compose = require("@wordpress/compose");
var import_ui = require("@wordpress/ui");
var import_data_form_layout = require("../data-form-layout.cjs");
var import_normalize_form = require("../normalize-form.cjs");
var import_summary_button = __toESM(require("./summary-button.cjs"));
var import_use_report_validity = __toESM(require("../../../hooks/use-report-validity.cjs"));
var import_use_field_from_form_field = __toESM(require("./utils/use-field-from-form-field.cjs"));
var import_jsx_runtime = require("react/jsx-runtime");
function DropdownHeader({
  title,
  onClose
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    import_ui.Stack,
    {
      direction: "column",
      className: "dataforms-layouts-panel__dropdown-header",
      gap: "lg",
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_ui.Stack, { direction: "row", gap: "sm", align: "center", children: [
        title && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_components.__experimentalHeading, { level: 2, size: 13, children: title }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_components.__experimentalSpacer, { style: { flex: 1 } }),
        onClose && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          import_components.Button,
          {
            label: (0, import_i18n.__)("Close"),
            icon: import_icons.closeSmall,
            onClick: onClose,
            size: "small"
          }
        )
      ] })
    }
  );
}
function DropdownContentWithValidation({
  touched,
  children
}) {
  const ref = (0, import_element.useRef)(null);
  (0, import_use_report_validity.default)(ref, touched);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { ref, children });
}
function PanelDropdown({
  data,
  field,
  onChange,
  validity
}) {
  const [touched, setTouched] = (0, import_element.useState)(false);
  const [popoverAnchor, setPopoverAnchor] = (0, import_element.useState)(
    null
  );
  const popoverProps = (0, import_element.useMemo)(
    () => ({
      // Anchor the popover to the middle of the entire row so that it doesn't
      // move around when the label changes.
      anchor: popoverAnchor,
      placement: "left-start",
      offset: 36,
      shift: true
    }),
    [popoverAnchor]
  );
  const [dialogRef, dialogProps] = (0, import_compose.__experimentalUseDialog)({
    focusOnMount: "firstInputElement"
  });
  const form = (0, import_element.useMemo)(
    () => ({
      layout: import_normalize_form.DEFAULT_LAYOUT,
      fields: !!field.children ? field.children : (
        // If not explicit children return the field id itself.
        [{ id: field.id, layout: import_normalize_form.DEFAULT_LAYOUT }]
      )
    }),
    [field]
  );
  const formValidity = (0, import_element.useMemo)(() => {
    if (validity === void 0) {
      return void 0;
    }
    if (!!field.children) {
      return validity?.children;
    }
    return { [field.id]: validity };
  }, [validity, field]);
  const { fieldDefinition, fieldLabel, summaryFields } = (0, import_use_field_from_form_field.default)(field);
  if (!fieldDefinition) {
    return null;
  }
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "div",
    {
      ref: setPopoverAnchor,
      className: "dataforms-layouts-panel__field-dropdown-anchor",
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        import_components.Dropdown,
        {
          contentClassName: "dataforms-layouts-panel__field-dropdown",
          popoverProps,
          focusOnMount: false,
          onToggle: (willOpen) => {
            if (!willOpen) {
              setTouched(true);
            }
          },
          renderToggle: ({ isOpen, onToggle }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            import_summary_button.default,
            {
              data,
              field,
              fieldLabel,
              summaryFields,
              validity,
              touched,
              disabled: fieldDefinition.readOnly === true,
              onClick: onToggle,
              "aria-expanded": isOpen
            }
          ),
          renderContent: ({ onClose }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownContentWithValidation, { touched, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { ref: dialogRef, ...dialogProps, children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              DropdownHeader,
              {
                title: fieldLabel,
                onClose
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              import_data_form_layout.DataFormLayout,
              {
                data,
                form,
                onChange,
                validity: formValidity,
                children: (FieldLayout, childField, childFieldValidity, markWhenOptional) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                  FieldLayout,
                  {
                    data,
                    field: childField,
                    onChange,
                    hideLabelFromVision: (form?.fields ?? []).length < 2,
                    markWhenOptional,
                    validity: childFieldValidity
                  },
                  childField.id
                )
              }
            )
          ] }) })
        }
      )
    }
  );
}
var dropdown_default = PanelDropdown;
//# sourceMappingURL=dropdown.cjs.map
