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

// packages/components/src/palette-edit/index.tsx
var palette_edit_exports = {};
__export(palette_edit_exports, {
  PaletteEdit: () => PaletteEdit,
  deduplicateElementSlugs: () => deduplicateElementSlugs,
  default: () => palette_edit_default,
  getNameAndSlugForPosition: () => getNameAndSlugForPosition
});
module.exports = __toCommonJS(palette_edit_exports);
var import_clsx = __toESM(require("clsx"));
var import_element = require("@wordpress/element");
var import_i18n = require("@wordpress/i18n");
var import_icons = require("@wordpress/icons");
var import_compose = require("@wordpress/compose");
var import_button = __toESM(require("../button/index.cjs"));
var import_color_picker = require("../color-picker/index.cjs");
var import_flex = require("../flex/index.cjs");
var import_h_stack = require("../h-stack/index.cjs");
var import_item_group = require("../item-group/index.cjs");
var import_v_stack = require("../v-stack/index.cjs");
var import_gradient_picker = __toESM(require("../gradient-picker/index.cjs"));
var import_color_palette = __toESM(require("../color-palette/index.cjs"));
var import_dropdown_menu = __toESM(require("../dropdown-menu/index.cjs"));
var import_popover = __toESM(require("../popover/index.cjs"));
var import_styles = require("./styles.cjs");
var import_navigable_container = require("../navigable-container/index.cjs");
var import_constants = require("../custom-gradient-picker/constants.cjs");
var import_custom_gradient_picker = __toESM(require("../custom-gradient-picker/index.cjs"));
var import_strings = require("../utils/strings.cjs");
var import_jsx_runtime = require("react/jsx-runtime");
var DEFAULT_COLOR = "#000";
function NameInput({
  value,
  onChange,
  label
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_styles.NameInputControl, {
    size: "compact",
    label,
    hideLabelFromVision: true,
    value,
    onChange
  });
}
function deduplicateElementSlugs(elements) {
  const slugCounts = {};
  return elements.map((element) => {
    let newSlug;
    const {
      slug
    } = element;
    slugCounts[slug] = (slugCounts[slug] || 0) + 1;
    if (slugCounts[slug] > 1) {
      newSlug = `${slug}-${slugCounts[slug] - 1}`;
    }
    return {
      ...element,
      slug: newSlug ?? slug
    };
  });
}
function getNameAndSlugForPosition(elements, slugPrefix) {
  const nameRegex = new RegExp(`^${slugPrefix}color-([\\d]+)$`);
  const position = elements.reduce((previousValue, currentValue) => {
    if (typeof currentValue?.slug === "string") {
      const matches = currentValue?.slug.match(nameRegex);
      if (matches) {
        const id = parseInt(matches[1], 10);
        if (id >= previousValue) {
          return id + 1;
        }
      }
    }
    return previousValue;
  }, 1);
  return {
    name: (0, import_i18n.sprintf)(
      /* translators: %d: is an id for a custom color */
      (0, import_i18n.__)("Color %d"),
      position
    ),
    slug: `${slugPrefix}color-${position}`
  };
}
function ColorPickerPopover({
  isGradient,
  element,
  onChange,
  popoverProps: receivedPopoverProps,
  onClose = () => {
  }
}) {
  const popoverProps = (0, import_element.useMemo)(() => ({
    shift: true,
    offset: 20,
    // Disabling resize as it would otherwise cause the popover to show
    // scrollbars while dragging the color picker's handle close to the
    // popover edge.
    resize: false,
    placement: "left-start",
    ...receivedPopoverProps,
    className: (0, import_clsx.default)("components-palette-edit__popover", receivedPopoverProps?.className)
  }), [receivedPopoverProps]);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_popover.default, {
    ...popoverProps,
    onClose,
    children: [!isGradient && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_color_picker.ColorPicker, {
      color: element.color,
      enableAlpha: true,
      onChange: (newColor) => {
        onChange({
          ...element,
          color: newColor
        });
      }
    }), isGradient && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
      className: "components-palette-edit__popover-gradient-picker",
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_custom_gradient_picker.default, {
        __experimentalIsRenderedInSidebar: true,
        value: element.gradient,
        onChange: (newGradient) => {
          onChange({
            ...element,
            gradient: newGradient
          });
        }
      })
    })]
  });
}
function Option({
  canOnlyChangeValues,
  element,
  onChange,
  onRemove,
  popoverProps: receivedPopoverProps,
  slugPrefix,
  isGradient
}) {
  const value = isGradient ? element.gradient : element.color;
  const [isEditingColor, setIsEditingColor] = (0, import_element.useState)(false);
  const [popoverAnchor, setPopoverAnchor] = (0, import_element.useState)(null);
  const popoverProps = (0, import_element.useMemo)(() => ({
    ...receivedPopoverProps,
    // Use the custom palette color item as the popover anchor.
    anchor: popoverAnchor
  }), [popoverAnchor, receivedPopoverProps]);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_item_group.Item, {
    ref: setPopoverAnchor,
    size: "small",
    children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_h_stack.HStack, {
      justify: "flex-start",
      children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_button.default, {
        size: "small",
        onClick: () => {
          setIsEditingColor(true);
        },
        "aria-label": (0, import_i18n.sprintf)(
          // translators: %s is a color or gradient name, e.g. "Red".
          (0, import_i18n.__)("Edit: %s"),
          element.name.trim().length ? element.name : value || ""
        ),
        style: {
          padding: 0
        },
        children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_styles.IndicatorStyled, {
          colorValue: value
        })
      }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_flex.FlexBlock, {
        children: !canOnlyChangeValues ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NameInput, {
          label: isGradient ? (0, import_i18n.__)("Gradient name") : (0, import_i18n.__)("Color name"),
          value: element.name,
          onChange: (nextName) => onChange({
            ...element,
            name: nextName,
            slug: slugPrefix + (0, import_strings.kebabCase)(nextName ?? "")
          })
        }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_styles.NameContainer, {
          children: element.name.trim().length ? element.name : (
            /* Fall back to non-breaking space to maintain height */
            "\xA0"
          )
        })
      }), !canOnlyChangeValues && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_flex.FlexItem, {
        children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_styles.RemoveButton, {
          size: "small",
          icon: import_icons.lineSolid,
          label: (0, import_i18n.sprintf)(
            // translators: %s is a color or gradient name, e.g. "Red".
            (0, import_i18n.__)("Remove color: %s"),
            element.name.trim().length ? element.name : value || ""
          ),
          onClick: onRemove
        })
      })]
    }), isEditingColor && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ColorPickerPopover, {
      isGradient,
      onChange,
      element,
      popoverProps,
      onClose: () => setIsEditingColor(false)
    })]
  });
}
function PaletteEditListView({
  elements,
  onChange,
  canOnlyChangeValues,
  slugPrefix,
  isGradient,
  popoverProps,
  addColorRef
}) {
  const elementsReferenceRef = (0, import_element.useRef)(void 0);
  (0, import_element.useEffect)(() => {
    elementsReferenceRef.current = elements;
  }, [elements]);
  const debounceOnChange = (0, import_compose.useDebounce)((updatedElements) => onChange(deduplicateElementSlugs(updatedElements)), 100);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_v_stack.VStack, {
    spacing: 3,
    children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_item_group.ItemGroup, {
      isRounded: true,
      isBordered: true,
      isSeparated: true,
      children: elements.map((element, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Option, {
        isGradient,
        canOnlyChangeValues,
        element,
        onChange: (newElement) => {
          debounceOnChange(elements.map((currentElement, currentIndex) => {
            if (currentIndex === index) {
              return newElement;
            }
            return currentElement;
          }));
        },
        onRemove: () => {
          const newElements = elements.filter((_currentElement, currentIndex) => {
            if (currentIndex === index) {
              return false;
            }
            return true;
          });
          onChange(newElements.length ? newElements : void 0);
          addColorRef.current?.focus();
        },
        slugPrefix,
        popoverProps
      }, index))
    })
  });
}
var EMPTY_ARRAY = [];
function PaletteEdit({
  gradients,
  colors = EMPTY_ARRAY,
  onChange,
  paletteLabel,
  paletteLabelHeadingLevel = 2,
  emptyMessage,
  canOnlyChangeValues,
  canReset,
  slugPrefix = "",
  popoverProps
}) {
  const isGradient = !!gradients;
  const elements = isGradient ? gradients : colors;
  const [isEditing, setIsEditing] = (0, import_element.useState)(false);
  const [editingElement, setEditingElement] = (0, import_element.useState)(null);
  const isAdding = isEditing && !!editingElement && elements[editingElement] && !elements[editingElement].slug;
  const elementsLength = elements.length;
  const hasElements = elementsLength > 0;
  const debounceOnChange = (0, import_compose.useDebounce)(onChange, 100);
  const onSelectPaletteItem = (0, import_element.useCallback)((value, newEditingElementIndex) => {
    const selectedElement = newEditingElementIndex === void 0 ? void 0 : elements[newEditingElementIndex];
    const key = isGradient ? "gradient" : "color";
    if (!!selectedElement && selectedElement[key] === value) {
      setEditingElement(newEditingElementIndex);
    } else {
      setIsEditing(true);
    }
  }, [isGradient, elements]);
  const addColorRef = (0, import_element.useRef)(null);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_styles.PaletteEditStyles, {
    children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_h_stack.HStack, {
      children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_styles.PaletteHeading, {
        level: paletteLabelHeadingLevel,
        children: paletteLabel
      }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_styles.PaletteActionsContainer, {
        children: [hasElements && isEditing && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_styles.DoneButton, {
          size: "small",
          onClick: () => {
            setIsEditing(false);
            setEditingElement(null);
          },
          children: (0, import_i18n.__)("Done")
        }), !canOnlyChangeValues && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_button.default, {
          ref: addColorRef,
          size: "small",
          isPressed: isAdding,
          icon: import_icons.plus,
          label: isGradient ? (0, import_i18n.__)("Add gradient") : (0, import_i18n.__)("Add color"),
          onClick: () => {
            const {
              name,
              slug
            } = getNameAndSlugForPosition(elements, slugPrefix);
            if (!!gradients) {
              onChange([...gradients, {
                gradient: import_constants.DEFAULT_GRADIENT,
                name,
                slug
              }]);
            } else {
              onChange([...colors, {
                color: DEFAULT_COLOR,
                name,
                slug
              }]);
            }
            setIsEditing(true);
            setEditingElement(elements.length);
          }
        }), hasElements && (!isEditing || !canOnlyChangeValues || canReset) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_dropdown_menu.default, {
          icon: import_icons.moreVertical,
          label: isGradient ? (0, import_i18n.__)("Gradient options") : (0, import_i18n.__)("Color options"),
          toggleProps: {
            size: "small"
          },
          children: ({
            onClose
          }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, {
            children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_navigable_container.NavigableMenu, {
              role: "menu",
              children: [!isEditing && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_button.default, {
                __next40pxDefaultSize: true,
                variant: "tertiary",
                onClick: () => {
                  setIsEditing(true);
                  onClose();
                },
                className: "components-palette-edit__menu-button",
                children: (0, import_i18n.__)("Show details")
              }), !canOnlyChangeValues && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_button.default, {
                __next40pxDefaultSize: true,
                variant: "tertiary",
                onClick: () => {
                  setEditingElement(null);
                  setIsEditing(false);
                  onChange();
                  onClose();
                },
                className: "components-palette-edit__menu-button",
                children: isGradient ? (0, import_i18n.__)("Remove all gradients") : (0, import_i18n.__)("Remove all colors")
              }), canReset && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_button.default, {
                __next40pxDefaultSize: true,
                className: "components-palette-edit__menu-button",
                variant: "tertiary",
                onClick: () => {
                  setEditingElement(null);
                  onChange();
                  onClose();
                },
                children: isGradient ? (0, import_i18n.__)("Reset gradient") : (0, import_i18n.__)("Reset colors")
              })]
            })
          })
        })]
      })]
    }), hasElements && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_styles.PaletteEditContents, {
      children: [isEditing && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaletteEditListView, {
        canOnlyChangeValues,
        elements,
        onChange,
        slugPrefix,
        isGradient,
        popoverProps,
        addColorRef
      }), !isEditing && editingElement !== null && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ColorPickerPopover, {
        isGradient,
        onClose: () => setEditingElement(null),
        onChange: (newElement) => {
          debounceOnChange(
            // @ts-expect-error TODO: Don't know how to resolve
            elements.map((currentElement, currentIndex) => {
              if (currentIndex === editingElement) {
                return newElement;
              }
              return currentElement;
            })
          );
        },
        element: elements[editingElement ?? -1],
        popoverProps
      }), !isEditing && (isGradient ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_gradient_picker.default, {
        gradients,
        onChange: onSelectPaletteItem,
        clearable: false,
        disableCustomGradients: true
      }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_color_palette.default, {
        colors,
        onChange: onSelectPaletteItem,
        clearable: false,
        disableCustomColors: true
      }))]
    }), !hasElements && emptyMessage && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_styles.PaletteEditContents, {
      children: emptyMessage
    })]
  });
}
var palette_edit_default = PaletteEdit;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  PaletteEdit,
  deduplicateElementSlugs,
  getNameAndSlugForPosition
});
//# sourceMappingURL=index.cjs.map
