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

// packages/dataviews/src/components/dataform-controls/array.tsx
var array_exports = {};
__export(array_exports, {
  default: () => ArrayControl
});
module.exports = __toCommonJS(array_exports);
var import_components = require("@wordpress/components");
var import_element = require("@wordpress/element");
var import_lock_unlock = require("../../lock-unlock.cjs");
var import_get_custom_validity = __toESM(require("./utils/get-custom-validity.cjs"));
var import_use_elements = __toESM(require("../../hooks/use-elements.cjs"));
var import_jsx_runtime = require("react/jsx-runtime");
var { ValidatedFormTokenField } = (0, import_lock_unlock.unlock)(import_components.privateApis);
function ArrayControl({
  data,
  field,
  onChange,
  hideLabelFromVision,
  markWhenOptional,
  validity
}) {
  const { label, placeholder, getValue, setValue, isValid } = field;
  const value = getValue({ item: data });
  const { elements, isLoading } = (0, import_use_elements.default)({
    elements: field.elements,
    getElements: field.getElements
  });
  const arrayValueAsElements = (0, import_element.useMemo)(
    () => Array.isArray(value) ? value.map((token) => {
      const element = elements?.find(
        (suggestion) => suggestion.value === token
      );
      return element || { value: token, label: token };
    }) : [],
    [value, elements]
  );
  const onChangeControl = (0, import_element.useCallback)(
    (tokens) => {
      const valueTokens = tokens.map((token) => {
        if (typeof token === "object" && "value" in token) {
          return token.value;
        }
        return token;
      });
      onChange(setValue({ item: data, value: valueTokens }));
    },
    [onChange, setValue, data]
  );
  if (isLoading) {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_components.Spinner, {});
  }
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    ValidatedFormTokenField,
    {
      required: !!isValid?.required,
      markWhenOptional,
      customValidity: (0, import_get_custom_validity.default)(isValid, validity),
      label: hideLabelFromVision ? void 0 : label,
      value: arrayValueAsElements,
      onChange: onChangeControl,
      placeholder,
      suggestions: elements?.map((element) => element.value),
      __experimentalValidateInput: (token) => {
        if (field.isValid?.elements && elements) {
          return elements.some(
            (element) => element.value === token || element.label === token
          );
        }
        return true;
      },
      __experimentalExpandOnFocus: elements && elements.length > 0,
      __experimentalShowHowTo: !field.isValid?.elements,
      displayTransform: (token) => {
        if (typeof token === "object" && "label" in token) {
          return token.label;
        }
        if (typeof token === "string" && elements) {
          const element = elements.find(
            (el) => el.value === token
          );
          return element?.label || token;
        }
        return token;
      },
      __experimentalRenderItem: ({ item }) => {
        if (typeof item === "string" && elements) {
          const element = elements.find(
            (el) => el.value === item
          );
          return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: element?.label || item });
        }
        return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item });
      }
    }
  );
}
//# sourceMappingURL=array.cjs.map
