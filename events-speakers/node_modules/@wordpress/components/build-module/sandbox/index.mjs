// packages/components/src/sandbox/index.tsx
import { renderToString, useRef, useState, useEffect } from "@wordpress/element";
import { useFocusableIframe, useMergeRefs } from "@wordpress/compose";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
  const ref = useRef(null);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
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
    const htmlDoc = /* @__PURE__ */ _jsxs("html", {
      lang: ownerDocument.documentElement.lang,
      className: type,
      children: [/* @__PURE__ */ _jsxs("head", {
        children: [/* @__PURE__ */ _jsx("title", {
          children: title
        }), /* @__PURE__ */ _jsx("style", {
          dangerouslySetInnerHTML: {
            __html: style
          }
        }), styles.map((rules, i) => /* @__PURE__ */ _jsx("style", {
          dangerouslySetInnerHTML: {
            __html: rules
          }
        }, i))]
      }), /* @__PURE__ */ _jsxs("body", {
        "data-resizable-iframe-connected": "data-resizable-iframe-connected",
        className: type,
        children: [/* @__PURE__ */ _jsx("div", {
          dangerouslySetInnerHTML: {
            __html: html
          }
        }), /* @__PURE__ */ _jsx("script", {
          type: "text/javascript",
          dangerouslySetInnerHTML: {
            __html: `(${observeAndResizeJS.toString()})();`
          }
        }), scripts.map((src) => /* @__PURE__ */ _jsx("script", {
          src
        }, src))]
      })]
    });
    contentDocument.open();
    contentDocument.write("<!DOCTYPE html>" + renderToString(htmlDoc));
    contentDocument.close();
  }
  useEffect(() => {
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
  useEffect(() => {
    trySandBox();
  }, [title, styles, scripts]);
  useEffect(() => {
    trySandBox(true);
  }, [html, type]);
  return /* @__PURE__ */ _jsx("iframe", {
    ref: useMergeRefs([ref, useFocusableIframe()]),
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
export {
  sandbox_default as default
};
//# sourceMappingURL=index.mjs.map
