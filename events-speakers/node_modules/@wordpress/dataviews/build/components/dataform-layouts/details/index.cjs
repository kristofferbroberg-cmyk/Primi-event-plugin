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

// packages/dataviews/src/components/dataform-layouts/details/index.tsx
var details_exports = {};
__export(details_exports, {
  default: () => FormDetailsField
});
module.exports = __toCommonJS(details_exports);
var import_element = require("@wordpress/element");
var import_i18n = require("@wordpress/i18n");
var import_ui = require("@wordpress/ui");
var import_dataform_context = __toESM(require("../../dataform-context/index.cjs"));
var import_data_form_layout = require("../data-form-layout.cjs");
var import_normalize_form = require("../normalize-form.cjs");
var import_use_report_validity = __toESM(require("../../../hooks/use-report-validity.cjs"));
var import_validation_badge = __toESM(require("../validation-badge.cjs"));
var import_jsx_runtime = require("react/jsx-runtime");
function FormDetailsField({
  data,
  field,
  onChange,
  validity
}) {
  const { fields } = (0, import_element.useContext)(import_dataform_context.default);
  const detailsRef = (0, import_element.useRef)(null);
  const contentRef = (0, import_element.useRef)(null);
  const [touched, setTouched] = (0, import_element.useState)(false);
  const [isOpen, setIsOpen] = (0, import_element.useState)(false);
  const form = (0, import_element.useMemo)(
    () => ({
      layout: import_normalize_form.DEFAULT_LAYOUT,
      fields: field.children ?? []
    }),
    [field]
  );
  (0, import_element.useEffect)(() => {
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
  (0, import_use_report_validity.default)(contentRef, isOpen && touched);
  const handleBlur = (0, import_element.useCallback)(() => {
    setTouched(true);
  }, []);
  if (!field.children) {
    return null;
  }
  const summaryFieldId = field.layout.summary ?? "";
  const summaryField = summaryFieldId ? fields.find((fieldDef) => fieldDef.id === summaryFieldId) : void 0;
  let summaryContent;
  if (summaryField && summaryField.render) {
    summaryContent = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(summaryField.render, { item: data, field: summaryField });
  } else {
    summaryContent = field.label || (0, import_i18n.__)("More details");
  }
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    "details",
    {
      ref: detailsRef,
      className: "dataforms-layouts-details__details",
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("summary", { className: "dataforms-layouts-details__summary", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
          import_ui.Stack,
          {
            direction: "row",
            align: "center",
            gap: "md",
            className: "dataforms-layouts-details__summary-content",
            children: [
              summaryContent,
              touched && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_validation_badge.default, { validity })
            ]
          }
        ) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "div",
          {
            ref: contentRef,
            className: "dataforms-layouts-details__content",
            onBlur: handleBlur,
            children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              import_data_form_layout.DataFormLayout,
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
//# sourceMappingURL=index.cjs.map
