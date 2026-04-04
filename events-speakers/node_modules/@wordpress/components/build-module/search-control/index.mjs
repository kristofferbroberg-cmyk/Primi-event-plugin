// packages/components/src/search-control/index.tsx
import clsx from "clsx";
import { useInstanceId, useMergeRefs } from "@wordpress/compose";
import { __ } from "@wordpress/i18n";
import { search, closeSmall } from "@wordpress/icons";
import { forwardRef, useRef } from "@wordpress/element";
import deprecated from "@wordpress/deprecated";
import Button from "../button/index.mjs";
import { InputControlPrefixWrapper } from "../input-control/input-prefix-wrapper.mjs";
import { InputControlSuffixWrapper } from "../input-control/input-suffix-wrapper.mjs";
import { StyledInputControl, StyledIcon } from "./styles.mjs";
import { jsx as _jsx } from "react/jsx-runtime";
function SuffixItem({
  searchRef,
  value,
  onChange,
  onClose
}) {
  if (!onClose && !value) {
    return null;
  }
  if (onClose) {
    deprecated("`onClose` prop in wp.components.SearchControl", {
      since: "6.8"
    });
  }
  const onReset = () => {
    onChange("");
    searchRef.current?.focus();
  };
  return /* @__PURE__ */ _jsx(InputControlSuffixWrapper, {
    variant: "control",
    children: /* @__PURE__ */ _jsx(Button, {
      size: "small",
      icon: closeSmall,
      label: onClose ? __("Close search") : __("Reset search"),
      onClick: onClose ?? onReset
    })
  });
}
function UnforwardedSearchControl({
  __nextHasNoMarginBottom: _,
  // Prevent passing to internal component
  className,
  onChange,
  value,
  label = __("Search"),
  placeholder = __("Search"),
  hideLabelFromVision = true,
  onClose,
  size = "default",
  ...restProps
}, forwardedRef) {
  const {
    disabled,
    ...filteredRestProps
  } = restProps;
  const searchRef = useRef(null);
  const instanceId = useInstanceId(SearchControl, "components-search-control");
  return /* @__PURE__ */ _jsx(StyledInputControl, {
    __next40pxDefaultSize: true,
    id: instanceId,
    hideLabelFromVision,
    label,
    ref: useMergeRefs([searchRef, forwardedRef]),
    type: "search",
    size,
    className: clsx("components-search-control", className),
    onChange: (nextValue) => onChange(nextValue ?? ""),
    autoComplete: "off",
    placeholder,
    value: value ?? "",
    prefix: /* @__PURE__ */ _jsx(InputControlPrefixWrapper, {
      variant: "icon",
      children: /* @__PURE__ */ _jsx(StyledIcon, {
        icon: search,
        fill: "currentColor"
      })
    }),
    suffix: /* @__PURE__ */ _jsx(SuffixItem, {
      searchRef,
      value,
      onChange,
      onClose
    }),
    ...filteredRestProps
  });
}
var SearchControl = forwardRef(UnforwardedSearchControl);
SearchControl.displayName = "SearchControl";
var search_control_default = SearchControl;
export {
  SearchControl,
  search_control_default as default
};
//# sourceMappingURL=index.mjs.map
