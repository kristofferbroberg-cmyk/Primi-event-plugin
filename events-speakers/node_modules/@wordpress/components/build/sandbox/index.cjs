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

// packages/components/src/sandbox/index.tsx
var sandbox_exports = {};
__export(sandbox_exports, {
  default: () => sandbox_default
});
module.exports = __toCommonJS(sandbox_exports);
var import_element = require("@wordpress/element");
var import_compose = require("@wordpress/compose");
var import_jsx_runtime = require("react/jsx-runtime");
var observeAndResizeJS = function() {
  const {
    MutationObserver
  } = window;
  if (!MutationObserver || !document.body || !window.parent) {
    return;
  }
  function sendResize() {
    const clientBoundingRect = document.body.getBoundingClientRect();
    window.parent.postMessage({
      action: "resize",
      width: clientBoundingRect.width,
      height: clientBoundingRect.height
    }, "*");
  }
  const observer = new MutationObserver(sendResize);
  observer.observe(document.body, {
    attributes: true,
    attributeOldValue: false,
    characterData: true,
    characterDataOldValue: false,
    childList: true,
    subtree: true
  });
  window.addEventListener("load", sendResize, true);
  function removeViewportStyles(ruleOrNode) {
    if (ruleOrNode.style) {
      ["width", "height", "minHeight", "maxHeight"].forEach(function(style2) {
        if (/^\\d+(vw|vh|svw|lvw|dvw|svh|lvh|dvh|vi|svi|lvi|dvi|vb|svb|lvb|dvb|vmin|svmin|lvmin|dvmin|vmax|svmax|lvmax|dvmax)$/.test(ruleOrNode.style[style2])) {
          ruleOrNode.style[style2] = "";
        }
      });
    }
  }
  Array.prototype.forEach.call(document.querySelectorAll("[style]"), removeViewportStyles);
  Array.prototype.forEach.call(document.styleSheets, function(stylesheet) {
    Array.prototype.forEach.call(stylesheet.cssRules || stylesheet.rules, removeViewportStyles);
  });
  document.body.style.position = "absolute";
  document.body.style.width = "100%";
  document.body.setAttribute("data-resizable-iframe-connected", "");
  sendResize();
  window.addEventListener("resize", sendResize, true);
};
var style = `
	body {
		margin: 0;
	}
	html,
	body,
	body > div {
		width: 100%;
	}
	html.wp-has-aspect-ratio,
	body.wp-has-aspect-ratio,
	body.wp-has-aspect-ratio > div,
	body.wp-has-aspect-ratio > div iframe {
		width: 100%;
		height: 100%;
		overflow: hidden; /* If it has an aspect ratio, it shouldn't scroll. */
	}
	body > div > * {
		margin-top: 0 !important; /* Has to have !important to override inline styles. */
		margin-bottom: 0 !important;
	}
`;
function SandBox({
  html = "",
  title = "",
  type,
  styles = [],
  scripts = [],
  onFocus,
  tabIndex
}) {
  const ref = (0, import_element.useRef)(null);
  const [width, setWidth] = (0, import_element.useState)(0);
  const [height, setHeight] = (0, import_element.useState)(0);
  function isFrameAccessible() {
    try {
      return !!ref.current?.contentDocument?.body;
    } catch (e) {
      return false;
    }
  }
  function trySandBox(forceRerender = false) {
    if (!isFrameAccessible()) {
      return;
    }
    const {
      contentDocument,
      ownerDocument
    } = ref.current;
    if (!forceRerender && null !== contentDocument?.body.getAttribute("data-resizable-iframe-connected")) {
      return;
    }
    const htmlDoc = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
      lang: ownerDocument.documentElement.lang,
      className: type,
      children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("head", {
        children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("title", {
          children: title
        }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("style", {
          dangerouslySetInnerHTML: {
            __html: style
          }
        }), styles.map((rules, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("style", {
          dangerouslySetInnerHTML: {
            __html: rules
          }
        }, i))]
      }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", {
        "data-resizable-iframe-connected": "data-resizable-iframe-connected",
        className: type,
        children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
          dangerouslySetInnerHTML: {
            __html: html
          }
        }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("script", {
          type: "text/javascript",
          dangerouslySetInnerHTML: {
            __html: `(${observeAndResizeJS.toString()})();`
          }
        }), scripts.map((src) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("script", {
          src
        }, src))]
      })]
    });
    contentDocument.open();
    contentDocument.write("<!DOCTYPE html>" + (0, import_element.renderToString)(htmlDoc));
    contentDocument.close();
  }
  (0, import_element.useEffect)(() => {
    trySandBox();
    function tryNoForceSandBox() {
      trySandBox(false);
    }
    function checkMessageForResize(event) {
      const iframe2 = ref.current;
      if (!iframe2 || iframe2.contentWindow !== event.source) {
        return;
      }
      let data = event.data || {};
      if ("string" === typeof data) {
        try {
          data = JSON.parse(data);
        } catch (e) {
        }
      }
      if ("resize" !== data.action) {
        return;
      }
      setWidth(data.width);
      setHeight(data.height);
    }
    const iframe = ref.current;
    const defaultView = iframe?.ownerDocument?.defaultView;
    iframe?.addEventListener("load", tryNoForceSandBox, false);
    defaultView?.addEventListener("message", checkMessageForResize);
    return () => {
      iframe?.removeEventListener("load", tryNoForceSandBox, false);
      defaultView?.removeEventListener("message", checkMessageForResize);
    };
  }, []);
  (0, import_element.useEffect)(() => {
    trySandBox();
  }, [title, styles, scripts]);
  (0, import_element.useEffect)(() => {
    trySandBox(true);
  }, [html, type]);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("iframe", {
    ref: (0, import_compose.useMergeRefs)([ref, (0, import_compose.useFocusableIframe)()]),
    title,
    tabIndex,
    className: "components-sandbox",
    sandbox: "allow-scripts allow-same-origin allow-presentation",
    onFocus,
    width: Math.ceil(width),
    height: Math.ceil(height)
  });
}
var sandbox_default = SandBox;
//# sourceMappingURL=index.cjs.map
