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

// packages/dataviews/src/components/dataform-controls/color.tsx
var color_exports = {};
__export(color_exports, {
  default: () => Color
});
module.exports = __toCommonJS(color_exports);
var import_colord = require("colord");
var import_components = require("@wordpress/components");
var import_element = require("@wordpress/element");
var import_i18n = require("@wordpress/i18n");
var import_lock_unlock = require("../../lock-unlock.cjs");
var import_get_custom_validity = __toESM(require("./utils/get-custom-validity.cjs"));
var import_jsx_runtime = require("react/jsx-runtime");
var { ValidatedInputControl } = (0, import_lock_unlock.unlock)(import_components.privateApis);
var ColorPickerDropdown = ({
  color,
  onColorChange
}) => {
  const validColor = color && (0, import_colord.colord)(color).isValid() ? color : "#ffffff";
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    import_components.Dropdown,
    {
      className: "dataviews-controls__color-picker-dropdown",
      popoverProps: { resize: false },
      renderToggle: ({ onToggle }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        import_components.Button,
        {
          onClick: onToggle,
          "aria-label": (0, import_i18n.__)("Open color picker"),
          size: "small",
          icon: () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_components.ColorIndicator, { colorValue: validColor })
        }
      ),
      renderContent: () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_components.__experimentalDropdownContentWrapper, { paddingSize: "none", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        import_components.ColorPicker,
        {
          color: validColor,
          onChange: onColorChange,
          enableAlpha: true
        }
      ) })
    }
  );
};
function Color({
  data,
  field,
  onChange,
  hideLabelFromVision,
  markWhenOptional,
  validity
}) {
  const { label, placeholder, description, setValue, isValid } = field;
  const value = field.getValue({ item: data }) || "";
  const handleColorChange = (0, import_element.useCallback)(
    (newColor) => {
      onChange(setValue({ item: data, value: newColor }));
    },
    [data, onChange, setValue]
  );
  const handleInputChange = (0, import_element.useCallback)(
    (newValue) => {
      onChange(setValue({ item: data, value: newValue || "" }));
    },
    [data, onChange, setValue]
  );
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    ValidatedInputControl,
    {
      required: !!field.isValid?.required,
      markWhenOptional,
      customValidity: (0, import_get_custom_validity.default)(isValid, validity),
      label,
      placeholder,
      value,
      help: description,
      onChange: handleInputChange,
      hideLabelFromVision,
      type: "text",
      prefix: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_components.__experimentalInputControlPrefixWrapper, { variant: "control", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        ColorPickerDropdown,
        {
          color: value,
          onColorChange: handleColorChange
        }
      ) })
    }
  );
}
//# sourceMappingURL=color.cjs.map
