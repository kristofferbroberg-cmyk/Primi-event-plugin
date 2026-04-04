// packages/components/src/palette-edit/index.tsx
import clsx from "clsx";
import { useState, useRef, useEffect, useCallback, useMemo } from "@wordpress/element";
import { __, sprintf } from "@wordpress/i18n";
import { lineSolid, moreVertical, plus } from "@wordpress/icons";
import { useDebounce } from "@wordpress/compose";
import Button from "../button/index.mjs";
import { ColorPicker } from "../color-picker/index.mjs";
import { FlexBlock, FlexItem } from "../flex/index.mjs";
import { HStack } from "../h-stack/index.mjs";
import { Item, ItemGroup } from "../item-group/index.mjs";
import { VStack } from "../v-stack/index.mjs";
import GradientPicker from "../gradient-picker/index.mjs";
import ColorPalette from "../color-palette/index.mjs";
import DropdownMenu from "../dropdown-menu/index.mjs";
import Popover from "../popover/index.mjs";
import { PaletteActionsContainer, PaletteEditStyles, PaletteHeading, IndicatorStyled, NameContainer, NameInputControl, DoneButton, RemoveButton, PaletteEditContents } from "./styles.mjs";
import { NavigableMenu } from "../navigable-container/index.mjs";
import { DEFAULT_GRADIENT } from "../custom-gradient-picker/constants.mjs";
import CustomGradientPicker from "../custom-gradient-picker/index.mjs";
import { kebabCase } from "../utils/strings.mjs";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
var DEFAULT_COLOR = "#000";
function NameInput({
  value,
  onChange,
  label
}) {
  return /* @__PURE__ */ _jsx(NameInputControl, {
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
    name: sprintf(
      /* translators: %d: is an id for a custom color */
      __("Color %d"),
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
  const popoverProps = useMemo(() => ({
    shift: true,
    offset: 20,
    // Disabling resize as it would otherwise cause the popover to show
    // scrollbars while dragging the color picker's handle close to the
    // popover edge.
    resize: false,
    placement: "left-start",
    ...receivedPopoverProps,
    className: clsx("components-palette-edit__popover", receivedPopoverProps?.className)
  }), [receivedPopoverProps]);
  return /* @__PURE__ */ _jsxs(Popover, {
    ...popoverProps,
    onClose,
    children: [!isGradient && /* @__PURE__ */ _jsx(ColorPicker, {
      color: element.color,
      enableAlpha: true,
      onChange: (newColor) => {
        onChange({
          ...element,
          color: newColor
        });
      }
    }), isGradient && /* @__PURE__ */ _jsx("div", {
      className: "components-palette-edit__popover-gradient-picker",
      children: /* @__PURE__ */ _jsx(CustomGradientPicker, {
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
  const [isEditingColor, setIsEditingColor] = useState(false);
  const [popoverAnchor, setPopoverAnchor] = useState(null);
  const popoverProps = useMemo(() => ({
    ...receivedPopoverProps,
    // Use the custom palette color item as the popover anchor.
    anchor: popoverAnchor
  }), [popoverAnchor, receivedPopoverProps]);
  return /* @__PURE__ */ _jsxs(Item, {
    ref: setPopoverAnchor,
    size: "small",
    children: [/* @__PURE__ */ _jsxs(HStack, {
      justify: "flex-start",
      children: [/* @__PURE__ */ _jsx(Button, {
        size: "small",
        onClick: () => {
          setIsEditingColor(true);
        },
        "aria-label": sprintf(
          // translators: %s is a color or gradient name, e.g. "Red".
          __("Edit: %s"),
          element.name.trim().length ? element.name : value || ""
        ),
        style: {
          padding: 0
        },
        children: /* @__PURE__ */ _jsx(IndicatorStyled, {
          colorValue: value
        })
      }), /* @__PURE__ */ _jsx(FlexBlock, {
        children: !canOnlyChangeValues ? /* @__PURE__ */ _jsx(NameInput, {
          label: isGradient ? __("Gradient name") : __("Color name"),
          value: element.name,
          onChange: (nextName) => onChange({
            ...element,
            name: nextName,
            slug: slugPrefix + kebabCase(nextName ?? "")
          })
        }) : /* @__PURE__ */ _jsx(NameContainer, {
          children: element.name.trim().length ? element.name : (
            /* Fall back to non-breaking space to maintain height */
            "\xA0"
          )
        })
      }), !canOnlyChangeValues && /* @__PURE__ */ _jsx(FlexItem, {
        children: /* @__PURE__ */ _jsx(RemoveButton, {
          size: "small",
          icon: lineSolid,
          label: sprintf(
            // translators: %s is a color or gradient name, e.g. "Red".
            __("Remove color: %s"),
            element.name.trim().length ? element.name : value || ""
          ),
          onClick: onRemove
        })
      })]
    }), isEditingColor && /* @__PURE__ */ _jsx(ColorPickerPopover, {
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
  const elementsReferenceRef = useRef(void 0);
  useEffect(() => {
    elementsReferenceRef.current = elements;
  }, [elements]);
  const debounceOnChange = useDebounce((updatedElements) => onChange(deduplicateElementSlugs(updatedElements)), 100);
  return /* @__PURE__ */ _jsx(VStack, {
    spacing: 3,
    children: /* @__PURE__ */ _jsx(ItemGroup, {
      isRounded: true,
      isBordered: true,
      isSeparated: true,
      children: elements.map((element, index) => /* @__PURE__ */ _jsx(Option, {
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
  const [isEditing, setIsEditing] = useState(false);
  const [editingElement, setEditingElement] = useState(null);
  const isAdding = isEditing && !!editingElement && elements[editingElement] && !elements[editingElement].slug;
  const elementsLength = elements.length;
  const hasElements = elementsLength > 0;
  const debounceOnChange = useDebounce(onChange, 100);
  const onSelectPaletteItem = useCallback((value, newEditingElementIndex) => {
    const selectedElement = newEditingElementIndex === void 0 ? void 0 : elements[newEditingElementIndex];
    const key = isGradient ? "gradient" : "color";
    if (!!selectedElement && selectedElement[key] === value) {
      setEditingElement(newEditingElementIndex);
    } else {
      setIsEditing(true);
    }
  }, [isGradient, elements]);
  const addColorRef = useRef(null);
  return /* @__PURE__ */ _jsxs(PaletteEditStyles, {
    children: [/* @__PURE__ */ _jsxs(HStack, {
      children: [/* @__PURE__ */ _jsx(PaletteHeading, {
        level: paletteLabelHeadingLevel,
        children: paletteLabel
      }), /* @__PURE__ */ _jsxs(PaletteActionsContainer, {
        children: [hasElements && isEditing && /* @__PURE__ */ _jsx(DoneButton, {
          size: "small",
          onClick: () => {
            setIsEditing(false);
            setEditingElement(null);
          },
          children: __("Done")
        }), !canOnlyChangeValues && /* @__PURE__ */ _jsx(Button, {
          ref: addColorRef,
          size: "small",
          isPressed: isAdding,
          icon: plus,
          label: isGradient ? __("Add gradient") : __("Add color"),
          onClick: () => {
            const {
              name,
              slug
            } = getNameAndSlugForPosition(elements, slugPrefix);
            if (!!gradients) {
              onChange([...gradients, {
                gradient: DEFAULT_GRADIENT,
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
        }), hasElements && (!isEditing || !canOnlyChangeValues || canReset) && /* @__PURE__ */ _jsx(DropdownMenu, {
          icon: moreVertical,
          label: isGradient ? __("Gradient options") : __("Color options"),
          toggleProps: {
            size: "small"
          },
          children: ({
            onClose
          }) => /* @__PURE__ */ _jsx(_Fragment, {
            children: /* @__PURE__ */ _jsxs(NavigableMenu, {
              role: "menu",
              children: [!isEditing && /* @__PURE__ */ _jsx(Button, {
                __next40pxDefaultSize: true,
                variant: "tertiary",
                onClick: () => {
                  setIsEditing(true);
                  onClose();
                },
                className: "components-palette-edit__menu-button",
                children: __("Show details")
              }), !canOnlyChangeValues && /* @__PURE__ */ _jsx(Button, {
                __next40pxDefaultSize: true,
                variant: "tertiary",
                onClick: () => {
                  setEditingElement(null);
                  setIsEditing(false);
                  onChange();
                  onClose();
                },
                className: "components-palette-edit__menu-button",
                children: isGradient ? __("Remove all gradients") : __("Remove all colors")
              }), canReset && /* @__PURE__ */ _jsx(Button, {
                __next40pxDefaultSize: true,
                className: "components-palette-edit__menu-button",
                variant: "tertiary",
                onClick: () => {
                  setEditingElement(null);
                  onChange();
                  onClose();
                },
                children: isGradient ? __("Reset gradient") : __("Reset colors")
              })]
            })
          })
        })]
      })]
    }), hasElements && /* @__PURE__ */ _jsxs(PaletteEditContents, {
      children: [isEditing && /* @__PURE__ */ _jsx(PaletteEditListView, {
        canOnlyChangeValues,
        elements,
        onChange,
        slugPrefix,
        isGradient,
        popoverProps,
        addColorRef
      }), !isEditing && editingElement !== null && /* @__PURE__ */ _jsx(ColorPickerPopover, {
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
      }), !isEditing && (isGradient ? /* @__PURE__ */ _jsx(GradientPicker, {
        gradients,
        onChange: onSelectPaletteItem,
        clearable: false,
        disableCustomGradients: true
      }) : /* @__PURE__ */ _jsx(ColorPalette, {
        colors,
        onChange: onSelectPaletteItem,
        clearable: false,
        disableCustomColors: true
      }))]
    }), !hasElements && emptyMessage && /* @__PURE__ */ _jsx(PaletteEditContents, {
      children: emptyMessage
    })]
  });
}
var palette_edit_default = PaletteEdit;
export {
  PaletteEdit,
  deduplicateElementSlugs,
  palette_edit_default as default,
  getNameAndSlugForPosition
};
//# sourceMappingURL=index.mjs.map
