// packages/components/src/tools-panel/tools-panel/component.tsx
import ToolsPanelHeader from "../tools-panel-header/index.mjs";
import { ToolsPanelContext } from "../context.mjs";
import { useToolsPanel } from "./hook.mjs";
import { Grid } from "../../grid/index.mjs";
import { contextConnect } from "../../context/index.mjs";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
var UnconnectedToolsPanel = (props, forwardedRef) => {
  const {
    children,
    label,
    panelContext,
    resetAllItems,
    toggleItem,
    headingLevel,
    dropdownMenuProps,
    ...toolsPanelProps
  } = useToolsPanel(props);
  return /* @__PURE__ */ _jsx(Grid, {
    ...toolsPanelProps,
    columns: 2,
    ref: forwardedRef,
    children: /* @__PURE__ */ _jsxs(ToolsPanelContext.Provider, {
      value: panelContext,
      children: [/* @__PURE__ */ _jsx(ToolsPanelHeader, {
        label,
        resetAll: resetAllItems,
        toggleItem,
        headingLevel,
        dropdownMenuProps
      }), children]
    })
  });
};
var ToolsPanel = contextConnect(UnconnectedToolsPanel, "ToolsPanel");
var component_default = ToolsPanel;
export {
  ToolsPanel,
  component_default as default
};
//# sourceMappingURL=component.mjs.map
