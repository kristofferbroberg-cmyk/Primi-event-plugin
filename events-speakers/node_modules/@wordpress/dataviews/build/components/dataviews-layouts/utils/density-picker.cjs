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

// packages/dataviews/src/components/dataviews-layouts/utils/density-picker.tsx
var density_picker_exports = {};
__export(density_picker_exports, {
  default: () => DensityPicker
});
module.exports = __toCommonJS(density_picker_exports);
var import_components = require("@wordpress/components");
var import_i18n = require("@wordpress/i18n");
var import_element = require("@wordpress/element");
var import_dataviews_context = __toESM(require("../../dataviews-context/index.cjs"));
var import_jsx_runtime = require("react/jsx-runtime");
function DensityPicker() {
  const context = (0, import_element.useContext)(import_dataviews_context.default);
  const view = context.view;
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    import_components.__experimentalToggleGroupControl,
    {
      size: "__unstable-large",
      label: (0, import_i18n.__)("Density"),
      value: view.layout?.density || "balanced",
      onChange: (value) => {
        context.onChangeView({
          ...view,
          layout: {
            ...view.layout,
            density: value
          }
        });
      },
      isBlock: true,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          import_components.__experimentalToggleGroupControlOption,
          {
            value: "comfortable",
            label: (0, import_i18n._x)(
              "Comfortable",
              "Density option for DataView layout"
            )
          },
          "comfortable"
        ),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          import_components.__experimentalToggleGroupControlOption,
          {
            value: "balanced",
            label: (0, import_i18n._x)("Balanced", "Density option for DataView layout")
          },
          "balanced"
        ),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          import_components.__experimentalToggleGroupControlOption,
          {
            value: "compact",
            label: (0, import_i18n._x)("Compact", "Density option for DataView layout")
          },
          "compact"
        )
      ]
    }
  );
}
//# sourceMappingURL=density-picker.cjs.map
