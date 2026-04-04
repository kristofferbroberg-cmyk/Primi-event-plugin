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

// packages/components/src/textarea-control/index.tsx
var textarea_control_exports = {};
__export(textarea_control_exports, {
  TextareaControl: () => TextareaControl,
  default: () => textarea_control_default
});
module.exports = __toCommonJS(textarea_control_exports);
var import_clsx = __toESM(require("clsx"));
var import_compose = require("@wordpress/compose");
var import_element = require("@wordpress/element");
var import_base_control = __toESM(require("../base-control/index.cjs"));
var import_textarea_control_styles = require("./styles/textarea-control-styles.cjs");
var import_jsx_runtime = require("react/jsx-runtime");
function UnforwardedTextareaControl(props, ref) {
  const {
    // Prevent passing this to `textarea`.
    __nextHasNoMarginBottom: _,
    label,
    hideLabelFromVision,
    value,
    help,
    onChange,
    rows = 4,
    className,
    ...additionalProps
  } = props;
  const instanceId = (0, import_compose.useInstanceId)(TextareaControl);
  const id = `inspector-textarea-control-${instanceId}`;
  const onChangeValue = (event) => onChange(event.target.value);
  const classes = (0, import_clsx.default)("components-textarea-control", className);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_base_control.default, {
    label,
    hideLabelFromVision,
    id,
    help,
    className: classes,
    children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_textarea_control_styles.StyledTextarea, {
      className: "components-textarea-control__input",
      id,
      rows,
      onChange: onChangeValue,
      "aria-describedby": !!help ? id + "__help" : void 0,
      value,
      ref,
      ...additionalProps
    })
  });
}
var TextareaControl = (0, import_element.forwardRef)(UnforwardedTextareaControl);
TextareaControl.displayName = "TextareaControl";
var textarea_control_default = TextareaControl;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  TextareaControl
});
//# sourceMappingURL=index.cjs.map
