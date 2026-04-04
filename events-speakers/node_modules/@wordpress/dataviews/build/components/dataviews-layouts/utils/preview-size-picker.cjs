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

// packages/dataviews/src/components/dataviews-layouts/utils/preview-size-picker.tsx
var preview_size_picker_exports = {};
__export(preview_size_picker_exports, {
  default: () => PreviewSizePicker
});
module.exports = __toCommonJS(preview_size_picker_exports);
var import_components = require("@wordpress/components");
var import_i18n = require("@wordpress/i18n");
var import_element = require("@wordpress/element");
var import_dataviews_context = __toESM(require("../../dataviews-context/index.cjs"));
var import_jsx_runtime = require("react/jsx-runtime");
var imageSizes = [
  {
    value: 120,
    breakpoint: 1
  },
  {
    value: 170,
    breakpoint: 1
  },
  {
    value: 230,
    breakpoint: 1
  },
  {
    value: 290,
    breakpoint: 1112
    // at minimum image width, 4 images display at this container size
  },
  {
    value: 350,
    breakpoint: 1636
    // at minimum image width, 6 images display at this container size
  },
  {
    value: 430,
    breakpoint: 588
    // at minimum image width, 2 images display at this container size
  }
];
function PreviewSizePicker() {
  const context = (0, import_element.useContext)(import_dataviews_context.default);
  const view = context.view;
  const breakValues = imageSizes.filter((size) => {
    return context.containerWidth >= size.breakpoint;
  });
  const layoutPreviewSize = view.layout?.previewSize ?? 230;
  const previewSizeToUse = breakValues.map((size, index) => ({ ...size, index })).filter((size) => size.value <= layoutPreviewSize).sort((a, b) => b.value - a.value)[0]?.index ?? 0;
  const marks = breakValues.map((size, index) => {
    return {
      value: index
    };
  });
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    import_components.RangeControl,
    {
      __next40pxDefaultSize: true,
      showTooltip: false,
      label: (0, import_i18n.__)("Preview size"),
      value: previewSizeToUse,
      min: 0,
      max: breakValues.length - 1,
      withInputField: false,
      onChange: (value = 0) => {
        context.onChangeView({
          ...view,
          layout: {
            ...view.layout,
            previewSize: breakValues[value].value
          }
        });
      },
      step: 1,
      marks
    }
  );
}
//# sourceMappingURL=preview-size-picker.cjs.map
