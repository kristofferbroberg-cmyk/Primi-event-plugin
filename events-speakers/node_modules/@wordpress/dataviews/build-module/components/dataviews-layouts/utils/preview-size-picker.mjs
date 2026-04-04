// packages/dataviews/src/components/dataviews-layouts/utils/preview-size-picker.tsx
import { RangeControl } from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import { useContext } from "@wordpress/element";
import DataViewsContext from "../../dataviews-context/index.mjs";
import { jsx } from "react/jsx-runtime";
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
  const context = useContext(DataViewsContext);
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
  return /* @__PURE__ */ jsx(
    RangeControl,
    {
      __next40pxDefaultSize: true,
      showTooltip: false,
      label: __("Preview size"),
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
export {
  PreviewSizePicker as default
};
//# sourceMappingURL=preview-size-picker.mjs.map
