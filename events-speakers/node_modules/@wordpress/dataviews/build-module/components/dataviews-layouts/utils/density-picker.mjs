// packages/dataviews/src/components/dataviews-layouts/utils/density-picker.tsx
import {
  __experimentalToggleGroupControl as ToggleGroupControl,
  __experimentalToggleGroupControlOption as ToggleGroupControlOption
} from "@wordpress/components";
import { __, _x } from "@wordpress/i18n";
import { useContext } from "@wordpress/element";
import DataViewsContext from "../../dataviews-context/index.mjs";
import { jsx, jsxs } from "react/jsx-runtime";
function DensityPicker() {
  const context = useContext(DataViewsContext);
  const view = context.view;
  return /* @__PURE__ */ jsxs(
    ToggleGroupControl,
    {
      size: "__unstable-large",
      label: __("Density"),
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
        /* @__PURE__ */ jsx(
          ToggleGroupControlOption,
          {
            value: "comfortable",
            label: _x(
              "Comfortable",
              "Density option for DataView layout"
            )
          },
          "comfortable"
        ),
        /* @__PURE__ */ jsx(
          ToggleGroupControlOption,
          {
            value: "balanced",
            label: _x("Balanced", "Density option for DataView layout")
          },
          "balanced"
        ),
        /* @__PURE__ */ jsx(
          ToggleGroupControlOption,
          {
            value: "compact",
            label: _x("Compact", "Density option for DataView layout")
          },
          "compact"
        )
      ]
    }
  );
}
export {
  DensityPicker as default
};
//# sourceMappingURL=density-picker.mjs.map
