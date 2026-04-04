// packages/dataviews/src/components/dataform-controls/color.tsx
import { colord } from "colord";
import {
  Button,
  ColorIndicator,
  ColorPicker,
  Dropdown,
  privateApis,
  __experimentalInputControlPrefixWrapper as InputControlPrefixWrapper,
  __experimentalDropdownContentWrapper as DropdownContentWrapper
} from "@wordpress/components";
import { useCallback } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { unlock } from "../../lock-unlock.mjs";
import getCustomValidity from "./utils/get-custom-validity.mjs";
import { jsx } from "react/jsx-runtime";
var { ValidatedInputControl } = unlock(privateApis);
var ColorPickerDropdown = ({
  color,
  onColorChange
}) => {
  const validColor = color && colord(color).isValid() ? color : "#ffffff";
  return /* @__PURE__ */ jsx(
    Dropdown,
    {
      className: "dataviews-controls__color-picker-dropdown",
      popoverProps: { resize: false },
      renderToggle: ({ onToggle }) => /* @__PURE__ */ jsx(
        Button,
        {
          onClick: onToggle,
          "aria-label": __("Open color picker"),
          size: "small",
          icon: () => /* @__PURE__ */ jsx(ColorIndicator, { colorValue: validColor })
        }
      ),
      renderContent: () => /* @__PURE__ */ jsx(DropdownContentWrapper, { paddingSize: "none", children: /* @__PURE__ */ jsx(
        ColorPicker,
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
  const handleColorChange = useCallback(
    (newColor) => {
      onChange(setValue({ item: data, value: newColor }));
    },
    [data, onChange, setValue]
  );
  const handleInputChange = useCallback(
    (newValue) => {
      onChange(setValue({ item: data, value: newValue || "" }));
    },
    [data, onChange, setValue]
  );
  return /* @__PURE__ */ jsx(
    ValidatedInputControl,
    {
      required: !!field.isValid?.required,
      markWhenOptional,
      customValidity: getCustomValidity(isValid, validity),
      label,
      placeholder,
      value,
      help: description,
      onChange: handleInputChange,
      hideLabelFromVision,
      type: "text",
      prefix: /* @__PURE__ */ jsx(InputControlPrefixWrapper, { variant: "control", children: /* @__PURE__ */ jsx(
        ColorPickerDropdown,
        {
          color: value,
          onColorChange: handleColorChange
        }
      ) })
    }
  );
}
export {
  Color as default
};
//# sourceMappingURL=color.mjs.map
