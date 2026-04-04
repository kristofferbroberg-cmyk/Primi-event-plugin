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

// packages/compose/src/higher-order/pure/index.tsx
var pure_exports = {};
__export(pure_exports, {
  default: () => pure_default
});
module.exports = __toCommonJS(pure_exports);
var import_is_shallow_equal = require("@wordpress/is-shallow-equal");
var import_element = require("@wordpress/element");
var import_create_higher_order_component = require("../../utils/create-higher-order-component/index.cjs");
var import_jsx_runtime = require("react/jsx-runtime");
var pure = (0, import_create_higher_order_component.createHigherOrderComponent)(function(WrappedComponent) {
  if (WrappedComponent.prototype instanceof import_element.Component) {
    return class extends WrappedComponent {
      shouldComponentUpdate(nextProps, nextState) {
        return !(0, import_is_shallow_equal.isShallowEqual)(nextProps, this.props) || !(0, import_is_shallow_equal.isShallowEqual)(nextState, this.state);
      }
    };
  }
  return class extends import_element.Component {
    shouldComponentUpdate(nextProps) {
      return !(0, import_is_shallow_equal.isShallowEqual)(nextProps, this.props);
    }
    render() {
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WrappedComponent, { ...this.props });
    }
  };
}, "pure");
var pure_default = pure;
//# sourceMappingURL=index.cjs.map
