// packages/components/src/icon/index.tsx
import { cloneElement, createElement, isValidElement } from "@wordpress/element";
import { SVG } from "@wordpress/primitives";
import Dashicon from "../dashicon/index.mjs";
import { jsx as _jsx } from "react/jsx-runtime";
function Icon({
  icon = null,
  size = "string" === typeof icon ? 20 : 24,
  ...additionalProps
}) {
  if ("string" === typeof icon) {
    return /* @__PURE__ */ _jsx(Dashicon, {
      icon,
      size,
      ...additionalProps
    });
  }
  if (isValidElement(icon) && Dashicon === icon.type) {
    return cloneElement(icon, {
      ...additionalProps
    });
  }
  if ("function" === typeof icon) {
    return createElement(icon, {
      size,
      ...additionalProps
    });
  }
  if (icon && (icon.type === "svg" || icon.type === SVG)) {
    const appliedProps = {
      ...icon.props,
      width: size,
      height: size,
      ...additionalProps
    };
    return /* @__PURE__ */ _jsx(SVG, {
      ...appliedProps
    });
  }
  if (isValidElement(icon)) {
    return cloneElement(icon, {
      // @ts-ignore Just forwarding the size prop along
      size,
      width: size,
      height: size,
      ...additionalProps
    });
  }
  return icon;
}
var icon_default = Icon;
export {
  icon_default as default
};
//# sourceMappingURL=index.mjs.map
