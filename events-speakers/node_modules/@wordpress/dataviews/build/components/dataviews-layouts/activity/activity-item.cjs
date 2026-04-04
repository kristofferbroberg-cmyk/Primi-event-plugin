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

// packages/dataviews/src/components/dataviews-layouts/activity/activity-item.tsx
var activity_item_exports = {};
__export(activity_item_exports, {
  default: () => activity_item_default
});
module.exports = __toCommonJS(activity_item_exports);
var import_clsx = __toESM(require("clsx"));
var import_components = require("@wordpress/components");
var import_element = require("@wordpress/element");
var import_data = require("@wordpress/data");
var import_compose = require("@wordpress/compose");
var import_ui = require("@wordpress/ui");
var import_dataviews_item_actions = __toESM(require("../../dataviews-item-actions/index.cjs"));
var import_dataviews_context = __toESM(require("../../dataviews-context/index.cjs"));
var import_item_click_wrapper = require("../utils/item-click-wrapper.cjs");
var import_jsx_runtime = require("react/jsx-runtime");
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
  const itemRef = (0, import_element.useRef)(null);
  const registry = (0, import_data.useRegistry)();
  const { paginationInfo } = (0, import_element.useContext)(import_dataviews_context.default);
  const { primaryActions, eligibleActions } = (0, import_element.useMemo)(() => {
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
  const isMobileViewport = (0, import_compose.useViewportMatch)("medium", "<");
  const density = view.layout?.density ?? "balanced";
  const mediaContent = showMedia && density !== "compact" && mediaField?.render ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    mediaField.render,
    {
      item,
      field: mediaField,
      config: {
        sizes: density === "comfortable" ? "32px" : "24px"
      }
    }
  ) : null;
  const renderedMediaField = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "dataviews-view-activity__item-type-icon", children: mediaContent || /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "span",
    {
      className: "dataviews-view-activity__item-bullet",
      "aria-hidden": "true"
    }
  ) });
  const renderedTitleField = showTitle && titleField?.render ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(titleField.render, { item, field: titleField }) : null;
  const verticalGap = (0, import_element.useMemo)(() => {
    switch (density) {
      case "comfortable":
        return "md";
      default:
        return "sm";
    }
  }, [density]);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "div",
    {
      ref: itemRef,
      role: infiniteScrollEnabled ? "article" : void 0,
      "aria-posinset": posinset,
      "aria-setsize": infiniteScrollEnabled ? paginationInfo.totalItems : void 0,
      className: (0, import_clsx.default)(
        "dataviews-view-activity__item",
        density === "compact" && "is-compact",
        density === "balanced" && "is-balanced",
        density === "comfortable" && "is-comfortable"
      ),
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_ui.Stack, { direction: "row", gap: "lg", justify: "start", align: "flex-start", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          import_ui.Stack,
          {
            direction: "column",
            gap: "xs",
            align: "center",
            className: "dataviews-view-activity__item-type",
            children: renderedMediaField
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
          import_ui.Stack,
          {
            direction: "column",
            gap: verticalGap,
            align: "flex-start",
            className: "dataviews-view-activity__item-content",
            children: [
              renderedTitleField && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                import_item_click_wrapper.ItemClickWrapper,
                {
                  item,
                  isItemClickable,
                  onClickItem,
                  renderItemLink,
                  className: "dataviews-view-activity__item-title",
                  children: renderedTitleField
                }
              ),
              showDescription && descriptionField && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "dataviews-view-activity__item-description", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                descriptionField.render,
                {
                  item,
                  field: descriptionField
                }
              ) }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "dataviews-view-activity__item-fields", children: otherFields.map((field) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                "div",
                {
                  className: "dataviews-view-activity__item-field",
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                      import_components.VisuallyHidden,
                      {
                        as: "span",
                        className: "dataviews-view-activity__item-field-label",
                        children: field.label
                      }
                    ),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "dataviews-view-activity__item-field-value", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
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
              !!primaryActions?.length && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                import_dataviews_item_actions.PrimaryActions,
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
        eligibleActions.length > 0) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "dataviews-view-activity__item-actions", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          import_dataviews_item_actions.default,
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
//# sourceMappingURL=activity-item.cjs.map
