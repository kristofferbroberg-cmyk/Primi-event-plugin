// packages/dataviews/src/components/dataviews-layouts/list/index.tsx
import clsx from "clsx";
import { useInstanceId, usePrevious } from "@wordpress/compose";
import {
  Button,
  privateApis as componentsPrivateApis,
  Spinner,
  VisuallyHidden,
  Composite
} from "@wordpress/components";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useContext
} from "@wordpress/element";
import { __, sprintf } from "@wordpress/i18n";
import { moreVertical } from "@wordpress/icons";
import { useRegistry } from "@wordpress/data";
import { Stack } from "@wordpress/ui";
import { unlock } from "../../../lock-unlock.mjs";
import { ActionsMenuGroup, ActionModal } from "../../dataviews-item-actions/index.mjs";
import DataViewsContext from "../../dataviews-context/index.mjs";
import { useDelayedLoading } from "../../../hooks/use-delayed-loading.mjs";
import getDataByGroup from "../utils/get-data-by-group.mjs";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
var { Menu } = unlock(componentsPrivateApis);
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
  const registry = useRegistry();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const compositeItemId = generatePrimaryActionCompositeId(
    idPrefix,
    primaryAction.id
  );
  const label = typeof primaryAction.label === "string" ? primaryAction.label : primaryAction.label([item]);
  return "RenderModal" in primaryAction ? /* @__PURE__ */ jsx("div", { role: "gridcell", children: /* @__PURE__ */ jsx(
    Composite.Item,
    {
      id: compositeItemId,
      render: /* @__PURE__ */ jsx(
        Button,
        {
          disabled: !!primaryAction.disabled,
          accessibleWhenDisabled: true,
          text: label,
          size: "small",
          onClick: () => setIsModalOpen(true)
        }
      ),
      children: isModalOpen && /* @__PURE__ */ jsx(
        ActionModal,
        {
          action: primaryAction,
          items: [item],
          closeModal: () => setIsModalOpen(false)
        }
      )
    }
  ) }, primaryAction.id) : /* @__PURE__ */ jsx("div", { role: "gridcell", children: /* @__PURE__ */ jsx(
    Composite.Item,
    {
      id: compositeItemId,
      render: /* @__PURE__ */ jsx(
        Button,
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
  const itemRef = useRef(null);
  const labelId = `${idPrefix}-label`;
  const descriptionId = `${idPrefix}-description`;
  const registry = useRegistry();
  const [isHovered, setIsHovered] = useState(false);
  const [activeModalAction, setActiveModalAction] = useState(
    null
  );
  const handleHover = ({ type }) => {
    const isHover = type === "mouseenter";
    setIsHovered(isHover);
  };
  const { paginationInfo } = useContext(DataViewsContext);
  useEffect(() => {
    if (isSelected) {
      itemRef.current?.scrollIntoView({
        behavior: "auto",
        block: "nearest",
        inline: "nearest"
      });
    }
  }, [isSelected]);
  const { primaryAction, eligibleActions } = useMemo(() => {
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
  const renderedMediaField = showMedia && mediaField?.render ? /* @__PURE__ */ jsx("div", { className: "dataviews-view-list__media-wrapper", children: /* @__PURE__ */ jsx(
    mediaField.render,
    {
      item,
      field: mediaField,
      config: { sizes: "52px" }
    }
  ) }) : null;
  const renderedTitleField = showTitle && titleField?.render ? /* @__PURE__ */ jsx(titleField.render, { item, field: titleField }) : null;
  const renderDescription = showDescription && descriptionField?.render;
  const hasOnlyMediaAndTitle = !!renderedMediaField && !renderDescription && !otherFields.length;
  const usedActions = eligibleActions?.length > 0 && /* @__PURE__ */ jsxs(
    Stack,
    {
      direction: "row",
      gap: "md",
      className: "dataviews-view-list__item-actions",
      children: [
        primaryAction && /* @__PURE__ */ jsx(
          PrimaryActionGridCell,
          {
            idPrefix,
            primaryAction,
            item
          }
        ),
        !hasOnlyOnePrimaryAction && /* @__PURE__ */ jsxs("div", { role: "gridcell", children: [
          /* @__PURE__ */ jsxs(Menu, { placement: "bottom-end", children: [
            /* @__PURE__ */ jsx(
              Menu.TriggerButton,
              {
                render: /* @__PURE__ */ jsx(
                  Composite.Item,
                  {
                    id: generateDropdownTriggerCompositeId(
                      idPrefix
                    ),
                    render: /* @__PURE__ */ jsx(
                      Button,
                      {
                        size: "small",
                        icon: moreVertical,
                        label: __("Actions"),
                        accessibleWhenDisabled: true,
                        disabled: !actions.length,
                        onKeyDown: onDropdownTriggerKeyDown
                      }
                    )
                  }
                )
              }
            ),
            /* @__PURE__ */ jsx(Menu.Popover, { children: /* @__PURE__ */ jsx(
              ActionsMenuGroup,
              {
                actions: eligibleActions,
                item,
                registry,
                setActiveModalAction
              }
            ) })
          ] }),
          !!activeModalAction && /* @__PURE__ */ jsx(
            ActionModal,
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
  return /* @__PURE__ */ jsx(
    Composite.Row,
    {
      ref: itemRef,
      render: (
        /* aria-posinset breaks Composite.Row if passed to it directly. */
        /* @__PURE__ */ jsx(
          "div",
          {
            "aria-posinset": posinset,
            "aria-setsize": infiniteScrollEnabled ? paginationInfo.totalItems : void 0
          }
        )
      ),
      role: infiniteScrollEnabled ? "article" : "row",
      className: clsx({
        "is-selected": isSelected,
        "is-hovered": isHovered
      }),
      onMouseEnter: handleHover,
      onMouseLeave: handleHover,
      children: /* @__PURE__ */ jsxs(
        Stack,
        {
          direction: "row",
          className: "dataviews-view-list__item-wrapper",
          children: [
            /* @__PURE__ */ jsx("div", { role: "gridcell", children: /* @__PURE__ */ jsx(
              Composite.Item,
              {
                id: generateItemWrapperCompositeId(idPrefix),
                "aria-pressed": isSelected,
                "aria-labelledby": labelId,
                "aria-describedby": descriptionId,
                className: "dataviews-view-list__item",
                onClick: () => onSelect(item)
              }
            ) }),
            /* @__PURE__ */ jsxs(
              Stack,
              {
                direction: "row",
                gap: "md",
                justify: "start",
                align: hasOnlyMediaAndTitle ? "center" : "flex-start",
                style: { flex: 1, minWidth: 0 },
                children: [
                  renderedMediaField,
                  /* @__PURE__ */ jsxs(
                    Stack,
                    {
                      direction: "column",
                      gap: "xs",
                      className: "dataviews-view-list__field-wrapper",
                      children: [
                        /* @__PURE__ */ jsxs(Stack, { direction: "row", align: "center", children: [
                          /* @__PURE__ */ jsx(
                            "div",
                            {
                              className: "dataviews-title-field dataviews-view-list__title-field",
                              id: labelId,
                              children: renderedTitleField
                            }
                          ),
                          usedActions
                        ] }),
                        renderDescription && /* @__PURE__ */ jsx("div", { className: "dataviews-view-list__field", children: /* @__PURE__ */ jsx(
                          descriptionField.render,
                          {
                            item,
                            field: descriptionField
                          }
                        ) }),
                        /* @__PURE__ */ jsx(
                          "div",
                          {
                            className: "dataviews-view-list__fields",
                            id: descriptionId,
                            children: otherFields.map((field) => /* @__PURE__ */ jsxs(
                              "div",
                              {
                                className: "dataviews-view-list__field",
                                children: [
                                  /* @__PURE__ */ jsx(
                                    VisuallyHidden,
                                    {
                                      as: "span",
                                      className: "dataviews-view-list__field-label",
                                      children: field.label
                                    }
                                  ),
                                  /* @__PURE__ */ jsx("span", { className: "dataviews-view-list__field-value", children: /* @__PURE__ */ jsx(
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
  const baseId = useInstanceId(ViewList, "view-list");
  const isDelayedLoading = useDelayedLoading(!!isLoading);
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
  const generateCompositeItemIdPrefix = useCallback(
    (item) => `${baseId}-${getItemId(item)}`,
    [baseId, getItemId]
  );
  const isActiveCompositeItem = useCallback(
    (item, idToCheck) => {
      return idToCheck.startsWith(
        generateCompositeItemIdPrefix(item)
      );
    },
    [generateCompositeItemIdPrefix]
  );
  const [activeCompositeId, setActiveCompositeId] = useState(void 0);
  const compositeRef = useRef(null);
  useEffect(() => {
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
  const previousActiveItemIndex = usePrevious(activeItemIndex);
  const isActiveIdInList = activeItemIndex !== -1;
  const selectCompositeItem = useCallback(
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
  useEffect(() => {
    const wasActiveIdInList = previousActiveItemIndex !== void 0 && previousActiveItemIndex !== -1;
    if (!isActiveIdInList && wasActiveIdInList) {
      selectCompositeItem(
        previousActiveItemIndex,
        generateItemWrapperCompositeId
      );
    }
  }, [isActiveIdInList, selectCompositeItem, previousActiveItemIndex]);
  const onDropdownTriggerKeyDown = useCallback(
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
  const dataByGroup = hasData && groupField ? getDataByGroup(data, groupField) : null;
  const isInfiniteScroll = view.infiniteScrollEnabled && !dataByGroup;
  if (!hasData) {
    return /* @__PURE__ */ jsx(
      "div",
      {
        className: clsx("dataviews-no-results", {
          "is-refreshing": isDelayedLoading
        }),
        children: empty
      }
    );
  }
  if (hasData && groupField && dataByGroup) {
    return /* @__PURE__ */ jsx(
      Composite,
      {
        ref: compositeRef,
        id: `${baseId}`,
        render: /* @__PURE__ */ jsx("div", {}),
        className: "dataviews-view-list__group",
        role: "grid",
        activeId: activeCompositeId,
        setActiveId: setActiveCompositeId,
        children: /* @__PURE__ */ jsx(
          Stack,
          {
            direction: "column",
            gap: "lg",
            className: clsx("dataviews-view-list", className),
            children: Array.from(dataByGroup.entries()).map(
              ([groupName, groupItems]) => /* @__PURE__ */ jsxs(
                Stack,
                {
                  direction: "column",
                  gap: "sm",
                  children: [
                    /* @__PURE__ */ jsx("h3", { className: "dataviews-view-list__group-header", children: view.groupBy?.showLabel === false ? groupName : sprintf(
                      // translators: 1: The label of the field e.g. "Date". 2: The value of the field, e.g.: "May 2022".
                      __("%1$s: %2$s"),
                      groupField.label,
                      groupName
                    ) }),
                    groupItems.map((item) => {
                      const id = generateCompositeItemIdPrefix(item);
                      return /* @__PURE__ */ jsx(
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
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      Composite,
      {
        ref: compositeRef,
        id: baseId,
        render: /* @__PURE__ */ jsx("div", {}),
        className: clsx("dataviews-view-list", className, {
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
          return /* @__PURE__ */ jsx(
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
    isInfiniteScroll && isLoading && /* @__PURE__ */ jsx("p", { className: "dataviews-loading-more", children: /* @__PURE__ */ jsx(Spinner, {}) })
  ] });
}
export {
  ViewList as default
};
//# sourceMappingURL=index.mjs.map
