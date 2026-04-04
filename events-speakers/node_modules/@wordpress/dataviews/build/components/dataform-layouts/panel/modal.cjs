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

// packages/dataviews/src/components/dataform-layouts/panel/modal.tsx
var modal_exports = {};
__export(modal_exports, {
  default: () => modal_default
});
module.exports = __toCommonJS(modal_exports);
var import_deepmerge = __toESM(require("deepmerge"));
var import_components = require("@wordpress/components");
var import_element = require("@wordpress/element");
var import_compose = require("@wordpress/compose");
var import_ui = require("@wordpress/ui");
var import_data_form_layout = require("../data-form-layout.cjs");
var import_normalize_form = require("../normalize-form.cjs");
var import_summary_button = __toESM(require("./summary-button.cjs"));
var import_use_form_validity = __toESM(require("../../../hooks/use-form-validity.cjs"));
var import_use_report_validity = __toESM(require("../../../hooks/use-report-validity.cjs"));
var import_dataform_context = __toESM(require("../../dataform-context/index.cjs"));
var import_use_field_from_form_field = __toESM(require("./utils/use-field-from-form-field.cjs"));
var import_jsx_runtime = require("react/jsx-runtime");
function ModalContent({
  data,
  field,
  onChange,
  fieldLabel,
  onClose,
  touched
}) {
  const { openAs } = field.layout;
  const { applyLabel, cancelLabel } = openAs;
  const { fields } = (0, import_element.useContext)(import_dataform_context.default);
  const [changes, setChanges] = (0, import_element.useState)({});
  const modalData = (0, import_element.useMemo)(() => {
    return (0, import_deepmerge.default)(data, changes, {
      arrayMerge: (target, source) => source
    });
  }, [data, changes]);
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
  const fieldsAsFieldType = fields.map((f) => ({
    ...f,
    Edit: f.Edit === null ? void 0 : f.Edit,
    isValid: {
      required: f.isValid.required?.constraint,
      elements: f.isValid.elements?.constraint,
      min: f.isValid.min?.constraint,
      max: f.isValid.max?.constraint,
      pattern: f.isValid.pattern?.constraint,
      minLength: f.isValid.minLength?.constraint,
      maxLength: f.isValid.maxLength?.constraint
    }
  }));
  const { validity } = (0, import_use_form_validity.default)(modalData, fieldsAsFieldType, form);
  const onApply = () => {
    onChange(changes);
    onClose();
  };
  const handleOnChange = (newValue) => {
    setChanges(
      (prev) => (0, import_deepmerge.default)(prev, newValue, {
        arrayMerge: (target, source) => source
      })
    );
  };
  const focusOnMountRef = (0, import_compose.useFocusOnMount)("firstInputElement");
  const contentRef = (0, import_element.useRef)(null);
  const mergedRef = (0, import_compose.useMergeRefs)([focusOnMountRef, contentRef]);
  (0, import_use_report_validity.default)(contentRef, touched);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    import_components.Modal,
    {
      className: "dataforms-layouts-panel__modal",
      onRequestClose: onClose,
      isFullScreen: false,
      title: fieldLabel,
      size: "medium",
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { ref: mergedRef, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          import_data_form_layout.DataFormLayout,
          {
            data: modalData,
            form,
            onChange: handleOnChange,
            validity,
            children: (FieldLayout, childField, childFieldValidity, markWhenOptional) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              FieldLayout,
              {
                data: modalData,
                field: childField,
                onChange: handleOnChange,
                hideLabelFromVision: form.fields.length < 2,
                markWhenOptional,
                validity: childFieldValidity
              },
              childField.id
            )
          }
        ) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
          import_ui.Stack,
          {
            direction: "row",
            className: "dataforms-layouts-panel__modal-footer",
            gap: "md",
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_components.__experimentalSpacer, { style: { flex: 1 } }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                import_components.Button,
                {
                  variant: "tertiary",
                  onClick: onClose,
                  __next40pxDefaultSize: true,
                  children: cancelLabel
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                import_components.Button,
                {
                  variant: "primary",
                  onClick: onApply,
                  __next40pxDefaultSize: true,
                  children: applyLabel
                }
              )
            ]
          }
        )
      ]
    }
  );
}
function PanelModal({
  data,
  field,
  onChange,
  validity
}) {
  const [touched, setTouched] = (0, import_element.useState)(false);
  const [isOpen, setIsOpen] = (0, import_element.useState)(false);
  const { fieldDefinition, fieldLabel, summaryFields } = (0, import_use_field_from_form_field.default)(field);
  if (!fieldDefinition) {
    return null;
  }
  const handleClose = () => {
    setIsOpen(false);
    setTouched(true);
  };
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      import_summary_button.default,
      {
        data,
        field,
        fieldLabel,
        summaryFields,
        validity,
        touched,
        disabled: fieldDefinition.readOnly === true,
        onClick: () => setIsOpen(true),
        "aria-expanded": isOpen
      }
    ),
    isOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      ModalContent,
      {
        data,
        field,
        onChange,
        fieldLabel: fieldLabel ?? "",
        onClose: handleClose,
        touched
      }
    )
  ] });
}
var modal_default = PanelModal;
//# sourceMappingURL=modal.cjs.map
