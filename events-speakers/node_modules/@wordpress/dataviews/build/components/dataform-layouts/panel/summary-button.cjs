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

// packages/dataviews/src/components/dataform-layouts/panel/summary-button.tsx
var summary_button_exports = {};
__export(summary_button_exports, {
  default: () => SummaryButton
});
module.exports = __toCommonJS(summary_button_exports);
var import_clsx = __toESM(require("clsx"));
var import_components = require("@wordpress/components");
var import_i18n = require("@wordpress/i18n");
var import_icons = require("@wordpress/icons");
var import_compose = require("@wordpress/compose");
var import_element = require("@wordpress/element");
var import_get_label_classname = __toESM(require("./utils/get-label-classname.cjs"));
var import_get_label_content = __toESM(require("./utils/get-label-content.cjs"));
var import_get_first_validation_error = __toESM(require("./utils/get-first-validation-error.cjs"));
var import_jsx_runtime = require("react/jsx-runtime");
function SummaryButton({
  data,
  field,
  fieldLabel,
  summaryFields,
  validity,
  touched,
  disabled,
  onClick,
  "aria-expanded": ariaExpanded
}) {
  const { labelPosition, editVisibility } = field.layout;
  const errorMessage = (0, import_get_first_validation_error.default)(validity);
  const showError = touched && !!errorMessage;
  const labelClassName = (0, import_get_label_classname.default)(labelPosition, showError);
  const labelContent = (0, import_get_label_content.default)(showError, errorMessage, fieldLabel);
  const className = (0, import_clsx.default)(
    "dataforms-layouts-panel__field-trigger",
    `dataforms-layouts-panel__field-trigger--label-${labelPosition}`,
    {
      "is-disabled": disabled,
      "dataforms-layouts-panel__field-trigger--edit-always": editVisibility === "always"
    }
  );
  const controlId = (0, import_compose.useInstanceId)(
    SummaryButton,
    "dataforms-layouts-panel__field-control"
  );
  const ariaLabel = showError ? (0, import_i18n.sprintf)(
    // translators: %s: Field name.
    (0, import_i18n._x)("Edit %s (has errors)", "field"),
    fieldLabel || ""
  ) : (0, import_i18n.sprintf)(
    // translators: %s: Field name.
    (0, import_i18n._x)("Edit %s", "field"),
    fieldLabel || ""
  );
  const rowRef = (0, import_element.useRef)(null);
  const handleRowClick = () => {
    const selection = rowRef.current?.ownerDocument.defaultView?.getSelection();
    if (selection && selection.toString().length > 0) {
      return;
    }
    onClick();
  };
  const handleKeyDown = (event) => {
    if (event.target === event.currentTarget && (event.key === "Enter" || event.key === " ")) {
      event.preventDefault();
      onClick();
    }
  };
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    "div",
    {
      ref: rowRef,
      className,
      onClick: !disabled ? handleRowClick : void 0,
      onKeyDown: !disabled ? handleKeyDown : void 0,
      children: [
        labelPosition !== "none" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: labelClassName, children: labelContent }),
        labelPosition === "none" && showError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_components.Tooltip, { text: errorMessage, placement: "top", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "dataforms-layouts-panel__field-label-error-content", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_components.Icon, { icon: import_icons.error, size: 16 }) }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "span",
          {
            id: `${controlId}`,
            className: "dataforms-layouts-panel__field-control",
            children: summaryFields.length > 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              "span",
              {
                style: {
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  width: "100%",
                  gap: "2px"
                },
                children: summaryFields.map((summaryField) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                  "span",
                  {
                    style: { width: "100%" },
                    children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                      summaryField.render,
                      {
                        item: data,
                        field: summaryField
                      }
                    )
                  },
                  summaryField.id
                ))
              }
            ) : summaryFields.map((summaryField) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              summaryField.render,
              {
                item: data,
                field: summaryField
              },
              summaryField.id
            ))
          }
        ),
        !disabled && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          import_components.Button,
          {
            className: "dataforms-layouts-panel__field-trigger-icon",
            label: ariaLabel,
            showTooltip: false,
            icon: import_icons.pencil,
            size: "small",
            "aria-expanded": ariaExpanded,
            "aria-haspopup": "dialog",
            "aria-describedby": `${controlId}`
          }
        )
      ]
    }
  );
}
//# sourceMappingURL=summary-button.cjs.map
