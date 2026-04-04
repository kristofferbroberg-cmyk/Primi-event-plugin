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

// packages/components/src/radio-group/radio.tsx
var radio_exports = {};
__export(radio_exports, {
  Radio: () => Radio2,
  default: () => radio_default
});
module.exports = __toCommonJS(radio_exports);
var import_element = require("@wordpress/element");
var Ariakit = __toESM(require("@ariakit/react"));
var import_button = __toESM(require("../button/index.cjs"));
var import_context = require("./context.cjs");
var import_deprecated_36px_size = require("../utils/deprecated-36px-size.cjs");
var import_jsx_runtime = require("react/jsx-runtime");
function UnforwardedRadio({
  value,
  children,
  ...props
}, ref) {
  const {
    store,
    disabled
  } = (0, import_element.useContext)(import_context.RadioGroupContext);
  const selectedValue = Ariakit.useStoreState(store, "value");
  const isChecked = selectedValue !== void 0 && selectedValue === value;
  (0, import_deprecated_36px_size.maybeWarnDeprecated36pxSize)({
    componentName: "Radio",
    size: void 0,
    __next40pxDefaultSize: props.__next40pxDefaultSize
  });
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ariakit.Radio, {
    disabled,
    store,
    ref,
    value,
    render: (
      // Disable: the parent component already takes care of the `__next40pxDefaultSize` prop.
      // eslint-disable-next-line @wordpress/components-no-missing-40px-size-prop
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_button.default, {
        variant: isChecked ? "primary" : "secondary",
        ...props
      })
    ),
    children: children || value
  });
}
var Radio2 = (0, import_element.forwardRef)(UnforwardedRadio);
Radio2.displayName = "Radio";
var radio_default = Radio2;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Radio
});
//# sourceMappingURL=radio.cjs.map
