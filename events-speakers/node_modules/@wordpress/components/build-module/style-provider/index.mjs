// packages/components/src/style-provider/index.tsx
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import * as uuid from "uuid";
import { jsx as _jsx } from "react/jsx-runtime";
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
  const cache = createCache({
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
  return /* @__PURE__ */ _jsx(CacheProvider, {
    value: cache,
    children
  });
}
var style_provider_default = StyleProvider;
export {
  StyleProvider,
  style_provider_default as default
};
//# sourceMappingURL=index.mjs.map
