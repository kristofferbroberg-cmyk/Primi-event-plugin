// packages/dataviews/src/components/dataform-layouts/panel/summary-button.tsx
import clsx from "clsx";
import { Button, Icon, Tooltip } from "@wordpress/components";
import { sprintf, _x } from "@wordpress/i18n";
import { error as errorIcon, pencil } from "@wordpress/icons";
import { useInstanceId } from "@wordpress/compose";
import { useRef } from "@wordpress/element";
import getLabelClassName from "./utils/get-label-classname.mjs";
import getLabelContent from "./utils/get-label-content.mjs";
import getFirstValidationError from "./utils/get-first-validation-error.mjs";
import { jsx, jsxs } from "react/jsx-runtime";
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
  const errorMessage = getFirstValidationError(validity);
  const showError = touched && !!errorMessage;
  const labelClassName = getLabelClassName(labelPosition, showError);
  const labelContent = getLabelContent(showError, errorMessage, fieldLabel);
  const className = clsx(
    "dataforms-layouts-panel__field-trigger",
    `dataforms-layouts-panel__field-trigger--label-${labelPosition}`,
    {
      "is-disabled": disabled,
      "dataforms-layouts-panel__field-trigger--edit-always": editVisibility === "always"
    }
  );
  const controlId = useInstanceId(
    SummaryButton,
    "dataforms-layouts-panel__field-control"
  );
  const ariaLabel = showError ? sprintf(
    // translators: %s: Field name.
    _x("Edit %s (has errors)", "field"),
    fieldLabel || ""
  ) : sprintf(
    // translators: %s: Field name.
    _x("Edit %s", "field"),
    fieldLabel || ""
  );
  const rowRef = useRef(null);
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
  return /* @__PURE__ */ jsxs(
    "div",
    {
      ref: rowRef,
      className,
      onClick: !disabled ? handleRowClick : void 0,
      onKeyDown: !disabled ? handleKeyDown : void 0,
      children: [
        labelPosition !== "none" && /* @__PURE__ */ jsx("span", { className: labelClassName, children: labelContent }),
        labelPosition === "none" && showError && /* @__PURE__ */ jsx(Tooltip, { text: errorMessage, placement: "top", children: /* @__PURE__ */ jsx("span", { className: "dataforms-layouts-panel__field-label-error-content", children: /* @__PURE__ */ jsx(Icon, { icon: errorIcon, size: 16 }) }) }),
        /* @__PURE__ */ jsx(
          "span",
          {
            id: `${controlId}`,
            className: "dataforms-layouts-panel__field-control",
            children: summaryFields.length > 1 ? /* @__PURE__ */ jsx(
              "span",
              {
                style: {
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  width: "100%",
                  gap: "2px"
                },
                children: summaryFields.map((summaryField) => /* @__PURE__ */ jsx(
                  "span",
                  {
                    style: { width: "100%" },
                    children: /* @__PURE__ */ jsx(
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
            ) : summaryFields.map((summaryField) => /* @__PURE__ */ jsx(
              summaryField.render,
              {
                item: data,
                field: summaryField
              },
              summaryField.id
            ))
          }
        ),
        !disabled && /* @__PURE__ */ jsx(
          Button,
          {
            className: "dataforms-layouts-panel__field-trigger-icon",
            label: ariaLabel,
            showTooltip: false,
            icon: pencil,
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
export {
  SummaryButton as default
};
//# sourceMappingURL=summary-button.mjs.map
