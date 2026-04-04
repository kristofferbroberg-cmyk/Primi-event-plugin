// packages/components/src/higher-order/with-fallback-styles/index.tsx
import fastDeepEqual from "fast-deep-equal/es6/index.js";
import { Component } from "@wordpress/element";
import { createHigherOrderComponent } from "@wordpress/compose";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
var with_fallback_styles_default = (mapNodeToProps) => createHigherOrderComponent((WrappedComponent) => {
  return class WithFallbackStyles extends Component {
    constructor(props) {
      super(props);
      this.nodeRef = this.props.node;
      this.state = {
        fallbackStyles: void 0,
        grabStylesCompleted: false
      };
      this.bindRef = this.bindRef.bind(this);
    }
    bindRef(node) {
      if (!node) {
        return;
      }
      this.nodeRef = node;
    }
    componentDidMount() {
      this.grabFallbackStyles();
    }
    componentDidUpdate() {
      this.grabFallbackStyles();
    }
    grabFallbackStyles() {
      const {
        grabStylesCompleted,
        fallbackStyles
      } = this.state;
      if (this.nodeRef && !grabStylesCompleted) {
        const newFallbackStyles = mapNodeToProps(this.nodeRef, this.props);
        if (!fastDeepEqual(newFallbackStyles, fallbackStyles)) {
          this.setState({
            fallbackStyles: newFallbackStyles,
            grabStylesCompleted: Object.values(newFallbackStyles).every(Boolean)
          });
        }
      }
    }
    render() {
      const wrappedComponent = /* @__PURE__ */ _jsx(WrappedComponent, {
        ...this.props,
        ...this.state.fallbackStyles
      });
      return this.props.node ? wrappedComponent : /* @__PURE__ */ _jsxs("div", {
        ref: this.bindRef,
        children: [" ", wrappedComponent, " "]
      });
    }
  };
}, "withFallbackStyles");
export {
  with_fallback_styles_default as default
};
//# sourceMappingURL=index.mjs.map
