// packages/dataviews/src/components/dataform-layouts/details/index.tsx
import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState
} from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { Stack } from "@wordpress/ui";
import DataFormContext from "../../dataform-context/index.mjs";
import { DataFormLayout } from "../data-form-layout.mjs";
import { DEFAULT_LAYOUT } from "../normalize-form.mjs";
import useReportValidity from "../../../hooks/use-report-validity.mjs";
import ValidationBadge from "../validation-badge.mjs";
import { jsx, jsxs } from "react/jsx-runtime";
function FormDetailsField({
  data,
  field,
  onChange,
  validity
}) {
  const { fields } = useContext(DataFormContext);
  const detailsRef = useRef(null);
  const contentRef = useRef(null);
  const [touched, setTouched] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const form = useMemo(
    () => ({
      layout: DEFAULT_LAYOUT,
      fields: field.children ?? []
    }),
    [field]
  );
  useEffect(() => {
    const details = detailsRef.current;
    if (!details) {
      return;
    }
    const handleToggle = () => {
      const nowOpen = details.open;
      if (!nowOpen) {
        setTouched(true);
      }
      setIsOpen(nowOpen);
    };
    details.addEventListener("toggle", handleToggle);
    return () => {
      details.removeEventListener("toggle", handleToggle);
    };
  }, []);
  useReportValidity(contentRef, isOpen && touched);
  const handleBlur = useCallback(() => {
    setTouched(true);
  }, []);
  if (!field.children) {
    return null;
  }
  const summaryFieldId = field.layout.summary ?? "";
  const summaryField = summaryFieldId ? fields.find((fieldDef) => fieldDef.id === summaryFieldId) : void 0;
  let summaryContent;
  if (summaryField && summaryField.render) {
    summaryContent = /* @__PURE__ */ jsx(summaryField.render, { item: data, field: summaryField });
  } else {
    summaryContent = field.label || __("More details");
  }
  return /* @__PURE__ */ jsxs(
    "details",
    {
      ref: detailsRef,
      className: "dataforms-layouts-details__details",
      children: [
        /* @__PURE__ */ jsx("summary", { className: "dataforms-layouts-details__summary", children: /* @__PURE__ */ jsxs(
          Stack,
          {
            direction: "row",
            align: "center",
            gap: "md",
            className: "dataforms-layouts-details__summary-content",
            children: [
              summaryContent,
              touched && /* @__PURE__ */ jsx(ValidationBadge, { validity })
            ]
          }
        ) }),
        /* @__PURE__ */ jsx(
          "div",
          {
            ref: contentRef,
            className: "dataforms-layouts-details__content",
            onBlur: handleBlur,
            children: /* @__PURE__ */ jsx(
              DataFormLayout,
              {
                data,
                form,
                onChange,
                validity: validity?.children
              }
            )
          }
        )
      ]
    }
  );
}
export {
  FormDetailsField as default
};
//# sourceMappingURL=index.mjs.map
