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

// packages/dataviews/src/components/dataform-controls/toggle.tsx
var toggle_exports = {};
__export(toggle_exports, {
  default: () => Toggle
});
module.exports = __toCommonJS(toggle_exports);
var import_components = require("@wordpress/components");
var import_element = require("@wordpress/element");
var import_lock_unlock = require("../../lock-unlock.cjs");
var import_get_custom_validity = __toESM(require("./utils/get-custom-validity.cjs"));
var import_jsx_runtime = require("react/jsx-runtime");
var { ValidatedToggleControl } = (0, import_lock_unlock.unlock)(import_components.privateApis);
function Toggle({
  field,
  onChange,
  data,
  hideLabelFromVision,
  markWhenOptional,
  validity
}) {
  const { label, description, getValue, setValue, isValid } = field;
  const onChangeControl = (0, import_element.useCallback)(() => {
    onChange(
      setValue({ item: data, value: !getValue({ item: data }) })
    );
  }, [onChange, setValue, data, getValue]);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    ValidatedToggleControl,
    {
      required: !!isValid.required,
      markWhenOptional,
      customValidity: (0, import_get_custom_validity.default)(isValid, validity),
      hidden: hideLabelFromVision,
      label,
      help: description,
      checked: getValue({ item: data }),
      onChange: onChangeControl
    }
  );
}
//# sourceMappingURL=toggle.cjs.map
