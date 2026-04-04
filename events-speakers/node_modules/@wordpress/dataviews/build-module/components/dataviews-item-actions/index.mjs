// packages/dataviews/src/components/dataviews-item-actions/index.tsx
import {
  Button,
  Modal,
  privateApis as componentsPrivateApis
} from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import { useMemo, useState } from "@wordpress/element";
import { moreVertical } from "@wordpress/icons";
import { useRegistry } from "@wordpress/data";
import { useViewportMatch } from "@wordpress/compose";
import { Stack } from "@wordpress/ui";
import { unlock } from "../../lock-unlock.mjs";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
var { Menu, kebabCase } = unlock(componentsPrivateApis);
function ButtonTrigger({
  action,
  onClick,
  items,
  variant
}) {
  const label = typeof action.label === "string" ? action.label : action.label(items);
  return /* @__PURE__ */ jsx(
    Button,
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
  return /* @__PURE__ */ jsx(Menu.Item, { disabled: action.disabled, onClick, children: /* @__PURE__ */ jsx(Menu.ItemLabel, { children: label }) });
}
function ActionModal({
  action,
  items,
  closeModal
}) {
  const label = typeof action.label === "string" ? action.label : action.label(items);
  const modalHeader = typeof action.modalHeader === "function" ? action.modalHeader(items) : action.modalHeader;
  return /* @__PURE__ */ jsx(
    Modal,
    {
      title: modalHeader || label,
      __experimentalHideHeader: !!action.hideModalHeader,
      onRequestClose: closeModal,
      focusOnMount: action.modalFocusOnMount ?? true,
      size: action.modalSize || "medium",
      overlayClassName: `dataviews-action-modal dataviews-action-modal__${kebabCase(
        action.id
      )}`,
      children: /* @__PURE__ */ jsx(action.RenderModal, { items, closeModal })
    }
  );
}
function ActionsMenuGroup({
  actions,
  item,
  registry,
  setActiveModalAction
}) {
  const { primaryActions, regularActions } = useMemo(() => {
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
  const renderActionGroup = (actionList) => actionList.map((action) => /* @__PURE__ */ jsx(
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
  return /* @__PURE__ */ jsxs(Menu.Group, { children: [
    renderActionGroup(primaryActions),
    renderActionGroup(regularActions)
  ] });
}
function ItemActions({
  item,
  actions,
  isCompact
}) {
  const registry = useRegistry();
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
  if (isCompact) {
    return /* @__PURE__ */ jsx(
      CompactItemActions,
      {
        item,
        actions: eligibleActions,
        isSmall: true,
        registry
      }
    );
  }
  return /* @__PURE__ */ jsxs(
    Stack,
    {
      direction: "row",
      justify: "flex-end",
      className: "dataviews-item-actions",
      style: {
        flexShrink: 0,
        width: "auto"
      },
      children: [
        /* @__PURE__ */ jsx(
          PrimaryActions,
          {
            item,
            actions: primaryActions,
            registry
          }
        ),
        (primaryActions.length < eligibleActions.length || // Since we hide primary actions on mobile, we need to show the menu
        // there if there are any actions at all.
        isMobileViewport) && /* @__PURE__ */ jsx(
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
  const [activeModalAction, setActiveModalAction] = useState(
    null
  );
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(Menu, { placement: "bottom-end", children: [
      /* @__PURE__ */ jsx(
        Menu.TriggerButton,
        {
          render: /* @__PURE__ */ jsx(
            Button,
            {
              size: isSmall ? "small" : "compact",
              icon: moreVertical,
              label: __("Actions"),
              accessibleWhenDisabled: true,
              disabled: !actions.length,
              className: "dataviews-all-actions-button"
            }
          )
        }
      ),
      /* @__PURE__ */ jsx(Menu.Popover, { children: /* @__PURE__ */ jsx(
        ActionsMenuGroup,
        {
          actions,
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
  ] });
}
function PrimaryActions({
  item,
  actions,
  registry,
  buttonVariant
}) {
  const [activeModalAction, setActiveModalAction] = useState(null);
  const isMobileViewport = useViewportMatch("medium", "<");
  if (isMobileViewport) {
    return null;
  }
  if (!Array.isArray(actions) || actions.length === 0) {
    return null;
  }
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    actions.map((action) => /* @__PURE__ */ jsx(
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
    !!activeModalAction && /* @__PURE__ */ jsx(
      ActionModal,
      {
        action: activeModalAction,
        items: [item],
        closeModal: () => setActiveModalAction(null)
      }
    )
  ] });
}
export {
  ActionModal,
  ActionsMenuGroup,
  PrimaryActions,
  ItemActions as default
};
//# sourceMappingURL=index.mjs.map
