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

// packages/dataviews/src/components/dataform-controls/password.tsx
var password_exports = {};
__export(password_exports, {
  default: () => Password
});
module.exports = __toCommonJS(password_exports);
var import_components = require("@wordpress/components");
var import_element = require("@wordpress/element");
var import_i18n = require("@wordpress/i18n");
var import_icons = require("@wordpress/icons");
var import_validated_input = __toESM(require("./utils/validated-input.cjs"));
var import_jsx_runtime = require("react/jsx-runtime");
function Password({
  data,
  field,
  onChange,
  hideLabelFromVision,
  markWhenOptional,
  validity
}) {
  const [isVisible, setIsVisible] = (0, import_element.useState)(false);
  const toggleVisibility = (0, import_element.useCallback)(() => {
    setIsVisible((prev) => !prev);
  }, []);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    import_validated_input.default,
    {
      ...{
        data,
        field,
        onChange,
        hideLabelFromVision,
        markWhenOptional,
        validity,
        type: isVisible ? "text" : "password",
        suffix: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_components.__experimentalInputControlSuffixWrapper, { variant: "control", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          import_components.Button,
          {
            icon: isVisible ? import_icons.unseen : import_icons.seen,
            onClick: toggleVisibility,
            size: "small",
            label: isVisible ? (0, import_i18n.__)("Hide password") : (0, import_i18n.__)("Show password")
          }
        ) })
      }
    }
  );
}
//# sourceMappingURL=password.cjs.map
