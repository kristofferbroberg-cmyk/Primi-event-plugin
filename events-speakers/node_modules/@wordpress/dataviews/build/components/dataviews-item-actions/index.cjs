"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// packages/dataviews/src/components/dataviews-item-actions/index.tsx
var dataviews_item_actions_exports = {};
__export(dataviews_item_actions_exports, {
  ActionModal: () => ActionModal,
  ActionsMenuGroup: () => ActionsMenuGroup,
  PrimaryActions: () => PrimaryActions,
  default: () => ItemActions
});
module.exports = __toCommonJS(dataviews_item_actions_exports);
var import_components = require("@wordpress/components");
var import_i18n = require("@wordpress/i18n");
var import_element = require("@wordpress/element");
var import_icons = require("@wordpress/icons");
var import_data = require("@wordpress/data");
var import_compose = require("@wordpress/compose");
var import_ui = require("@wordpress/ui");
var import_lock_unlock = require("../../lock-unlock.cjs");
var import_jsx_runtime = require("react/jsx-runtime");
var { Menu, kebabCase } = (0, import_lock_unlock.unlock)(import_components.privateApis);
function ButtonTrigger({
  action,
  onClick,
  items,
  variant
}) {
  const label = typeof action.label === "string" ? action.label : action.label(items);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    import_components.Button,
    {
      disabled: !!action.disabled,
      accessibleWhenDisabled: true,
      size: "compact",
      variant,
      onClick,
      children: label
    }
  );
}
function MenuItemTrigger({
  action,
  onClick,
  items
}) {
  const label = typeof action.label === "string" ? action.label : action.label(items);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu.Item, { disabled: action.disabled, onClick, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu.ItemLabel, { children: label }) });
}
function ActionModal({
  action,
  items,
  closeModal
}) {
  const label = typeof action.label === "string" ? action.label : action.label(items);
  const modalHeader = typeof action.modalHeader === "function" ? action.modalHeader(items) : action.modalHeader;
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    import_components.Modal,
    {
      title: modalHeader || label,
      __experimentalHideHeader: !!action.hideModalHeader,
      onRequestClose: closeModal,
      focusOnMount: action.modalFocusOnMount ?? true,
      size: action.modalSize || "medium",
      overlayClassName: `dataviews-action-modal dataviews-action-modal__${kebabCase(
        action.id
      )}`,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(action.RenderModal, { items, closeModal })
    }
  );
}
function ActionsMenuGroup({
  actions,
  item,
  registry,
  setActiveModalAction
}) {
  const { primaryActions, regularActions } = (0, import_element.useMemo)(() => {
    return actions.reduce(
      (acc, action) => {
        (action.isPrimary ? acc.primaryActions : acc.regularActions).push(action);
        return acc;
      },
      {
        primaryActions: [],
        regularActions: []
      }
    );
  }, [actions]);
  const renderActionGroup = (actionList) => actionList.map((action) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    MenuItemTrigger,
    {
      action,
      onClick: () => {
        if ("RenderModal" in action) {
          setActiveModalAction(action);
          return;
        }
        action.callback([item], { registry });
      },
      items: [item]
    },
    action.id
  ));
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Menu.Group, { children: [
    renderActionGroup(primaryActions),
    renderActionGroup(regularActions)
  ] });
}
function ItemActions({
  item,
  actions,
  isCompact
}) {
  const registry = (0, import_data.useRegistry)();
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
  if (isCompact) {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      CompactItemActions,
      {
        item,
        actions: eligibleActions,
        isSmall: true,
        registry
      }
    );
  }
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    import_ui.Stack,
    {
      direction: "row",
      justify: "flex-end",
      className: "dataviews-item-actions",
      style: {
        flexShrink: 0,
        width: "auto"
      },
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          PrimaryActions,
          {
            item,
            actions: primaryActions,
            registry
          }
        ),
        (primaryActions.length < eligibleActions.length || // Since we hide primary actions on mobile, we need to show the menu
        // there if there are any actions at all.
        isMobileViewport) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          CompactItemActions,
          {
            item,
            actions: eligibleActions,
            registry
          }
        )
      ]
    }
  );
}
function CompactItemActions({
  item,
  actions,
  isSmall,
  registry
}) {
  const [activeModalAction, setActiveModalAction] = (0, import_element.useState)(
    null
  );
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Menu, { placement: "bottom-end", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        Menu.TriggerButton,
        {
          render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            import_components.Button,
            {
              size: isSmall ? "small" : "compact",
              icon: import_icons.moreVertical,
              label: (0, import_i18n.__)("Actions"),
              accessibleWhenDisabled: true,
              disabled: !actions.length,
              className: "dataviews-all-actions-button"
            }
          )
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu.Popover, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        ActionsMenuGroup,
        {
          actions,
          item,
          registry,
          setActiveModalAction
        }
      ) })
    ] }),
    !!activeModalAction && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      ActionModal,
      {
        action: activeModalAction,
        items: [item],
        closeModal: () => setActiveModalAction(null)
      }
    )
  ] });
}
function PrimaryActions({
  item,
  actions,
  registry,
  buttonVariant
}) {
  const [activeModalAction, setActiveModalAction] = (0, import_element.useState)(null);
  const isMobileViewport = (0, import_compose.useViewportMatch)("medium", "<");
  if (isMobileViewport) {
    return null;
  }
  if (!Array.isArray(actions) || actions.length === 0) {
    return null;
  }
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
    actions.map((action) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      ButtonTrigger,
      {
        action,
        onClick: () => {
          if ("RenderModal" in action) {
            setActiveModalAction(action);
            return;
          }
          action.callback([item], { registry });
        },
        items: [item],
        variant: buttonVariant
      },
      action.id
    )),
    !!activeModalAction && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      ActionModal,
      {
        action: activeModalAction,
        items: [item],
        closeModal: () => setActiveModalAction(null)
      }
    )
  ] });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ActionModal,
  ActionsMenuGroup,
  PrimaryActions
});
//# sourceMappingURL=index.cjs.map
