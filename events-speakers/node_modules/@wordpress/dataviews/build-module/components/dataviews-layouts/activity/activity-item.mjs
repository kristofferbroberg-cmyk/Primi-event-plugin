// packages/dataviews/src/components/dataviews-layouts/activity/activity-item.tsx
import clsx from "clsx";
import { VisuallyHidden } from "@wordpress/components";
import { useRef, useContext, useMemo } from "@wordpress/element";
import { useRegistry } from "@wordpress/data";
import { useViewportMatch } from "@wordpress/compose";
import { Stack } from "@wordpress/ui";
import ItemActions, { PrimaryActions } from "../../dataviews-item-actions/index.mjs";
import DataViewsContext from "../../dataviews-context/index.mjs";
import { ItemClickWrapper } from "../utils/item-click-wrapper.mjs";
import { jsx, jsxs } from "react/jsx-runtime";
function ActivityItem(props) {
  const {
    view,
    actions,
    item,
    titleField,
    mediaField,
    descriptionField,
    otherFields,
    posinset,
    onClickItem,
    renderItemLink,
    isItemClickable
  } = props;
  const {
    showTitle = true,
    showMedia = true,
    showDescription = true,
    infiniteScrollEnabled
  } = view;
  const itemRef = useRef(null);
  const registry = useRegistry();
  const { paginationInfo } = useContext(DataViewsContext);
  const { primaryActions, eligibleActions } = useMemo(() => {
    const _eligibleActions = actions.filter(
      (action) => !action.isEligible || action.isEligible(item)
    );
    const _primaryActions = _eligibleActions.filter(
      (action) => action.isPrimary
    );
    return {
      primaryActions: _primaryActions,
      eligibleActions: _eligibleActions
    };
  }, [actions, item]);
  const isMobileViewport = useViewportMatch("medium", "<");
  const density = view.layout?.density ?? "balanced";
  const mediaContent = showMedia && density !== "compact" && mediaField?.render ? /* @__PURE__ */ jsx(
    mediaField.render,
    {
      item,
      field: mediaField,
      config: {
        sizes: density === "comfortable" ? "32px" : "24px"
      }
    }
  ) : null;
  const renderedMediaField = /* @__PURE__ */ jsx("div", { className: "dataviews-view-activity__item-type-icon", children: mediaContent || /* @__PURE__ */ jsx(
    "span",
    {
      className: "dataviews-view-activity__item-bullet",
      "aria-hidden": "true"
    }
  ) });
  const renderedTitleField = showTitle && titleField?.render ? /* @__PURE__ */ jsx(titleField.render, { item, field: titleField }) : null;
  const verticalGap = useMemo(() => {
    switch (density) {
      case "comfortable":
        return "md";
      default:
        return "sm";
    }
  }, [density]);
  return /* @__PURE__ */ jsx(
    "div",
    {
      ref: itemRef,
      role: infiniteScrollEnabled ? "article" : void 0,
      "aria-posinset": posinset,
      "aria-setsize": infiniteScrollEnabled ? paginationInfo.totalItems : void 0,
      className: clsx(
        "dataviews-view-activity__item",
        density === "compact" && "is-compact",
        density === "balanced" && "is-balanced",
        density === "comfortable" && "is-comfortable"
      ),
      children: /* @__PURE__ */ jsxs(Stack, { direction: "row", gap: "lg", justify: "start", align: "flex-start", children: [
        /* @__PURE__ */ jsx(
          Stack,
          {
            direction: "column",
            gap: "xs",
            align: "center",
            className: "dataviews-view-activity__item-type",
            children: renderedMediaField
          }
        ),
        /* @__PURE__ */ jsxs(
          Stack,
          {
            direction: "column",
            gap: verticalGap,
            align: "flex-start",
            className: "dataviews-view-activity__item-content",
            children: [
              renderedTitleField && /* @__PURE__ */ jsx(
                ItemClickWrapper,
                {
                  item,
                  isItemClickable,
                  onClickItem,
                  renderItemLink,
                  className: "dataviews-view-activity__item-title",
                  children: renderedTitleField
                }
              ),
              showDescription && descriptionField && /* @__PURE__ */ jsx("div", { className: "dataviews-view-activity__item-description", children: /* @__PURE__ */ jsx(
                descriptionField.render,
                {
                  item,
                  field: descriptionField
                }
              ) }),
              /* @__PURE__ */ jsx("div", { className: "dataviews-view-activity__item-fields", children: otherFields.map((field) => /* @__PURE__ */ jsxs(
                "div",
                {
                  className: "dataviews-view-activity__item-field",
                  children: [
                    /* @__PURE__ */ jsx(
                      VisuallyHidden,
                      {
                        as: "span",
                        className: "dataviews-view-activity__item-field-label",
                        children: field.label
                      }
                    ),
                    /* @__PURE__ */ jsx("span", { className: "dataviews-view-activity__item-field-value", children: /* @__PURE__ */ jsx(
                      field.render,
                      {
                        item,
                        field
                      }
                    ) })
                  ]
                },
                field.id
              )) }),
              !!primaryActions?.length && /* @__PURE__ */ jsx(
                PrimaryActions,
                {
                  item,
                  actions: primaryActions,
                  registry,
                  buttonVariant: "secondary"
                }
              )
            ]
          }
        ),
        (primaryActions.length < eligibleActions.length || // Since we hide primary actions on mobile, we need to show the menu
        // there if there are any actions at all.
        isMobileViewport && // At the same time, only show the menu if there are actions to show.
        eligibleActions.length > 0) && /* @__PURE__ */ jsx("div", { className: "dataviews-view-activity__item-actions", children: /* @__PURE__ */ jsx(
          ItemActions,
          {
            item,
            actions: eligibleActions,
            isCompact: true
          }
        ) })
      ] })
    }
  );
}
var activity_item_default = ActivityItem;
export {
  activity_item_default as default
};
//# sourceMappingURL=activity-item.mjs.map
