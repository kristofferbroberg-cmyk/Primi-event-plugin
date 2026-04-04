// packages/dataviews/src/components/dataform-layouts/panel/dropdown.tsx
import {
  __experimentalHeading as Heading,
  __experimentalSpacer as Spacer,
  Dropdown,
  Button
} from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import { useMemo, useRef, useState } from "@wordpress/element";
import { closeSmall } from "@wordpress/icons";
import { __experimentalUseDialog as useDialog } from "@wordpress/compose";
import { Stack } from "@wordpress/ui";
import { DataFormLayout } from "../data-form-layout.mjs";
import { DEFAULT_LAYOUT } from "../normalize-form.mjs";
import SummaryButton from "./summary-button.mjs";
import useReportValidity from "../../../hooks/use-report-validity.mjs";
import useFieldFromFormField from "./utils/use-field-from-form-field.mjs";
import { jsx, jsxs } from "react/jsx-runtime";
function DropdownHeader({
  title,
  onClose
}) {
  return /* @__PURE__ */ jsx(
    Stack,
    {
      direction: "column",
      className: "dataforms-layouts-panel__dropdown-header",
      gap: "lg",
      children: /* @__PURE__ */ jsxs(Stack, { direction: "row", gap: "sm", align: "center", children: [
        title && /* @__PURE__ */ jsx(Heading, { level: 2, size: 13, children: title }),
        /* @__PURE__ */ jsx(Spacer, { style: { flex: 1 } }),
        onClose && /* @__PURE__ */ jsx(
          Button,
          {
            label: __("Close"),
            icon: closeSmall,
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
  const ref = useRef(null);
  useReportValidity(ref, touched);
  return /* @__PURE__ */ jsx("div", { ref, children });
}
function PanelDropdown({
  data,
  field,
  onChange,
  validity
}) {
  const [touched, setTouched] = useState(false);
  const [popoverAnchor, setPopoverAnchor] = useState(
    null
  );
  const popoverProps = useMemo(
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
  const [dialogRef, dialogProps] = useDialog({
    focusOnMount: "firstInputElement"
  });
  const form = useMemo(
    () => ({
      layout: DEFAULT_LAYOUT,
      fields: !!field.children ? field.children : (
        // If not explicit children return the field id itself.
        [{ id: field.id, layout: DEFAULT_LAYOUT }]
      )
    }),
    [field]
  );
  const formValidity = useMemo(() => {
    if (validity === void 0) {
      return void 0;
    }
    if (!!field.children) {
      return validity?.children;
    }
    return { [field.id]: validity };
  }, [validity, field]);
  const { fieldDefinition, fieldLabel, summaryFields } = useFieldFromFormField(field);
  if (!fieldDefinition) {
    return null;
  }
  return /* @__PURE__ */ jsx(
    "div",
    {
      ref: setPopoverAnchor,
      className: "dataforms-layouts-panel__field-dropdown-anchor",
      children: /* @__PURE__ */ jsx(
        Dropdown,
        {
          contentClassName: "dataforms-layouts-panel__field-dropdown",
          popoverProps,
          focusOnMount: false,
          onToggle: (willOpen) => {
            if (!willOpen) {
              setTouched(true);
            }
          },
          renderToggle: ({ isOpen, onToggle }) => /* @__PURE__ */ jsx(
            SummaryButton,
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
          renderContent: ({ onClose }) => /* @__PURE__ */ jsx(DropdownContentWithValidation, { touched, children: /* @__PURE__ */ jsxs("div", { ref: dialogRef, ...dialogProps, children: [
            /* @__PURE__ */ jsx(
              DropdownHeader,
              {
                title: fieldLabel,
                onClose
              }
            ),
            /* @__PURE__ */ jsx(
              DataFormLayout,
              {
                data,
                form,
                onChange,
                validity: formValidity,
                children: (FieldLayout, childField, childFieldValidity, markWhenOptional) => /* @__PURE__ */ jsx(
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
export {
  dropdown_default as default
};
//# sourceMappingURL=dropdown.mjs.map
