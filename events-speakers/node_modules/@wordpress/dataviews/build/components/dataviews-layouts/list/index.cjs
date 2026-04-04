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

// packages/dataviews/src/components/dataviews-layouts/list/index.tsx
var list_exports = {};
__export(list_exports, {
  default: () => ViewList
});
module.exports = __toCommonJS(list_exports);
var import_clsx = __toESM(require("clsx"));
var import_compose = require("@wordpress/compose");
var import_components = require("@wordpress/components");
var import_element = require("@wordpress/element");
var import_i18n = require("@wordpress/i18n");
var import_icons = require("@wordpress/icons");
var import_data = require("@wordpress/data");
var import_ui = require("@wordpress/ui");
var import_lock_unlock = require("../../../lock-unlock.cjs");
var import_dataviews_item_actions = require("../../dataviews-item-actions/index.cjs");
var import_dataviews_context = __toESM(require("../../dataviews-context/index.cjs"));
var import_use_delayed_loading = require("../../../hooks/use-delayed-loading.cjs");
var import_get_data_by_group = __toESM(require("../utils/get-data-by-group.cjs"));
var import_jsx_runtime = require("react/jsx-runtime");
var { Menu } = (0, import_lock_unlock.unlock)(import_components.privateApis);
function generateItemWrapperCompositeId(idPrefix) {
  return `${idPrefix}-item-wrapper`;
}
function generatePrimaryActionCompositeId(idPrefix, primaryActionId) {
  return `${idPrefix}-primary-action-${primaryActionId}`;
}
function generateDropdownTriggerCompositeId(idPrefix) {
  return `${idPrefix}-dropdown`;
}
function PrimaryActionGridCell({
  idPrefix,
  primaryAction,
  item
}) {
  const registry = (0, import_data.useRegistry)();
  const [isModalOpen, setIsModalOpen] = (0, import_element.useState)(false);
  const compositeItemId = generatePrimaryActionCompositeId(
    idPrefix,
    primaryAction.id
  );
  const label = typeof primaryAction.label === "string" ? primaryAction.label : primaryAction.label([item]);
  return "RenderModal" in primaryAction ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { role: "gridcell", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    import_components.Composite.Item,
    {
      id: compositeItemId,
      render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        import_components.Button,
        {
          disabled: !!primaryAction.disabled,
          accessibleWhenDisabled: true,
          text: label,
          size: "small",
          onClick: () => setIsModalOpen(true)
        }
      ),
      children: isModalOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        import_dataviews_item_actions.ActionModal,
        {
          action: primaryAction,
          items: [item],
          closeModal: () => setIsModalOpen(false)
        }
      )
    }
  ) }, primaryAction.id) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { role: "gridcell", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    import_components.Composite.Item,
    {
      id: compositeItemId,
      render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        import_components.Button,
        {
          disabled: !!primaryAction.disabled,
          accessibleWhenDisabled: true,
          size: "small",
          onClick: () => {
            primaryAction.callback([item], { registry });
          },
          children: label
        }
      )
    }
  ) }, primaryAction.id);
}
function ListItem({
  view,
  actions,
  idPrefix,
  isSelected,
  item,
  titleField,
  mediaField,
  descriptionField,
  onSelect,
  otherFields,
  onDropdownTriggerKeyDown,
  posinset
}) {
  const {
    showTitle = true,
    showMedia = true,
    showDescription = true,
    infiniteScrollEnabled
  } = view;
  const itemRef = (0, import_element.useRef)(null);
  const labelId = `${idPrefix}-label`;
  const descriptionId = `${idPrefix}-description`;
  const registry = (0, import_data.useRegistry)();
  const [isHovered, setIsHovered] = (0, import_element.useState)(false);
  const [activeModalAction, setActiveModalAction] = (0, import_element.useState)(
    null
  );
  const handleHover = ({ type }) => {
    const isHover = type === "mouseenter";
    setIsHovered(isHover);
  };
  const { paginationInfo } = (0, import_element.useContext)(import_dataviews_context.default);
  (0, import_element.useEffect)(() => {
    if (isSelected) {
      itemRef.current?.scrollIntoView({
        behavior: "auto",
        block: "nearest",
        inline: "nearest"
      });
    }
  }, [isSelected]);
  const { primaryAction, eligibleActions } = (0, import_element.useMemo)(() => {
    const _eligibleActions = actions.filter(
      (action) => !action.isEligible || action.isEligible(item)
    );
    const _primaryActions = _eligibleActions.filter(
      (action) => action.isPrimary
    );
    return {
      primaryAction: _primaryActions[0],
      eligibleActions: _eligibleActions
    };
  }, [actions, item]);
  const hasOnlyOnePrimaryAction = primaryAction && actions.length === 1;
  const renderedMediaField = showMedia && mediaField?.render ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "dataviews-view-list__media-wrapper", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    mediaField.render,
    {
      item,
      field: mediaField,
      config: { sizes: "52px" }
    }
  ) }) : null;
  const renderedTitleField = showTitle && titleField?.render ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(titleField.render, { item, field: titleField }) : null;
  const renderDescription = showDescription && descriptionField?.render;
  const hasOnlyMediaAndTitle = !!renderedMediaField && !renderDescription && !otherFields.length;
  const usedActions = eligibleActions?.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    import_ui.Stack,
    {
      direction: "row",
      gap: "md",
      className: "dataviews-view-list__item-actions",
      children: [
        primaryAction && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          PrimaryActionGridCell,
          {
            idPrefix,
            primaryAction,
            item
          }
        ),
        !hasOnlyOnePrimaryAction && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { role: "gridcell", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Menu, { placement: "bottom-end", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              Menu.TriggerButton,
              {
                render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                  import_components.Composite.Item,
                  {
                    id: generateDropdownTriggerCompositeId(
                      idPrefix
                    ),
                    render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                      import_components.Button,
                      {
                        size: "small",
                        icon: import_icons.moreVertical,
                        label: (0, import_i18n.__)("Actions"),
                        accessibleWhenDisabled: true,
                        disabled: !actions.length,
                        onKeyDown: onDropdownTriggerKeyDown
                      }
                    )
                  }
                )
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu.Popover, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              import_dataviews_item_actions.ActionsMenuGroup,
              {
                actions: eligibleActions,
                item,
                registry,
                setActiveModalAction
              }
            ) })
          ] }),
          !!activeModalAction && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            import_dataviews_item_actions.ActionModal,
            {
              action: activeModalAction,
              items: [item],
              closeModal: () => setActiveModalAction(null)
            }
          )
        ] })
      ]
    }
  );
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    import_components.Composite.Row,
    {
      ref: itemRef,
      render: (
        /* aria-posinset breaks Composite.Row if passed to it directly. */
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "div",
          {
            "aria-posinset": posinset,
            "aria-setsize": infiniteScrollEnabled ? paginationInfo.totalItems : void 0
          }
        )
      ),
      role: infiniteScrollEnabled ? "article" : "row",
      className: (0, import_clsx.default)({
        "is-selected": isSelected,
        "is-hovered": isHovered
      }),
      onMouseEnter: handleHover,
      onMouseLeave: handleHover,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
        import_ui.Stack,
        {
          direction: "row",
          className: "dataviews-view-list__item-wrapper",
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { role: "gridcell", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              import_components.Composite.Item,
              {
                id: generateItemWrapperCompositeId(idPrefix),
                "aria-pressed": isSelected,
                "aria-labelledby": labelId,
                "aria-describedby": descriptionId,
                className: "dataviews-view-list__item",
                onClick: () => onSelect(item)
              }
            ) }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
              import_ui.Stack,
              {
                direction: "row",
                gap: "md",
                justify: "start",
                align: hasOnlyMediaAndTitle ? "center" : "flex-start",
                style: { flex: 1, minWidth: 0 },
                children: [
                  renderedMediaField,
                  /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                    import_ui.Stack,
                    {
                      direction: "column",
                      gap: "xs",
                      className: "dataviews-view-list__field-wrapper",
                      children: [
                        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_ui.Stack, { direction: "row", align: "center", children: [
                          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                            "div",
                            {
                              className: "dataviews-title-field dataviews-view-list__title-field",
                              id: labelId,
                              children: renderedTitleField
                            }
                          ),
                          usedActions
                        ] }),
                        renderDescription && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "dataviews-view-list__field", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                          descriptionField.render,
                          {
                            item,
                            field: descriptionField
                          }
                        ) }),
                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                          "div",
                          {
                            className: "dataviews-view-list__fields",
                            id: descriptionId,
                            children: otherFields.map((field) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                              "div",
                              {
                                className: "dataviews-view-list__field",
                                children: [
                                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                                    import_components.VisuallyHidden,
                                    {
                                      as: "span",
                                      className: "dataviews-view-list__field-label",
                                      children: field.label
                                    }
                                  ),
                                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "dataviews-view-list__field-value", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                                    field.render,
                                    {
                                      item,
                                      field
                                    }
                                  ) })
                                ]
                              },
                              field.id
                            ))
                          }
                        )
                      ]
                    }
                  )
                ]
              }
            )
          ]
        }
      )
    }
  );
}
function isDefined(item) {
  return !!item;
}
function ViewList(props) {
  const {
    actions,
    data,
    fields,
    getItemId,
    isLoading,
    onChangeSelection,
    selection,
    view,
    className,
    empty
  } = props;
  const baseId = (0, import_compose.useInstanceId)(ViewList, "view-list");
  const isDelayedLoading = (0, import_use_delayed_loading.useDelayedLoading)(!!isLoading);
  const selectedItem = data?.findLast(
    (item) => selection.includes(getItemId(item))
  );
  const titleField = fields.find((field) => field.id === view.titleField);
  const mediaField = fields.find((field) => field.id === view.mediaField);
  const descriptionField = fields.find(
    (field) => field.id === view.descriptionField
  );
  const otherFields = (view?.fields ?? []).map((fieldId) => fields.find((f) => fieldId === f.id)).filter(isDefined);
  const onSelect = (item) => onChangeSelection([getItemId(item)]);
  const generateCompositeItemIdPrefix = (0, import_element.useCallback)(
    (item) => `${baseId}-${getItemId(item)}`,
    [baseId, getItemId]
  );
  const isActiveCompositeItem = (0, import_element.useCallback)(
    (item, idToCheck) => {
      return idToCheck.startsWith(
        generateCompositeItemIdPrefix(item)
      );
    },
    [generateCompositeItemIdPrefix]
  );
  const [activeCompositeId, setActiveCompositeId] = (0, import_element.useState)(void 0);
  const compositeRef = (0, import_element.useRef)(null);
  (0, import_element.useEffect)(() => {
    if (selectedItem) {
      setActiveCompositeId(
        generateItemWrapperCompositeId(
          generateCompositeItemIdPrefix(selectedItem)
        )
      );
    }
  }, [selectedItem, generateCompositeItemIdPrefix]);
  const activeItemIndex = data.findIndex(
    (item) => isActiveCompositeItem(item, activeCompositeId ?? "")
  );
  const previousActiveItemIndex = (0, import_compose.usePrevious)(activeItemIndex);
  const isActiveIdInList = activeItemIndex !== -1;
  const selectCompositeItem = (0, import_element.useCallback)(
    (targetIndex, generateCompositeId) => {
      const clampedIndex = Math.min(
        data.length - 1,
        Math.max(0, targetIndex)
      );
      if (!data[clampedIndex]) {
        return;
      }
      const itemIdPrefix = generateCompositeItemIdPrefix(
        data[clampedIndex]
      );
      const targetCompositeItemId = generateCompositeId(itemIdPrefix);
      setActiveCompositeId(targetCompositeItemId);
      if (compositeRef.current?.contains(
        compositeRef.current.ownerDocument.activeElement
      )) {
        document.getElementById(targetCompositeItemId)?.focus();
      }
    },
    [data, generateCompositeItemIdPrefix]
  );
  (0, import_element.useEffect)(() => {
    const wasActiveIdInList = previousActiveItemIndex !== void 0 && previousActiveItemIndex !== -1;
    if (!isActiveIdInList && wasActiveIdInList) {
      selectCompositeItem(
        previousActiveItemIndex,
        generateItemWrapperCompositeId
      );
    }
  }, [isActiveIdInList, selectCompositeItem, previousActiveItemIndex]);
  const onDropdownTriggerKeyDown = (0, import_element.useCallback)(
    (event) => {
      if (event.key === "ArrowDown") {
        event.preventDefault();
        selectCompositeItem(
          activeItemIndex + 1,
          generateDropdownTriggerCompositeId
        );
      }
      if (event.key === "ArrowUp") {
        event.preventDefault();
        selectCompositeItem(
          activeItemIndex - 1,
          generateDropdownTriggerCompositeId
        );
      }
    },
    [selectCompositeItem, activeItemIndex]
  );
  const hasData = !!data?.length;
  const groupField = view.groupBy?.field ? fields.find((field) => field.id === view.groupBy?.field) : null;
  const dataByGroup = hasData && groupField ? (0, import_get_data_by_group.default)(data, groupField) : null;
  const isInfiniteScroll = view.infiniteScrollEnabled && !dataByGroup;
  if (!hasData) {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "div",
      {
        className: (0, import_clsx.default)("dataviews-no-results", {
          "is-refreshing": isDelayedLoading
        }),
        children: empty
      }
    );
  }
  if (hasData && groupField && dataByGroup) {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      import_components.Composite,
      {
        ref: compositeRef,
        id: `${baseId}`,
        render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {}),
        className: "dataviews-view-list__group",
        role: "grid",
        activeId: activeCompositeId,
        setActiveId: setActiveCompositeId,
        children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          import_ui.Stack,
          {
            direction: "column",
            gap: "lg",
            className: (0, import_clsx.default)("dataviews-view-list", className),
            children: Array.from(dataByGroup.entries()).map(
              ([groupName, groupItems]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                import_ui.Stack,
                {
                  direction: "column",
                  gap: "sm",
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { className: "dataviews-view-list__group-header", children: view.groupBy?.showLabel === false ? groupName : (0, import_i18n.sprintf)(
                      // translators: 1: The label of the field e.g. "Date". 2: The value of the field, e.g.: "May 2022".
                      (0, import_i18n.__)("%1$s: %2$s"),
                      groupField.label,
                      groupName
                    ) }),
                    groupItems.map((item) => {
                      const id = generateCompositeItemIdPrefix(item);
                      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                        ListItem,
                        {
                          view,
                          idPrefix: id,
                          actions,
                          item,
                          isSelected: item === selectedItem,
                          onSelect,
                          mediaField,
                          titleField,
                          descriptionField,
                          otherFields,
                          onDropdownTriggerKeyDown
                        },
                        id
                      );
                    })
                  ]
                },
                groupName
              )
            )
          }
        )
      }
    );
  }
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      import_components.Composite,
      {
        ref: compositeRef,
        id: baseId,
        render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {}),
        className: (0, import_clsx.default)("dataviews-view-list", className, {
          [`has-${view.layout?.density}-density`]: view.layout?.density && ["compact", "comfortable"].includes(
            view.layout.density
          ),
          "is-refreshing": !isInfiniteScroll && isDelayedLoading
        }),
        role: view.infiniteScrollEnabled ? "feed" : "grid",
        activeId: activeCompositeId,
        setActiveId: setActiveCompositeId,
        inert: !isInfiniteScroll && !!isLoading ? "true" : void 0,
        children: data.map((item, index) => {
          const id = generateCompositeItemIdPrefix(item);
          return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            ListItem,
            {
              view,
              idPrefix: id,
              actions,
              item,
              isSelected: item === selectedItem,
              onSelect,
              mediaField,
              titleField,
              descriptionField,
              otherFields,
              onDropdownTriggerKeyDown,
              posinset: view.infiniteScrollEnabled ? index + 1 : void 0
            },
            id
          );
        })
      }
    ),
    isInfiniteScroll && isLoading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "dataviews-loading-more", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_components.Spinner, {}) })
  ] });
}
//# sourceMappingURL=index.cjs.map
