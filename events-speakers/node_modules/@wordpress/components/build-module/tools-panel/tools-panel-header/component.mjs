// packages/components/src/tools-panel/tools-panel-header/component.tsx
import { speak } from "@wordpress/a11y";
import { check, moreVertical, plus } from "@wordpress/icons";
import { __, _x, sprintf } from "@wordpress/i18n";
import DropdownMenu from "../../dropdown-menu/index.mjs";
import MenuGroup from "../../menu-group/index.mjs";
import MenuItem from "../../menu-item/index.mjs";
import { HStack } from "../../h-stack/index.mjs";
import { Heading } from "../../heading/index.mjs";
import { useToolsPanelHeader } from "./hook.mjs";
import { contextConnect } from "../../context/index.mjs";
import { ResetLabel } from "../styles.mjs";
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
var DefaultControlsGroup = ({
  itemClassName,
  items,
  toggleItem
}) => {
  if (!items.length) {
    return null;
  }
  const resetSuffix = /* @__PURE__ */ _jsx(ResetLabel, {
    "aria-hidden": true,
    children: __("Reset")
  });
  return /* @__PURE__ */ _jsx(_Fragment, {
    children: items.map(([label, hasValue]) => {
      if (hasValue) {
        return /* @__PURE__ */ _jsx(MenuItem, {
          className: itemClassName,
          role: "menuitem",
          label: sprintf(
            // translators: %s: The name of the control being reset e.g. "Padding".
            __("Reset %s"),
            label
          ),
          onClick: () => {
            toggleItem(label);
            speak(sprintf(
              // translators: %s: The name of the control being reset e.g. "Padding".
              __("%s reset to default"),
              label
            ), "assertive");
          },
          suffix: resetSuffix,
          children: label
        }, label);
      }
      return /* @__PURE__ */ _jsx(MenuItem, {
        icon: check,
        className: itemClassName,
        role: "menuitemcheckbox",
        isSelected: true,
        "aria-disabled": true,
        children: label
      }, label);
    })
  });
};
var OptionalControlsGroup = ({
  items,
  toggleItem
}) => {
  if (!items.length) {
    return null;
  }
  return /* @__PURE__ */ _jsx(_Fragment, {
    children: items.map(([label, isSelected]) => {
      const itemLabel = isSelected ? sprintf(
        // translators: %s: The name of the control being hidden and reset e.g. "Padding".
        __("Hide and reset %s"),
        label
      ) : sprintf(
        // translators: %s: The name of the control to display e.g. "Padding".
        _x("Show %s", "input control"),
        label
      );
      return /* @__PURE__ */ _jsx(MenuItem, {
        icon: isSelected ? check : null,
        isSelected,
        label: itemLabel,
        onClick: () => {
          if (isSelected) {
            speak(sprintf(
              // translators: %s: The name of the control being reset e.g. "Padding".
              __("%s hidden and reset to default"),
              label
            ), "assertive");
          } else {
            speak(sprintf(
              // translators: %s: The name of the control being reset e.g. "Padding".
              __("%s is now visible"),
              label
            ), "assertive");
          }
          toggleItem(label);
        },
        role: "menuitemcheckbox",
        children: label
      }, label);
    })
  });
};
var ToolsPanelHeader = (props, forwardedRef) => {
  const {
    areAllOptionalControlsHidden,
    defaultControlsItemClassName,
    dropdownMenuClassName,
    hasMenuItems,
    headingClassName,
    headingLevel = 2,
    label: labelText,
    menuItems,
    resetAll,
    toggleItem,
    dropdownMenuProps,
    ...headerProps
  } = useToolsPanelHeader(props);
  if (!labelText) {
    return null;
  }
  const defaultItems = Object.entries(menuItems?.default || {});
  const optionalItems = Object.entries(menuItems?.optional || {});
  const dropDownMenuIcon = areAllOptionalControlsHidden ? plus : moreVertical;
  const dropDownMenuLabelText = sprintf(
    // translators: %s: The name of the tool e.g. "Color" or "Typography".
    _x("%s options", "Button label to reveal tool panel options"),
    labelText
  );
  const dropdownMenuDescriptionText = areAllOptionalControlsHidden ? __("All options are currently hidden") : void 0;
  const canResetAll = [...defaultItems, ...optionalItems].some(([, isSelected]) => isSelected);
  return /* @__PURE__ */ _jsxs(HStack, {
    ...headerProps,
    ref: forwardedRef,
    children: [/* @__PURE__ */ _jsx(Heading, {
      level: headingLevel,
      className: headingClassName,
      children: labelText
    }), hasMenuItems && /* @__PURE__ */ _jsx(DropdownMenu, {
      ...dropdownMenuProps,
      icon: dropDownMenuIcon,
      label: dropDownMenuLabelText,
      menuProps: {
        className: dropdownMenuClassName
      },
      toggleProps: {
        size: "small",
        description: dropdownMenuDescriptionText
      },
      children: () => /* @__PURE__ */ _jsxs(_Fragment, {
        children: [/* @__PURE__ */ _jsxs(MenuGroup, {
          label: labelText,
          children: [/* @__PURE__ */ _jsx(DefaultControlsGroup, {
            items: defaultItems,
            toggleItem,
            itemClassName: defaultControlsItemClassName
          }), /* @__PURE__ */ _jsx(OptionalControlsGroup, {
            items: optionalItems,
            toggleItem
          })]
        }), /* @__PURE__ */ _jsx(MenuGroup, {
          children: /* @__PURE__ */ _jsx(MenuItem, {
            "aria-disabled": !canResetAll,
            variant: "tertiary",
            onClick: () => {
              if (canResetAll) {
                resetAll();
                speak(__("All options reset"), "assertive");
              }
            },
            children: __("Reset all")
          })
        })]
      })
    })]
  });
};
var ConnectedToolsPanelHeader = contextConnect(ToolsPanelHeader, "ToolsPanelHeader");
var component_default = ConnectedToolsPanelHeader;
export {
  component_default as default
};
//# sourceMappingURL=component.mjs.map
