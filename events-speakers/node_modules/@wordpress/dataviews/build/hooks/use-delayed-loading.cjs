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

// packages/dataviews/src/hooks/use-delayed-loading.ts
var use_delayed_loading_exports = {};
__export(use_delayed_loading_exports, {
  useDelayedLoading: () => useDelayedLoading
});
module.exports = __toCommonJS(use_delayed_loading_exports);
var import_element = require("@wordpress/element");
function useDelayedLoading(isLoading, options = { delay: 400 }) {
  const [showLoader, setShowLoader] = (0, import_element.useState)(false);
  (0, import_element.useEffect)(() => {
    if (!isLoading) {
      return;
    }
    const timeout = setTimeout(() => {
      setShowLoader(true);
    }, options.delay);
    return () => {
      clearTimeout(timeout);
      setShowLoader(false);
    };
  }, [isLoading, options.delay]);
  return showLoader;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  useDelayedLoading
});
//# sourceMappingURL=use-delayed-loading.cjs.map
