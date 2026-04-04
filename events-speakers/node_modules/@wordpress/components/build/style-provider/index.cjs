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

// packages/components/src/style-provider/index.tsx
var style_provider_exports = {};
__export(style_provider_exports, {
  StyleProvider: () => StyleProvider,
  default: () => style_provider_default
});
module.exports = __toCommonJS(style_provider_exports);
var import_react = require("@emotion/react");
var import_cache = __toESM(require("@emotion/cache"));
var uuid = __toESM(require("uuid"));
var import_jsx_runtime = require("react/jsx-runtime");
var uuidCache = /* @__PURE__ */ new Set();
var containerCacheMap = /* @__PURE__ */ new WeakMap();
var memoizedCreateCacheWithContainer = (container) => {
  if (containerCacheMap.has(container)) {
    return containerCacheMap.get(container);
  }
  let key = uuid.v4().replace(/[0-9]/g, "");
  while (uuidCache.has(key)) {
    key = uuid.v4().replace(/[0-9]/g, "");
  }
  uuidCache.add(key);
  const cache = (0, import_cache.default)({
    container,
    key
  });
  containerCacheMap.set(container, cache);
  return cache;
};
function StyleProvider(props) {
  const {
    children,
    document
  } = props;
  if (!document) {
    return null;
  }
  const cache = memoizedCreateCacheWithContainer(document.head);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.CacheProvider, {
    value: cache,
    children
  });
}
var style_provider_default = StyleProvider;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  StyleProvider
});
//# sourceMappingURL=index.cjs.map
