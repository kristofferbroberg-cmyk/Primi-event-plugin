// packages/dataviews/src/components/dataform-layouts/panel/modal.tsx
import deepMerge from "deepmerge";
import {
  __experimentalSpacer as Spacer,
  Button,
  Modal
} from "@wordpress/components";
import { useContext, useMemo, useRef, useState } from "@wordpress/element";
import { useFocusOnMount, useMergeRefs } from "@wordpress/compose";
import { Stack } from "@wordpress/ui";
import { DataFormLayout } from "../data-form-layout.mjs";
import { DEFAULT_LAYOUT } from "../normalize-form.mjs";
import SummaryButton from "./summary-button.mjs";
import useFormValidity from "../../../hooks/use-form-validity.mjs";
import useReportValidity from "../../../hooks/use-report-validity.mjs";
import DataFormContext from "../../dataform-context/index.mjs";
import useFieldFromFormField from "./utils/use-field-from-form-field.mjs";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
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
  const { fields } = useContext(DataFormContext);
  const [changes, setChanges] = useState({});
  const modalData = useMemo(() => {
    return deepMerge(data, changes, {
      arrayMerge: (target, source) => source
    });
  }, [data, changes]);
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
  const { validity } = useFormValidity(modalData, fieldsAsFieldType, form);
  const onApply = () => {
    onChange(changes);
    onClose();
  };
  const handleOnChange = (newValue) => {
    setChanges(
      (prev) => deepMerge(prev, newValue, {
        arrayMerge: (target, source) => source
      })
    );
  };
  const focusOnMountRef = useFocusOnMount("firstInputElement");
  const contentRef = useRef(null);
  const mergedRef = useMergeRefs([focusOnMountRef, contentRef]);
  useReportValidity(contentRef, touched);
  return /* @__PURE__ */ jsxs(
    Modal,
    {
      className: "dataforms-layouts-panel__modal",
      onRequestClose: onClose,
      isFullScreen: false,
      title: fieldLabel,
      size: "medium",
      children: [
        /* @__PURE__ */ jsx("div", { ref: mergedRef, children: /* @__PURE__ */ jsx(
          DataFormLayout,
          {
            data: modalData,
            form,
            onChange: handleOnChange,
            validity,
            children: (FieldLayout, childField, childFieldValidity, markWhenOptional) => /* @__PURE__ */ jsx(
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
        /* @__PURE__ */ jsxs(
          Stack,
          {
            direction: "row",
            className: "dataforms-layouts-panel__modal-footer",
            gap: "md",
            children: [
              /* @__PURE__ */ jsx(Spacer, { style: { flex: 1 } }),
              /* @__PURE__ */ jsx(
                Button,
                {
                  variant: "tertiary",
                  onClick: onClose,
                  __next40pxDefaultSize: true,
                  children: cancelLabel
                }
              ),
              /* @__PURE__ */ jsx(
                Button,
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
  const [touched, setTouched] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { fieldDefinition, fieldLabel, summaryFields } = useFieldFromFormField(field);
  if (!fieldDefinition) {
    return null;
  }
  const handleClose = () => {
    setIsOpen(false);
    setTouched(true);
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      SummaryButton,
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
    isOpen && /* @__PURE__ */ jsx(
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
export {
  modal_default as default
};
//# sourceMappingURL=modal.mjs.map
