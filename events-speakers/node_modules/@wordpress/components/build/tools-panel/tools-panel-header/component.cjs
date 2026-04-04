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

// packages/components/src/tools-panel/tools-panel-header/component.tsx
var component_exports = {};
__export(component_exports, {
  default: () => component_default
});
module.exports = __toCommonJS(component_exports);
var import_a11y = require("@wordpress/a11y");
var import_icons = require("@wordpress/icons");
var import_i18n = require("@wordpress/i18n");
var import_dropdown_menu = __toESM(require("../../dropdown-menu/index.cjs"));
var import_menu_group = __toESM(require("../../menu-group/index.cjs"));
var import_menu_item = __toESM(require("../../menu-item/index.cjs"));
var import_h_stack = require("../../h-stack/index.cjs");
var import_heading = require("../../heading/index.cjs");
var import_hook = require("./hook.cjs");
var import_context = require("../../context/index.cjs");
var import_styles = require("../styles.cjs");
var import_jsx_runtime = require("react/jsx-runtime");
var DefaultControlsGroup = ({
  itemClassName,
  items,
  toggleItem
}) => {
  if (!items.length) {
    return null;
  }
  const resetSuffix = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_styles.ResetLabel, {
    "aria-hidden": true,
    children: (0, import_i18n.__)("Reset")
  });
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, {
    children: items.map(([label, hasValue]) => {
      if (hasValue) {
        return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_menu_item.default, {
          className: itemClassName,
          role: "menuitem",
          label: (0, import_i18n.sprintf)(
            // translators: %s: The name of the control being reset e.g. "Padding".
            (0, import_i18n.__)("Reset %s"),
            label
          ),
          onClick: () => {
            toggleItem(label);
            (0, import_a11y.speak)((0, import_i18n.sprintf)(
              // translators: %s: The name of the control being reset e.g. "Padding".
              (0, import_i18n.__)("%s reset to default"),
              label
            ), "assertive");
          },
          suffix: resetSuffix,
          children: label
        }, label);
      }
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_menu_item.default, {
        icon: import_icons.check,
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
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, {
    children: items.map(([label, isSelected]) => {
      const itemLabel = isSelected ? (0, import_i18n.sprintf)(
        // translators: %s: The name of the control being hidden and reset e.g. "Padding".
        (0, import_i18n.__)("Hide and reset %s"),
        label
      ) : (0, import_i18n.sprintf)(
        // translators: %s: The name of the control to display e.g. "Padding".
        (0, import_i18n._x)("Show %s", "input control"),
        label
      );
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_menu_item.default, {
        icon: isSelected ? import_icons.check : null,
        isSelected,
        label: itemLabel,
        onClick: () => {
          if (isSelected) {
            (0, import_a11y.speak)((0, import_i18n.sprintf)(
              // translators: %s: The name of the control being reset e.g. "Padding".
              (0, import_i18n.__)("%s hidden and reset to default"),
              label
            ), "assertive");
          } else {
            (0, import_a11y.speak)((0, import_i18n.sprintf)(
              // translators: %s: The name of the control being reset e.g. "Padding".
              (0, import_i18n.__)("%s is now visible"),
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
  } = (0, import_hook.useToolsPanelHeader)(props);
  if (!labelText) {
    return null;
  }
  const defaultItems = Object.entries(menuItems?.default || {});
  const optionalItems = Object.entries(menuItems?.optional || {});
  const dropDownMenuIcon = areAllOptionalControlsHidden ? import_icons.plus : import_icons.moreVertical;
  const dropDownMenuLabelText = (0, import_i18n.sprintf)(
    // translators: %s: The name of the tool e.g. "Color" or "Typography".
    (0, import_i18n._x)("%s options", "Button label to reveal tool panel options"),
    labelText
  );
  const dropdownMenuDescriptionText = areAllOptionalControlsHidden ? (0, import_i18n.__)("All options are currently hidden") : void 0;
  const canResetAll = [...defaultItems, ...optionalItems].some(([, isSelected]) => isSelected);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_h_stack.HStack, {
    ...headerProps,
    ref: forwardedRef,
    children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_heading.Heading, {
      level: headingLevel,
      className: headingClassName,
      children: labelText
    }), hasMenuItems && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_dropdown_menu.default, {
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
      children: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, {
        children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_menu_group.default, {
          label: labelText,
          children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DefaultControlsGroup, {
            items: defaultItems,
            toggleItem,
            itemClassName: defaultControlsItemClassName
          }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OptionalControlsGroup, {
            items: optionalItems,
            toggleItem
          })]
        }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_menu_group.default, {
          children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_menu_item.default, {
            "aria-disabled": !canResetAll,
            variant: "tertiary",
            onClick: () => {
              if (canResetAll) {
                resetAll();
                (0, import_a11y.speak)((0, import_i18n.__)("All options reset"), "assertive");
              }
            },
            children: (0, import_i18n.__)("Reset all")
          })
        })]
      })
    })]
  });
};
var ConnectedToolsPanelHeader = (0, import_context.contextConnect)(ToolsPanelHeader, "ToolsPanelHeader");
var component_default = ConnectedToolsPanelHeader;
//# sourceMappingURL=component.cjs.map
