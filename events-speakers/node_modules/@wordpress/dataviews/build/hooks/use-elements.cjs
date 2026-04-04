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

// packages/dataviews/src/hooks/use-elements.ts
var use_elements_exports = {};
__export(use_elements_exports, {
  default: () => useElements
});
module.exports = __toCommonJS(use_elements_exports);
var import_element = require("@wordpress/element");
var EMPTY_ARRAY = [];
function useElements({
  elements,
  getElements
}) {
  const staticElements = Array.isArray(elements) && elements.length > 0 ? elements : EMPTY_ARRAY;
  const [records, setRecords] = (0, import_element.useState)(staticElements);
  const [isLoading, setIsLoading] = (0, import_element.useState)(false);
  (0, import_element.useEffect)(() => {
    if (!getElements) {
      setRecords(staticElements);
      return;
    }
    let cancelled = false;
    setIsLoading(true);
    getElements().then((fetchedElements) => {
      if (!cancelled) {
        const dynamicElements = Array.isArray(fetchedElements) && fetchedElements.length > 0 ? fetchedElements : staticElements;
        setRecords(dynamicElements);
      }
    }).catch(() => {
      if (!cancelled) {
        setRecords(staticElements);
      }
    }).finally(() => {
      if (!cancelled) {
        setIsLoading(false);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [getElements, staticElements]);
  return {
    elements: records,
    isLoading
  };
}
//# sourceMappingURL=use-elements.cjs.map
